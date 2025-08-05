import React from 'react';
import './StarButton.css';

const StarSvg = () => (
  <svg
    viewBox="0 0 784.11 815.53"
    // PERUBAHAN: Properti 'imageRendering' yang menyebabkan error telah dihapus dari style
    style={{ shapeRendering: 'geometricPrecision', textRendering: 'geometricPrecision', fillRule: 'evenodd', clipRule: 'evenodd' }}
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g>
      <path
        className="fil0"
        d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
      />
    </g>
  </svg>
);

interface StarButtonProps {
  href: string;
  children: React.ReactNode;
}

const StarButton = ({ href, children }: StarButtonProps) => {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="star-button">
      {children}
      <div className="star-1"><StarSvg /></div>
      <div className="star-2"><StarSvg /></div>
      <div className="star-3"><StarSvg /></div>
      <div className="star-4"><StarSvg /></div>
      <div className="star-5"><StarSvg /></div>
      <div className="star-6"><StarSvg /></div>
    </a>
  );
};

export default StarButton;