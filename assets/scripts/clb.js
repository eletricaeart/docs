

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

HTMLElement.prototype.attribute = function( v ) {
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



   /**
    * doc-title 
    * */
   $( 'doc-title', 1 ).forEach( ( title, i ) => {
      let 
      // <t style='font-weight: 700; color: #00559c'>
      // <t style='font-weight: 700; color: var( --sv-beija-flor )'>
         data = title.getAttribute( 'subtitle' ) ? `
            <t style='font-weight: 700; color: var( --sv-azul-bebe )'>
               ${ title.getAttribute( 'subtitle' ) }
            </t>
         ` : null
      ;

      return( title.innerHTML = `
         ${ data && data }
         <t style='font-weight: 700; color: #003b6b\'>
            ${ title.innerHTML }
         </t>
      ` );
      
   } );

   /**
    * article 
    * */
   $( 'article', 1 ).forEach( ( article, i ) => {
      let 
         children = article.innerHTML 
      ;
      if( article.getAttribute( "label" ) ) {
         article.innerHTML = `
            <ui>
               <header>
                  <ttl>
                     ${ article.getAttribute( 'label' ) }
                  </ttl>
               </header>
               <content>
                  ${ children }
               </content>
            </ui>
         `;
      }
   } );

   /**
    * section 
    * */
   $( 'section', 1 ).forEach( ( section, i ) => {
      let 
         children = section.innerHTML 
      ;
      if( section.getAttribute( "label" ) ) {
         section.innerHTML = `
            <ui>
               <header>
                  <t6>
                     ${ section.getAttribute( 'label' ) }
                  </t6>
               </header>
               <content>
                  ${ children }
               </content>
            </ui>
         `;
      }
   } );


   /**
    * cliente 
    * */
   $( 'cliente', 1 ).forEach( ( cliente, i ) => {
      let 
         children = cliente.innerHTML 
         ,
         nome = `
            <t>
               <b>Nome </b> ${ cliente.getAttribute( 'nome' ) }
            </t>` || null
         ,
         endereço = `
            <t>
               <b>Endereço </b>
               ${ cliente.getAttribute( 'endereço' )  }
            </t>` || null
      ;
      cliente.innerHTML = `
         <ui>
            <header>
               <ui>
                  Cliente 
               </ui>
            </header>
            <content>
               <card>
                  <ui>
                     ${ nome && nome }
                     ${ endereço && endereço }
                     ${ children && children }
                  </ui>
               </card>
            </content>
         </ui>
      `;
   } );


   /**
    * assinaturas 
    * */
   $( 'signatures', 1 ).forEach( ( signatures, i ) => {
      let 
         children = signatures.innerHTML
      ;
      signatures.innerHTML = `
         <!-- <section>
            <p pdh>
               Declaro estar ciente e de acordo com o presente orçamento:
            </p>
         </section> -->
         <signature section>
            <content>

               <!-- <sig-name>Assinatura do Responsável Técnico</sig-name> -->
               <sig-name>Rafael - Elétrica&Art</sig-name>
               
               <!-- Elétrica&Art  -->
               <!--Rafael - Elétrica&Art-->
            </content>
         </signature>
         <signature section>
            <content>
               <sig-name>Assinatura do Cliente</sig-name> 

            </content>
         </signature>
         <!-- <content>
            <p style="text-align: center;">TESTEMUNHAS</p>
         </content>
         <row>
            <signature section>
               <content>
                  <sig-name>CPF</sig-name>
               </content>
            </signature>
            <signature section>
               <content>
                  <sig-name>CPF</sig-name>
               </content>
            </signature>
         </row> -->
      `;
   } );

} );