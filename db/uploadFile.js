let cloudinary = require("cloudinary").v2;


cloudinary.config({
    cloud_name: "dkttqdmya",
    api_key: "662198836844724",
    api_secret: "t0X_fh25INGB0N-hr5Ty79OA--o"
});

const opts = {
    overwrite: true,
    invalidate: true,
    resource_type: "auto"
};
module.exports = (image) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(image, opts, (error, result) => {
            if (result && result.secure_url) {
                console.log(result.secure_url);
                return resolve(result.secure_url);
            }
            console.log(error.message);
            return reject({ message: error.message })
        })
    })
}
