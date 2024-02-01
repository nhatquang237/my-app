import React, { useState } from 'react';
import { FormControl, FormControlLabel, Checkbox, FormLabel, RadioGroup, Radio } from '@mui/material';
import TextField from '@mui/material/TextField';
import '../styles/Form.css';
import { update_object } from '../utils/ArrayUtils';

const Form = ({ shareholderNames, lastShareholder, onSubmit }) => {
  const [state, setState] = useState({
    name: '',
    value: 0,
    payer: shareholderNames[0],
    shareholder: lastShareholder,
  });

  const handleNameChange = (e) => {
    const name = e.target.value;
    setState(update_object(state, {'name': name}));
  };

  const handleSpendValueChange = (e) => {
    const spendValue = e.target.value;
    setState(update_object(state, {'value': spendValue}));
  };

  const handlePayerChange = (e) => {
    const payer = e.target.value;
    setState(update_object(state, {'payer': payer}));
  };

  const handleShareholderChange = (e) => {
    const name = e.target.name;
    let shareholder = [...state.shareholder];

    if (shareholder.includes(name)) {
      let index = shareholder.indexOf(name);
      if (shareholder.length > 1) {
        shareholder.splice(index, 1);
      }
    } else {
      shareholder.push(name);
    }

    setState(update_object(state, {'shareholder': shareholder}));
  };

  const validateData = () => {
    let data = state;
    if (data.name && data.payer && data.shareholder.length && data.value) {
      return true;
    }
    return false;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateData()) {
      onSubmit({ ...state });
      resetState();
    }
  };

  const resetState = () => {
    setState({ ...state, value: 0, name: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl>
        <FormLabel>Thêm khoản chi tiêu mới</FormLabel>
        <TextField
          required={true}
          value={state.name}
          id="outlined-basic"
          variant="outlined"
          size="small"
          onChange={handleNameChange}
        />
        <TextField
          inputProps={{ step: '1000', min: 1000 }}
          id="standard-number"
          value={state.value}
          label="VND"
          type="number"
          variant="standard"
          onChange={handleSpendValueChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <div style={{ display: 'flex' }}>
          <div style={{ padding: '20px' }}>
            <FormLabel>Người tiêu dùng</FormLabel>
            <RadioGroup>
              {shareholderNames.map((name, index) => (
                <FormControlLabel
                  key={'Shareholder_' + index}
                  labelPlacement="start"
                  control={
                    <Checkbox
                      name={name}
                      checked={state.shareholder.includes(name)}
                      onChange={handleShareholderChange}
                    />
                  }
                  label={name}
                />
              ))}
            </RadioGroup>
          </div>
          <div style={{ padding: '20px' }}>
            <FormLabel>Người trả tiền</FormLabel>
            <RadioGroup
              value={state.payer}
              onChange={handlePayerChange}
              name="controlled-radio-buttons-group"
            >
              {shareholderNames.map((name, index) => (
                <FormControlLabel key={'Payer_' + index} value={name} control={<Radio />} />
              ))}
            </RadioGroup>
          </div>
        </div>

        <button type="submit">Thêm</button>
      </FormControl>
    </form>
  );
};

export default Form;
