const morgan = require('morgan');
const express = require('express');
const path = require('path');
const app = express();

//Settings
const PORT = process.env.PORT || 5000;
    //DB


//Middleware
app.use(morgan('dev'));
app.use(express.json());


//Serve these files for the frontEnd
app.use(express.static(path.join(__dirname,'view/build')));

/////////////    ROUTES    //////////////////
app.get('/login',(req,res) =>
{
    //res.sendFile(path.join(__dirname+'/view/build/index.html'));
    //res.json(data);
    res.json('LOGIN PAGE');
});
/////////////////////////////////////////////
app.listen(PORT,()=>
{
    console.log('Working on port',PORT);
});