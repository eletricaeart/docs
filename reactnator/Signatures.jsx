import React from 'react';

// The component accepts props for signer names, with default values from the original code.
const Signatures = ({ signer1 = "Rafael - Elétrica&Art", signer2 = "Assinatura do Cliente" }) => {
  return (
    // The original <signatures> tag is replaced by a root div.
    // The original script also had commented out sections for witnesses, which are omitted here.
    <div className="signatures-container">
      
      {/* Each <signature section> is converted to a div */}
      <div className="signature">
        <div className="signature-content">
          {/* <sig-name> is converted to a div */}
          <div className="signature-name-line">
            {signer1}
          </div>
        </div>
      </div>

      <div className="signature">
        <div className="signature-content">
          <div className="signature-name-line">
            {signer2}
          </div>
        </div>
      </div>

    </div>
  );
};

export default Signatures;
