const {Schema, model} = require('mongoose');
const mongoose = require('mongoose');



function dateFormat(timestamp) {
    return new Date(timestamp).toLocaleString();
  }

const donationSchema = Schema({
    _id: {
        type: Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId()
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
        required: true
      },  
    amount: {
        type: Number,
        required: true
    },
    username:{
        type:String,
        maxlength: 100,
        required: true
    },
    comment:{
        type: String,
        maxlength: 500
    },
   projectId:{
        type: String,
        // required: true
    }
},
{
    toJSON: {
        virtuals: true,
        getters: true,
    },
    id: true,
});

const Donation = model( "Donation", donationSchema);

module.exports = Donation