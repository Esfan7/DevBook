const { Schema, model } = require('mongoose');
const mongoose = require('mongoose');



function dateFormat(timestamp) {
    return new Date(timestamp).toLocaleString();
  }

const commentSchema = Schema({
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
    username:{
        type:String,
        maxlength: 100,
        required: true
    },
    comment:{
        type: String,
        maxlength: 500,
        required: true
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

const Comment = model( "Comment", commentSchema);

module.exports = Comment