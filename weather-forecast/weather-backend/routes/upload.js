const fs = require("fs");
const path = require("path");
const promisePipe = require("promisepipe");
const config = require('../config')
const {BACKEND_HOST,PORT} = config

module.exports = ({ uploadRouter }) => {
  uploadRouter.post('/', async (ctx, next) => {
    try {
      const uploadfile = ctx.request.files.file;

      const savefile = `${Date.now()}#${uploadfile.name}`;

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

      ctx.body = {
        message: "File Uploaded",
        url:`${BACKEND_HOST}:${PORT}/uploads/${savefile}`,
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