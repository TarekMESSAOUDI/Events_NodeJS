const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mydb', (err)=> {
    if(!err)
        console.log('Mongodb connection succeeded.');
    else
        console.log('Error in BD connection :' + JSON.stringify(err, undefined, 2));
});

module.exports = mongoose;