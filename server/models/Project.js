const {Schema, model} = require('mongoose');

const projectSchema = Schema({
   title: {
    type: String
   },
    description:{
        type:String,
        maxlength: 100
    },
    goal:{
        type: Number
    },
    picture:{
        type: String
    },
    completion:{
        type: String
    }

})

const Project = model("Project", projectSchema);

module.exports = Project