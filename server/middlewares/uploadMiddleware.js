import multer from "multer";
import path from "path";
import fs from "fs";


if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // temporary local folder
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Image Filter
const fileFilter = (req,file,cb)=>{
    const allowedImageTypes = ["image/jpeg","image/png","image/webp","image/avif","image/jpg"];
    if(allowedImageTypes.includes(file.mimetype)){
        cb(null,true);
    }else{
        cb(new Error("Only Jpeg, Png, Webp, Avif and Jpg images are allowed"));
    }
};

const upload = multer({
    storage,
    fileFilter
})

export default upload;