import React from 'react';

const NavLink = ({ to, children }) => {
  return (
    <p>
      <a href={to} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    </p>
  );
};

export default NavLink;
