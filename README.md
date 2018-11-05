# officeEntityPlugin
A MS Office plug-in to access and link a controlled vocab loaded from a remote server

Usage:

1. (Deploy .html and .js to a [web] server and update the link in the manifest -- links in the format "\\server\share\entity.html" do also work)
2. Store the manifest in a place that is recognised as a safe repo by word
    * (Word Options, Trust Center, Settings, App Catalogs, enter URL, add Link to the manifest XML, check "Show in menu")
3. restart Word
3. Insert, My Apps, Shared Folder, select and OK
4. In App Catalogs above, check the "Show in Menu" checkbox)
5. (Word2016) In the Ribbon menu, open the plugin by "Einfügen > Addins > My Addins > Shared Folders > Entity" -- in subsequent calls it is possible to open the plugin via "Einfügen > Addins > recent Addins"

Note that
1) the manifest needs to be stored either on an Exchange server or on a web server via HTTPS with a valid certificate that is trusted by Windows; and
2) the path to be entered in step 2 is the path to the directory containing the manifest file; it should not point to the manifest directly

Note for Windows 10: If the plugin does not seem to accept any keyboard input in a setting with the plugin code stored on local/intranet location, open Internet Explorer 11 (which is what is used internally by Word on Windows to display the plugin html code), navigate to "compatibility preferences" (not in general internet prefs!) and uncheck the "run intranet pages in compatibility mode" checkbox. 

Note for Word 2016 on Windows: If the plugin is active while saving a .dotx Word Template file (and entity.html and .js are in a readable place), it will be added for new users automatically as soon as they start with a new .docx based on the .dotx. (If this instance is the first time the plugin is used, Word asks for trust, and the Windows 10 note above applies as well.)
