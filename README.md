# NEXT AUTH


Auth process using next and nodejs api server with mongo

### USAGE

> cd root
> npm run start


### NOTE
1. The client is built using nextjs, and incorporates routing
2. The client has a set of APIs end points which are resolved at the server
3. On the server, JSON Web Tokens are used to authenticate. A JWT created by the user after signing up and logging in is passed to the client and maintained in local storage
4. Mongoose model incoporates SHA256 hashing and encryption for the password, which is captured in the mongo collection

#### RESEARCH

* docs
https://docs.microsoft.com/en-us/azure/cognitive-services/

* generate metadata for images
https://docs.microsoft.com/en-us/azure/cognitive-services/computer-vision/tutorials/storage-lab-tutorial

* custom vision
https://docs.microsoft.com/en-us/azure/cognitive-services/Custom-Vision-Service/overview

create a custom vision
https://docs.microsoft.com/en-us/learn/modules/classify-images-with-custom-vision-service/


api docs
https://westcentralus.dev.cognitive.microsoft.com/docs/services/computer-vision-v3-1-ga/operations/56f91f2e778daf14a499f21b


camera 
https://blog.logrocket.com/responsive-camera-component-react-hooks/

