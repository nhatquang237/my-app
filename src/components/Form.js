// Form.js

import React from 'react';
import '../styles/Form.css';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      value: 0,
      payer: '',
      shareholder: '',
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here, e.g., send data to an API or perform validation
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Value</label>
          <input
            type="number"
            id="value"
            name="value"
            value={this.state.value}
            onChange={this.handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="payer">Payer</label>
          <input
            type="text"
            id="payer"
            name="payer"
            value={this.state.payer}
            onChange={this.handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="shareholder">Shareholder</label>
          <input
            type="textarea"
            id="shareholder"
            name="shareholder"
            value={this.state.shareholder}
            onChange={this.handleChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    );
  }
}

// const newForm = new Form([{ name: 'Stuff', value: 20, payer: 'Phuc', shareholder: ['Quang', 'Tai', 'Phuc', 'Thanh'] }]);
export default Form;
