# bookshelf
A google drive bookshelf.

# To run the project locally: #
Clone the repository and run
```
npm install
```

Then run the server using: 
```
npm start 
```
# Add your project settings: #
Create a file named 'app_settings.json' in your src folder with the following structure:
```
{
  "client_id": YOUR_GOOGLE_CLIENT_ID,
  "libraries": [   
    {
      "name": "drive",
      "version": "v2"
    }
  ],
  "scopes": [
    "https://www.googleapis.com/auth/drive",
    "profile"
  ],
  "drive_folder_id": "This field is optional add here the upload target id"
}
```
To get the google client id, check the first section in [this tutorial](https://bytutorial.com/tutorials/google-api/introduction-to-google-drive-api-using-javascript)
