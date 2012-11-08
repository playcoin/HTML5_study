importScripts();

var n = 1;

search: while(n < 5000) {
	n += 1;
	for(var i = 2; i <= Math.sqrt(n); i++){
		if(n % i == 0){
			continue search;
		}
	}

	// close()方法目前支持的不够广泛，所以在onmessage中用worker的terminate方法比较合适。
	postMessage(n);
}


