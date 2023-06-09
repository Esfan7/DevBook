const {Schema, model} = require('mongoose');

const milestoneSchema = Schema({
    _id: {
        type: Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId()
    },
    date: {
        type: Date
    },
    description: {
        type: String,
        maxlength: 100
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
      },
    ownerUsername: {
        type: String,
        required: true,
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
        maxlength: 300
    },
    fundingGoal:{
        type: Number
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

projectSchema.virtual('donationCount').get(() => {
    const total = 0;
    for (i = 0; i< this.donations.length; i++){
        total = total + this.donations[i].amount
    };
    return total;
});

const Project = model("Project", projectSchema);

module.exports = Project