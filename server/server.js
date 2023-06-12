const express = require('express');
const { ApolloServer } = require('apollo-server-express');

const path = require('path');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const projectRoutes = require("./routes/projectRoutes")
const donationRoutes = require("./routes/donationRoutes");
const profileRoutes = require("./routes/profileRoutes");
const messageRoutes = require("./routes/messageRoutes");

const db = require('./config/connection');
const { typeDefs, resolvers } = require('./schemas');
const PORT = process.env.PORT || 3001;
const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
// const { graphqlHTTP } = require('express-graphql');
// const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLList } = require('graphql');

require('dotenv').config();

app.use(express.json());
//translate body for post requests
app.use(express.urlencoded({ extended: true }));
app.use(cors())

//return all files in public folder
app.use(express.static('public'))


/*
const User = require('./models/User');

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: {
      id: { type: GraphQLString },
      name: { type: GraphQLString },
      // ... add other fields as needed
    },
  });

  const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
      name: 'Query',
      fields: {
        searchUsers: {
          type: new GraphQLList(UserType),
          args: {
            keyword: { type: GraphQLString },
          },
          resolve: async (parent, args) => {
            // Perform the search in MongoDB based on the provided keyword
            const users = await User.find({ name: { $regex: args.keyword, $options: 'i' } });
            return users;
          },
        },
      },
    }),
  });

  */
  app.post('/api/signup', async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Check if the user already exists
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(409).json({ message: 'Username already exists' });
      }
  
      // Create a new user
      const newUser = new User({
        username,
        password: await bcrypt.hash(password, 10) // Hash the password
      });
      await newUser.save();
  
      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred' });
    }
  });


app.post('/api/login', async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Find the user in the database
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }
  
      // Compare the provided password with the hashed password in the database
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }
  
      // Generate a JWT
      const token = jwt.sign({ userId: user._id }, 'your-secret-key');
  
      // Send the token as the response
      res.json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred' });
    }
  });

  // Require authentication for protected routes
app.use('/api/project', projectRoutes);
// authenticateToken
function authenticateToken(req, res, next) {
  

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
  
    jwt.verify(token, 'your-secret-key', (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid token' });
      }
  
      req.user = user;
      next();
    });
  }
  


/*
app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true, // Enables the GraphiQL interface for testing
  }));
*/
async function main(){
    await mongoose.connect(process.env.MONGO_CONNECT)
}

main().catch(err=> console.log(err))


//declare a route
// app.get('/', (req, res) => {
//     res.sendFile(__dirname + 'client/public/index.html');
// });

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.use("/api/project", projectRoutes)
app.use("/api/donate", donationRoutes)
app.use("/api/profile", profileRoutes)
app.use("/api/message", messageRoutes)

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
 