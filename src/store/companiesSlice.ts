import { createSlice } from '@reduxjs/toolkit';
import { Company, CompanyState } from '../types/company';
import { moks } from '../components/mocks/companies';
const companies = moks.slice(0, 30);

const initialState: CompanyState = {
  companies: companies,
  markedCompanies: [],
  moksLengh: moks.length - 1,
  companiesLength: moks.indexOf(companies[companies.length - 1]),
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
      state.companies = [payload, ...state.companies];
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

    loadMoreCompanies: (state) => {
      let newCompanies;
      if (state.companiesLength + 31 <= state.moksLengh) {
        newCompanies = moks.slice(
          state.companiesLength + 1,
          state.companiesLength + 31
        );
        state.companies = [...state.companies, ...newCompanies];
        state.companiesLength = moks.indexOf(
          state.companies[state.companies.length - 1]
        );
      } else {
        newCompanies = moks.slice(
          state.companiesLength + 1,
          state.companiesLength + (state.moksLengh - state.companiesLength)
        );
        state.companies = [...state.companies, ...newCompanies];
        state.companiesLength = state.moksLengh;
      }
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
  loadMoreCompanies,
} = companiesSlice.actions;
