// ==UserScript==
// @name        Monospaced Selection
// @namespace   monoselect-it
// @include     https://rt.portaone.com/Ticket/Display.html*
// @version     1
// @grant       GM_addStyle
// ==/UserScript==

var monoButton = document.createElement ('div');
monoButton.innerHTML = "<a>Monospace it!</a>";
monoButton.setAttribute ('id', 'monoselect-button');
document.body.appendChild(monoButton);

//--- Activate the newly added button.
document.getElementById ("monoselect-button").addEventListener (
    "click", monospaceSelected, false
);

//--- Style our newly added elements using CSS.
GM_addStyle ( multilineStr ( function () {/*!
    #monoselect-button { 
        height: 104px; 
        width: 104px; 
        position: fixed; 
        top: 69%;
        z-index: 999;
        transform: rotate(-90deg);
        -webkit-transform: rotate(-90deg); 
        -moz-transform: rotate(-90deg); 
        -o-transform: rotate(-90deg); 
        filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=3);
    }
    #monoselect-button a { 
       display: block; 
       background: #ff5300; 
       height: 16px; 
       width: 111px; 
       padding: 8px 16px;
       color: #fff; 
       font-family: monospace; 
       font-size: 14px; 
       font-weight: bold; 
       text-align: center; 
       text-decoration: none; 
       border-bottom: solid 1px #333;
       border-left: solid 1px #333;
       border-right: solid 1px #333;
       -moz-user-select: none;
       -webkit-user-select: none;
       -ms-user-select: none;
       user-select: none;
    }

    #monoselect-button a:hover { 
       background: #50c878; 
    }
    
    #monoselect {
       font-family: monospace;
       white-space: pre;
    }
*/} ) );

function multilineStr (dummyFunc) {
    var str = dummyFunc.toString ();
    str     = str.replace (/^[^\/]+\/\*!?/, '') // Strip function () { /*!
            .replace (/\s*\*\/\s*\}\s*$/, '')   // Strip */ }
            .replace (/\/\/.+$/gm, '') // Double-slash comments wreck CSS. Strip them.
            ;
    return str;
}

function monospaceSelected() {
    try {
        if (window.ActiveXObject) {
            var selection = document.selection.createRange();
            return selection.htmlText;
        }
    
        var spanAroundSelection = document.createElement("span");
        spanAroundSelection.setAttribute ('id', 'monoselect');
        var selection = getSelection().getRangeAt(0);
        selection.surroundContents(spanAroundSelection);
        return spanAroundSelection.innerHTML;
    } catch (e) {
        if (window.ActiveXObject) {
            return document.selection.createRange();
        } else {
            return getSelection();
        }
    }
}
