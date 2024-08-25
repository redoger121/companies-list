import { FC, useEffect, useRef, useState } from 'react';
import { CompaniesListItem, AddCompanyContainer } from '../../components';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { stateCompanies } from '../../store/selectors';
import {
  deleteCompanies,
  loadMoreCompanies,
  setAllCompanyMarked,
} from '../../store/companiesSlice';

import './index.css';

export const CompaniesList: FC = () => {
  const [allSelected, setAlSelected] = useState<boolean>(false);
  const [addCompanyMode, setAddCompanyMode] = useState<boolean>(false);
  const [companyOnEdit, setCompaniOnEdit] = useState<string>('');
  const { companies, markedCompanies, moksLengh, companiesLength } =
    useAppSelector(stateCompanies);
  const dispatch = useAppDispatch();

  const handleCheckAllCompanies = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setAllCompanyMarked(e.target.checked));
  };

  const handleDeleteBtnClick = () => {
    dispatch(deleteCompanies());
  };

  const handleAddBtnClick = () => {
    setAddCompanyMode((prev) => !prev);
  };

  const companyIsChecked = (id: string) => {
    return markedCompanies.includes(id);
  };

  useEffect(() => {
    if (companies.length && markedCompanies.length === companies.length) {
      setAlSelected(true);
    } else if (
      (allSelected && markedCompanies.length !== companies.length) ||
      markedCompanies.length === 0
    ) {
      setAlSelected(false);
    }
  }, [markedCompanies, companies, allSelected]);

  const observer = useRef<null | IntersectionObserver>(null);

  const lastElementRef = (node: HTMLTableRowElement) => {
    if (observer.current) {
      observer.current.disconnect();
    }
    if (node && companiesLength < moksLengh) {
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          dispatch(loadMoreCompanies());
        }
      });

      observer.current.observe(node);
    }
  };

  return (
    <div className="table-wrap">
      <table>
        <caption>
          <div className="caption-container">
            <div className="select-all-container">
              <span>Выбрать все</span>
              <input
                type="checkbox"
                name="all-companies-check"
                checked={allSelected}
                onChange={handleCheckAllCompanies}
              />
            </div>
            <div>
              <button className="action-btn" onClick={handleDeleteBtnClick}>
                Удалить
              </button>
              <button className="action-btn" onClick={handleAddBtnClick}>
                {addCompanyMode ? 'Отменить' : 'Добавить'}
              </button>
            </div>
          </div>
        </caption>
        <thead>
          <tr>
            <th></th>
            <th>Название</th>
            <th>Адрес</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {addCompanyMode && (
            <AddCompanyContainer setAddCompanyMode={setAddCompanyMode} />
          )}
          {companies.map((company, index) => {
            return (
              <CompaniesListItem
                companyOnEdit={companyOnEdit}
                setCompaniOnEdit={setCompaniOnEdit}
                key={company.id}
                company={company}
                checked={companyIsChecked(company.id)}
                lastElementRef={
                  companies.length === index + 1 ? lastElementRef : null
                }
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
