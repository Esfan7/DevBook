const { Schema, model } = require('mongoose');

const commentSchema = Schema({
    _id: {
        type: Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId()
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
      },
    username:{
        type:String,
        maxlength: 20
    },
    comment:{
        type: String,
        maxlength: 200
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

const Comment = model( "Comment", donationSchema);

module.exports = Comment