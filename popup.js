var export_btn = document.getElementById("export");
var more_btn = document.getElementById("more");
var input_msg = document.getElementById('message');
var msg_btn = document.getElementById('msg_btn');

chrome.runtime.connect({ name: "huzayfah" });

msg_btn.addEventListener('click', async () => {
  chrome.storage.local.set({huza_msg: input_msg.value}, function() {});

  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: sendWMessage,
  });
});

more_btn.addEventListener('click', async () => {

  more_btn.innerText = "Scan More...";
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: scanMore,
  });
});

export_btn.addEventListener('click', async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: Export,
  });
});

const sendWMessage = async () => {

  chrome.storage.local.get(['con_arr'], function(result){
    chrome.storage.local.get(['arr_itr'], function(r2){

      var div_height = document.getElementsByClassName('_3uIPm WYyr1');
      var contact_rep = document.getElementsByClassName('_3OvU8');
      var scroll_div = document.getElementById('pane-side');

      var max_h = parseInt(div_height[0].style.height);

      var searchScroll = true;

        for(var i=0; i<contact_rep.length; i++){
          if(contact_rep[i].firstElementChild.firstElementChild.firstElementChild.innerText === result.con_arr[r2.arr_itr]){
            console.log("found", contact_rep[i].firstElementChild.firstElementChild.firstElementChild.innerText);
            function simulateMouseEvents(element, eventName)
            {
                const evt = new MouseEvent(eventName, {
                    "clientX" : 0,
                    "clientY" : 0,
                    "screenX" : 0,
                    "screenY" : 0,
                    "ctrlKey" : false,
                    "altKey" : false,
                    "shiftKey" : false,
                    "metaKey" : false,
                    "button" : 0,
                    "relatedTarget" : null,
                    "bubbles" : true,
                    "cancelable" : true
                });
                element.dispatchEvent(evt);
            }
            var name = result.con_arr[r2.arr_itr]; 
            simulateMouseEvents(document.querySelector('[title="' + name + '"]'), 'mousedown');
            searchScroll = false;

            r2.arr_itr = r2.arr_itr + 1;

            if(r2.arr_itr > result.con_arr.length){
              break;
            }

            const set_itr = async () => {
              await chrome.storage.local.set({arr_itr: r2.arr_itr}, function() {});
            }
            set_itr();

            const set_scroll = async () => {
              r2.scroll_h = r2.scroll_h - 500;
              await chrome.storage.local.set({scroll_h: r2.scroll_h}, function() {});
            }
            set_scroll();

            setTimeout(() => {
              if(r2.arr_itr < result.con_arr.length){
                chrome.runtime.sendMessage({greet_4: "scan_send"}, function(response) {
                  console.log(response.farewell);
                });
              }
            }, 200);

            break;
          }
        }

        if(searchScroll){
          chrome.storage.local.get(['scroll_h'], function(r3){
            scroll_div.scroll(0, r3.scroll_h);

            r3.scroll_h = r3.scroll_h + 500;

            const set_scroll = async () => {
              await chrome.storage.local.set({scroll_h: r3.scroll_h}, function() {});
            }
            set_scroll();

            setTimeout(() => {
              
              if(max_h - r3.scroll_h  > 0){
                chrome.runtime.sendMessage({greet_4: "scan_send"}, function(response) {
                  console.log(response.farewell);
                });
              }
          }, 200);
        });
        
        }
        
        function sleep(milliseconds) {
          var start = new Date().getTime();
          for (var i = 0; i < 1e7; i++) {
            if ((new Date().getTime() - start) > milliseconds){
              break;
            }
          }
        }
        
        sleep(1000);
    })
  })

  function simulateMouseEvents(element, eventName)
  {
    const evt = new MouseEvent(eventName, {
          "clientX" : 0,
          "clientY" : 0,
          "screenX" : 0,
          "screenY" : 0,
          "ctrlKey" : false,
          "altKey" : false,
          "shiftKey" : false,
          "metaKey" : false,
          "button" : 0,
          "relatedTarget" : null,
          "bubbles" : true,
          "cancelable" : true
      });
      element.dispatchEvent(evt);
  }
    
  simulateMouseEvents(document.querySelector('[title = "Search input textbox"]'), 'mousedown');
}

const scanMore = async () => {

  await chrome.storage.local.get(['con_arr'], function(result) {

    var div_height = document.getElementsByClassName('_3uIPm WYyr1');
    var scroll_div = document.getElementById('pane-side');
    var contact_rep = document.getElementsByClassName('_3OvU8');

    var max_h = parseInt(div_height[0].style.height);
    console.log("Maximum h", max_h);

    var contact_n_class = document.getElementsByClassName('_3q9s6');
    console.log("Scanning Looping", contact_rep.length);

    for(var i=0; i<contact_rep.length; i++){
        
      if(parseInt(contact_rep[i].firstElementChild.firstElementChild.firstElementChild.innerText)){
          if(!result.con_arr.includes(contact_rep[i].firstElementChild.firstElementChild.firstElementChild.innerText)){
              result.con_arr.push(contact_rep[i].firstElementChild.firstElementChild.firstElementChild.innerText);
              console.log(contact_rep[i].firstElementChild.firstElementChild.firstElementChild.innerText);
          }
      }
    }
    
    console.log(result.con_arr);
    const set_arr = async () => {
      await chrome.storage.local.set({con_arr: result.con_arr}, function() {});
    }

    set_arr();

    setTimeout(() => {
      chrome.storage.local.get(['scroll_h'], function(result) {

        scroll_div.scroll(0, result.scroll_h);
        console.log("scrolling", result.scroll_h);
        result.scroll_h = result.scroll_h + 500;
  
        const set_scroll = async () => {
          await chrome.storage.local.set({scroll_h: result.scroll_h}, function() {});
        }
  
        set_scroll();
      
        if(max_h - result.scroll_h  > 0){
          chrome.runtime.sendMessage({greeting: "scanM"}, function(response) {
            console.log(response.farewell);
          });
        }else{
          scroll_div.scroll(0, 0);
          chrome.runtime.sendMessage({greet_2: "scanE"}, function(response) {
            console.log(response.farewell);
          });
        }
      });
    }, 100);
    
  });
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    if (request.greeting === "scanM"){
      document.getElementById('more').click();
      sendResponse({farewell: "Executing Scan Morer"});
    }else if(request.greet_2 === "scanE"){
      document.getElementById('more').innerText = "Scan Ended";
      document.getElementById('more').style.backgroundColor = "red";
      chrome.storage.local.set({scroll_h: 500}, function() {});
      sendResponse({farewell: "Scanning Ended"});
    }else if(request.greet_3 === "sendMore"){
      console.log("Fuck");
      document.getElementById('msg_btn').click();
      sendResponse({farewell: "Executing sending ..."});
    }else if(request.greet_4 === "scan_send"){
      console.log("Fuck");
      document.getElementById('msg_btn').click();
      sendResponse({farewell: "Scaning more for sending..."});
    }
  }
);

const Export = async () => {
    await chrome.storage.local.get(['con_arr'], function(result) {
        console.log(result.con_arr);

        var CsvString = "";
        
        result.con_arr.forEach(function(RowItem, RowIndex) {
              CsvString += RowItem + ',';
            CsvString += "\r\n";
          });

        CsvString = "data:application/csv," + encodeURIComponent(CsvString);
        var x = document.createElement("A");
        x.setAttribute("href", CsvString );
        x.setAttribute("download","somedata.csv");
        document.body.appendChild(x);
        x.click();
      });
}
