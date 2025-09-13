import React from 'react';

const Signatures = ({ children }) => {
  return (
    <>
      <signature section>
        <content>
          <sig-name>Rafael - Elétrica&Art</sig-name>
        </content>
      </signature>
      <signature section>
        <content>
          <sig-name>Assinatura do Cliente</sig-name>
        </content>
      </signature>
      {children}
    </>
  );
};

export default Signatures;
