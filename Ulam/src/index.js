(function() {
  var canvas, ct, ctx, get, h, hsl, i, imageData, isPrime, j, m, neighbor,  o, p, pf, primeFactors, putData, q, r, ref, ref1, ref2, ref3, w, xy;

canvas = document.getElementById('canvas');

var iterations = 30000; // num of integers

const side = Math.sqrt(iterations);
canvas.width  = Math.round(side) + 2
canvas.height = Math.round(side) + 2 

ctx = canvas.getContext('2d');

imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

var product;
var divisorMatrix = {};

for(var i=0; i<=iterations; i++){
	divisorMatrix[i]= new Array(60);
}

for(var i=1; i<=iterations; i++){
	for(var j=1; j<=iterations; j++){
	product = i*j;
	if (Object.hasOwn(divisorMatrix,product))
		{
			var index = divisorMatrix[product]
					.findLastIndex(
						(arrayIndex)=>{
							return arrayIndex !== 0;
							}
						) + 1;
			divisorMatrix[product][index] = i;
			
		}
	}
}

function primeFactors(n) {
	const factors = [];
	let divisor = 2;
	while (n >= 2) {
		if (n % divisor == 0) {
			factors.push(divisor);
			n = n / divisor;
		} else {
			divisor++;
		}
	}
	return factors;
}

function properDivisors(n){
	return divisorMatrix[n].filter((m)=>m!==0&&m!==n);
}

  neighbor = function(n, dir, w, h) {
    switch (dir) {
      case 'L':
        return n - 1;
      case 'R':
        return n + 1;
      case 'U':
        return n - w;
      case 'D':
        return n + w;
      default:
        return alert('direction??');
    }
  };

  // HSL -> RGB
  hsl = function(h, s, l) {
    var a, f, k;
    s /= 100;
    l /= 100;
    k = function(n) {
      return (n + h / 30) % 12;
    };
    a = s * Math.min(l, 1 - l);
    f = function(n) {
      return l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    };
    return [255 * f(0), 255 * f(8), 255 * f(4)];
  };

  // filter array k for f
	// handy for if you have a list of factors
	// and want to pull out specific ones
  get = function(k, f) {
    var fnc;
    return k.filter(fnc = function(a) {
      return a === f;
    });
  };

  putData = function(xy, j) {
	var f2, rgb;
	const sumOfProperDivisors = properDivisors(j).reduce((partialSum, a) => partialSum + a, 0);
	// these are the lines to play with
	rgb = hsl(75, 100, primeFactors(j).length*10); 
	imageData.data[xy * 4] = rgb[0];
	imageData.data[xy * 4 + 1] = rgb[1];
	imageData.data[xy * 4 + 2] = rgb[2];
	imageData.data[xy * 4 + 3] = 255; // alpha
  };

w = canvas.width;
h = canvas.height;

xy = Math.round(h * 0.5) * w + Math.round(w * 0.5);

var m = 1;

for (i = 0; i < iterations;) {
	for (j = 0; j < m; j++){
		i++;
		xy = neighbor(xy, 'R', w);
		putData(xy, i);
		if (i>=iterations) { break ; }
		}
		if (i>=iterations) { break ; }
	for (j = 0; j < m; j++){
		i++;
		xy = neighbor(xy, 'D', w);
		putData(xy, i);
		if (i>=iterations) { break ; }
		}
		if (i>=iterations) { break ; }
	m++;
	for (j = 0; j < m; j++){
		i++;
		xy = neighbor(xy, 'L', w);
		putData(xy, i);
		if (i>=iterations) { break ; }
		}
		if (i>=iterations) { break ; }
	for (j = 0; j < m; j++){
		i++;
		xy = neighbor(xy, 'U', w);
		putData(xy, i);
		if (i>=iterations) { break ; }
		}
		if (i>=iterations) { break ; }
	m++;
}

  ctx.putImageData(imageData, 0, 0);

}).call(this);
