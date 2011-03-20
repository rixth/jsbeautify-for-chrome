(function () {
  $('body').append('<div id="jsb4c-clippy"><a href="#" id="jsb4c-yes">Yes</a><a href="#" id="jsb4c-no">No</a></div>');
  var clippy = $('#jsb4c-clippy').css({
    backgroundImage: 'url(' + chrome.extension.getURL("img/its-clippy-motherfuckers.png") + ')'
  }).animate({
    right: 10
  });
  
  function gtfoClippy() {
    clippy.animate({
      right: -300
    });
  }
  
  $('#jsb4c-no').one('click', function () {
    gtfoClippy();
  });
  
  $('#jsb4c-yes').one('click', function () {
    var code = $('pre')[0];
    code.textContent = js_beautify(code.textContent);
    gtfoClippy();
  });
}());
