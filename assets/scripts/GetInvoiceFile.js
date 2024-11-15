

const 
   GetInvoiceFile = ( props) => {
      const 
         // invoice = this.document.querySelector( "#invoice" )
         invoice = $( props.tagID )
      ;
      // console.log( invoice );
      // _( $( "props.tagID: \n", props.tagID ) );
      //_( $( "invoice: \n", invoice ) );
      _( window );
      var data = {
         // margin: 1,
         margin: 0,
         filename: "orçamento.pdf",
         // filename: props.fileName,
         image: { type: "png", quality: 100 },
         autoPaging: 'text',
         x: 0,
         y: 0,
         html2canvas: { 
            width: 792,
            height: 1120,
            windowWidth: 792,
            windowHeight: 1120,
            dpi: 300,
            letterRendering: true,
            useCORS: true,
            // allowTaint: true,
            imageTimeout: 15000,
            scale: 1
         },
         jsPDF: { 
            // unit: "in", "pt", "mm", "cm", "m", "in" or "px".
            unit: "pt", 
            // format: "letter", a0 - a10, b0 - b10, c0 - c10, dl, letter, government-letter, 
            // legal, junior-legal, ledger, tabloid, [595.28, 841.89]
            format: "a4", 
            orientation: "portrait",
            precision: 1,
         }
      };
      html2pdf().set( {
         pagebreak: { mode: 'avoid-all', before: props.pageBreak }
      } ); 
      html2pdf().from( invoice ).set( data ).save();
   }
;