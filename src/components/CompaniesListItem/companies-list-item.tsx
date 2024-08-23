import { FC, useState } from 'react';
import { Company } from '../../types/company';
import { useAppDispatch } from '../../store/hooks';
import { setCompanyMarked } from '../../store/companiesSlice';
import { MdModeEditOutline } from 'react-icons/md';
import { EditCompanyContainer } from '../../components';
import './index.css';
type Props = {
  company: Company;
  checked: boolean;
  setCompaniOnEdit: (id: string) => void;
  companyOnEdit: string;
};

export const CompaniesListItem: FC<Props> = ({
  company,
  checked,
  setCompaniOnEdit,
  companyOnEdit,
}) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const { name, address, id } = company;

  const dispatch = useAppDispatch();

  const handleCheckboxClick = () => {
    dispatch(setCompanyMarked(id));
  };

  const handleEditClick = () => {
    setCompaniOnEdit(id);
    setIsEdit(true);
  };
  const handleCancelEdit = () => {
    setCompaniOnEdit('');
    setIsEdit(false);
  };

  if (isEdit && companyOnEdit === id) {
    return (
      <EditCompanyContainer company={company} setEditMode={handleCancelEdit} />
    );
  }

  return (
    <tr className={checked ? 'checked-row' : ''}>
      <td>
        <input
          type="checkbox"
          checked={checked}
          onChange={handleCheckboxClick}
        />
      </td>
      <td>{name}</td>
      <td>{address}</td>
      <td>
        <MdModeEditOutline onClick={handleEditClick} />
      </td>
    </tr>
  );
};
