export const toBrl = v => v.toLocaleString("pt-br", { "style": "currency", "currency": "BRL" });

export const brlToInt = v => {
   return parseInt(v.replace("R$", "").replaceAll(".", "").replace(",00", ""));
};

export const brlToFloat = v => {
   return parseFloat(v.replace("R$", "").replaceAll(".", "").replace(",", "."));
};

export const fix = v => v.toFixed(2);

export const add0 = v => {
   if (v < 10) {
      return (`0${v}`);
   } else {
      return (v);
   }
};

export function FormatNumber(link) {
   let data = link;
   data = data.replaceAll(/\(/gi, "");
   data = data.replaceAll(/\)/gi, "");
   data = data.replaceAll(/\-/gi, "");
   data = data.replaceAll(/\ /gi, "");
   return data;
}
