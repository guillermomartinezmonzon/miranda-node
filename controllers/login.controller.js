const { signUp, validateAdmin } = require("../auth")
const controller = {};


controller.login = (req, res) => {
    validateAdmin(req.body.email,req.body.password).then(
        response => {
           return res.send(response)
        }
    ).catch(e => { return res.status(404).send(e)})
}

controller.signUp = (req, res, next) => {
    signUp(req.body).then(
        response => {
            return res.send(response)
        }
    ).catch(e => {
        console.log(e);
        return res.status(500).send("Error saving user. Verify the fields or check if the user already exists");
    })
}

module.exports = controller 
