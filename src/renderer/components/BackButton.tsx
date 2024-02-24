import { IoIosArrowBack } from 'react-icons/io';
import './BackButton.css';
import { Link } from 'react-router-dom';
import React, { ReactNode } from 'react';

type BackButtonProps = {
  to?: string;
  size?: string;
  color?: string;
  onClick?: () => void;
};

const Button = ({
  to,
  children,
  onClick,
}: {
  to?: string;
  children: ReactNode;
  onClick?: () => void;
}) => {
  if (to) {
    return (
      <Link
        style={{
          display: 'flex',
          flex: 1,
          width: '100%',
          height: '100%',
        }}
        to={to}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick ?? (() => {})}
      style={{
        display: 'flex',
        flex: 1,
        width: '100%',
        height: '100%',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
      }}
    >
      {children}
    </button>
  );
};

function BackButton({ to, size, color, onClick }: BackButtonProps) {
  const [hover, setHover] = React.useState(false);

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="back-button"
    >
      <Button to={to} onClick={onClick}>
        <IoIosArrowBack
          className={hover ? 'back-button__link--hover' : 'back-button__link'}
          style={{ color }}
          size={size}
        />
      </Button>
    </div>
  );
}

BackButton.defaultProps = {
  size: '28px',
  color: 'black',
};

export default BackButton;
