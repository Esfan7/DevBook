const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')



const Profile = require('../models/User')
const ObjectId = require('mongodb').ObjectId;

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


  




module.exports = router;
