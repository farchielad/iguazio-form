import React, { useState } from 'react';
import Select from '../select/select.component';
import ValidatingTextBox from '../validationCheckBox/validationCheckbox.component';
import MultipleCheckboxes from '../multipleCheckboxes/multipleCheckboxes.component';

const Form = () => {
  const [selectedValue, setSelectedValue] = useState('grains');
  const [textInputValue, setTextInputValue] = useState('');
  const [checkboxValues, setCheckboxValues] = useState(['uk', 'car']);

  const options = [
    { label: 'Oranges & Bananas', value: 'fruits' },
    { label: 'Corn, Oat, & Wheat', value: 'grains' },
    { label: 'Lentils, Peas, Beans, & Soy', value: 'legumes' }
  ];

  const checkboxOptions = [
    { label: 'United States (US)', value: 'usa' },
    { label: 'United Kingdom (UK)', value: 'uk' },
    { label: 'Central African Republic (CAR)', value: 'car' },
    { label: 'United Arab Emirates (UAE)', value: 'uae' }
  ];

  const handleSelectChange = (value) => {
    setSelectedValue(value);
  };

  const handleTextInputChange = (value) => {
    setTextInputValue(value);
  };

  const handleCheckboxChange = (values) => {
    console.log('values: ', values);
    setCheckboxValues(values);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted with selected value:', selectedValue);
    console.log('Validating Text Box value:', textInputValue);
    console.log('Checkbox values:', checkboxValues);
  };

  const validationRules = [
    { label: 'Valid characters: A-Z, a-z, 0-9, -', pattern: '^[A-Za-z0-9-]*$' },
    { label: 'Must start with A-Z', pattern: '^[A-Z]' },
    { label: 'Max length: 8', pattern: '^.{0,8}$' }
  ];

  return (
    <form onSubmit={handleSubmit}>
      <Select options={options} selectedValue={selectedValue} onSelectChange={handleSelectChange} />
      <ValidatingTextBox value={textInputValue} onChange={handleTextInputChange} validationRules={validationRules} />
      <MultipleCheckboxes options={checkboxOptions} value={checkboxValues} onChange={handleCheckboxChange} />
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
