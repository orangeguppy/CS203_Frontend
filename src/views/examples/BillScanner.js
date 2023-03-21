import React from 'react';
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


function BillScanner (props) {
    const [dataUri, setDataUri] = useState('');
    const [show, setShow] = useState(false);    // show confirmation pop-up
    const handleClose = () => setShow(false);   // close confirmation pop-up
    const handleShow = () => setShow(true);     // open confirmation pop-up

  function handleTakePhoto (dataUri) {

    return new Promise(function(resolve, reject) {
        if (URI == null) return reject();
        var canvas = document.createElement('canvas'),
            context = canvas.getContext('2d'),
            image = new Image();
        image.addEventListener('load', function() {
          canvas.width = image.width;
          canvas.height = image.height;
          context.drawImage(image, 0, 0, canvas.width, canvas.height);
          resolve(context.getImageData(0, 0, canvas.width, canvas.height));
        }, false);
        image.src = dataUri;
      });
    console.log('takePhoto');
    // pop-up confirmation for scanned document 
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Would you like to upload this document?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Press Back to rescan document</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Back
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
  }

  function handleTakePhotoAnimationDone (dataUri) {
    // Do stuff with the photo...
    console.log('takePhoto');
  }

  function handleCameraError (error) {
    console.log('handleCameraError', error);
  }

  function handleCameraStart (stream) {
    console.log('handleCameraStart');
  }

  function handleCameraStop () {
    console.log('handleCameraStop');

  }

  return (
    <Camera
      onTakePhoto = { (dataUri) => { handleTakePhoto(dataUri); } }
      onTakePhotoAnimationDone = { (dataUri) => { handleTakePhotoAnimationDone(dataUri); } }
      onCameraError = { (error) => { handleCameraError(error); } }
      idealFacingMode = {FACING_MODES.ENVIRONMENT}
      idealResolution = {{width: 640, height: 480}}
      imageType = {IMAGE_TYPES.JPG}
      imageCompression = {0.97}
      isMaxResolution = {true}
      isImageMirror = {false}
      isSilentMode = {false}
      isDisplayStartCameraError = {true}
      isFullscreen = {false}
      sizeFactor = {1}
      onCameraStart = { (stream) => { handleCameraStart(stream); } }
      onCameraStop = { () => { handleCameraStop(); } }
    />
  );
}

export default BillScanner;