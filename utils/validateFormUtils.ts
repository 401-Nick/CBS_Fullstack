import Joi from 'joi';

type FormData = {
  firstName: string;
  lastName: string;
  dob: string;
  ssn: string;
  confirmPassword: string;
  password: string;
  emailAddress: string;
  mobileNumber: string;
  physicalAddress: string;
};

type ErrorsType = {
  [key: string]: string;
};

export const validateFormInputs = (formData: FormData): ErrorsType => {
  const schema = Joi.object({
    firstName: Joi.string().required().messages({ 'string.empty': 'First name is required.' }),
    lastName: Joi.string().required().messages({ 'string.empty': 'Last name is required.' }),
    dob: Joi.string().required().messages({ 'string.empty': 'Date of birth is required.' }),
    ssn: Joi.string().length(11).required().messages({
      'string.length': 'Valid Social Security Number is required',
      'string.empty': 'Valid Social Security Number is required',
    }),
    emailAddress: Joi.string().email({ tlds: { allow: false } }).required().messages({ 'string.empty': 'Valid email is required.' }),
    mobileNumber: Joi.string().min(10).required().messages({ 'string.empty': 'Valid mobile number is required.' }),
    physicalAddress: Joi.string().required().messages({ 'string.empty': 'Valid address is required.' }),
    password: Joi.string().required().messages({ 'string.empty': 'Password is required.' }),
    confirmPassword: Joi.valid(Joi.ref('password')).required().messages({ 'any.only': 'Passwords do not match!' }),
  });

  const { error } = schema.validate(formData, { abortEarly: false });
  const errors: ErrorsType = {};

  if (error) {
    error.details.forEach(({ path, message }) => {
      errors[path[0]] = message;
    });
  }
  return errors;
};
