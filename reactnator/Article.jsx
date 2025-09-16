import React from 'react';

const Article = ({ label, className, children }) => {
  const headerTextStyle = {
    fontWeight: 700,
    textTransform: 'uppercase',
  };

  // The original script only adds the wrapper if a 'label' exists.
  if (label) {
    return (
      <article className={className}>
        {/* The original script used a custom <ui> tag, here replaced by a div */}
        <div className="article-wrapper">
          <header className="article-header">
            <p style={headerTextStyle}>
              {label}
            </p>
          </header>
          <div className="article-content">
            {children}
          </div>
        </div>
      </article>
    );
  }

  // If no label is provided, render the article tag with children, preserving the class.
  return (
    <article className={className}>
      {children}
    </article>
  );
};

export default Article;
