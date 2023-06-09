const {Schema, model} = require('mongoose');

const profileSchema = Schema({
   picture: {
    type: String
   },
    name:{
        type:String,
        maxlength: 20
    },
    description:{
        type: String,
        maxlength: 100
    }
 
})

const Profile = model( "Profile", profileSchema);

module.exports = Profile