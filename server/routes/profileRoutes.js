const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')


const path = require('path');
const fs = require('fs');

const Profile = require('../models/User')
const ObjectId = require('mongodb').ObjectId;
const multer  = require('multer')


//api/users
router.get("/", async (req, res)=>{

    try{
        const result = await Profile.find();
    
        res.json(result)

    } catch(err){
        console.log(err)
    }

})

router.get("/:id", async (req, res)=>{

    try{
        const result = await Profile.findById(req.params.id);
    
        res.json(result)

    } catch(err){
        console.log(err)
    }

})




router.post("/", async (req, res)=>{

    try{
        const result = await Profile.create({
            picture: req.body.picture,
            name: req.body.name,
            description: req.body.description,
            

        });
        res.json(result)

    } catch(err){
        console.log(err)
    }
})


  







/////file upload /////////////////
///

//const upload = multer({ dest: 'uploads/' })
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("file coming:", file)
    //"user_id:" , req.body.user_id,
    const acceptTypes = ['image/jpeg',"image/png",'image/jpg']
    let error = null;
    if(!acceptTypes.includes(file.mimetype)){
      error = new Error('wrong file');
    }
    const dir = 'public/temp/' ;
    // if (!fs.existsSync(dir)){
    //   fs.mkdirSync(dir);
    // }
    cb(null, dir)
  },
  filename: function (req, file, cb) {
    //Date.now() +
    //path.extname(file.originalname)
    cb(null, Date.now() + path.extname(file.originalname))
  }
})
const upload = multer({ storage: storage });


router.post('/upload',  upload.single('uploaded_file') ,async (req, res) => {
  console.log("review===============")
  //console.log("header", req.headers );
  console.log("body", req.body );
  console.log("file", req.file );
  if(req.file){
    const newDir   = `public/uploads/${req.body.user_id}`;
    const newPath  = newDir + "/avatar.jpg"; //req.file.originalname;
    console.log(  newDir, newPath)
    fs.mkdir(newDir, ()=>{
      fs.copyFile( req.file.path, newPath, ()=>{
        //console.log("callback done",req.file.path)
        fs.unlink(req.file.path, ()=>{
          //console.log("done removed")
        })
      })
    })
  } else {
  }
  const response =  await Profile.findByIdAndUpdate(req.body.user_id, {
          picture: "avatar.jpg"
      }
  );
  //console.log("profile pic?", response)
  res.json({
    user_id: req.body.user_id,
    file: "avatar.jpg" //newPath.substring(newPath.indexOf('/') + 1) //remove public /public/
  });
});


module.exports = router;












