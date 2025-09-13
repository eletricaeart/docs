import React from 'react';

const Titulo = ({ subtitle, children }) => {
  const subtitleContent = subtitle ? (
    <t2 style={{ fontWeight: 700, color: 'var(--sv-azul-bebe)' }}>
      {subtitle}
    </t2>
  ) : null;

  return (
    <>
      {subtitleContent}
      <t3 style={{ fontWeight: 700, color: '#003b6b' }}>
        {children}
      </t3>
    </>
  );
};

export default Titulo;
