import express from 'express';
import mongoose from 'mongoose';
import Cors from 'cors';

import Cards from "./dbCards.js";
//import dbCards from './dbCards.js';
//App config
const app = express();
const port = process.env.PORT || 8001
const connection_url='mongodb+srv://admin:pEnqRvEKpdBkkGTO@cluster0.ta4yn.mongodb.net/tinderdb?retryWrites=true&w=majority';
//MiddleWares
app.use(express.json());
app.use(Cors());
//DB Config
mongoose.connect(connection_url,{
    useNewUrlParser:true,
    useCreateIndex: true,
    useUnifiedTopology: true,
})

//API EndPoints
app.get('/',(req,res)=>res.status(200).send('Hello Clever Programmers!!'));
app.post('/tinder/cards',(req,res)=>{
const dbcard=req.body;
Cards.create(dbcard,(err,data)=>{
    if(err){
        res.status(500).send(err);
    }
    else{
        res.status(201).send(data);
    }
});
});

app.get('/tinder/cards',(req,res)=>{
    Cards.find((err,data)=>{
        if(err){
            res.status(500).send(err);
        }
        else{
            res.status(200).send(data);
        }
    });
});

//Listener
app.listen(port,()=>console.log(`Listening on Localhost: ${port}`));