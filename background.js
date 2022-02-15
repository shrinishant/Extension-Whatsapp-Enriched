chrome.storage.local.set({con_arr: ["i"]}, function() {
    console.log('Value is set to ');
});

chrome.storage.local.set({scroll_h: 500}, function() {});

chrome.storage.local.set({huza_msg: ""}, function() {});

chrome.storage.local.set({arr_itr: 1}, function() { });

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