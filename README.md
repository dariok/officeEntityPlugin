# officeEntityPlugin
A MS Office plug-in to access and link a controlled vocab loaded from a remote server

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

1. The manifest needs to be stored either on an Exchange server or on a web server via HTTPS with a valid certificate that is trusted by Windows.
1. If Word does not the plugin on a web server, it may be that Office expects an IIS as web server; try setting up one or using a (localhost) network share.
1. The path to be entered in step 4 is the __path to the directory containing the manifest file__; it *must not* point to the manifest file directly.
1. The data endpoint from which the data is fetched needs to be HTTPS if the HTML and/or manifest is stored on an HTTPS web server.
1. For **Windows 10:** If the plugin does not seem to accept any keyboard input in a setting with the plugin code stored on local/intranet location, open Internet Explorer 11 (which is what is used internally by Word on Windows to display the plugin html code), navigate to "compatibility preferences" (not in general internet prefs!) and uncheck the "run intranet pages in compatibility mode" checkbox.
1. For **Word 2016 on Windows**: If the plugin is active while saving a .dotx Word Template file (and entity.html and .js are in a readable place), it will be added for new users automatically as soon as they start with a new .docx based on the .dotx. (If this instance is the first time the plugin is used, Word asks for trust, and the Windows 10 note above applies as well.)
