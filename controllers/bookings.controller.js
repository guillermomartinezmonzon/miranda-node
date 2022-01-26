const {Booking} = require('../db/models')
const controller = {};

controller.getBookings = async (req, res) => {
    try {
        let bookings = await Booking.find();
        return res.send(bookings)
    } catch(e) {
        console.log(e);
        return res.status(500).send("Not found");
    }
}

controller.deleteBooking = async (req, res) => {
    try {
        await Booking.findByIdAndDelete(req.params.element)
        return res.send("Sucessfully deleted")
    } catch(e) {
        console.log(e);
        return res.status(500).send("Not found");
    }
}

controller.editBooking = async (req, res) => {
    try {
      let response = await Booking.findByIdAndUpdate( req.params.element, req.body, (e) => {
          if (e) throw e;
      }).clone();
      return res.send("Sucessfully Edited")
    } catch(e) {
        console.log(e);
        return res.status(500).send("Not found");
    }
}

controller.searchBooking = async (req, res) => {
    try {
        let response = await Booking.findById(req.params.element, (e) =>{
            if (e) throw e;
        }).clone();
        return res.send(response)
    } catch(e) {
        console.log(e);
        return res.status(500).send("Not found");
    }
}

controller.addBooking = async (req, res) => {
    try {
        let booking1 = new Booking(req.body);
        booking1.orderDate = new Date();
        await booking1.save(function (err, booking){
            if (err) return err;
            return res.send("Sucessfully added");
        })
    } catch(e) {
        console.log(e);
        return res.status(500).send("Not found");
    }
}

module.exports = controller
