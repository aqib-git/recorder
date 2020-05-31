import React from 'react';
import './Recorder.css';

async function getConnectedDevices(type) {
  const devices = await navigator.mediaDevices.enumerateDevices();

  return devices.filter(device => device.kind === type)
}

async function openCamera(cameraId, minWidth, minHeight) {
  const constraints = {
    'audio': {'echoCancellation': false},
    'video': {
      'deviceId': cameraId,
      'width': {'min': minWidth},
      'height': {'min': minHeight}
    }
  };

  return await navigator.mediaDevices.getUserMedia(constraints);
}

async function startRecording() {
  const cameras = await getConnectedDevices('videoinput')

  try {
    const stream = await openCamera(cameras[0].deviceId, 1280, 720);

    const videoElement = document.querySelector('video#localVideo');

    videoElement.srcObject = stream;
  } catch (error) {
    console.error('Error opening video camera.', error);
  }
}

function Recording() {
  startRecording()

  return (<div className="recorder">
    <div className="recorder__video">
      <video width={600} height="auto" id="localVideo" autoPlay playsInline controls={false}/>
    </div>
    <div className="recorder__controls">
      <button click={() => startRecording}>Record</button>
    </div>
  </div>);
}

export default Recording;
