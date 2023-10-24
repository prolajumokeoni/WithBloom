import './form-input.css'
const FormInput = ({ label, ...otherProps }) => {
  return (
    <div className='form-wrapper'>
        <label>
          {label}
        </label>
      <input className='form-input' {...otherProps} />
    </div>
  );
};

export default FormInput;