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

var name = "+91 96225 46041";
  
simulateMouseEvents(document.querySelector('[title="' + name + '"]'), 'mousedown');

function startTimer()
{
    setTimeout(myFunc, 500);
}

startTimer();


var eventFire = (MyElement, ElementType) => {

    var event = new MouseEvent(ElementType, {
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
    MyElement.dispatchEvent(event);
};
  
async function myFunc()
{
  
    messageBox = document.querySelectorAll("[contenteditable='true']")[1];
  
    message = "Hii, Nishant :)  https://www.youtube.com/watch?v=fePPdLod__E";
  
    counter = 1;
  
    for (i = 0; i < counter; i++) {

        messageBox.innerHTML = message.replace(/ /gm, ''); // test it

        var event = new UIEvent("input", {
            "bubbles" : true,
            "cancelable" : true,
            "view" : window,
            "detail" : 1
        });

        messageBox.dispatchEvent(event);
  
        await eventFire(document.querySelector('span[data-icon="send"]'), 'click');
    }
}

myFunc();