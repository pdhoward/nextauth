import React, {useState, useRef} from 'react';
import Image from 'next/image'
import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
 
const Capture = (props) => {

  const camera = useRef(null);
  const [images, setImage] = useState([]);

  function handleTakePhoto (dataUri) {
    setImage([...images, dataUri])
    console.log('takePhoto');
  }  
 
  function handleCameraError (error) {
    console.log('handleCameraError', error);
  }
  const ThumbNails = () => (
    <>
      {images.map(i => {
        console.log('This executed')
        console.log(i)
        return <Image
          src={i}
          alt="Picture of the author"
          width={160}
          height={120}
        />
      
        })}
    </>
  )
 
  return (
    <>
      <Camera
        ref={camera}
        onTakePhoto = { (dataUri) => { handleTakePhoto(dataUri); } }      
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
      />
      <ThumbNails />
    </>
  );
}
 
export default Capture;