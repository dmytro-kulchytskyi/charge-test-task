import einValidator from 'ein-validator'

const isEin = (value) => einValidator.isValid(value);

export default isEin;

