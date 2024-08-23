import { FC, useEffect, useState } from 'react';
import { CompanyForm } from '../../components';
import { Company } from '../../types/company';
import { useAppDispatch } from '../../store/hooks';
import { validateValues } from '../../shared/validateForm';
import { editCompany } from '../../store/companiesSlice';

type Props = {
  company: Company;
  setEditMode: () => void;
};

export const EditCompanyContainer: FC<Props> = ({ company, setEditMode }) => {
  const [inputFields, setInputFields] = useState<Omit<Company, 'id'>>({
    name: company.name,
    address: company.address,
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
    dispatch(editCompany({ id: company.id, ...inputFields }));
    setEditMode();
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
