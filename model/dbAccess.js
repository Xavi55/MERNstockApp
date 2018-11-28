const mongoose = require('mongoose');
const URI = 'mongodb://xavi55:abc123@ds141623.mlab.com:41623/stock-app';
mongoose.connect(URI, {useNewUrlParser:true})
.then(db => 
    {
        console.log('mongoDB OKAY')
    })
.catch(err =>
    {
        console.log('mongoDB err:',err);
    });
module.exports = mongoose;