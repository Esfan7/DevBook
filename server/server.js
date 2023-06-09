const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const PORT = 3001;
const mongoose = require('mongoose');
const projectRoutes = require("./routes/projectRoutes");
const donationRoutes = require("./routes/donationRoutes");
const profileRoutes = require("./routes/profileRoutes");

require('dotenv').config();

app.use(express.json());
//translate body for post requests
app.use(express.urlencoded({ extended: true }));
app.use(cors())

//return all files in public folder
app.use(express.static('public'))



async function main(){
    await mongoose.connect(process.env.MONGO_CONNECT)
}

main().catch(err=> console.log(err))


//declare a route
app.get('/', (req, res) => {
    res.sendFile(__dirname + 'client/public/index.html');
});


app.use("/api/project", projectRoutes)
app.use("/api/donate", donationRoutes)
app.use("/api/profile", profileRoutes)









const listener = app.listen(process.env.PORT || PORT, () => {
    console.log('Server started at http://localhost:' + listener.address().port);
})