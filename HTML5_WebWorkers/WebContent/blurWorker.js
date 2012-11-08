/**
 * @author playcoin
 */
// 引入blur算法
importScripts("blur.js");

function sendStatus(statusText){
	postMessage({
		type: "status",
		"statusText" : statusText
	})
}

function messageHandler(e){

	var messageType = e.data.type;

	switch(messageType) {
	case "blur":
		sendStatus("Work started blur on data in range: " + e.origin + /*e.data.startX +*/ "-" + (e.data.startX + e.data.width));

		var imageData = e.data.imageData;
		imageData = boxBlur(imageData, e.data.width, e.data.height, e.data.startX);

		postMessage({
			type : "progress",
			"imageData" : imageData,
			"width" : e.data.width,
			"height" : e.data.height,
			"startX" : e.data.startX
		});

		sendStatus("Finished blur on data in range: " + e.data.startX + "-" + (e.data.startX + e.data.width));

		break;
	default:
		sendStatus("Worker got message: " + e.data);
		break;
	}
}

addEventListener("message", messageHandler, true);
