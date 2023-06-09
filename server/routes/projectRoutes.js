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

router.get("/user/:id", async (req, res)=>{

  try{
      const result = await Project.find({
        ownerUsername: req.params.id
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

    //sessions 
    req.session = "64835f209a40a53888f2b415";

    try{
        const result = await Project.create({
            title: req.body.title,
            description: req.body.description,
            fundingGoal: parseFloat(req.body.fundingGoal),
            ownerUsername: 'MyUser',
            status: "pending",
            user_id: new ObjectId(req.session)
        });
        res.json(result)

    } catch(err){
        console.log(err)
    }
})

//add milestone

router.put("/:id/milestone", async (req, res)=>{

  try{
   
      const result = await Project.findByIdAndUpdate(req.params.id, {
         $push: {milestones: {
          date: req.body.date,
          description: req.body.description,
          status: req.body.status,
         }}
      });
      res.json(result)

  } catch(err){
      console.log(err)
  }
})


//add comments
router.put("/:id/comment", async (req, res)=>{

  try{

      const result = await Project.findByIdAndUpdate(req.params.id, {
         $push: {comments: {
          timestamp: req.body.timestamp,
          username: req.body.username,
          content: req.body.content,
         }}
      });
      res.json(result)

  } catch(err){
      console.log(err)
  }
})


//update
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



//destroy{id:}
router.delete('/:id',async (req, res) => {


      //delete 
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
