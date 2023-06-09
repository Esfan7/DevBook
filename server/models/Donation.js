const {Schema, model} = require('mongoose');

const donationSchema = Schema({
    _id: {
        type: Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId()
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
      },  
    amount: {
        type: Number,
        required: true
    },
    username:{
        type:String,
        maxlength: 20
    },
    comment:{
        type: String,
        maxlength: 40
    },
   projectId:{
        type: String,
        required: true
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