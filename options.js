$(function() {
  var host = $("#host");
  var key = $("#key");

  var deleteicon = '<img src="images/delete.png"/>';
  var urlicon = '<img src="images/url.png"/>';

  var reload = function() {
    $("#html-table").html('');
    for (var i = 0; i < localStorage.length; i++) {
      var url = localStorage.key(i);

      var del = '<a href="#" class="delete" id="'+ i +'">' + deleteicon + '</a>';
      var get = '<a href="'+ url +'" class="get" target="_blank">'+ urlicon +'</a>';

      $("#host-table").append(
        "<tr><td>"+ url +"</td><td>"+ localStorage.getItem(url) +
        "</td><td>"+ [get, del].join(' | ') +"</td></tr>"
      );
    }
  };

  $(".delete").live("click", function() {
    var i = $(this).attr('id');
    var url = localStorage.key(i);

    var res = confirm("Are you sure you want to delete, " + url + "?");

    if (res) {
      localStorage.removeItem(url);
      window.location.href = window.location.href;
    }

    return false;
  });

  $("#add").on("click", function() {
    var url = $(host).val();
    if (!url.match(/\/robot\-vision\.html$/) || $(key).val() == '') {
      alert("Please enter a valid host and key");
      return false;
    }

    localStorage.setItem(url, $(key).val());
    window.location.href = window.location.href;

    return false;
  });

  reload();
});
