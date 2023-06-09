const users = require('./userData');
const messages = require('./messageData');
const projects = require('./projectData');
const donations = require('./donationData');
const comments = require('./commentData');

const User = require('../models/User');
const Comment = require('../models/Comment');
const Donation = require('../models/Donation');
const Project = require('../models/Project');
const Message = require('../models/Message');
const connection = require ('../config/connection');


connection.dropDatabase('devbook', (err) => {
    if (err) console.log(err);
    console.log("Database dropped");
  });

connection.on('error', (error) => error);

connection.once('open', async () => {
    await User.deleteMany();
    await Comment.deleteMany();
    await Donation.deleteMany();
    await Project.deleteMany();
    await Message.deleteMany();

    await User.insertMany(users);
    await Comment.insertMany(comments);
    await Donation.insertMany(donations);
    await Project.insertMany(projects);
    await Message.insertMany(messages);
    console.log('***DATA SEEDED***');
    process.exit(0);
})