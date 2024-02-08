import React, { useState } from 'react';
import { ChevronDown, Check } from 'react-feather';
import './select.component.css';

const Select = ({ options, selectedValue, onSelectChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectOption = (value) => {
    onSelectChange(value);
    setIsOpen(false);
  };

  return (
    <div className="select-container">
      <div className="select-header" onClick={toggleDropdown}>
        {selectedValue === 'grains' ? 'Corn, Oat, & Wheat' : selectedValue} <ChevronDown className="icon" />
      </div>
      {isOpen && (
        <div className="select-options">
          {options.map((option) => (
            <div
              key={option.value}
              className={`select-option ${option.value === selectedValue ? 'selected' : ''}`}
              onClick={() => selectOption(option.value)}
            >
              {option.label} {option.value === selectedValue && <Check className="icon" />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;
