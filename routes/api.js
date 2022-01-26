var express = require('express');
var router = express.Router();
var passport = require('passport')

const bookingController  = require('../controllers/bookings.controller')
const contactController  = require('../controllers/contact.controller')
const guestsController  = require('../controllers/guests.controller')
const roomsController  = require('../controllers/rooms.controller')
const usersController  = require('../controllers/users.controller')
const loginController  = require('../controllers/login.controller')

router.post('/login', loginController.login); 
router.post('/signup', passport.authenticate('jwt'), loginController.signUp); 
// router.post('/signup', loginController.signUp); 

router.get('/bookings', passport.authenticate('jwt'), bookingController.getBookings); 
router.get('/bookings/:element', passport.authenticate('jwt'), bookingController.searchBooking);
router.put('/bookings/:element', passport.authenticate('jwt'), bookingController.editBooking);
router.post('/bookings/', passport.authenticate("jwt"), bookingController.addBooking); 
router.delete('/bookings/:element', passport.authenticate("jwt"), bookingController.deleteBooking); 

router.get('/contact', passport.authenticate('jwt'), contactController.getContact); 
router.get('/contact/:element/', passport.authenticate('jwt'), contactController.searchContact);
router.put('/contact/:element', passport.authenticate('jwt'), contactController.editContact);
router.post('/contact/', passport.authenticate('jwt'), contactController.addContact); 
router.delete('/contact/:element', passport.authenticate("jwt"), contactController.deleteContact); 

router.get('/guests', passport.authenticate('jwt'), guestsController.getGuests); 
router.get('/guests/:element', passport.authenticate('jwt'), guestsController.searchGuest);
router.put('/guests/:element', passport.authenticate('jwt'), guestsController.editGuest);
router.post('/guests/', passport.authenticate('jwt'), guestsController.addGuest); 
router.delete('/guests/:element', passport.authenticate("jwt"), guestsController.deleteGuest); 

router.get('/rooms', passport.authenticate('jwt'), roomsController.getRooms); 
router.get('/rooms/:element/', passport.authenticate('jwt'), roomsController.searchRoom);
router.put('/rooms/:element', passport.authenticate('jwt'), roomsController.editRoom);
router.post('/rooms/', passport.authenticate('jwt'), roomsController.addRoom); 
router.delete('/rooms/:element', passport.authenticate("jwt"), roomsController.deleteRoom); 

router.get('/users', passport.authenticate('jwt'), usersController.getUsers); 
router.get('/users/:element/', passport.authenticate('jwt'), usersController.searchUser);
router.put('/users/:element', passport.authenticate('jwt'), usersController.editUser);
router.delete('/users/:element', passport.authenticate("jwt"), usersController.deleteUser); 

module.exports = router;
