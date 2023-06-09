const {Schema, model} = require('mongoose');

const userSchema = Schema({
    _id: {
        type: Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId()
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
      },
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        maxlength: 20
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/]
    },
    password: {
        type: String,
        required: true,
        unique: false,
        match: [/[A-Za-z\d]{8}/]
    },
    description:{
        type: String,
        maxlength: 100
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