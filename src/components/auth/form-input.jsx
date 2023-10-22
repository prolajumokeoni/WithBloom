const FormInput = ({ label, ...otherProps }) => {
  return (
    <div className=''>
        <label>
          {label}
        </label>
      <input className='form-input' {...otherProps} />
    </div>
  );
};

export default FormInput;