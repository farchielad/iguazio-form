import React from 'react';

const MultipleCheckboxes = ({ options, value, onChange }) => {
  const handleCheckboxChange = (optionValue) => {
    const isChecked = value.includes(optionValue);
    if (isChecked) {
      // Remove the option from the array if it's already checked
      onChange(value.filter((val) => val !== optionValue));
    } else {
      // Add the option to the array if it's not checked
      onChange([...value, optionValue]);
    }
  };

  return (
    <div>
      {options.map((option) => (
        <div key={option.value}>
          <input
            type="checkbox"
            id={option.value}
            value={option.value}
            checked={value.includes(option.value)}
            onChange={() => handleCheckboxChange(option.value)}
          />
          <label htmlFor={option.value}>{option.label}</label>
        </div>
      ))}
    </div>
  );
};

export default MultipleCheckboxes;
