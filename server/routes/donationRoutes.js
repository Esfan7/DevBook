const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')



const Project = require('../models/Project');
const Donation = require('../models/Donation');
const ObjectId = require('mongodb').ObjectId;

//api/users
router.get("/", async (req, res)=>{

    try{
        const result = await Donation.find();
    
        res.json(result)

    } catch(err){
        console.log(err)
    }

})




router.post("/", async (req, res)=>{

    try{
        const result = await Donation.create({
            amount: req.body.amount,
            name: req.body.name,
            comment: parseFloat(req.body.goal),
            project_id: req.body.picture,
            
        });
        res.json(result)

    } catch(err){
        console.log(err)
    }
})


//update
router.put('/:id', async (req, res) => {
   
    try{
      const result = await Donation.findByIdAndUpdate(req.params.id,{
            title: req.body.title,
            description: req.body.description,
            goal: parseFloat(req.body.goal),
            picture: req.body.picture,
            completion: req.body.completion,

      });

      res.json(result);
  
    } catch (err){
      console.log(err)
    }
  
  });



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