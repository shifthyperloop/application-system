const regExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const validateEmail = function(email) {
    return regExp.test(email)
};

module.exports = validateEmail;