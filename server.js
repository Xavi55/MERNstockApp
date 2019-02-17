const morgan = require('morgan');
const express = require('express');
const sess = require('express-session');
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
app.use(sess({
    secret:'cookie_secret',
    resave:false,
    saveUninitialized:true
}));

//Serve these files for the view
app.use(express.static(path.join(__dirname,'view/build')));

/////////////    ROUTES    //////////////////
app.post('/login',async (req,res) =>
{
    if(req.session.name)
    {
        res.json({'pass':2,'session':req.session});
        //console.log('session already exists!',req.session);
    }
    else
    {
        let x = await User.find({"username":req.body.username,"password":req.body.password});
        if(Object.keys(x).length!=0)
        {
            req.session.name=x[0].username;
            req.session.userID=x[0].id
            //res.json({'pass':1,'username':x[0].username,'userID':x[0].id});
            res.json({'pass':1,'session':req.session})
            //make a session, send it back!
        }
        else
            res.json({'pass':0});
    }
});

app.get('/isSecure',(req,res)=>
{
    if(req.session.name)
    {
        res.json({'logged':1,'session':req.session});
    }
    else
    {
        res.json({'logged':0});
    }
})

app.get('/logout',async (req,res)=>
{
    req.session.destroy();
    res.json({'logout':1});
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