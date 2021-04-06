require('dotenv').config()


async function x(imageArray){
    console.log(`Just fetched ${imageArray.length} images`)
    console.log(imageArray[0].urls.small)
  
    let picked = imageArray.map(i => {
        return i.urls.small
    })    
    await fs.writeFileSync('./links/links.txt', picked.join('\n'));
  }
  
  
  async function getImages () {
    const apiRoot = "https://api.unsplash.com"
    const accessKey = process.env.IMAGEACCESSKEY
  
    const endpoint = `${apiRoot}/photos/boxes?client_id=${accessKey}&count=${100}'`
    try {
      const res = await axios.get(endpoint)
      const {data} = await res
      console.log(typeof data)
      console.log(data[0])
      return data
    } catch (err) {
      console.log(err)
  
    }
    
  }

  const main = async () => {
    let imageArray = await getImages()    
    await x(imageArray)
  }

  main()
  