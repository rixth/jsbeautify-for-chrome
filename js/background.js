var defaultOptionSet = {
  useClippy: true,
  jsbeautify: {
    indent_size: 2,
    indent_char: ' ',
    preserve_newlines: true,
    jslint_happy: true,
    brace_style: 'collapse'
  }
};

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
  if (request.method === 'getOptions') {
    sendResponse(JSON.parse(localStorage.getItem('jsb4cOptions')) || defaultOptionSet);
  } else if (request.method === 'setOptions') {
    localStorage.setItem('jsb4cOptions', JSON.stringify(request.options));
  }
});