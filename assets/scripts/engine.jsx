import React from 'react';
import NavLink from './NavLink';
import DocTitle from './DocTitle';
import Titulo from './Titulo';
import Article from './Article';
import Section from './Section';
import Cliente from './Cliente';
import Condominio from './Condominio';
import Signatures from './Signatures';

// Export utility functions as well if they are part of the "engine"
export * as Utils from './utils';

// The main Engine component can be a simple wrapper or provide context
const Engine = ({ children }) => {
  // You could add global styling or context providers here if needed
  return (
    <div className="ea-engine-root">
      {children}
    </div>
  );
};

// Attach the custom components as properties of the Engine component
Engine.NavLink = NavLink;
Engine.DocTitle = DocTitle;
Engine.Titulo = Titulo;
Engine.Article = Article;
Engine.Section = Section;
Engine.Cliente = Cliente;
Engine.Condominio = Condominio;
Engine.Signatures = Signatures;

// For attribute-based styling, you would typically create a HOC or a utility function
// that takes props like bg, color, m, pd, gap, ratio and applies them as inline styles.
// For example:
const StyledDiv = ({ bg, color, m, pd, gap, ratio, children, ...props }) => {
  const style = {
    ...(bg && { background: bg }),
    ...(color && { color: color }),
    ...(m && { margin: m }),
    ...(pd && { padding: pd }),
    ...(gap && { gap: gap }),
    ...(ratio && { aspectRatio: ratio }),
  };
  return <div style={style} {...props}>{children}</div>;
};
Engine.StyledDiv = StyledDiv; // Export a generic styled div for attribute-based styling

export default Engine;