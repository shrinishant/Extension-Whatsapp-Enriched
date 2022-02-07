# Extension-Whatsapp-Enriched
A Chrome Extension Which Scans through all the unsaved contacts in the chat list and exports them into downloadable excel sheet and sends customised messages including images and videos to the contacts

# Application

To Use the extension developed so far :-

1. As usual, First install the extension into your browser
2. Authenticate yourself to the whatsapp web
3. Open the extension and click on scan
4. Now keep clicking on "scan more" for the contact list you want to scan (Which can be seen to your chat list in the background)
5. Once done with scanning, click on the export btn
6. Tadda, your contact list has been exported to excel sheet :)

* Note - This is feature has been developed to only export the unsaved number in the chat list


# Problem this branch of code has :-

This Extension can scan and export upto only around 470 contact list (unsaved). 
This is because "chrome.extension.sync.get/set" method has been used and this method has certain limitations over the number of times write operation is being porfmed over a time period of one minute.

The error generated is : Unchecked runtime.lastError: This request exceeds the MAX_WRITE_OPERATIONS_PER_MINUTE quota.

This can be solved by using another set of methods provided google chrome extension api, which would be used in another branch.