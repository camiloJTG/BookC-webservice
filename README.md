# BookC-webservice

###### Command for developer in package.json 
```
- dev = run server in port 3000. Use for development environment 
- build = generate dist folder with older js syntax using babel 
- start = run server in port 3000 and use the dist folder to work
```
###### Environment Variable
```
In this project have been used 16 environment variable that for security reasons, will not be 
recorded here xD
```
###### Babel
```
Babel technology is implemented to use ES6 or higher syntax
```
###### API Documentation
```
https://app.swaggerhub.com/apis-docs/camilo_JTG/BookC/1.0.0
```
###### URL api server
```
https://bookc-webservice.herokuapp.com/
```

# How use ?
1. If you don't have an account created in the app. You will have to create one by asking the api POST users.
```
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

2. Once you have an account, you must consult the POST AUTH endpoint so that the api responds with a token that will be used 
to consult the other methods, always using the token provided.
```
{
  "email": "string",
  "password": "string"
}
```
3. View the api documentation for more information

# Important !
```
If you try to run the web service locally, it probably won't work. 
This is because you don't have the environment variables data. 
If you want to test the API, I recommend you to use the URL where it is hosted.
https://bookc-webservice.herokuapp.com/
```

# Tools Implements
```
- bcrypt to encrypt password
- cloudinary to store the images
- cors to  providing a Connect/Express 
- doenv to manage the environmental variables
- express to make my job easier :D
- firebase-admin to store the data (firestore module)
- fs-extra to manage the local files
- jsonwebtoken to generate token and apply security to my api
- multer to upload file
- uuid to generate id
```
