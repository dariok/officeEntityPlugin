/* globals Office */
/* jshint browser: true */

Office.initialize = function ( reason ) {
  // Checks for the DOM to load using the jQuery ready function.
  $( document ).ready(
    function () {
    // void
    }
  );
};

function insertWordLink ( link ) {
  // get the selected data as HTML
  Office.context.document.getSelectedDataAsync(
    Office.CoercionType.Html,
    function ( result ) {
      if ( result.status == "succeeded" ) {
        // the selected data as HTML, i.e. incl. formatting
        var res = $( result.value );
        
        // there should be exactly one p in there that contains the selected text
        // it is a p due to schema constraints
        var ret = res.find( 'p' );
        
        // the selected text is inside spans that correspond to Word's "runs" (w:r)
        // @style contains all styling information and needs to be kept
        var text = ret.html();
        
        //we simply wrap the contents of that p in an html:a and write it back
        var ref = '<a href="' + link + '" style="text-decoration:none">' + text + '</a>';
        
        Office.context.document.setSelectedDataAsync(
          ref,
          { coercionType: Office.CoercionType.Html },
          function ( asyncResult ) {
            console.log( asyncResult.status );
          }
        );
      }
    }
  );
}

function insertWordText ( text ) {
  Office.context.document.getSelectedDataAsync(
    Office.coercionType.Html,
    function (result) {
      if (result.status == "succeeded") {
        var ins = "<span>" + text + "</span>";
        
        Office.context.document.setSelectedDataAsync(
          ins,
          {coercionType: Office.CoercionType.Html},
          function (syncResult) {
            console.log(asyncResult.status);
          }
        );
      }
    });
}

function process ( data, type ) {
  console.log(data);
  var result = { results: [] };
  evalResult(result, data, type);
  return result.results;
}