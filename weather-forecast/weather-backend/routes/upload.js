const fs = require("fs");
const path = require("path");
const promisePipe = require("promisepipe");
const config = require('../config')
const joi = require('joi')
const validate = require('koa-joi-validate')
const {BACKEND_URL} = config
const models = require('../dbSequelize/models/index.js')

async function insertURL(url) {
  try {
    models.user.create({
      avatar:url
    })
  } catch (error) {
    console.log(error)
  }
  
}

module.exports = ({ uploadRouter }) => {

  const uploadValidator = validate({
    files: {
      file: joi.binary().required()
    }
  })
  uploadRouter.post('/', uploadValidator, async (ctx, next) => {
    try {
      const uploadfile = ctx.request.files.file;

      const savefile = `${Date.now()}_${uploadfile.name}`;

      const readStream = fs.createReadStream(uploadfile.path);

      const imgPath = path.join("public/avatars", savefile);

      const writeStream = fs.createWriteStream(imgPath);

      await promisePipe(
        readStream.on("error", (err) => {
          console.log(err)
        }),
        writeStream.on("error", (err) => {
          console.log(err)
        })
      );
      const url = `${BACKEND_URL}/avatars/${savefile}`;
      await insertURL(url)
      ctx.body = {
        code: 200,
        message: "File Uploaded",
        url
      };
    } catch (error) {
      console.log(error);
      ctx.body = {
        message: "There was an error",
        errors: error
      };
    }
  })
}