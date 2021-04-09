import Uppy from '@uppy/core'
import Dashboard from '@uppy/dashboard'
import Webcam from '@uppy/webcam'
import ScreenCapture from '@uppy/screen-capture'
import ImageEditor from '@uppy/image-editor'
import Tus from '@uppy/tus'

const uppy = new Uppy({
  debug: true,
  autoProceed: false,
  restrictions: {
    maxFileSize: 1000000,
    maxNumberOfFiles: 3,
    minNumberOfFiles: 2,
    allowedFileTypes: ['image/*', 'video/*']
  }
})
.use(Dashboard, {
  trigger: '.UppyModalOpenerBtn',
  inline: true,
  target: '.DashboardContainer',
  replaceTargetContent: true,
  showProgressDetails: true,
  note: 'Images and video only, 2–3 files, up to 1 MB',
  height: 470,
  metaFields: [
    { id: 'name', name: 'Name', placeholder: 'file name' },
    { id: 'caption', name: 'Caption', placeholder: 'describe what the image is about' }
  ],
  browserBackButtonClose: false
})
.use(Webcam, { target: Dashboard })
.use(ScreenCapture, { target: Dashboard })
.use(ImageEditor, { target: Dashboard })
.use(Tus, { endpoint: 'https://tusd.tusdemo.net/files/' })
.use(DropTarget, {target: document.body })

uppy.on('complete', result => {
  console.log('successful files:', result.successful)
  console.log('failed files:', result.failed)
})