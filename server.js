const morgan = require('morgan');
const express = require('express');
const path = require('path');
const app = express();

const TIK = require('./stock.js')

//Settings
const PORT = process.env.PORT || 5000;

//DB
const db = require('./model/dbAccess');
const User = require('./model/User');
const Stock = require('./model/Stock'); 

//Middleware
app.use(morgan('dev'));
app.use(express.json());

//Serve these files for the view
app.use(express.static(path.join(__dirname,'view/build')));

/////////////    ROUTES    //////////////////
app.get('/login',async (req,res) =>
{
    res.json('/login');
});

app.post('/signup',async (req,res)=>
{
    await User.create({
        username:req.body.username,
        password:req.body.password
    });
    res.json(`User:${req.body.username} was saved`);
});

app.post('/addStock',async (req,res) =>
{
    await Stock.create({
        userID:req.body.userID,
        stock:req.body.stock
    });
    res.json(`stock added to user:${req.body.userID}`);
});

app.get('/stocks/:userID',async (req,res)=> //get all stocks from a user
{
    let x = await Stock.find({"userID":req.params.userID});
    res.json({"data":x});
});

app.delete('/delStock/:userID/:stock',async (req,res) =>
{
    await Stock.findOneAndDelete({"userID":req.params.userID,"stock":req.params.stock});
    res.json(`${req.params.stock} was deleted from user:${req.params.userID}`);
});
/////////////////////////////////////////////
app.listen(PORT,()=>
{
    console.log('Working on port',PORT);
});