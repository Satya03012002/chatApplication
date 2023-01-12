import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
// import { Server ,socket} from "socket.io";


dotenv.config({ silent: process.env.NODE_ENV === 'production' });

const app = express();

import { createServer } from "http";
const httpServer = createServer(app);

import { Server } from "socket.io";
const io = new Server(httpServer );



const PORT = process.env.PORT || 5000;
app.set('view engine', 'ejs');
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.render('index')
})
app.post('/name', (req, res) => {
    let username = req.body.name
   let comapnyname = req.body.name
    rres.redirect(`/name?username=${username}&roomname=${companyname}`)
})
app.get('/name', (req, res)=>{
    res.render('name')
})

app.listen(PORT,()=>{
    console.log(`server running successfully on PORT : ${PORT}`)
});