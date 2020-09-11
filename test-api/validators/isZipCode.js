const isZipCode = (value) => /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(value);

export default isZipCode;
