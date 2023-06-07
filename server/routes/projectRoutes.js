const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')



const Project = require('../models/Project')
const ObjectId = require('mongodb').ObjectId;

//api/users
router.get("/", async (req, res)=>{

    try{
        const result = await Project.find();
    
        res.json(result)

    } catch(err){
        console.log(err)
    }

})




router.post("/", async (req, res)=>{

    try{
        const result = await Project.create({
            title: req.body.title,
            description: req.body.description,
            goal: parseFloat(req.body.goal),
            picture: req.body.picture,
            completion: req.body.completion,
        });
        res.json(result)

    } catch(err){
        console.log(err)
    }
})


//User.update
router.put('/:id', async (req, res) => {
   
    try{
      const result = await Project.findByIdAndUpdate(req.params.id,{
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



//User.destroy{id:}
router.delete('/:id',async (req, res) => {


      //delete thought
      try{
        const result = await Project.deleteOne({
          _id: new ObjectId(req.params.id)
        });
        res.json(result);
    
      } catch (err){
        console.log(err)
      }
  




 });


  




module.exports = router;
