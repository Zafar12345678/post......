const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require("cors");

mongoose.connect("mongodb+srv://merningday123:merningday123@cluster0.6llqgoh.mongodb.net/software?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
app.use(cors());
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
    console.log('Connected to MongoDB');
});

// Register user routes
const user_route = require("./routes/userRoute");
app.use("/api", user_route);

app.listen(8000, function() {
    console.log("Server is ready");
});
