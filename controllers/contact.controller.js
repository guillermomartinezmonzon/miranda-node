var { Contact } = require('../db/models');
const controller = {};

controller.getContact = async (req, res) => {
    try {
        let results = await Contact.find()
        return res.send(results)
    } catch(e) {
        console.log(e)
        return res.status(500).send("Not found")
    }
}

controller.deleteContact = async (req, res) => {
    try {
        await Contact.findByIdAndDelete(req.params.element)
        return res.send("Sucessfully deleted")
    } catch(e) {
        console.log(e)
        return res.status(500).send("Not found")
    }
}

controller.editContact = async (req, res) => {
    try {
        await Contact.findByIdAndUpdate( req.params.element, req.body)
        return res.send("Sucessfully edited")
    } catch(e) {
        console.log(e)
        return res.status(500).send("Not found")
    }
}

controller.searchContact = async (req, res) => {
    try {
        const results = await Contact.findById(req.params.element)
        return res.send(results)
    } catch(e) {
        console.log(e)
        return res.status(500).send("Not found")
    }
}


controller.addContact = async (req, res) => {
    try {
        let contact1 = new Contact(req.body);
        contact1.contactDate = new Date();
        await contact1.save()
        return res.send("Sucessfully added")
    } catch(e) {
        console.log(e)
        return res.status(500).send("Not found")
    }
}

module.exports = controller
