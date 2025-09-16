/**
 * Note: This function depends on the html2pdf.js library.
 * Make sure to include it in your project's main HTML file, for example:
 * <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.9.2/html2pdf.bundle.js"></script>
 */
const generatePDF = (elementId, filename = 'document') => {
  const element = document.getElementById(elementId);

  if (!element) {
    console.error(`Error: Element with ID "${elementId}" not found.`);
    return;
  }

  if (typeof html2pdf === 'undefined') {
    console.error("Error: html2pdf() is not defined. Make sure the library is loaded.");
    return;
  }

  const options = {
    margin: [10, 10, 10, 0],
    filename: `${filename}.pdf`,
    image: { type: 'jpeg', quality: 0.90 },
    enableLinks: true,
    autoPaging: 'text',
    html2canvas: {
      width: 792,
      windowWidth: 792,
      windowHeight: 1120,
      dpi: 192,
      letterRendering: true,
      imageTimeout: 1500,
      scale: 2,
    },
    jsPDF: {
      unit: 'pt',
      format: 'a4',
      orientation: 'portrait',
      precision: 1,
      compress: true,
      encryption: {
        userPassword: '787900',
        ownerPassword: '7879',
        userPermissions: ['print'],
      },
    },
  };

  // Configure and run html2pdf
  html2pdf()
    .set({ pagebreak: { mode: 'avoid-all', after: '#break-page' } })
    .from(element)
    .set(options)
    .save();
};

export default generatePDF;
