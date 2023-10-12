import React from 'react';
import { FormControl, FormControlLabel, Checkbox, FormLabel, RadioGroup, Radio } from '@mui/material';
import TextField from '@mui/material/TextField';

import '../styles/Form.css';

import {update_object} from '../utils/ArrayUtils';

class Form extends React.Component {
  constructor(props) {
    const { shareholderNames, lastShareholder,...restProps } = props;
    super(restProps);
    // Initial state may take from the last setting value
    this.shareholderNames = [...shareholderNames];
    this.state = {
      name: '',
      spendValue: 0,
      payer: shareholderNames[0],
      shareholder: lastShareholder,
    };
  }

  handleNameChange = (e) => {
    const name = e.target.value;
    this.setState(update_object(this.state, name, 'name'), ()=>{
      console.log(this.state)

    })
  };

  handleSpendValueChange = (e) => {
    const spendValue = e.target.value;
    this.setState(update_object(this.state, spendValue, 'spendValue'), ()=>{
      console.log(this.state)

    })
  };

  handlePayerChange = (e) => {
    const payer = e.target.value;
    this.setState(update_object(this.state, payer, 'payer'), ()=>{
      console.log(this.state)

    });
  };

  handleShareholderChange = (e) => {
    const name = e.target.name;
    let shareholder = this.state.shareholder;
    if (shareholder.includes(name)){
      let index = shareholder.indexOf(name)
      shareholder.splice(index, 1);

    } else {
      shareholder.push(name)
    }

    this.setState(update_object(this.state, shareholder, 'shareholder'), ()=>{
      console.log(this.state)
    })
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state)
    // Handle form submission here, e.g., send data to an API or perform validation
  };

  render() {
    return (

      <FormControl>
        <FormLabel>Add new spend</FormLabel>
        <TextField
          id="outlined-basic"
          variant="outlined"
          size='small'
          onChange={this.handleNameChange}
        />
        <TextField
          inputProps={{ step: "1000", min: 0}}
          id="standard-number"
          value={this.state.value}
          label="VND"
          type="number"
          variant="standard"
          onChange={this.handleSpendValueChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <div style={{ display: 'flex'}}>
          <div style={{ padding: '20px'}}>
            <FormLabel>Shareholder</FormLabel>
            <RadioGroup>
              {this.shareholderNames.map((name, index) => (
                <FormControlLabel
                key={'Shareholder_' + index}
                labelPlacement="start"
                control={<Checkbox
                  name={name}
                  checked={this.state.shareholder.includes(name)}
                  onChange={this.handleShareholderChange}
                  />}
                label={name} />
              ))}
            </RadioGroup>
          </div>
          <div style={{ padding: '20px'}}>
            <FormLabel>Payer</FormLabel>
            <RadioGroup
              value={this.state.payer}
              onChange={this.handlePayerChange}
              name="controlled-radio-buttons-group"
            >
              {this.shareholderNames.map((name, index) => (
                <FormControlLabel key={'Payer_' + index} value={name} control={<Radio />}/>
              ))}
            </RadioGroup>
          </div>
        </div>

        <button type="submit">Add</button>
      </FormControl>
    );
  }
}

// const newForm = new Form([{ name: 'Stuff', value: 20, payer: 'Phuc', shareholder: ['Quang', 'Tai', 'Phuc', 'Thanh'] }]);
export default Form;
// NOTE: To implement a form to submit new spend to database
// Wish feature:
// 1-Form should save last user input
// 2-Input fields of form will include 4 fields: Name, value, payer, shareholder list (checkbox options)