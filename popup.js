var export_btn = document.getElementById("export");
var more_btn = document.getElementById("more");

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

const scanMore = () => {
  chrome.storage.sync.get(['con_arr'], function(result) {
    console.log('Value currently is ' + result.con_arr);

    var div_height = document.getElementsByClassName('_3uIPm WYyr1');
    var scroll_div = document.getElementById('pane-side');
    var contact_rep = document.getElementsByClassName('_3OvU8');

    var max_h = parseInt(div_height[0].style.height);
      var contact_n_class = document.getElementsByClassName('_3q9s6');
      console.log(contact_rep.length);

      for(var i=0; i<contact_rep.length; i++){
          
        if(parseInt(contact_rep[i].firstElementChild.firstElementChild.firstElementChild.innerText) > 0){
            if(!result.con_arr.includes(contact_rep[i].firstElementChild.firstElementChild.firstElementChild.innerText)){
                result.con_arr.push(contact_rep[i].firstElementChild.firstElementChild.firstElementChild.innerText);
                console.log(contact_rep[i].firstElementChild.firstElementChild.firstElementChild.innerText);
            }
        }
      }

      chrome.storage.sync.get(['scroll_h'], function(result) {
        scroll_div.scroll(0, result.scroll_h);
        result.scroll_h = result.scroll_h + 500;
        chrome.storage.sync.set({scroll_h: result.scroll_h}, function() {});
      });
    
    console.log(result.con_arr);
    chrome.storage.sync.set({con_arr: result.con_arr}, function() {
        console.log(parseInt(result.con_arr[98]));
    });
    
  });
}

const Export = () => {
    chrome.storage.sync.get(['con_arr'], function(result) {
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