window.addEventListener("load", (event) => {
  startup();
});

function startup() {
  connectButton = document.getElementById("connectButton");
  disconnectButton = document.getElementById("disconnectButton");
  sendButton = document.getElementById("sendButton");
  messageInputBox = document.getElementById("message");
  receiveBox = document.getElementById("receivebox");

  // Set event listeners for user interface widgets

  connectButton.addEventListener("click", connectPeers, false);
  disconnectButton.addEventListener("click", disconnectPeers, false);
  sendButton.addEventListener("click", sendMessage, false);
}

// Set up the local peer
localConnection = new RTCPeerConnection();

sendChannel = localConnection.createDataChannel("sendChannel");
sendChannel.onopen = handleSendChannelStatusChange;
sendChannel.onclose = handleSendChannelStatusChange;

// Set up the remote peer
remoteConnection = new RTCPeerConnection();
remoteConnection.ondatachannel = receiveChannelCallback;

// Set up the ICE candidates
localConnection.onicecandidate = (e) =>
  !e.candidate ||
  remoteConnection.addIceCandidate(e.candidate).catch(handleAddCandidateError);

remoteConnection.onicecandidate = (e) =>
  !e.candidate ||
  localConnection.addIceCandidate(e.candidate).catch(handleAddCandidateError);

// Start the connection attempt
localConnection
  .createOffer()
  .then((offer) => localConnection.setLocalDescription(offer))
  .then(() =>
    remoteConnection.setRemoteDescription(localConnection.localDescription)
  )
  .then(() => remoteConnection.createAnswer())
  .then((answer) => remoteConnection.setLocalDescription(answer))
  .then(() =>
    localConnection.setRemoteDescription(remoteConnection.localDescription)
  )
  .catch(handleCreateDescriptionError);

// Handling successful peer connection
function handleLocalAddCandidateSuccess() {
  connectButton.disabled = true;
}

function handleRemoteAddCandidateSuccess() {
  disconnectButton.disabled = false;
}

// Connecting the data channel
function receiveChannelCallback(event) {
  receiveChannel = event.channel;
  receiveChannel.onmessage = handleReceiveMessage;
  receiveChannel.onopen = handleReceiveChannelStatusChange;
  receiveChannel.onclose = handleReceiveChannelStatusChange;
}
