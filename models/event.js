const mongoose = require('mongoose');

var Event = mongoose.model('Event', {
    title: {type: String},
    description: {type: String},
    date: {type: Date},
    address: {type: String},
    image: {type: String}
});

module.exports = {Event};