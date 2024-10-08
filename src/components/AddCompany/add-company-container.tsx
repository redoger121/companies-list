import { FC, useEffect, useState } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { addCompany } from '../../store/companiesSlice';
import { v4 as uuidv4 } from 'uuid';
import { Company } from '../../types/company';
import { validateValues } from '../../shared/validateForm';
import { CompanyForm } from '../../components';
type Props = {
  setAddCompanyMode: (arg: boolean) => void;
};

export const AddCompanyContainer: FC<Props> = ({ setAddCompanyMode }) => {
  const [inputFields, setInputFields] = useState<Omit<Company, 'id'>>({
    name: '',
    address: '',
  });
  const [errors, setErrors] = useState<Partial<Omit<Company, 'id'>>>({});
  const [submiting, setSubmiting] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputFields({ ...inputFields, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setErrors(validateValues(inputFields));
    setSubmiting(true);
  };

  const finishSubmit = () => {
    dispatch(addCompany({ ...inputFields, id: uuidv4() }));
    setAddCompanyMode(false);
  };
  useEffect(() => {
    if (Object.keys(errors).length === 0 && submiting) {
      finishSubmit();
    }
  }, [errors, submiting]);

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      const timer = setTimeout(() => {
        setErrors({});
        setSubmiting(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [errors]);

  return (
    <CompanyForm
      errors={errors}
      inputFields={inputFields}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
};
