

"use strict";
/* == [ properties ]
== == == == == == == == == */
const 
   _ = ( ...v ) => console.log( ...v )
   ,
   table = v => console.table( v )
   ,
   $ = ( v, i ) => {
      if( !i ) {
         return document.querySelector( v );
      } else {
         return document.querySelectorAll( v );
      }
   }
   ,
   $$ = v => document.querySelectorAll( v )
   ,
   toBrl = v => v.toLocaleString( "pt-br", { "style": "currency", "currency": "BRL" } )
   ,
   brlToInt = v => {
      return(
         parseInt( v.replace( "R$", "" ).replaceAll( ".", "" ).replace( ",00", "" ) )
      );
   } 
   ,
   brlToFloat = v => {
      return(
         parseFloat( v.replace( "R$", "" ).replaceAll( ".", "" ).replace( ",", "." ) )
      );
   } 
   ,
   fix = v => v.toFixed( 2 )
   ,
   add0 = v => {
      if( v < 10 ) {
         return( `0${ v }` );
      } else {
         return( v );
      }
   }
;

function FormatNumber( link ) {
   let data = link;
   data = data.replaceAll( /\(/gi, "" );
   data = data.replaceAll( /\)/gi, "" );
   data = data.replaceAll( /\-/gi, "" );
   data = data.replaceAll( /\ /gi, "" );
   return data;
}

HTMLElement.prototype.$ = function( v ) {
   return( this.querySelectorAll( v ) );
}

HTMLElement.prototype.attribute = function( v ) {
   return( 
      this.getAttribute( v )
   );
}

String.prototype.data = function( v ) {
   return(
      JSON.parse( this )
   );
}

HTMLElement.prototype.$attribute = function( v ) {
   return( 
      this.getAttribute( v )
   );
}
// _( "HTMLElement: ", submit_calcular.$a( "type" ) );

/* -------------------------------- */



/* == [ events ]
== == == == == == == == == */
window.addEventListener( "load", ev => {
	
   /* == [ navlink ] 
   == == == == == == == == == */
   $$( "navlink" ).forEach( nl => {  
      _( "oi" );
      nl.outerHTML = `
         <p>
            <a href="${ nl.getAttribute( "to" ) }"
               target="_blank" >
               ${ nl.innerText }
            </a>
         </p>
      `;
   } );
   
   /* == [ padding ] 
   == == == == == == == == == */
   $$( "[pd]" ).forEach( p => {
      p.style.padding = p.getAttribute( "pd" );
   } );
   
   /* == [ gap ] 
   == == == == == == == == == */
   $$( "[gap]" ).forEach( g => {
      g.style.gap = g.getAttribute( "gap" );
   } );
   
   /* == [ aspect ratio ] 
   == == == == == == == == == */
   $$( "[ratio]" ).forEach( ratio => {
      ratio.style.aspectRatio = ratio.getAttribute( "ratio" );
   } );

   if( $$( "body" ) instanceof NodeList ) {
      _(
         "NodeList"
      );
   }

} );