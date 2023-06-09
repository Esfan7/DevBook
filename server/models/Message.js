const { Schema, model } = require('mongoose');

function dateFormat(timestamp) {
    return new Date(timestamp).toLocaleString();
  }
const messageSchema = Schema({
    _id: {
        type: Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId()
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
      },
    sender:{
        type:String,
        maxlength: 20
    },
    receiver:{
        type: String,
        maxlength: 200
    },
    message:{
        type: String,
        required: true
    },
    hasBeenRead: {
        type: Boolean,
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

const Message = model( "Message", messageSchema);

module.exports = Message