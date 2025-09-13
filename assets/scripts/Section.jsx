import React from 'react';

const Section = ({ label, laudo, children }) => {
  if (label) {
    return (
      <ui>
        <header>
          <t6>
            {label}
          </t6>
        </header>
        <content>
          {children}
        </content>
      </ui>
    );
  }
  return <section>{children}</section>; // Render as a standard section if no label
};

export default Section;
