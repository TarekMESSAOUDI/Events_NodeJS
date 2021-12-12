const express = require('express');
var router = express.Router();
const multer = require('multer');


var ObjectId = require('mongoose').Types.ObjectId;

var { Event } = require('../models/event');

// => localhost:3000/events/
router.get('/', (req, res) => {
    Event.find((err, docs) => {
        if(!err){res.send(docs);}
        else {console.log('Error in Retriving Event :' + JSON.stringify(err, undefined, 2));}
    });
});

// => localhost:3000/events/id
router.get('/:id', (req, res) =>{
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Event.findById(req.params.id, (err, doc) => {
        if(!err) {res.send(doc);}
        else {console.log('Error in Retriving Event :' + JSON.stringify(err, undefined, 2));}
    });
});

// => localhost:3000/events/
router.post('/', (req, res) => {
    var event = new Event({
        title: req.body.title,
        description: req.body.description,
        date: req.body.date,
        address: req.body.address,
        image: req.body.image,
    });
    event.save((err, docs) => {
        if(!err) {res.send(docs);}
        else { console.log('Error saving Event :' + JSON.stringify(err, undefined, 2));}
    });
});

// => localhost:3000/events/id
router.put('/:id', (req, res) => {
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    var event = {
        title: req.body.title,
        description: req.body.description,
        date: req.body.date,
        address: req.body.address,
        image: req.body.image,
    };
    Event.findByIdAndUpdate(req.params.id, {$set: event}, {new: true}, (err, doc) => {
        if (!err) {res.send(doc);}
        else {console.log('Error in Event Update :' + JSON.stringify(err, undefined, 2));}
    });
});

router.delete('/:id', (req, res) => {
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);
    
    Event.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {res.send(doc);}
        else {console.log('Error in Event Delete :' + JSON.stringify(err, undefined, 2));}
    });
});

module.exports = router;