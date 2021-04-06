require('dotenv').config()

const {
    ComputerVisionClient,
    ComputerVisionModels } =             require("@azure/cognitiveservices-computervision")
const { CognitiveServicesCredentials } = require("@azure/ms-rest-azure-js")

const computerVisionKey = process.env["COMPUTERVISIONKEY"]
const computerVisionEndPoint =process.env["COMPUTERVISIONENDPOINT"]
const cognitiveServiceCredentials = new CognitiveServicesCredentials(computerVisionKey);
const client = new ComputerVisionClient(cognitiveServiceCredentials, computerVisionEndPoint);


const items = [
  {
  description: 'wood table and 4 chairs',
  url:  'https://res.cloudinary.com/stratmachine/image/upload/v1617739647/objects/tablechairs_hpy9dd.jpg'
  },
  {
    description: 'home depot and misc packing boxes on floor',
    url:  'https://res.cloudinary.com/stratmachine/image/upload/v1617739638/objects/packingboxes_rgonvl.jpg'
  },
  {
    description: 'A single brown packing box with lid open',
    url:  'https://res.cloudinary.com/stratmachine/image/upload/v1617739634/objects/packingbox_ivqebg.webp'
  },
  {
    description: 'Grey couch, white background',
    url:  'https://res.cloudinary.com/stratmachine/image/upload/v1617739625/objects/loveseat_bm1y62.jpg'
  },
  {
    description: 'Living room set, white coach, coffee table, fireplace',
    url:  'https://res.cloudinary.com/stratmachine/image/upload/v1617739621/objects/livingroomset_yxqp7u.jpg'
  },
  {
    description: 'White box with qrcode on face',
    url:  'https://res.cloudinary.com/stratmachine/image/upload/v1617739610/objects/boxqrcode_jrptw1.jpg',
  },
  {
    description: 'QRCode - points to proximity site',
    url:  'https://res.cloudinary.com/stratmachine/image/upload/v1589910869/qrcodes/frame_fbeose.png'
  },
  {
    description: 'Two small brown boxes - 1 leaning against the other - sitting on brown floor',
    url:  'https://res.cloudinary.com/stratmachine/image/upload/v1617737720/objects/mildlee-7KKy7-TeeVs-unsplash_dqmnxt.jpg'
  },
  {
    description: 'Warehouse aisle with shelving on both sides, stacked with items',
    url:  'https://res.cloudinary.com/stratmachine/image/upload/v1617737720/objects/ruchindra-gunasekara-GK8x_XCcDZg-unsplash_ymtlzu.jpg'
  },
  {
    description: 'Stack of small boxes - sitting in background of similar color',
    url:  'https://res.cloudinary.com/stratmachine/image/upload/v1617737720/objects/curology-E_dRKdBhxk4-unsplash_r2y3et.jpg'
  },
  {
    description: 'Open garage with stack of boxes against wall',
    url:  'https://res.cloudinary.com/stratmachine/image/upload/v1617737720/objects/mak-8wy9mGgmGoU-unsplash_ag9coq.jpg'
  },
  {
    description: 'Man holding box with mealpro printed on front',
    url:  'https://res.cloudinary.com/stratmachine/image/upload/v1617737720/objects/mealpro-dd1M0Ji9xHQ-unsplash_tz0yst.jpg'
  },
  {
    description: 'Brown box with closed lid sitting on floor',
    url:  'https://res.cloudinary.com/stratmachine/image/upload/v1617737720/objects/brandable-box-8mCsyImZRGY-unsplash_brfz2t.jpg'
  },
  {
    description: 'Brown box with grean bottom rim and closed lid sitting on floor',
    url:  'https://res.cloudinary.com/stratmachine/image/upload/v1617737720/objects/magic-mind-OSk4lO--UsA-unsplash_lq3mw2.jpg'
  },
  {
    description: 'Two brown flat boxes, not touching, sitting on brown surface',
    url:  'https://res.cloudinary.com/stratmachine/image/upload/v1617737720/objects/mildlee-8N6z4yXUkwY-unsplash_cqs8nk.jpg'
  }
]
async function identify(item) {
    const description = item.description
    const url = item.url    
    const options = {
      maxCandidates: 5,
      language: "en"
    };

    client
      .describeImage(url, options)
      .then((result) => {
        console.log("---------------------------------")
        console.log(`This is a ${description}`)
        console.log("The Vision Machine saw:");
        console.log(result);
      })
      .catch((err) => {
        console.log("An error occurred:");
        console.error(err);
      });
}

async function main() {
    
    items.forEach(i => identify(i)) 
  }
  
  main();