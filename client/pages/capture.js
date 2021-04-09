import React, { Component, useState } from 'react';
import {Button} from 'react-bootstrap'
import Uppy from '@uppy/core'
import Tus from '@uppy/tus'
import Webcam from '@uppy/webcam'
import XHRUpload from '@uppy/xhr-upload'
//import Dashboard from '@uppy/react/lib/Dashboard'
import {DashboardModal, useUppy} from '@uppy/react'
import 'bootstrap/dist/css/bootstrap.min.css';
import '@uppy/core/dist/style.css'
import '@uppy/dashboard/dist/style.css'


//https://medium.com/@BrodaNoel/conditional-rendering-in-react-and-jsx-the-solution-7c80beba1e36

function MyComponent () {
  // const uppy = useUppy(() => {
  //   return new Uppy()
  //     .use(Tus, { endpoint: 'https://tusd.tusdemo.net/files' })
  //     .use(Webcam)
  // })
  const [show, setShow] = useState(false)
  const [uppy, setUppy] = useState(null)

  const initiate = () => {
    return new Promise ((resolve, reject) => {
      console.log('Trigger intitiate')
      let uppyObj = new Uppy()
          .use(Tus, { endpoint: 'https://tusd.tusdemo.net/files' })
          .use(Webcam)
      resolve(uppyObj)
    })
  }
  const renderDash = async () => {
    console.log('Click')
    setUppy(await initiate())
    console.log('Back to render')
    show ? setShow(false) : setShow(true)  
    console.log(show)  
  }

  return (
  <>
    <Button variant="primary">Primary</Button>{' '}
    <Button onClick={() => renderDash()} variant="primary">Click</Button>
    {show ? (<DashboardModal uppy={uppy} />) : (null)}
  </>
  )
}

export default MyComponent
