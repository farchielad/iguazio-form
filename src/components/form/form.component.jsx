import React, { useState } from 'react';
import Select from '../select/select.component';
import ValidatingTextBox from '../validationCheckBox/validationCheckbox.component';
import MultipleCheckboxes from '../multipleCheckboxes/multipleCheckboxes.component';
import './form.component.css';

const CreateFunctionForm = () => {
  const [functionName, setFunctionName] = useState('');
  const [description, setDescription] = useState('');
  const [runtime, setRuntime] = useState('python:3.9');
  const [categories, setCategories] = useState([]);
  const [serviceName, setServiceName] = useState('');
  const [permissions, setPermissions] = useState(['read']);

  const functionNameValidationRules = [
    { label: 'Valid characters: a-z, 0-9, -', pattern: '^[a-z0-9-]*$' },
    { label: 'Must begin and end with a-z, 0-9', pattern: '^[a-z0-9].*[a-z0-9]$' },
    { label: 'Max length: 56', pattern: '^.{0,56}$' }
  ];

  const serviceNameValidationRules = [
    { label: 'Valid characters: a-z, 0-9, -', pattern: '^[a-z0-9-]*$' },
    { label: 'Must begin with a-z', pattern: '^[a-z]' },
    { label: 'Must end with a-z, 0-9', pattern: '.*[a-z0-9]$' },
    { label: 'Max length: 53', pattern: '^.{0,53}$' }
  ];

  const runtimeOptions = [
    { label: 'Go', value: 'golang' },
    { label: 'Java', value: 'java' },
    { label: 'NodeJs', value: 'nodejs' },
    { label: 'Python 3.7', value: 'python:3.7' },
    { label: 'Python 3.9', value: 'python:3.9' }
  ];

  const categoriesOptions = [
    { label: 'Data Collection', value: 'collect' },
    { label: 'Data Processing', value: 'process' },
    { label: 'Analytics & Reporting', value: 'report' },
    { label: 'Sorting, filtering, tagging', value: 'sort' }
  ];

  const permissionsOptions = [
    { label: 'Read files', value: 'read' },
    { label: 'Write files', value: 'write' },
    { label: 'Execute files', value: 'execute' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      metadata: {
        name: functionName,
        categories: categories
      },
      spec: {
        serviceName: serviceName,
        runtime: runtime,
        permissions: permissions
      }
    };
    console.log(formData);
  };

  const isFormValid = () => {
    return (
      functionName &&
      serviceName &&
      categories.length > 0 &&
      permissions.length > 0 &&
      functionNameValidationRules.every(rule => new RegExp(rule.pattern).test(functionName)) &&
      serviceNameValidationRules.every(rule => new RegExp(rule.pattern).test(serviceName))
    );
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2>Create New Function</h2>
      <div className="form-group">
        <label htmlFor="functionName">
          Function Name <span style={{ paddingRight: '20px', color: 'red' }}>*</span>
        </label>
        <ValidatingTextBox
          id="functionName"
          value={functionName}
          onChange={setFunctionName}
          validationRules={functionNameValidationRules}
        />
      </div>
      <hr className="hr-divider" />
      <div className="form-group">
        <label htmlFor="description" style={{ paddingRight: '20px' }}>Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <hr className="hr-divider" />
      <div className="form-group">
        <label htmlFor="runtime">Runtime</label>
        <Select
          id="runtime"
          options={runtimeOptions}
          selectedValue={runtime}
          onSelectChange={setRuntime}
        />
      </div>
      <hr className="hr-divider" />
      <div className="form-group">
        <label>Categories</label>
        <MultipleCheckboxes
          options={categoriesOptions}
          value={categories}
          onChange={setCategories}
        />
      </div>
      <hr className="hr-divider" />
      <div className="form-group">
        <label htmlFor="serviceName">
          Service Name <span style={{ paddingRight: '10px', color: 'red' }}>*</span>
        </label>
        <ValidatingTextBox
          id="serviceName"
          value={serviceName}
          onChange={setServiceName}
          validationRules={serviceNameValidationRules}
        />
      </div>
      <hr className="hr-divider" />
      <div className="form-group">
        <label>Permissions <span style={{ color: 'red' }}>*</span></label>
        <MultipleCheckboxes
          options={permissionsOptions}
          value={permissions}
          onChange={setPermissions}
        />
      </div>
      <hr className="hr-divider" />
      <button type="submit" disabled={!isFormValid()} className="create-button">Create</button>
    </form>
  );
};

export default CreateFunctionForm;
