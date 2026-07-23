require('dotenv').config();
const app = require('./src/app');
const connectToDB = require('./src/config/database');
const invokeGeminiAi = require('./src/services/ai.service')

connectToDB();

app.listen(3000,()=>{
    console.log("Server begin..."); 
})

// server ko run krne se all config active krte hai