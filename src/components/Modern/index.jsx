import { useEffect } from "react";
import ReactDOM from "react-dom";

function Modern({ onClose, children, actions }) {
  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  return ReactDOM.createPortal(
    <div>
      <div
        onClick={onClose}
        className="fixed bg-slate-50 opacity-70 inset-0"
      ></div>
      <div className="fixed bg-white inset-40 border shadow-lg p-8">
        <div className="flex flex-col justify-between h-full">
          {children}
          <div className="flex justify-end">{actions}</div>
        </div>
      </div>
    </div>,
    document.querySelector(".modal-container")
  );
}

export default Modern;
