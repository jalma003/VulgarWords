function [w] = projectUV(u, v)
	dotProd = dot(u, v)
	normalization = norm(v)
	c = dotProd/normalization
	w = c * v