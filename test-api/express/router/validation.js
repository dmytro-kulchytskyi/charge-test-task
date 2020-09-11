import expressValidator from 'express-validator';
import HttpStatusCodeError from '../../errors/HttpStatusCodeError.js'
import BusinessTypes from '../../models/enums/BusinessTypes.js'
import BankAccountTypes from '../../models/enums/BankAccountTypes.js'

const { check, validationResult } = expressValidator;

export const validation = [
  check('identifier').exists().isEmail(),
  check('businessName').exists(),
  check('dba').exists(),
  check('ein').exists().isNumeric(),
  check('businessType').exists().isIn(Object.values(BusinessTypes)),
  check('bankAccountType').exists().isIn(Object.values(BankAccountTypes)),
  check('businessStreetAddress').exists(),
  check('businessCity').exists(),
  check('businessState').exists(),
  check('businessZip').exists().isPostalCode('any'),
  check('businessCountry').exists(),
  check('contactFirstName').exists(),
  check('contactLastName').exists(),
  check('contactTitle').exists(),
  check('contactPhone').exists().isMobilePhone('any'),
  check('contactEmail').exists().isEmail(),
  check('website').exists().isURL(),
  check('ip').exists().isIP(),
  check('deviceFingerprint').exists(),
];

export function handleValidationErrors(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpStatusCodeError(400, errors.array().join('; '))
  }

  next();
};