const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')



const Message = require('../models/Message')
const ObjectId = require('mongodb').ObjectId;

//api/users


router.get("/user/:id", async (req, res)=>{

  try{
      const result = await Message.find({
        receiver: req.params.id
      });
  
      res.json(result)

  } catch(err){
      console.log(err)
  }

})






router.post("/", async (req, res)=>{

  console.log(
    "create", req.body
  )



    try{
        const result = await Message.create({
            sender: req.body.sender,
            receiver: req.body.receiver,
            message:req.body.message,

        });
        res.json(result)

    } catch(err){
        console.log(err)
    }
})

//add milestone



  




module.exports = router;
