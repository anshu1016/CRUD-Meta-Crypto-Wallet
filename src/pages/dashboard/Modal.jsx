/* eslint-disable react/prop-types */
import { useState } from "react";
import ReactDOM from "react-dom";
import * as Yup from "yup";

const Modal = ({ isOpen, onClose, onSubmit }) => {
  const [title, setTitle] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const schema = Yup.object().shape({
        title: Yup.string().required("Title is required."),
      });

      await schema.validate({ title }, { abortEarly: false });
      setErrors({});
      onSubmit(title);
      setTitle("");
      setErrors({});
      onClose();
    } catch (err) {
      if (err.name === "ValidationError") {
        const newErrors = {};
        err.inner.forEach((error) => {
          newErrors[error.path] = error.message;
        });
        setErrors(newErrors);
      } else {
        console.error("Error submitting title:", err);
      }
    }
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-[#2E073F] rounded-lg p-8 mx-4 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl shadow-lg transform transition duration-500 hover:scale-105">
        <button
          className="absolute top-2 right-2 text-lg font-semibold text-[#EBD3F8]"
          onClick={onClose}
        >
          Close
        </button>
        <h2 className="text-2xl font-bold mb-4 text-center text-[#EBD3F8]">
          Add Title
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setErrors((prev) => ({ ...prev, title: undefined }));
            }}
            className={`w-full p-3 border ${
              errors.title ? "border-red-500" : "border-gray-300"
            } rounded-lg bg-[#EBD3F8] text-[#2E073F] placeholder-[#2E073F]`}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
          )}
          <button
            type="submit"
            className="mt-4 w-full py-2 bg-[#AD49E1] text-[#2E073F] font-bold rounded-lg hover:bg-[#EBD3F8] transition duration-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
