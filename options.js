$(function() {
  var host = $("#host"),
      key = $("#key"),
      title = $("#title"),
      deleteicon = '<img src="images/delete.png"/>',
      urlicon = '<img src="images/url.png"/>';

  var reload = function() {
    $("#html-table").html('');
    for (var i = 0; i < localStorage.length; i += 3) {
      var url = localStorage.getItem(localStorage.key(i)),
          k = localStorage.getItem(url + '-key'),
          t = localStorage.getItem(url + '-title'),
          del = '<a href="#" class="delete" id="'+ i +'">' + deleteicon + '</a>',
          get = '<a href="'+ url +'" class="get" target="_blank">'+ urlicon +'</a>';

      $("#host-table").append(
        "<tr><td>"+ url +"</td><td>"+ k +"</td><td>" + t +
        "</td><td>"+ [get, del].join(' | ') +"</td></tr>"
      );
    }
  };

  $(".delete").live("click", function() {
    var i = $(this).attr('id'),
        k = localStorage.key(i),
        url = localStorage.getItem(k),
        res = confirm("Are you sure you want to delete, " + url + "?");

    if (res) {
      localStorage.removeItem(k);
      localStorage.removeItem(url + '-key');
      localStorage.removeItem(url + '-title');
      window.location.href = window.location.href;
    }

    return false;
  });

  $("#add").on("click", function() {
    var url = $(host).val(),
        name = $(title).val() ? $(title).val() : "Vision Host";

    if (!url.match(/\/robot\-vision\.html$/) || $(key).val() == '') {
      alert("Please enter a valid host and key");
      return false;
    }

    localStorage.setItem((new Date().getTime()) + '', url);
    localStorage.setItem(url + '-key', $(key).val());
    localStorage.setItem(url + '-title', name);
    window.location.href = window.location.href;

    return false;
  });

  reload();
});
