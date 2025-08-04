import cloudinary from "../libs/cloudinary.js";
import User from "../models/user.js";
import stream from "stream"

const handlePhotoUpdate = async (req, res)=>{

  console.log("hitted")
    try {
    function getPublicId(url) {
      const parts = url.split('/');
      const file = parts.pop().split('.')[0];
      const folder = parts.slice(6).join('/');
      return `${folder}/${file}`;
    }

    const id = req.params.id
    const url = req.query.url;
   const imageBuffer = req.file?.buffer;
    console.log(id, url, imageBuffer) 

    if (url) {
      const publicId = getPublicId(url);
      await cloudinary.uploader.destroy(publicId);
    }

    // Step 2: Upload the new photo to Cloudinary
    const result = await cloudinary.uploader.upload_stream(
      { folder: "profile-pictures" },
      async (error, result) => {
        if (error) {
          console.error("Error uploading to Cloudinary:", error);
          return res.status(500).json({ success: false, error: error.message });
        }

        await User.findByIdAndUpdate(id, { photo: result.secure_url });

        return res.status(200).json({ success: true, image: result.secure_url });
      }
    );

    const bufferStream = new stream.PassThrough();
    bufferStream.end(imageBuffer);
    bufferStream.pipe(result);

  } catch (error) {
    console.error("Photo update failed:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
}

export default handlePhotoUpdate