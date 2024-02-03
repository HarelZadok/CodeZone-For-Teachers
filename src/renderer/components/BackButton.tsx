import { IoIosArrowBack } from 'react-icons/io';
import './BackButton.css';
import { Link } from 'react-router-dom';
import React from 'react';

type BackButtonProps = {
  to: string;
  size?: string;
  color?: string;
};

function BackButton({ to, size, color }: BackButtonProps) {
  const [hover, setHover] = React.useState(false);

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="back-button"
    >
      <Link
        style={{
          display: 'flex',
          flex: 1,
          width: '100%',
          height: '100%',
        }}
        to={to}
      >
        <IoIosArrowBack
          className={hover ? 'back-button__link--hover' : 'back-button__link'}
          style={{ color }}
          size={size}
        />
      </Link>
    </div>
  );
}

BackButton.defaultProps = {
  size: '28px',
  color: 'black',
};

export default BackButton;
