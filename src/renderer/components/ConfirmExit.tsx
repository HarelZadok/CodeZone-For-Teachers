import React from 'react';
import './ConfirmExit.css';

export default function ConfirmExit({
  onClose,
}: {
  onClose: (x: boolean) => void;
}) {
  const handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    window.close();
  };

  return (
    <div className="confirm-exit">
      <p className="confirm-exit__message">Are you sure you want to exit?</p>
      <div className="confirm-exit__buttons_row">
        <button
          onClick={() => onClose(false)}
          className="confirm-exit__buttons"
          type="button"
        >
          No
        </button>
        <button
          onClick={handleClose}
          className="confirm-exit__buttons"
          type="button"
        >
          Yes
        </button>
      </div>
    </div>
  );
}
