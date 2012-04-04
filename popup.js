$(function() {
  if (localStorage.length == 0) {
    $("ul").append(
      '<li>Add vision hosts in the option page</li>'
    );
  }

  for (var i=0; i < localStorage.length; i += 3) {
    var time = localStorage.key(i),
        url = localStorage.getItem(time),
        title = localStorage.getItem(url + '-title');

    $("ul").append(
      '<li><a class="host" id="' + time + '" href="' +
      url + '">' + title + '</a></li>'
    );
  }

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
