const db = require('../db')
const { Room } = require('../db/models')

const controller = {};

controller.getRooms = async (req, res) => {
    try {
        let rooms = await Room.find();
        return res.send(rooms)
    } catch(e) {
        console.log(e);
        return res.status(500).send("Not found");
    }
}

controller.deleteRoom = async (req, res) => {
    try {
        var checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$")
        if(!checkForHexRegExp.test(req.params.element)) {
            return res.status(404).send("Invalid URL");
        }
        Room.findByIdAndDelete(req.params.element, function (e) {
          if (e) throw e; 
          res.send("Sucessfully deleted");
        });
    } catch(e) {
        console.log(e);
        return res.status(500).send("Not found");
    }
}

controller.editRoom = async (req, res) => {
    try {
        var checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$")
        if(!checkForHexRegExp.test(req.params.element)) {
            return res.status(404).send("Invalid URL");
        }
        let response = await Room.findByIdAndUpdate(req.params.element, req.body)
        return res.send("Sucessfully edited");
    } catch(e) {
        console.log(e);
        return res.status(500).send("Not found");
    }
}

controller.searchRoom = async (req, res) => {
    try {
        var checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$")
        if(!checkForHexRegExp.test(req.params.element)) {
            return res.status(404).send("Invalid URL");
        }
        const results = await Room.findById(req.params.element);
        return res.send(results)
    } catch(e) {
        console.log(e);
        return res.status(500).send("Not found");
    }
}

controller.addRoom = async (req, res) => {
    try {
        var room1 = new Room(req.body);
        await room1.save((e) => {
            if (e) throw err;
            return res.send("Sucessfully added")
        });
    } catch(e) {
        console.log(e);
        return res.status(500).send("Not found");
    }
}


module.exports = controller
