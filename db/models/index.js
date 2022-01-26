var mongoose = require('mongoose')
var crypto = require('crypto');

// ROOM
var RoomSchema = mongoose.Schema({
    name: String,
    type: String,
    price: Number,
    priceOffer: Number,
    offer: Boolean,
    number: Number,
    facilities: String,
    status: String,
    images: [String],
    cancellation: String,
    relatedRooms: [Number],
});
var Room = mongoose.model('Room', RoomSchema, 'rooms');

// Booking
var BookingSchema = mongoose.Schema({
    guestId: String,
    roomId: String,
    checkIn: Date,
    checkOut: Date,
    specialRequest: String,
    status: String,
    price: Number, 
    orderDate: Date,
})
var Booking = mongoose.model('Booking', BookingSchema, 'bookings');

// Guest 
var GuestSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    phone: Number,
    creationDate: Date,
});
var Guest = mongoose.model('Guest', GuestSchema, 'guests');

// Contact
var ContactSchema = mongoose.Schema({
    subject: String,
    message: String,
    fullName: String,
    email: String,
    phone: Number,
    status: String,
    contactDate: Date,
});
var Contact = mongoose.model('Contact', ContactSchema, 'contacts');

// User
var UserSchema = mongoose.Schema({
  name: String,
  email: String,
  startDate: Date,
  endDate: Date,
  description: String,
  phone: Number,
  status: String,
  job: String,
  image: String,
  hash: String,
  salt: String,
});

UserSchema.methods.setPassword = function(password){
     // Creating a unique salt for a particular user
    this.salt = crypto.randomBytes(16).toString('hex');
  
    // Hashing user's salt and password with 1000 iterations, 64 length and sha512 digest
    this.hash = crypto.pbkdf2Sync(password, this.salt, 
    1000, 64, `sha512`).toString(`hex`);
}

// It takes the user password from the request 
// and salt from user database entry
// It then hashes user password and salt
// then checks if this generated hash is equal
// to user's hash in the database or not
UserSchema.methods.validPassword = function(password) {
    var hash = crypto.pbkdf2Sync(password, 
    this.salt, 1000, 64, `sha512`).toString(`hex`);
    return this.hash === hash;
};
var User = mongoose.model('User', UserSchema, 'users');

module.exports = {Room, User, Booking, Guest, Contact};
