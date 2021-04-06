require('dotenv').config()
const axios = require('axios')
const fs = require('fs')
const {
    ComputerVisionClient,
    ComputerVisionModels
  } = require("@azure/cognitiveservices-computervision")

const { CognitiveServicesCredentials } = require("@azure/ms-rest-azure-js")

async function main() {
    const computerVisionKey = process.env["COMPUTERVISIONKEY"]
    const computerVisionEndPoint =
      process.env["COMPUTERVISIONENDPOINT"]
    const cognitiveServiceCredentials = new CognitiveServicesCredentials(computerVisionKey);
    const client = new ComputerVisionClient(cognitiveServiceCredentials, computerVisionEndPoint);
  
    const url =
      "https://docs.microsoft.com/en-us/azure/includes/media/shared-image-galleries/shared-image-gallery.png";
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
  
  main();