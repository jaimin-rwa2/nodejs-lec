const validation = require("../../const/validation_msg")

const validateRegistration = (data) => {
    const username = data.username
    if (!(username.length > 4 && username.length < 20)){
        return validation.nl
    }
    return validation.success
}