var express = require('express');
var router = express.Router();
var db = require('../db');
const {User, Room} = require('../db/models');

router.get('/', (req, res) => {
  res.render('pages/index');
});

router.get('/rooms', (req, res) =>{
    Room.find((e, results)=>{
       if(e) console.log(e);
       return res.render('pages/rooms', {rooms: results});
    })
})

router.get('/about', (req, res) => {
    return res.render('pages/about')
})

router.get('/offers', (req, res) => {
    Room.find({offer: true},(e, results)=>{
       if(e) console.log(e);
       return res.render('pages/offers', {rooms: results});
    })
})

router.get('/room/:element', (req, res) => {
    Room.findById(req.params.element, (e, results) => {
       if (e) console.log(e);
       return res.render('pages/roomDetails', {room: results});
    }) 
})

router.get('/news', (req, res) => {
    return res.render('pages/news')
})

router.get('/contact', (req, res) => {
    return res.render('pages/contact')
})

module.exports = router;
