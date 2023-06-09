const {Schema, model} = require('mongoose');





const projectSchema = Schema({
   title: {
    type: String
   },
    description:{
        type:String,
        maxlength: 300
    },
    fundingGoal:{
        type: Number
    },
    status: {
        type: String
    },
    user_id: {
        type: Schema.Types.ObjectId 
    }, 
    comments: {
        type: Array
    },
    milestones: {
        type: Array
    }


})

const Project = model("Project", projectSchema);

module.exports = Project