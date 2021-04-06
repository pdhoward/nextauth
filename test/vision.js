require('dotenv').config()

const {
    ComputerVisionClient,
    ComputerVisionModels
  } = require("@azure/cognitiveservices-computervision")

const { CognitiveServicesCredentials } = require("@azure/ms-rest-azure-js")

const items = [
  'https://res.cloudinary.com/stratmachine/image/upload/v1617737720/objects/mildlee-7KKy7-TeeVs-unsplash_dqmnxt.jpg',
  'https://res.cloudinary.com/stratmachine/image/upload/v1617737720/objects/ruchindra-gunasekara-GK8x_XCcDZg-unsplash_ymtlzu.jpg',
  'https://res.cloudinary.com/stratmachine/image/upload/v1617737720/objects/curology-E_dRKdBhxk4-unsplash_r2y3et.jpg',
  'https://res.cloudinary.com/stratmachine/image/upload/v1617737720/objects/mak-8wy9mGgmGoU-unsplash_ag9coq.jpg',
  'https://res.cloudinary.com/stratmachine/image/upload/v1617737720/objects/mealpro-dd1M0Ji9xHQ-unsplash_tz0yst.jpg',
  'https://res.cloudinary.com/stratmachine/image/upload/v1617737720/objects/brandable-box-8mCsyImZRGY-unsplash_brfz2t.jpg',
  'https://res.cloudinary.com/stratmachine/image/upload/v1617737720/objects/magic-mind-OSk4lO--UsA-unsplash_lq3mw2.jpg',
  'https://res.cloudinary.com/stratmachine/image/upload/v1617737720/objects/mildlee-8N6z4yXUkwY-unsplash_cqs8nk.jpg'
]
async function identify(uri) {
    const url = uri       
    const options = {
      maxCandidates: 5,
      language: "en"
    };
    client
      .describeImage(url, options)
      .then((result) => {
        console.log("The result is:");
        console.log(result);
      })
      .catch((err) => {
        console.log("An error occurred:");
        console.error(err);
      });
}

async function main() {
    const computerVisionKey = process.env["COMPUTERVISIONKEY"]
    const computerVisionEndPoint =
      process.env["COMPUTERVISIONENDPOINT"]
    const cognitiveServiceCredentials = new CognitiveServicesCredentials(computerVisionKey);
    const client = new ComputerVisionClient(cognitiveServiceCredentials, computerVisionEndPoint);
    items.forEach(i => identify(i))    
  }
  
  main();