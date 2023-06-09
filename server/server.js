const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const projectRoutes = require("./routes/projectRoutes");
const donationRoutes = require("./routes/donationRoutes");
const profileRoutes = require("./routes/profileRoutes");
const db = require('./config/connection');
const { typeDefs, resolvers } = require('./schemas');
require('dotenv').config();

const PORT = process.env.PORT || 3001;
const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

app.use(express.json());
//translate body for post requests
app.use(express.urlencoded({ extended: true }));
app.use(cors())

//return all files in public folder
app.use(express.static('public'))

//declare a route
app.get('/', (req, res) => {
    res.sendFile(__dirname + 'client/public/index.html');
});

app.use("/api/project", projectRoutes)
app.use("/api/donate", donationRoutes)
app.use("/api/profile", profileRoutes)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async () => {
  await server.start();
  server.applyMiddleware({ app });
  
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    })
  })
  };
  
// Call the async function to start the server
  startApolloServer();
 