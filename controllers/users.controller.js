const {User} = require('../db/models');
const controller = {};

controller.getUsers = async (req, res) => {
    try {
        return res.send(await User.find().exec())
    } catch(e){
        console.log(e);
        return res.status(500).send("Not found")
    }
}

controller.deleteUser = async (req, res) => {
    try{
        var checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$")
        if(!checkForHexRegExp.test(req.params.element)) {
            return res.status(404).send("Invalid URL");
        }
        await User.findByIdAndDelete(req.params.element)
        return res.send("Sucessfully deleted") 
    } catch(e){
        console.log(e);
        return res.status(500).send("Not found")
    }
}

controller.editUser = async (req, res) => {
    try{
        var checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$")
        if(!checkForHexRegExp.test(req.params.element)) {
            return res.status(404).send("Invalid URL");
        }
        await User.findOneAndUpdate({ email: req.params.element}, req.body).clone(); 
        return res.send("Sucessfully edited")
    } catch(e){
        console.log(e);
        return res.status(500).send("Not found")
    }
}

controller.searchUser = async (req, res) => {
    try{
        var checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$")
        if(!checkForHexRegExp.test(req.params.element)) {
            return res.status(404).send("Invalid URL");
        }
        return res.send(await User.findById(req.params.element));
    } catch(e){
        console.log(e);
        return res.status(500).send("Not found")
    }
}

// for new user > signUp

// controller.addUser = async (req, res) => {
//     try {
//         let user1 = new User(req.body);
//         user1.save(function (e, user){
//             if (e) return res.status(500).send(e);
//             return res.send("user added"); 
//         })
//     } catch(e) {
//         return res.status(500).send(e);
//     }
// }

module.exports = controller
