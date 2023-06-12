const {Schema, model} = require('mongoose');
const mongoose = require('mongoose');



function dateFormat(timestamp) {
    return new Date(timestamp).toLocaleString();
  }

const milestoneSchema = Schema({
    _id: {
        type: Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId()
    },
    date: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        maxlength: 100,
        required: true
    },
    status: {
        type: String,
        required: true
    },
},
{
    toJSON: {
        virtuals: true,
        getters: true,
    },
    id: true,
});

const projectSchema = Schema({
    _id: {
        type: Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
    }, 
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
        required: true
      },
    ownerUsername: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        unique: false,
        required: true,
        trim: true,
        maxlength: 100
    },
    description:{
        type:String,
        maxlength: 500,
        required: true
    },
    fundingGoal:{
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true,
    },
    donations: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Donation'
        },
    ], 
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        },
    ],
    milestones: [milestoneSchema]
},
{
    toJSON: {
        virtuals: true,
        getters: true,
    },
    id: true,
});

projectSchema.virtual('donationCount').get(function() {
    var total = 0;
    if(this.donations.length !== 0){
        for (let i = 0; i< this.donations.length; i++){
            total = total + this.donations[i].amount
        };
    } ;
    return total;
});

const Project = model("Project", projectSchema);

module.exports = Project