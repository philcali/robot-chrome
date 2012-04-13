$(function() {
  if (localStorage.length == 0) {
    $("ul").append(
      '<li>Add vision hosts in the option page</li>'
    );
  }

  $(localStorage).each(function(index) {
    var i = localStorage.key(index);
    console.log(i);
    if (i.match(/^host\-\d+/)) {
      var url = localStorage.getItem(i),
          title = localStorage.getItem(url + '-title');

      $("ul").append(
        '<li><a class="host" id="' + i + '" href="' +
        url + '">' + title + '</a></li>'
      );
    }
  });

  $(".host").on('click', function() {
    var url = localStorage.getItem($(this).attr('id'));

    chrome.tabs.create({ url: url, active: true }, function(tab) {
      var key = localStorage.getItem(url + '-key');
          remoteCode = 'standardConnect("' + key + '");';

      if (key) {
        chrome.tabs.executeScript(tab.id, { code: remoteCode });
      }
    });
  });
});
