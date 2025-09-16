import React from 'react';

const Section = ({ label, className, children }) => {
  // If a label is provided, wrap the children in a header structure.
  if (label) {
    return (
      <section className={className}>
        {/* The original script used a custom <ui> tag, replaced by a div */}
        <div className="section-wrapper">
          <header className="section-header">
            {/* The original script used <t6>, which translates well to <h6> */}
            <h6>{label}</h6>
          </header>
          <div className="section-content">
            {children}
          </div>
        </div>
      </section>
    );
  }

  // If no label, just render the section with its children.
  return (
    <section className={className}>
      {children}
    </section>
  );
};

export default Section;
