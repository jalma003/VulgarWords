var app = angular.module('VulgarWords', []);
// app.config(['$httpProvider', function ($httpProvider) {
//   //Reset headers to avoid OPTIONS request (aka preflight)
//   $httpProvider.defaults.headers.common = {};
//   $httpProvider.defaults.headers.post = {};
//   $httpProvider.defaults.headers.get = {};
//   $httpProvider.defaults.headers.put = {};
//   $httpProvider.defaults.headers.patch = {};
// }]);

var state_abbrev_mapper = [
    {
        "name": "Alabama",
        "abbreviation": "AL"
    },
    {
        "name": "Alaska",
        "abbreviation": "AK"
    },
    {
        "name": "American Samoa",
        "abbreviation": "AS"
    },
    {
        "name": "Arizona",
        "abbreviation": "AZ"
    },
    {
        "name": "Arkansas",
        "abbreviation": "AR"
    },
    {
        "name": "California",
        "abbreviation": "CA"
    },
    {
        "name": "Colorado",
        "abbreviation": "CO"
    },
    {
        "name": "Connecticut",
        "abbreviation": "CT"
    },
    {
        "name": "Delaware",
        "abbreviation": "DE"
    },
    {
        "name": "District Of Columbia",
        "abbreviation": "DC"
    },
    {
        "name": "Federated States Of Micronesia",
        "abbreviation": "FM"
    },
    {
        "name": "Florida",
        "abbreviation": "FL"
    },
    {
        "name": "Georgia",
        "abbreviation": "GA"
    },
    {
        "name": "Guam",
        "abbreviation": "GU"
    },
    {
        "name": "Hawaii",
        "abbreviation": "HI"
    },
    {
        "name": "Idaho",
        "abbreviation": "ID"
    },
    {
        "name": "Illinois",
        "abbreviation": "IL"
    },
    {
        "name": "Indiana",
        "abbreviation": "IN"
    },
    {
        "name": "Iowa",
        "abbreviation": "IA"
    },
    {
        "name": "Kansas",
        "abbreviation": "KS"
    },
    {
        "name": "Kentucky",
        "abbreviation": "KY"
    },
    {
        "name": "Louisiana",
        "abbreviation": "LA"
    },
    {
        "name": "Maine",
        "abbreviation": "ME"
    },
    {
        "name": "Marshall Islands",
        "abbreviation": "MH"
    },
    {
        "name": "Maryland",
        "abbreviation": "MD"
    },
    {
        "name": "Massachusetts",
        "abbreviation": "MA"
    },
    {
        "name": "Michigan",
        "abbreviation": "MI"
    },
    {
        "name": "Minnesota",
        "abbreviation": "MN"
    },
    {
        "name": "Mississippi",
        "abbreviation": "MS"
    },
    {
        "name": "Missouri",
        "abbreviation": "MO"
    },
    {
        "name": "Montana",
        "abbreviation": "MT"
    },
    {
        "name": "Nebraska",
        "abbreviation": "NE"
    },
    {
        "name": "Nevada",
        "abbreviation": "NV"
    },
    {
        "name": "New Hampshire",
        "abbreviation": "NH"
    },
    {
        "name": "New Jersey",
        "abbreviation": "NJ"
    },
    {
        "name": "New Mexico",
        "abbreviation": "NM"
    },
    {
        "name": "New York",
        "abbreviation": "NY"
    },
    {
        "name": "North Carolina",
        "abbreviation": "NC"
    },
    {
        "name": "North Dakota",
        "abbreviation": "ND"
    },
    {
        "name": "Northern Mariana Islands",
        "abbreviation": "MP"
    },
    {
        "name": "Ohio",
        "abbreviation": "OH"
    },
    {
        "name": "Oklahoma",
        "abbreviation": "OK"
    },
    {
        "name": "Oregon",
        "abbreviation": "OR"
    },
    {
        "name": "Palau",
        "abbreviation": "PW"
    },
    {
        "name": "Pennsylvania",
        "abbreviation": "PA"
    },
    {
        "name": "Puerto Rico",
        "abbreviation": "PR"
    },
    {
        "name": "Rhode Island",
        "abbreviation": "RI"
    },
    {
        "name": "South Carolina",
        "abbreviation": "SC"
    },
    {
        "name": "South Dakota",
        "abbreviation": "SD"
    },
    {
        "name": "Tennessee",
        "abbreviation": "TN"
    },
    {
        "name": "Texas",
        "abbreviation": "TX"
    },
    {
        "name": "Utah",
        "abbreviation": "UT"
    },
    {
        "name": "Vermont",
        "abbreviation": "VT"
    },
    {
        "name": "Virgin Islands",
        "abbreviation": "VI"
    },
    {
        "name": "Virginia",
        "abbreviation": "VA"
    },
    {
        "name": "Washington",
        "abbreviation": "WA"
    },
    {
        "name": "West Virginia",
        "abbreviation": "WV"
    },
    {
        "name": "Wisconsin",
        "abbreviation": "WI"
    },
    {
        "name": "Wyoming",
        "abbreviation": "WY"
    }
];
var grad_rate = {
    "Alabama":  "80.0%",
    "Alaska":   "71.8%",
    "Arizona":  "75.1%",
    "Arkansas": "84.9%",
    "California":   "80.4%",
    "Colorado": "76.9%",
    "Connecticut":  "85.5%",
    "Delaware": "80.4%",
    "District of Columbia": "62.3%",
    "Florida": "75.6%",
    "Georgia": "71.7%",
    "Hawaii": "82.4%",
    "Idaho": "-",
    "Illinois": "83.2%",
    "Indiana": "87.0%",
    "Iowa": "89.7%",
    "Kansas": "85.7%",
    "Kentucky": "86.1%",
    "Louisiana": "73.5%",
    "Maine": "86.4%",
    "Maryland": "85.0%",
    "Massachusetts": "85.0%",
    "Michigan": "77.0%",
    "Minnesota": "79.8%",
    "Mississippi": "75.5%",
    "Missouri": "85.7%",
    "Montana": "84.4%",
    "Nebraska": "88.5%",
    "Nevada": "70.7%",
    "New Hampshire": "87.3%",
    "New Jersey": "87.5%",
    "New Mexico": "70.3%",
    "New York": "76.8%",
    "North Carolina": "82.5%",
    "North Dakota": "87.5%",
    "Ohio": "82.2%",
    "Oklahoma": "84.8%",
    "Oregon": "68.7%",
    "Pennsylvania": "85.5%",
    "Rhode Island": "79.7%",
    "South Carolina": "77.6%",
    "South Dakota": "82.7%",
    "Tennessee": "86.3%",
    "Texas": "88.0%",
    "Utah": "83.0%",
    "Vermont": "86.6%",
    "Virginia": "84.5%",
    "Washington": "76.4%",
    "West Virginia": "81.4%",
    "Wisconsin": "88.0%",
    "Wyoming": "77.0%"
}

function map_abbrev_states(states)
{
	for(var i = 0; i < states.len; i++)
		for(var j = 0; j < state_abbrev_mapper.len; j++)
			if(states[i].state == state_abbrev_mapper[j].abbreviation)
				states[i].state = state_abbrev_mapper[j].name;
	return states;
}

app.service('getStateInfo', ['$http', function($http) {
    this.get_state_info = function(scope){
        return $http.get('http://159.203.210.73:5000/getStateInfo')
        .success(function(data) {
            for(var i = 0; i < data.states.length; i++)
                for(var j = 0; j < state_abbrev_mapper.length; j++)
                    if(data.states[i].state === state_abbrev_mapper[j].abbreviation)
                        data.states[i].state = state_abbrev_mapper[j].name;

            scope.state_info = data.states;
            scope.createGraph();
            // callback(data.states);
            // return data.states;
        }) 
        .error(function(err) {
            return err;
        }); 

    }

    
}]);

app.service('getStateTweets', ['$http', function($http) {
    this.get_state_tweets = function(state,scope){

        return $http.get('http://159.203.210.73:5000/get_state_tweets/' + state)
        .success(function(data) {

            for(var i = 0; i < data.tweets.length; i++){
                data.tweets[i].score *= 100;
            }
            scope.tweet_data = data.tweets;
            // callback(data.tweets);
            return data.tweets;
        })
        .error(function(err) {
            return err; 
        });
    }
}]);

app.controller('StatesController', ['$scope', 'getStateInfo', 'getStateTweets', '$http', function($scope, getStateInfo, getStateTweets, $http){

    $scope.grad_rate = grad_rate;

    $scope.get_tweets = function(state){
        $scope.state_clicked = state;
        for(var i = 0; i < state_abbrev_mapper.length; i++)
        {
            if(state_abbrev_mapper[i].name === state)
            {
                state = state_abbrev_mapper[i].abbreviation;
                break;
            }
        }
        getStateTweets.get_state_tweets(state, $scope);

        angular.element('#tweet_loader').triggerHandler('click');
    }

    getStateInfo.get_state_info($scope);
   
}]);