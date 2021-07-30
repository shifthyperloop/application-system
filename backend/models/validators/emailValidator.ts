const regExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const validateEmail = function(email: string): boolean {
    return regExp.test(email)
};

export default validateEmail;