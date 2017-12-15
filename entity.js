Office.initialize = function (reason) {
    // Checks for the DOM to load using the jQuery ready function.
    $(document).ready(function () {
        $('#s0').html( reason );
    });
};

function insertLink ( link ) {
        Office.context.document.getSelectedDataAsync(
                Office.CoercionType.Html,
                function (result) {
                        if (result.status == "succeeded") {
                                // Get the OOXML returned from the getSelectedDataAsync call
                                var ret = $( result.value );
                                var par = ret.find('.Paragraph');
                                var selectedText = par.text();
                                var elem = ret.find('.TextRun').first();
                                elem.html(`<a href="${link}">${selectedText}</a>`);
                                console.log( wrap );

                                Office.context.document.setSelectedDataAsync(
                                        par.html(),
                                        { coercionType: Office.CoercionType.Html },
                                        function (asyncResult) {
                                                if (asyncResult.status == "failed") {
                                                        console.log(asyncResult.error.message);
                                                        console.log(asyncResult.error.name);
                                                }
                                        }
                                );
                        }
                }
        );
}