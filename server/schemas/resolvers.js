const Users = require('../models/User');
const Messages = require('../models/Message');
const Projects = require('../models/Project');
const Donations = require('../models/Donation');
const Comments = require('../models/Comment');

const resolvers = {
    Query: {
        projects: async () => {
            const projects = await Projects.find()
            .populate({path: 'comments'})
            .populate({path: 'donations'});
            return projects;
        },
        
        project: async (parent, { _id }) => {
            const project = await Projects.findOne({_id: _id})
            .populate({path: 'comments'})
            .populate({path: 'donations'});
            return project;
        },
        donations: async () => {
            const donations = await Donations.find();
            return donations;
        },
        
        donation: async (parent, { _id }) => {
            const donation = await Donations.findOne({_id: _id});
            return donation;
        },
        comments: async () => {
            const comments = await Comments.find()
            return comments;
        },
        
        comment: async (parent, { _id }) => {
            const comment = await Comments.findOne({_id: _id})
            return comment;
        },
        users: async () => {
            const users = await Users.find()
            return users;
        },
        
        user: async (parent, { _id }) => {
            const user = await Users.findOne({_id: _id})
            return user;
        },
        messages: async () => {
            const messages = await Messages.find()
            return messages;
        },
        messagesSent: async (parent, { sender }) => {
            const messages = await Messages.find({sender: sender});
            return messages;
        },
        messagesReceived: async (parent, { receiver, hasBeenRead }) => {
            const messages = await Messages.find({receiver: receiver, hasBeenRead: hasBeenRead});
            return messages;
        },
        message: async (parent, { _id }) => {
            const message = await Messages.findOne({_id: _id})
            return message;
        },
    }
};
// const resolvers = {
//   Query: {
//     tech: async () => {
//       return Tech.find({});
//     },
//     matchups: async (parent, { _id }) => {
//       const params = _id ? { _id } : {};
//       return Matchup.find(params);
//     },
//   },
//   Mutation: {
//     createMatchup: async (parent, args) => {
//       const matchup = await Matchup.create(args);
//       return matchup;
//     },
//     createVote: async (parent, { _id, techNum }) => {
//       const vote = await Matchup.findOneAndUpdate(
//         { _id },
//         { $inc: { [`tech${techNum}_votes`]: 1 } },
//         { new: true }
//       );
//       return vote;
//     },
//   },
// };

module.exports = resolvers;
