const { Guest } = require('../db/models');
const controller = {};

controller.getGuests = async (req, res) => {
    try {
        const results = await Guest.find();
        return res.send(results)
    } catch(e) {
        return res.status(404).send(e);
    }
}

controller.deleteGuest = async (req, res) => {
    try {
        var checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$")
        if(!checkForHexRegExp.test(req.params.element)) {
            return res.status(404).send("Invalid URL");
        }
        const results = await Guest.findByIdAndDelete(req.params.element); 
        return res.send("Sucessfully deleted")
    } catch(e) {
        return res.status(404).send(e);
    }
}

controller.editGuest = async (req, res) => {
    try {
        var checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$")
        if(!checkForHexRegExp.test(req.params.element)) {
            return res.status(404).send("Invalid URL");
        }
        const results = await Guest.findByIdAndUpdate(req.params.element, req.body)
        return res.send("Sucessfully edited")
    } catch(e) {
        return res.status(404).send(e);
    }
}

controller.searchGuest = async (req, res) => {
    try {
        var checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$")
        if(!checkForHexRegExp.test(req.params.element)) {
            return res.status(404).send("Invalid URL");
        }
        const results = await Guest.findById(req.params.element)
        return res.send(results)
    } catch(e) {
        return res.status(404).send(e);
    }
}

controller.addGuest = async (req, res) => {
    try {
        let guest1 = new Guest(req.body);
        guest1.creationDate = new Date();
        await guest1.save()
        return res.send("Sucessfully added");
    } catch(e) {
        return res.status(404).send(e);
    }
}

module.exports = controller
