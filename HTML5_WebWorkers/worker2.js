
function receivedMessage(event) {
	postMessage("I've received the message:" + eve);
}

addEventListener("message", receivedMessage, true);
