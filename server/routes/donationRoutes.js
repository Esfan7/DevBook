const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')



const Project = require('../models/Project');
const Donation = require('../models/Donation');
const ObjectId = require('mongodb').ObjectId;

//get all donations
router.get("/", async (req, res)=>{

    try{
        const result = await Donation.find();
    
        res.json(result)

    } catch(err){
        console.log(err)
    }

})


router.get("/:id", async (req, res)=>{

  try{
      const result = await Donation.find({
        project_id: new ObjectId(req.params.id)
      });
  
      res.json(result)

  } catch(err){
      console.log(err)
  }

})




//create a donation
router.post("/", async (req, res)=>{

    try{
        const result = await Donation.create({
            amount: parseFloat(req.body.amount),
            name: req.body.name,
            comment: req.body.comment,
            project_id: req.body.project_id,
            
        });
        res.json(result)

    } catch(err){
        console.log(err)
    }
})


//update



//destroy{id:}
router.delete('/:id',async (req, res) => {


      //delete 
      try{
        const result = await Donation.deleteOne({
          _id: new ObjectId(req.params.id)
        });
        res.json(result);
    
      } catch (err){
        console.log(err)
      }
  

 });


  




module.exports = router;