import "./Input.css";

const Input = ({ name, label, value, type, handleChange, error }) => {
  return (
    <div className="input-group">
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
      />
      <div className="error-message">{error}</div>
    </div>
  );
};

export default Input;
