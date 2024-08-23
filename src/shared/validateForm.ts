import { Company } from '../types/company';

export const validateValues = (inputValues: Omit<Company, 'id'>) => {
  const errors: Partial<Omit<Company, 'id'>> = {};
  if (inputValues.name.length < 5) {
    errors.name = 'Name is too short';
  }
  if (inputValues.address.length < 10) {
    errors.address = 'Address is too short';
  }
  return errors;
};
