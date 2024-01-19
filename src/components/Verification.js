import React, { useState, useRef } from 'react';
import Button from '@mui/material/Button';

const VerificationCodeInput = ({ onCodeChange }) => {
  // State to store the entered verification code
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);

  // Ref to keep track of the currently focused input index
  const inputRefs = useRef(Array(6).fill(null).map(() => React.createRef()));

  // Event handler for input changes
  const handleInputChange = (e, index) => {
    // Ensure only numeric characters are allowed
    const newInput = e.target.value.replace(/[^0-9]/g, '');

    // Create a copy of the verificationCode array
    const updatedVerificationCode = [...verificationCode];

    // Update the value at the specified index
    updatedVerificationCode[index] = newInput;

    // Update the state
    setVerificationCode(updatedVerificationCode);

    // Move focus to the next input box if not at the last box
    if (index < 5 && newInput !== '') {
      inputRefs.current[index + 1].current.focus();
    }

    // Call the callback with the combined code
    onCodeChange(updatedVerificationCode.join(''));
  };

  // Event handler for handling the "Delete" key
  const handleDelete = (event) => {
    if (event.key === 'Delete') {

      // Clear the entire values of all input boxes
      const clearedVerificationCode = Array(6).fill('');
      setVerificationCode(clearedVerificationCode);

      // Move focus to the first input box
      inputRefs.current[0].current.focus();

      // Call the callback with the combined code
      onCodeChange('');
    }
  };

  return (
    <div>
      <br></br>
      <label htmlFor="verificationCode">Enter Verification Code:</label>

      {/* Input boxes for confirmation code */}
      <div className="verification-code-input">
        {verificationCode.map((digit, index) => (
          <input
            key={index}
            type="text"
            ref={inputRefs.current[index]}
            value={digit}
            onChange={(e) => handleInputChange(e, index)}
            onKeyDown={(e) => handleDelete(e)}
            maxLength={1}
          />
        ))}
      </div>
    </div>
  );
};

const VerificationForm = ({submitCode}) => {
  // State to store the combined verification code
  const [combinedCode, setCombinedCode] = useState('');
  const onSubmitButton = () => {
    submitCode(combinedCode)
  };
  return (
    <div>
      <VerificationCodeInput
        onCodeChange={(code) => setCombinedCode(code)}
      />
      <Button
        disabled={combinedCode.length !== 6}
        onClick={onSubmitButton}
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Submit Verification Code
      </Button>
    </div>
  );
};

export default VerificationForm;
