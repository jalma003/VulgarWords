from flask import Flask, request, jsonify, make_response, request, current_app
from flask.ext.cors import CORS
from cassandra.cluster import Cluster
from datetime import timedelta
from functools import update_wrapper

app = Flask(__name__)

# CORS(app)
# cors = CORS(app, resources={r"/api/*": {"origins": "*"}})
def crossdomain(origin=None, methods=None, headers=None,
                max_age=21600, attach_to_all=True,
                automatic_options=True):
    if methods is not None:
        methods = ', '.join(sorted(x.upper() for x in methods))
    if headers is not None and not isinstance(headers, basestring):
        headers = ', '.join(x.upper() for x in headers)
    if not isinstance(origin, basestring):
        origin = ', '.join(origin)
    if isinstance(max_age, timedelta):
        max_age = max_age.total_seconds()

    def get_methods():
        if methods is not None:
            return methods

        options_resp = current_app.make_default_options_response()
        return options_resp.headers['allow']

    def decorator(f):
        def wrapped_function(*args, **kwargs):
            if automatic_options and request.method == 'OPTIONS':
                resp = current_app.make_default_options_response()
            else:
                resp = make_response(f(*args, **kwargs))
            if not attach_to_all and request.method != 'OPTIONS':
                return resp

            h = resp.headers

            h['Access-Control-Allow-Origin'] = origin
            h['Access-Control-Allow-Methods'] = get_methods()
            h['Access-Control-Max-Age'] = str(max_age)
            if headers is not None:
                h['Access-Control-Allow-Headers'] = headers
            return resp

        f.provide_automatic_options = False
        return update_wrapper(wrapped_function, f)
    return decorator

#Connect to Clusters
#IP of Cassandra
cluster = Cluster(['127.0.0.1'])

#Connection for cluster with provided IP
#Not specifying a cluster connects to default
#Alternative -> cluster.connect('NAME_OF_CLUSTER')
session = cluster.connect()

#Specify which keyspace to use
session.execute('USE twitter')

@app.route('/getStateInfo', methods=['GET', 'OPTIONS'])
@crossdomain(origin='http://104.236.188.157') 
def getStateInfo():
    rows = session.execute('select * from States')
    result = []
    for i in rows:
        result.append(serialize_state_info(i))

    return jsonify(states=result)

def serialize_state_info(state):
    return {'state': state.state, 'total_tweets': state.totaltweets, 'real_score': state.realscore, 'bad_score': state.badscore}


@app.route('/get_state_tweets/<state>', methods=['GET', 'OPTIONS'])
@crossdomain(origin='http://104.236.188.157')
def get_state_info(state):
    rows = session.execute('select * from tweets where state=\'' + state + '\' ORDER BY score DESC LIMIT 10')
    result = []
    for i in rows:
        result.append(serialize_state_tweet(i))

    return jsonify(tweets=result)

def serialize_state_tweet(tweet):
    return {'username': tweet.username, 'score': tweet.score, 'text': tweet.text, 'lat': tweet.lat, 'lon': tweet.lon}
 
if __name__ == '__main__':
    app.debug = True
    app.run(host='159.203.210.73', port=5000)
