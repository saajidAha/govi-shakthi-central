// Server Code Starts here
import express from 'express';
import * as dotenv from 'dotenv';

dotenv.config();
const apiKey = process.env.API_KEY; // store your API Key in a .env file in this format: " API_KEY= "ENTER YOUR KEY HERE" "

let app = express();
const port: number = 7000;

app.get("/", (req, res) => {
    res.send("Connection established to the Node.JS backend Successfully");
})

// listen for http requests
app.listen(port, ()=> {
    console.log(`Server listening on port ${port}`);
})