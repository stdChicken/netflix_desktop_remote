
//document.body.style.border = "5px solid red";

let socket = null;

/*
fetch('https://cdn.ghacks.net/wp-content/uploads/2015/12/firefox-addon-detector.jpg', { method: 'GET' }).then(function(msg) {
    console.log("test");    

}).catch( function(err) {
    console.log("error 3 " + err);
});
*/

function Click_Netflix_Btn(className) {
    const btn = document.getElementsByClassName(className)
    btn[0].click();
}

const functionMap = {
    pause: function() {
        const btn = document.getElementsByClassName("button-nfplayerPause")
        if(btn.length) {
            btn[0].click();        
        } else {
            Click_Netflix_Btn("button-nfplayerPlay");
        }
    },

    jumpahead: function() {
        Click_Netflix_Btn("button-nfplayerFastForward");
    },

    jumpback: function() {
        Click_Netflix_Btn("button-nfplayerBackTen");
    },

    nextepisode: function() {
        Click_Netflix_Btn("button-nfplayerNextEpisode");
    },

    skipcredits: function() {
        const btn = document.getElementsByClassName("skip-credits")
        btn[0].firstChild.click()
    },

    togglefullscreen: function() {
        Click_Netflix_Btn("button-nfplayerFullscreen");
    },

    togglemute: function() {
        const list = document.getElementsByClassName("PlayerControls--control-element");
        for(let i = 0; i < list.length; i++) {
            const a = list[i];
            if (a.getAttribute("data-uia") === "volume-container" ) {
                a.click();
            }
        }
    }
}


function StartListening() {
    console.log("logging in...");
    fetch('http://localhost:8080/login', { method: 'POST', credentials: 'include' }).then(function(msg) {
        console.log("logged in! ", msg);    
        socket = new WebSocket("ws://localhost:8080");
        console.log("socket open...");
        
        socket.onmessage = function (event) {
            console.log(event.data);
            try {
                functionMap[event.data]();
            } catch(err) {
                console.log("unrecognized command", event.data)
            }
        }

        socket.onclose = function() {
            console.log("socket was closed...")
            StartListening();
        };

    }).catch( function(err) {
        console.log("error " + err);        
        setTimeout(StartListening, 2000 )
    });
}

StartListening();






/*
var x = new XMLHttpRequest();
x.open("POST", "http://localhost:8080/login");
x.send("");

x.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        console.log("x.responseText: " + x.responseText);
    }
};
*/

/*
fetch('http://localhost:8080/', {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: ""
}).then( function() {
    console.log("hej")
}).catch( function(err) {
    console.log("error 2 " + err);    
});
*/