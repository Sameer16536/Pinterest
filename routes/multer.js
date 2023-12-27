const multer = require('multer');
const {v4:uuidv4} = require('uuid');
const path = require('path')

// console.log(path.extname('__filename__.pdf'))

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./public/images/uploads')//Destination folder for uploads
    },
    filename:(req,file,cb)=>{
        const uniquefilename = uuidv4();//Generating Unique filename using UUID
        cb(null,uniquefilename + path.extname(file.originalname)); //Use the Unique filename for uploaded file
    }
});
// //Different Storage for Profile Pic
// const storage1 = multer.diskStorage({
//     destination:(req,file,cb)=>{
//         cb(null,'./public/images/profile_pic')//Destination folder for uploads
//     },
//     filename:(req,file,cb)=>{
//         const uniquefilename = uuidv4();//Generating Unique filename using UUID
//         cb(null,uniquefilename + path.extname(file.originalname)); //Use the Unique filename for uploaded file
//     }
// });

const upload = multer({storage:storage});
module.exports = upload;