const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000;
const dotenv = require('dotenv');
dotenv.config();  

//mongoose connection 
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser : true,
    useUnifiedTopology : true
});
mongoose.connection.on('connected',()=>{
    console.log('Connected to MongoDB')
})
mongoose.connection.on('error',(err)=>{
    console.log("Error connecting ", err)
})

const authRoute = require('./router/auth')

app.use(express.json());
app.use('/api/auth',authRoute)


app.listen(PORT,()=>{
    console.log("Server is running at ",PORT);
})
