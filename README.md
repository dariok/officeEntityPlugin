# officeEntityPlugin
An MS Office (Word) plug-in to access and link a controlled vocab loaded from a remote server.

It provides a configurable auto complete that writes some form of ID to a Link in Word for text selected by the user.

## Usage:

1. Deploy `entity.html`, `*.js` and `config.json` to a web server or network share.
1. update the value of `DefaultSettings/SourceLocation/@DefaultValue` in `entityManifest.xml` to either the full URL or network share plus file name, pointing to `entity.html` (e.g. `https://example.org/oep/entity.html` or `\\example\oep\entity.html`).
2. Store the manifest in a place that can be configured as a safe repo by word (see below); this may be the same directory where the other files have been deployed.
2. Configure the safe repo within word:
    *Word Options*, *Trust Center*, *Trust Center Settings*, *Trusted App Catalogs*:
    enter the link to the directory or share containing the manifest XML (not to the manifest itself, just the directory!), click "Add"
    check "Show in menu" (the names may differ between versions of Word).
3. restart Word.
3. *Insert*, (*Add Ins*), *My Add Ins*, *Shared Folder*, select and OK.

## Note

1. The manifest needs to be stored either on an Exchange server or on a web server with HTTPS enabled and with a valid certificate that is trusted by Windows.
1. If Word does not find the plugin on a web server, it may be that Office expects an IIS as web server; try setting up one or using a (localhost) network share.
1. The path to be entered in step 4 is the __path to the directory containing the manifest file__; it *must not* point to the manifest file directly.
1. The data endpoint from which the data is fetched needs to be HTTPS if the HTML and/or manifest is stored on an HTTPS web server.
1. For **Windows 10:** If the plugin does not seem to accept any keyboard input in a setting with the plugin code stored on local/intranet location, open Internet Explorer 11 (which is what is used internally by Word on Windows to display the plugin html code), navigate to "compatibility preferences" (not in general internet prefs!) and uncheck the "run intranet pages in compatibility mode" checkbox.
1. For **Word 2016 on Windows**: If the plugin is active while saving a .dotx Word Template file (and entity.html and .js are in a readable place), it will be added for new users automatically as soon as they start with a new .docx based on the .dotx. (If this instance is the first time the plugin is used, Word asks for trust, and the Windows 10 note above applies as well.)

## Configuration and adaptation to endpoints

All configuration options are to be stored in `config.json`. All functions to deal with your specific query endpoint can
be set in `process.js`. Please read the sections below to learn about the options and their effect.
`entity.js` contains the functions to insert sth. into the Word document, namely `insertWordLink(link)` and 
`insertWordText(text)`. These should not be changed as all preprocessing can be done in `process.js`. `form.js` set the
info to be displayed in the form. There should be no need to adjust anything here. Settings go into `config.json`. If your 
use case is not covered, please open an issue rather than adapting these scripts yourself so others can benefit from your
experience.

### config.json

* *server*:"The URL of the server and endpoint up until where the different types of a query are distinguished; e.g.
  `https://example.org/api/v1/`
* *suffix*: any additional parts of the URL that have to be added after the type and before the query string; e.g.
  `fastsearch/`
* `authMode`: which means of authentication is to be used; may be one of "static token" or "dynamic token", or emtpy.
  A static token is one that does not change regularly and may be stored in `config.json` (and may thus be world
  readable!). A dynamic token is one that needs to be requested regularly; it will be read from and stored to local
  storage; see `function handleError` below for this mode of authentication.
* `types`: a list of key/value pairs for the types of queries to be displayed above the text input. The key will be part
  of the URL while the value will be display in the dropdown. Example: `{"person":"Person", "place":"Ort"}`

The query URL generated by typing a string into the text input will be `server + type + suffix` while the query data is
generated by evaluating function `queryString(conf, params)` (see below).

*  *strings*: an array of maps, each one containning 1+ pairs, the values of which are arrays of strings. Each map will be
   converted to a fieldset, the pairs will produce `select` elements whith the strings in the array being the available
   options. Using this, you can create a fixes wording, e.g. for the critical apparatus, without typos.

### process.js

* *function evalResult (result, data, type)* evaluate the response by the query endpoint. `data` is whatever has been returned
  by the endpoint. Needs to push to `result.results` for every entry to be displayed an array of key/value pairs:
  `{"id": $id, "text": $display}` where `$id` is the value that is to be written into the URL in Word and `$display` is
  the text to be displayed in the autocomplete preview. `type` contains the type of the entity as selected from the
  dropdown menu.
* *function queryString (conf, params)* returns the query data. `conf` is the configuration loaded from `config.json`;
  `params.term` is what has been entered into the text input.
* *function handleError (jqXHR, textStatus, errorThrown)* handle errors returned by the query to the endpoint. Most
  notably, for `dynamic token` authentication, this must include a subroutine to re-authenticate with the query endpoint.
  This subroutine needs to write the new token to local storage: `localStorage.setItem('oepDynamicToken', newToken)`
  and call `setConf()` afterwards.
* *function insertText (elements)* if strings have been defined in `config.json`, what happens after submitting them can be
  set here. In most cases, you might want to call *insertWordText(string)*.
* *function insertLink (link)* what to do with the link returned after selecting and submitting an entity from the dropdown.
  In most cases, you might want to call *insertWordLink(string)*.
