export const _ = (...v) => console.log(...v);
export const table = (v) => console.table(v);

export const toBrl = (v) => v.toLocaleString("pt-br", { style: "currency", currency: "BRL" });

export const brlToInt = (v) => {
  if (typeof v !== 'string') return v;
  return parseInt(v.replace("R$", "").replace(/\./g, "").replace(",00", ""));
};

export const brlToFloat = (v) => {
  if (typeof v !== 'string') return v;
  return parseFloat(v.replace("R$", "").replace(/\./g, "").replace(",", "."));
};

export const fix = (v) => v.toFixed(2);

export const add0 = (v) => {
  if (v < 10) {
    return `0${v}`;
  } else {
    return v;
  }
};

export const formatNumber = (link) => {
  if (typeof link !== 'string') return link;
  return link.replace(/\(/g, "").replace(/\)/g, "").replace(/-/g, "").replace(/ /g, "");
};
