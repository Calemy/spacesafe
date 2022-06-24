const { name, url } = require('../config')
module.exports = {
  "Version": "13.7.0",
  "Name": `${name}`,
  "DestinationType": "ImageUploader, FileUploader",
  "RequestMethod": "POST",
  "RequestURL": `${url}/api/upload`,
  "Headers": {
    "key": "undefined"
  },
  "Body": "MultipartFormData",
  "FileFormName": "file",
  "URL": "$json:url$",
  "ErrorMessage": "$json:error$"
}