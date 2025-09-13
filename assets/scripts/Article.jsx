import React from 'react';

const Article = ({ label, laudo, children }) => {
  if (label) {
    return (
      <ui>
        <header>
          <ui>
            <t style={{ fontWeight: 700, textTransform: 'uppercase' }}>
              {label}
            </t>
          </ui>
        </header>
        <content>
          {children}
        </content>
      </ui>
    );
  }
  return <article>{children}</article>; // Render as a standard article if no label
};

export default Article;
