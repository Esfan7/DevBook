const {Schema, model} = require('mongoose');
const mongoose = require('mongoose');

function dateFormat(timestamp) {
    return new Date(timestamp).toLocaleString();
  }

const userSchema = Schema({
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
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        maxlength: 100
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/]
    },
    // password: {
    //     type: String,
    //     required: true,
    //     unique: false,
    //     match: [/[A-Za-z\d]{8}/]
    // },
    description:{
        type: String,
        maxlength: 500
    },
    picture: {
        type: String
    },
},
{
    toJSON: {
        virtuals: true,
        getters: true,
        },
    id: false,
});

const User = model( "User", userSchema);

module.exports = User