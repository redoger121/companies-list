import { FC, useRef} from 'react';
import { MdCheck } from 'react-icons/md';
import { Company } from '../../types/company';

import './index.css';

type Props={
  inputFields:Omit<Company, 'id'>
  errors:Partial<Omit<Company, 'id'>>
  handleChange:(e: React.ChangeEvent<HTMLInputElement>)=>void
  handleSubmit:(e: React.MouseEvent<HTMLButtonElement>)=>void
}

export const CompanyForm: FC<Props> = ({ inputFields, handleChange, handleSubmit, errors}) => {

const nameInputRef=useRef<HTMLInputElement>(null)
const addressInputRef=useRef(null)




  return (
    <tr>
      <td></td>
      <td><div className="company-input">

        <input className=''
        ref={nameInputRef}
          type="text"
          name="name"
          value={inputFields.name}
          onChange={handleChange}
        />
        {errors.name && <div className="error">{errors.name}</div> }
      </div>
      </td>
      <td>
        <div className="company-input">

        <input 
        ref={addressInputRef}
          type="text"
          name="address"
          value={inputFields.address}
          onChange={handleChange}
        />
           {errors.address && <div className="error">{errors.address}</div> }
        </div>
      </td>
      <td>
        <button type="submit" onClick={handleSubmit}>
          <MdCheck />
        </button>
      </td>
    </tr>
  );
};
