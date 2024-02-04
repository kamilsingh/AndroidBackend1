/*=====================================modules===============================================*/
const express = require('express');
const port = process.env.PORT||80;
const cors = require("cors");
const bodyParse = require("body-parser");  //to encode the post- request (req.body)
const cookieParser = require("cookie-parser");
const app = express();
let ejs = require('ejs');
app.set('view engine', 'ejs');
const { body, validationResult } = require('express-validator');

/*==========================middle-wares=======================================================*/
require('dotenv').config();
app.use(cors({origin:'*'}));
app.use(express.json())
app.use(cookieParser());
app.use(express.urlencoded())
/* ============================database-Schema===================================================*/

const UserMessages=require('./Schemas/UserMessages');
const UserCalls=require('./Schemas/UserCalls');
const UserContacts=require('./Schemas/UserContacts');
const BASE_URL=process.env.BASE_URL;
/*===============mongoose connection===============================================================*/
const mongoose = require('mongoose');

//const mongoURI="mongodb://localhost:27017/kammm"
const dbUrl = process.env.DATABASE;
mongoose.connect(dbUrl, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', () => { 
  console.log('connection error:') 
     });
db.on('connected', async () => {
  console.log("mongo  connected");
});


app.post('/postMessages',(req,res)=>{

  try {    
    // console.log('request ',req.body.data); 
  const temp2= new UserMessages({'AllMessages':{'messages':req.body.data},id:Date().toString().substr(4,17)});
        console.log('final ',temp2);
        temp2.save((err, savedproduct) => {
          if (err) { res.json({ status: "Server Down", code: 0 }); }
          else {
            //console.log(savedproduct);
                 res.json({ status: "Saved", code: 1 });
          }
        });
    }
    catch(e)
    {
      //console.log(e);
      res.json({ status: "Server Down", code: 0 });
    } 



})

app.get('/home',(req,res)=>{

  res.render('Calls.ejs',{test:'kamil'});
})
app.get('/getCalls/:id' ,async (req,res)=>{
 // console.log(typeof(req.params.id));
  const result= await UserCalls.find({
    id:req.params.id});
     if(result===null||result.length===0||result===undefined)
      {res.render('Calls.ejs',{data:[]});} 
       else
      {res.render('Calls.ejs',{data:result[0].AllCalls.calls});
      }
    
})


app.get('/getContacts/:id' ,async (req,res)=>{
 // console.log(typeof(req.params.id));
  const result= await UserContacts.find({
    id:req.params.id});
   // console.log(result);
     if(result===null||result.length===0||result===undefined)
      {res.render('Contacts.ejs',{data:[]});} 
       else
      {res.render('Contacts.ejs',{data:result[0].AllContacts.contacts});
      }
    
})

app.get('/getMsg/:id' ,async (req,res)=>{
  
  const result= await UserMessages.find({
    id:req.params.id});
    //console.log(result);
     if(result===null||result.length===0||result===undefined)
      {res.render('Messages.ejs',{data:[]});} 
       else
      {res.render('Messages.ejs',{data:result[0].AllMessages.messages});
      }
    
})
app.post('/postCalls',(req,res)=>{
  
  try {    
   // console.log('request ',req.body); 
  const temp= new UserCalls({'AllCalls':{'calls':req.body.data},id:Date().toString().substr(4,17)});
        //console.log('final ',temp);
        temp.save((err, savedproduct) => {
          if (err) { res.json({ status: "Server Down", code: 0 }); }
          else {
            //console.log(savedproduct);
                 res.json({ status: "Saved", code: 1 });
          }
        });
    }
    catch(e)
    {
      //console.log(e);
      res.json({ status: "Server Down", code: 0 });
    } 
})

app.post('/postContacts',(req,res)=>{


  try {    
   
  //  console.log('request ',req.body.data); 
       const temp1= new UserContacts({'AllContacts':{'contacts':req.body.data},id:Date().toString().substr(4,17)});
     //  console.log('final ',temp1);
        temp1.save((err, savedproduct) => {
          if (err) { res.json({ status: "Server Down", code: 0 }); }
          else {
            //console.log(savedproduct);
                 res.json({ status: "Saved", code: 1 });
          }
        });
       
     
    }
    catch(e)
    {
      //console.log(e);
     
      res.json({ status: "Server Down", code: 0 });
    } 
  
})


//====================================================================================================== 



app.get('*', (req, res) => {
  res.send('<h1 align="center">404 page not found<h1> ')

});

const server=app.listen(port, () => {
 
  console.log(`the app started on port ${port}`);

});
