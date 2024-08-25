import { FC, useState } from 'react';
import { Company } from '../../types/company';
import { useAppDispatch } from '../../store/hooks';
import { setCompanyMarked } from '../../store/companiesSlice';
import { MdModeEditOutline } from 'react-icons/md';
import { EditCompanyContainer } from '../../components';
import './index.css';
import React from 'react';
type Props = {
  company: Company;
  checked: boolean;
  setCompaniOnEdit: (id: string) => void;
  companyOnEdit: string;
  lastElementRef: ((node: HTMLTableRowElement) => void) | null;
};

export const CompaniesListItem: FC<Props> = React.memo(
  ({ company, checked, setCompaniOnEdit, companyOnEdit, lastElementRef }) => {
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
        <EditCompanyContainer
          company={company}
          setEditMode={handleCancelEdit}
        />
      );
    }

    return (
      <tr className={checked ? 'checked-row' : ''} ref={lastElementRef}>
        <td>
          <input
            type="checkbox"
            name="company-check"
            checked={checked}
            onChange={handleCheckboxClick}
          />
        </td>
        <td>
          <p className="td-text">{name}</p>
        </td>
        <td>
          <p className="td-text">{address}</p>
        </td>
        <td>
          <MdModeEditOutline className="edit-icon" onClick={handleEditClick} />
        </td>
      </tr>
    );
  }
);
