require('dotenv').config()
const {
    ComputerVisionClient,
    ComputerVisionModels
  } = require("@azure/cognitiveservices-computervision")

const { CognitiveServicesCredentials } = require("@azure/ms-rest-azure-js")

async function getImages () {
  const apiRoot = "https://api.unsplash.com"
  const accessKey = process.env.IMAGEACCESSKEY

  const doggoEndpoint = `${apiRoot}/photos/random?client_id=${accessKey}&count=${10}&collections='3816141,1154337,1254279'`

  const res = await axios.get(doggoEndpoint)
  const {data} = await res
  return data
}

async function main() {
    const computerVisionKey = process.env["COMPUTERVISIONKEY"]
    const computerVisionEndPoint =
      process.env["COMPUTERVISIONENDPOINT"]
    const cognitiveServiceCredentials = new CognitiveServicesCredentials(computerVisionKey);
    const client = new ComputerVisionClient(cognitiveServiceCredentials, computerVisionEndPoint);

    let imageArray = await getImages
    console.log(`Just fetched ${imageArray.length} images`)
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