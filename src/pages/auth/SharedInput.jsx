/* eslint-disable react/prop-types */
// SharedInput.js

const SharedInput = ({ label, type, value, onChange, placeholder, error }) => {
  return (
    <div className="mb-4">
      <label className="block text-lg font-medium mb-2 text-[#EBD3F8]">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-4 py-2 rounded-lg border-none outline-none bg-[#2E073F] text-[#EBD3F8] focus:ring-2 transition duration-300 ${
          error ? "ring-2 ring-red-500" : "focus:ring-[#AD49E1]"
        }`}
      />
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
};

export default SharedInput;
