import React, { useState } from "react";

const Modal = ({ isOpen, onClose, children }) => {
  const [opacity, setOpacity] = useState(isOpen ? "opacity-100" : "opacity-0");
  const [pointerEvents, setPointerEvents] = useState(
    isOpen ? "pointer-events-auto" : "pointer-events-none"
  );

  const closeModal = () => {
    setOpacity("opacity-0");
    setPointerEvents("pointer-events-none");
    setTimeout(() => {
      onClose();
    }, 200);
  };

  return (
    <div
      className={`${
        isOpen ? "fixed" : "hidden"
      } inset-0 bg-gray-500 bg-opacity-75 transition-opacity ${opacity} z-100 top-56 left-56`}
      onClick={closeModal}
    >
      <div
        className={`${
          isOpen ? "transform" : ""
        } relative max-w-md w-full bg-white rounded-lg shadow-lg pointer-events-auto ${pointerEvents} transition-transform duration-200 ease-in-out`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
