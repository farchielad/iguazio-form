// ValidatingTextBox.js
import React, { useState } from 'react';
import { Check, X } from 'react-feather';

const ValidatingTextBox = ({ value, onChange, validationRules }) => {
  const [isValid, setIsValid] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const validateInput = () => {
    let isValidInput = true;
    validationRules.forEach(rule => {
      if (!new RegExp(rule.pattern).test(value)) {
        isValidInput = false;
      }
    });
    setIsValid(isValidInput);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleInputChange = (e) => {
    onChange(e.target.value);
    validateInput();
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <input
        type="text"
        value={value}
        onChange={handleInputChange}
        style={{ padding: '5px', border: isValid ? '1px solid #ccc' : '1px solid red' }}
      />
      <div style={{ position: 'absolute', top: '50%', right: '5px', transform: 'translateY(-50%)', cursor: 'pointer' }} onClick={toggleDropdown}>
        {isValid ? <Check color="green" /> : <X color="red" />}
      </div>
      {isDropdownOpen && (
        <div style={{ position: 'absolute', top: '100%', left: '0', backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '5px', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)', zIndex: '1' }}>
          {validationRules.map(rule => (
            <div key={rule.label} style={{ padding: '5px', display: 'flex', alignItems: 'center' }}>
              {rule.label} {new RegExp(rule.pattern).test(value) ? <Check color="green" style={{ marginLeft: '5px' }} /> : <X color="red" style={{ marginLeft: '5px' }} />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ValidatingTextBox;
