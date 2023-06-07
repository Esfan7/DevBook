const {Schema, model} = require('mongoose');

const donationSchema = Schema({
   amount: {
    type: Number
   },
    name:{
        type:String,
        maxlength: 20
    },
    comment:{
        type: String,
        maxlength: 40
    },
   project_id:{
        type: Schema.Types.ObjectId
    }
})

const Donation = model( "Donation", donationSchema);

module.exports = Donation