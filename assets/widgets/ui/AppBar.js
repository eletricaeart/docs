

function AppBar( props ) {
   $$( "appbar" ).forEach( a => {
      return( a.outerHTML = `
         <appbar>
            <content>
               <appbar-menu-left>
                  <content>
                     <back-btn id="backBtn">
                        <bar id="backBtn_topBar"></bar>
                        <bar id="backBtn_centerBar"></bar>
                        <bar id="backBtn_bottomBar"></bar>
                     </back-btn>
                  </content>
               </appbar-menu-left>
               <appbar-logo>
                  <ea-logo>
                     <logo-icon>
                        <img src="./ea.jpg" alt="ea" />
                     </logo-icon>
                     <logo-title>
                        <content>
                           <tt>ELETRICA</tt>
                           <tt>&</tt>
                           <tt>ART</tt>
                        </content>
                     </logo-title>
                  </ea-logo>
               </appbar-logo>
               <appbar-menu-right>
                  <content id="">
                     <trigram id="openDrawer">
                        <bar id="topBar_left"></bar>
                        <bar id="centerBar_left"></bar>
                        <bar id="bottomBar_left"></bar>
                     </trigram>
                  </content>
               </appbar-menu-right>
            </content>
         </appbar>      
      `);
   } );
}

AppBar();