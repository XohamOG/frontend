// src/styles/SelectPlayer.js
const SelectPlayer = {
  control: (provided) => ({
    ...provided,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    minHeight: '40px',
    boxShadow: 'none',
    '&:hover': {
      borderColor: '#f39c12',
    },
  }),
  singleValue: (provided) => ({
    ...provided,
    color: 'black',
    fontSize: '16px',
  }),
  placeholder: (provided) => ({
    ...provided,
    color: '#666',
    fontSize: '16px',
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: '#fff',
    zIndex: 9999,
    borderRadius: '5px',
  }),
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? '#fff' : '#000',
    backgroundColor: state.isFocused ? '#f39c12' : '#fff',
    padding: '10px',
    borderRadius: '5px',
    transition: 'background-color 0.3s ease',
  }),
};

export default SelectPlayer; // Default export
