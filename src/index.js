const express = require("express");
const app = express();
const blogRouter = require("./routes/blogRoutes");
const userRouter = require("./routes/userRoutes");
const PORT = process.env.PORT || 5000; 
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config();
app.use(express.json());
app.use(cors());

app.use("/blog", blogRouter);
app.use("/users", userRouter);

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    app.listen(PORT, ()=>{
        console.log("Server started on port no. " + PORT);
    });
})
.catch((error)=>{
    console.log(error);
})


