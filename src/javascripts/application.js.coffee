#= require options.js
#= require beautify.module.js

return if !location.href.match(/\.js(?:\?|$)/) || document.body.querySelectorAll('*').length != 1

optionStore.get (options) ->
  notification = document.createElement 'div'
  noBtn = document.createElement 'a'
  secondsTillHide = 4

  noBtn.id = 'jsb4c-no'
  noBtn.appendChild document.createTextNode("No #{secondsTillHide}")

  if options.useClippy
    notification.id = "jsb4c-clippy"
    yesBtn = document.createElement('a')
    yesBtn.id = 'jsb4c-yes'
    yesBtn.appendChild document.createTextNode("Yes")

    notification.style.backgroundImage = 'url(' + chrome.extension.getURL('assets/its-clippy-motherfuckers.png') + ')'
    notification.appendChild yesBtn
    formatConfirmElement = yesBtn
  else
    notification.id = "jsb4c-bar"
    notification.appendChild document.createTextNode("This looks like a JavaScript file. Click this bar to format it.")
    noBtn.style.backgroundImage = 'url(' + chrome.extension.getURL('assets/close-icon.png') + ')';
    formatConfirmElement = notification

  notification.appendChild noBtn
  document.body.appendChild notification

  noBtn.addEventListener 'click', (event) ->
    gtfoClippy()
    event.preventDefault()
    event.stopPropagation();
  , false

  formatConfirmElement.addEventListener 'click', (event) ->
    code = document.getElementsByTagName('pre')[0];
    code.textContent = js_beautify(code.textContent, options);
    gtfoClippy();
    event.preventDefault();
    event.stopPropagation();
  , false

  gtfoClippy = ->
    clearInterval autohideInterval
    notification.className = ''
    setTimeout ->
      notification.parentNode.removeChild notification
    , 1000

  setTimeout ->
    notification.className = 'jsb4c-visible'
  , 350

  autohideInterval = setInterval ->
    if secondsTillHide <= 0
      gtfoClippy()
      clearInterval autohideInterval
    else
      noBtn.innerHTML = noBtn.innerHTML.replace(/\d/, secondsTillHide)
    secondsTillHide--
  , 1000


