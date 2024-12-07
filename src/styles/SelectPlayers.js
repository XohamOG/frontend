// src/styles/SelectPlayers.js
const SelectPlayers = {
  control: (provided) => ({
    ...provided,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent background
    borderColor: '#ccc',
    minHeight: '40px',
    boxShadow: 'none',
    borderRadius: '4px', // Added border-radius for rounded corners
    transition: 'all 0.3s ease', // Smooth transition on hover
    '&:hover': {
      borderColor: '#f39c12', // Change border color on hover
      backgroundColor: 'rgba(255, 255, 255, 1)', // Full opacity on hover
    },
  }),
  singleValue: (provided) => ({
    ...provided,
    color: '#333', // Dark color for better contrast
    fontSize: '16px',
    fontWeight: '500', // Slightly bold for readability
  }),
  placeholder: (provided) => ({
    ...provided,
    color: '#666',
    fontSize: '16px',
    fontStyle: 'italic', // Italic style for placeholder text
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Slightly transparent background
    zIndex: 2,
    borderRadius: '4px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
  }),
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? '#fff' : '#000', // White text when selected
    backgroundColor: state.isFocused
      ? '#f39c12' // Yellow background on hover
      : 'rgba(255, 255, 255, 0.8)', // Slightly transparent background by default
    padding: '10px',
    borderRadius: '4px',
    transition: 'all 0.2s ease', // Smooth transition when hovering
    '&:hover': {
      backgroundColor: '#f39c12', // Yellow background on hover
      color: '#000', // Change text color to black on hover
    },
  }),
};

export default SelectPlayers;
