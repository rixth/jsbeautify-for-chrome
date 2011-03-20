(function () {
  var clippy = document.createElement('div'),
      yes = document.createElement('a'),
      no = document.createElement('a'),
      autoHideInterval,
      secondsTillHide = 4;
      
  clippy.id = 'jsb4c-clippy';
  clippy.style.backgroundImage = 'url(' + chrome.extension.getURL("img/its-clippy-motherfuckers.png") + ')';
  
  yes.id = 'jsb4c-yes';
  yes.appendChild(document.createTextNode('Yes'));
  
  no.id = 'jsb4c-no';
  no.appendChild(document.createTextNode('No (' + secondsTillHide + ')'));
  
  clippy.appendChild(yes);
  clippy.appendChild(no);
  
  document.body.appendChild(clippy);

  setTimeout(function () {
    clippy.className = 'jsb4c-visible';
  }, 350);

  no.addEventListener('click', function (event) {
    clippy.className = '';
    event.preventDefault();
    event.stopPropagation();
  }, false);
  
  yes.addEventListener('click', function (event) {
    var code = document.getElementsByTagName('pre')[0];
    code.textContent = js_beautify(code.textContent);
    
    clippy.className = '';
    event.preventDefault();
    event.stopPropagation();
  }, false);
  
  // Auto timer to make clippy go away
  autoHideInterval = setInterval(function () {
    if (secondsTillHide <= 0) {
      clippy.className = '';
      clearInterval(autoHideInterval);
    } else {
      no.innerHTML = no.innerHTML.replace(/\d/, secondsTillHide);
    }
    secondsTillHide--;
  }, 1000);
}());
