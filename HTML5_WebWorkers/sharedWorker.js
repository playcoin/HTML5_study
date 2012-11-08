var count = 0;

onconnect = function(event){
	count += 1;
	var port = event.ports[0];

	port.postMessage("嗨！这是链接#" + count);
}
