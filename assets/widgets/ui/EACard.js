

let 
   eaLogos = {
      remote: "https://rawcdn.githack.com/eletricaeart/app/6e75f2fa11d56872a7e284e03c20bd865925ff2c/src/images/EA/globo-de-plasma-300.png?raw=true",
      local: "../assets/eaLogos/ea300.png",
      name: "../assets/eaLogos/ea-Name.png",
   }
   ,
   bgs = {
      0: "../assets/bgs/bg1-.jpg",
      1: "../assets/bgs/bg1.jpg",
      2: "../assets/bgs/bg2.jpg",
      3: "../assets/bgs/bg3.jpg",
      4: "../assets/bgs/bg4.jpg",
      bg4: "../assets/bgs/bg4.png",
      41: "../assets/bgs/bg41.jpg",
      51: "../assets/bgs/bg4-1.jpg",
      15: "../assets/bgs/15.jpg",
      151: "../assets/bgs/151.jpg",
      1512: "../assets/bgs/1512.jpg",
      1513: "../assets/bgs/1513.jpg",
      152: "../assets/bgs/152.jpg",
      1522: "../assets/bgs/1522.jpg",
      1523: "../assets/bgs/1523.jpg",
      81: "../assets/bgs/81.jpg",
      811: "../assets/bgs/811.jpg",
      812: "../assets/bgs/812.jpg",
   }
   ,
   eaCardStyle = `
      <style>
         @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@800&family=Poppins:wght@500;700;800;900&display=swap');
            
         [section="dual"] {
            display: flex;
            flex-direction: row;
         }
         [section="dual"] > * {
            flex: 1;
         }
         
         ea-card {
            background: var( --card-lv1 );
            background: var( --ea-card, #19497b );
            color: var( --appbar-title );
            /* width: 100%;
            padding: 2vw;
            padding: 1vw;
            aspect-ratio: 5 / 2.3;
            aspect-ratio: 3.8 / 1;
            overflow: hidden;
            font-size: 2vw; */
            font-size: 2.5vw;

            display: grid !important;
            grid-template-columns: .35fr .65fr;
            width: 100%;
            /* height: 36.3vw; */
            aspect-ratio: 3.8/1;
            padding: 1vw;
            inset: 0;
            color: #f5f5f5;
            filter: var( --appbar-filter-shadow );
         }
         ea-card * {
            font-family: "poppins" !important;
         }
         ea-card ea-logo {
            display: flex;
            height: 100%;
            aspect-ratio: 1;
         }
         ea-logo > content {
            align-items: center;
         }
         ea-card ea-logo img {
            width: 100%;
            aspect-ratio: 1;
            border-radius: 100vw;
            /*
            filter: drop-shadow(#27f 0 0 5px);
            border: var( --card-lv3 ) solid .48em;
            border: #009ee6 solid .10em;
            border: #1e0db9cc solid .10em;
            */
            border: #0003 solid .10em;
         }

         ea-card > description {
            display: flex;
            width: 100%;
            /*aspect-ratio: 1.78 / 1;*/
            align-items: center;
            justify-content: center;
            text-align: center;
            font-size: 2.25vw;
            /* text-wrap: nowrap; */
            height: 95%;
            aspect-ratio: 1.8 / 1;
         } 
         ea-card > description h1 {
            margin: 0;
            padding-bottom: 0.5em;
         }

         ea-name {
            display: flex;
            width: 100%;
         }
         
            
         ea-name > img {
            width: 100%;
         }
         
         ea-card > description t {
            display: block;
         }
      </style>
   `
   ,
   testStyle = `
      <style>
         ea-card[section="dual"] {
            background-image: url( "${ bgs.bg4 }" );
            background-size: cover;/*
            background-color: #0009;
            background-blend-mode: color;*/
         }

         [section="dual"] > * {
         }
      </style>
   `
   ,
   eaCardTemplate = `
      <ea-card section="dual">
         ${ eaCardStyle }
         ${ testStyle }
         <ea-logo>
            <content>
               <img 
                  src="${ eaLogos.local }"
                  alt="ea-logo" 
               />
            </content>
         </ea-logo>
         <description section >
            <ea-name>
               <img 
                  src="${ eaLogos.name }"
                  alt="ea-Name" 
               />
            </ea-name>
            <t5>
               CNPJ 32.858.892/0001-52 - IM 67358/0001
            </t5>
            <t>
               Rua José Alves Maciel, 40 - Aviação <br />
               Praia Grande - São Paulo - SP - Cep 11702-440
            </t>
            <t>
               <strong>Fone </strong> ( 13 ) 99768-5853 <br />
               <strong>Whatsapp </strong> ( 13 ) 99768-5853 <br />
               <strong>E-mail </strong> rafa.julia.forever@gmail.com <br />
            </t>
         </description>
      </ea-card>`
;

function EACard( props ) {
   $( "ea-card", 1 ).forEach( tag => {
      return(
         tag.outerHTML = eaCardTemplate
      );
   } );
}

EACard();


/* 

         <description section >
            <h1>ELÉTRICA & ART</h1>
            <t5>
               CNPJ 32.858.892/0001-52 - IM 67358/0001
            </t5>
            <t>
               Rua José Alves Maciel, 40 - Aviação <br />
               Praia Grande - São Paulo - SP - Cep 11702-440
            </t>
            <t>
               <strong>Fone </strong> ( 13 ) 99768-5853 <br />
               <strong>Whatsapp </strong> ( 13 ) 99768-5853 <br />
               <strong>E-mail </strong> rafa.julia.forever@gmail.com <br />
            </t>
         </description>
*/