var export_btn = document.getElementById("export");
var more_btn = document.getElementById("more");

chrome.runtime.connect({ name: "huzayfah" });

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
        chrome.runtime.sendMessage({greet_2: "scanE"}, function(response) {
          console.log(response.farewell);
        });
      }
    });
    
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
      sendResponse({farewell: "Scanning Ended"});
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