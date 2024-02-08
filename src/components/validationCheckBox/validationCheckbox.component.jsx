import React, { useState } from 'react';
import { Check, X, ChevronDown } from 'react-feather';
import './validationCheckbox.component.css';

const ValidatingTextBox = ({ value, onChange, validationRules }) => {
  const [isAllValid, setIsAllValid] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const validateInput = (value) => {
    if (value === '') {
      setIsAllValid(true);
    } else {
      const isAllValidInput = validationRules.every(rule => new RegExp(rule.pattern).test(value));
      setIsAllValid(isAllValidInput);
    }
  }

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleInputChange = (e) => {
    onChange(e.target.value);
    validateInput(e.target.value);
  };

  return (
    <div className="validating-textbox">
      <input
        type="text"
        value={value}
        onChange={handleInputChange}
        className={isAllValid ? '' : 'invalid'}
      />
      <div className="dropdown-toggle" onClick={toggleDropdown}>
        {isAllValid ? <Check color="green" /> : <X color="red" />}
        <ChevronDown />
      </div>
      {isDropdownOpen && (
        <div className="dropdown">
          {validationRules.map(rule => (
            <div key={rule.label} className="dropdown-item">
              {rule.label} {(value === "" || new RegExp(rule.pattern).test(value)) ? (
              <Check color="green" style={{ marginLeft: '5px' }} />
            ) : (
              <X color="red" style={{ marginLeft: '5px' }} />
            )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ValidatingTextBox;
