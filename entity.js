/* (function () {
"use strict";

// The initialize function is run each time the page is loaded.
Office.initialize = function (reason) {
$(document).ready(function () {

});
};
}

function insertLink () {

}
)();*/

Office.initialize = function () {
};

function insertLink ( link ) {
	Office.context.document.getSelectedDataAsync(
		Office.CoercionType.Text,
		function (result) {
			if (result.status == "succeeded") {
				// Get the OOXML returned from the getSelectedDataAsync call.
				var selectedText = result.value;
				var comment = getLink(selectedText, link);
				Office.context.document.setSelectedDataAsync(
					comment,
					{ coercionType: Office.CoercionType.Ooxml },
					function (asyncResult) {
						if (asyncResult.status == "failed") {
							console.debug("Action failed with error: " + asyncResult.error.message);
						}
					}
				);
			}
		}
	);
}

function getLink ( text, link ) {
	return `
	<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<?mso-application progid="Word.Document"?>
<pkg:package 
    xmlns:pkg="http://schemas.microsoft.com/office/2006/xmlPackage">
    <pkg:part pkg:name="/_rels/.rels" pkg:contentType="application/vnd.openxmlformats-package.relationships+xml" pkg:padding="512">
        <pkg:xmlData>
            <Relationships 
                xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
                <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
            </Relationships>
        </pkg:xmlData>
    </pkg:part>
    <pkg:part pkg:name="/word/_rels/document.xml.rels" pkg:contentType="application/vnd.openxmlformats-package.relationships+xml" pkg:padding="256">
        <pkg:xmlData>
            <Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
                <Relationship Id="rId1"
                    Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink"
                    Target="${link}" TargetMode="External"/>
            </Relationships>
        </pkg:xmlData>
    </pkg:part>
    <pkg:part pkg:name="/word/document.xml" pkg:contentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml">
        <pkg:xmlData>
            <w:document 
                xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
                <w:body>
                    <w:p>
                        <w:hyperlink r:id="rId5" w:history="1">
                            <w:r w:rsidRPr="00E31D0E">
															<w:rPr>
																<w:rStyle w:val="Hyperlink"/>
															</w:rPr>
															<w:t>Person</w:t>
														</w:r>
													</w:hyperlink>
                    </w:p>
                </w:body>
            </w:document>
        </pkg:xmlData>
    </pkg:part>
</pkg:package>
	`;
}