const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const PORT = 3001;
const mongoose = require('mongoose');
const projectRoutes = require("./routes/projectRoutes")
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

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
app.use('/api/project', authenticateToken, projectRoutes);

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
  

app.use(express.json());
//translate body for post requests
app.use(express.urlencoded({ extended: true }));
app.use(cors())

//return all files in public folder
app.use(express.static('public'))



async function main(){
    await mongoose.connect('mongodb+srv://eafanbeh:Gencoupe20t@cluster0.s9qly3h.mongodb.net/?retryWrites=true&w=majority')
}

main().catch(err=> console.log(err))


//declare a route
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});


app.use("/api/project", projectRoutes)






//virtual friend count
//virutal raeciont count




const listener = app.listen(process.env.PORT || PORT, () => {
    console.log('Server started at http://localhost:' + listener.address().port);
})