/*jshint browser: true, jquery: true, indent: 2, white: true, curly: true, forin: true, noarg: true, immed: true, newcap: false, noempty: true, nomen: true, eqeqeq: true, undef: true*/
/*globals chrome, js_beautify, localStorage*/

(function () {
  if (!location.href.match(/\.js(?:\?|$)/) || document.body.querySelectorAll('*').length !== 1) {
    return;
  }
  
  chrome.extension.sendRequest({method: "getOptions"}, function(options) {
    console.log(options);
    var notification = document.createElement('div'),
        no = document.createElement('a'),
        autoHideInterval,
        secondsTillHide = 4,
        useClippy = options.useClippy,
        formatConfirmElement,
        yes;
    
    notification.id = 'jsb4c-' + (useClippy ? 'clippy' : 'bar');

    no.id = 'jsb4c-no';
    no.appendChild(document.createTextNode('No (' + secondsTillHide + ')'));

    if (useClippy) {
      yes = document.createElement('a');
      yes.id = 'jsb4c-yes';
      yes.appendChild(document.createTextNode('Yes'));

      notification.style.backgroundImage = 'url(' + chrome.extension.getURL("img/its-clippy-motherfuckers.png") + ')';
      notification.appendChild(yes);
      formatConfirmElement = yes;
    } else {
      notification.appendChild(document.createTextNode('This looks like a JavaScript file. Click this bar to format it.'));
      no.style.backgroundImage = 'url(' + chrome.extension.getURL("img/close-icon.png") + ')';
      formatConfirmElement = notification;
    }

    notification.appendChild(no);
    document.body.appendChild(notification);

    no.addEventListener('click', function (event) {
      gtfoClippy();
      event.preventDefault();
      event.stopPropagation();
    }, false);

    formatConfirmElement.addEventListener('click', function (event) {
      var code = document.getElementsByTagName('pre')[0];
      console.log(options.jsbeautify);
      code.textContent = js_beautify(code.textContent, options.jsbeautify);

      gtfoClippy();
      event.preventDefault();
      event.stopPropagation();
    }, false);

    function gtfoClippy() {
      clearInterval(autoHideInterval);
      notification.className = '';
      setTimeout(function () {
        notification.parentNode.removeChild(notification);
      }, 1000);
    }

    setTimeout(function () {
      notification.className = 'jsb4c-visible';
    }, 350);

    // Auto timer to make clippy go away
    autoHideInterval = setInterval(function () {
      if (secondsTillHide <= 0) {
        gtfoClippy();
        clearInterval(autoHideInterval);
      } else {
        no.innerHTML = no.innerHTML.replace(/\d/, secondsTillHide);
      }
      secondsTillHide--;
    }, 1000);
  });
}());