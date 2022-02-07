chrome.storage.local.set({con_arr: ["i"]}, function() {
    console.log('Value is set to ');
});

chrome.storage.local.set({scroll_h: 500}, function() {});

chrome.runtime.onConnect.addListener(function(port) {
    if (port.name === "huzayfah") {
        port.onDisconnect.addListener(function() {
            chrome.storage.local.set({con_arr: ["i"]}, function() {
                console.log('Value is set to ');
            });
            
            chrome.storage.local.set({scroll_h: 500}, function() {});
        });
    }
});