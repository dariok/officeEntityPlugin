# officeEntityPlugin
A MS Office plug-in to access and link a controlled vocab loaded from a remote server

Usage:

1. (Deploy .html and .js to a [web] server and update the link in the manifest -- links in the format "\\server\share\entity.html" do also work)
2. Store the manifest in a place that is recognised as a safe repo by word
    * (Word Options, Trust Center, Settings, App Catalogs, enter URL, add)
3. Insert, My Apps, Shared Folder, select and OK
4. In App Catalogs above, check the "Show in Menu" checkbox)
5. (Word2016) In the Ribbon menu, open the plugin by "Einfügen > Addins > My Addins > Shared Folders > Entity" -- in subsequent calls it is possible to open the plugin via "Einfügen > Addins > recent Addins"

Note for Windows 10: If the plugin does not seem to accept any keyboard input in a setting with the plugin code stored on local/intranet location, open Internet Explorer 11 (which is what is used internally by Word on Windows to display the plugin html code), navigate to "compatibility preferences" (not in general internet prefs!) and uncheck the "run intranet pages in compatibility mode" checkbox. 

