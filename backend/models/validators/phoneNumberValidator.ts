const regExp = /^((?:\+|00)\d{1,2})?(\d{8,10})$/;

const validatePhoneNumber = function(phoneNumber: string): boolean {
  return regExp.test(phoneNumber)
};

export default validatePhoneNumber;