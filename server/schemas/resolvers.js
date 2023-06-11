const mongoose = require('mongoose');
const Users = require('../models/User');
const Messages = require('../models/Message');
const Projects = require('../models/Project');
const Donations = require('../models/Donation');
const Comments = require('../models/Comment');
const { ObjectId } = require('mongodb');


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
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await Users.create(args);
            return user
        },
        updateUser: async(parent, args) => {
            const id = args._id;
            delete args._id;
            const user = await Users.findOneAndUpdate({_id: id}, args, {new:true});
            return user;
        },
        deleteUser: async(parent, args) => {
            const user = await Users.findOneAndDelete({_id: args});
            return user;
        },
        addProject: async(parent, args) => {
            const project = await Projects.create(args);
            return project;
        },
        updateProject: async(parent, args) => {
            const id = args._id;
            delete args._id;
            const project = await Projects.findOneAndUpdate({_id: id}, args, {new: true});
            return project;
        },
        addMileStoneToProject: async (parent, args) => {
            const updatedProject = await Projects.findOneAndUpdate(
                { _id: args._id },
                { $push: { milestones: args.milestone } },
                { new: true}
            );
            return updatedProject;
        },
        deleteMileFromProject: async (parent, args) => {
            const updatedProject = await Projects.findOneAndUpdate(
                {_id: args.projectId},
                {$pull: {milestones: {_id: args.milestoneId}}},
                {new: true}
            );
            return updatedProject;
        },
        deleteProject: async(parent, args) => {
            const project = await Projects.findOneAndDelete({_id: args});
            return project;
        },
        addMessage: async(parent, args) => {
            const message = await Messages.create(args);
            return message;
        },
        deleteMessage: async(parent,args) => {
            const message = await Messages.findOneAndDelete({_id: args});
            return message;
        },
        addDonation: async(parent, args) => {
            const projectId = args.projectId;
            const donation = await Donations.create(args);
            const newDonationId = donation._id;
            const donationObj = new mongoose.Types.ObjectId(newDonationId)
            const project = await Projects.findOne({_id: projectId});
            const arr = project.donations;
            arr.push(donationObj);
            const update = await Projects.findOneAndUpdate({_id: projectId}, {donations: arr}, {new:true});
            return donation;
        },
        deleteDonation: async(parent, args) => {
            const donation = await Donations.findOneAndDelete({_id: args});
            const project = await Projects.findOne({_id: donation.projectId});
            const arr = project.donations;
            const index = arr.indexOf(args._id);
            arr.splice(index,1);
            const update = await Projects.findOneAndUpdate({_id: donation.projectId}, {donations: arr}, {new: true});

            return donation;
        },
        addComment: async(parent, args) => {
            const projectId = args.projectId;
            const comment = await Comments.create(args);
            const newCommentId = comment._id;
            const commentObj = new mongoose.Types.ObjectId(newCommentId)
            const project = await Projects.findOne({_id: projectId});
            const arr =  project.comments;
            arr.push(commentObj);
            const update = await Projects.findOneAndUpdate({_id: projectId}, {comments: arr}, {new:true});
            return comment;
        },
        deleteComment: async(parent, args) => {
            const comment = await Comments.findOneAndDelete({_id: args});
            const projectId = comment.projectId;
            const project = await Projects.findOne({_id: projectId});
            const arr = project.comments;
            const index = arr.indexOf(args._id);
            arr.splice(index,1);
            const update = await Projects.findOneAndUpdate({_id: projectId}, {comments: arr}, {new: true});
            return comment;
        }
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
