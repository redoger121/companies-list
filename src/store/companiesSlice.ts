import { createSlice } from '@reduxjs/toolkit';
import { Company, CompanyState } from '../types/company';
import { companies } from '../components/mocks/companies';

const initialState: CompanyState = {
  companies: companies,
  markedCompanies: [],
};

export const companiesSlice = createSlice({
  name: 'companies',
  initialState,
  reducers: {
    setCompanyMarked: (state, { payload: id }: { payload: string }) => {
      if (state.markedCompanies.includes(id)) {
        state.markedCompanies = state.markedCompanies.filter((el) => {
          return el !== id;
        });
      } else {
        state.markedCompanies.push(id);
      }
    },
    setAllCompanyMarked: (state, { payload: marked }: { payload: boolean }) => {
      if (marked) {
        state.markedCompanies = state.companies.reduce(
          (acc: string[], el: Company): string[] => {
            acc.push(el.id);
            return acc;
          },
          []
        );
      } else {
        state.markedCompanies = [];
      }
    },
    deleteCompanies: (state) => {
      state.companies = state.companies.filter(
        (company) => !state.markedCompanies.includes(company.id)
      );
      state.markedCompanies = [];
    },

    addCompany: (state, { payload }: { payload: Company }) => {
      state.companies.push(payload);
    },
    editCompany: (
      state,
      {
        payload: { id, name, address },
      }: { payload: { id: string; name: string; address: string } }
    ) => {
      const index = state.companies.findIndex((el) => {
        return el.id === id;
      });
      state.companies[index] = {
        ...state.companies[index],
        name: name,
        address: address,
      };
    },
  },
});

export default companiesSlice.reducer;
export const {
  setCompanyMarked,
  setAllCompanyMarked,
  deleteCompanies,
  addCompany,
  editCompany,
} = companiesSlice.actions;
