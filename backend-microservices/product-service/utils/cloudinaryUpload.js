const cloudinary=require('./cloudinary');
const streamifier=require('streamifier');

const uploadToCloudinary=async(files)=>{
    const uplodadPromises=files.map((file)=>{
        return new Promise((resolve,rejected)=>{
            const stream=cloudinary.uploader.upload_stream((error,result)=>{
                if(result) resolve(result);
                else rejected(error);
            })
            streamifier.createReadStream(file.buffer).pipe(stream);
        })
    })
    return Promise.all(uplodadPromises);
}
module.exports=uploadToCloudinary;