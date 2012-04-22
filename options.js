$(function() {
  var hostInput = $("#host"),
      keyInput = $("#key"),
      titleInput = $("#title"),
      deleteicon = '<img src="images/delete.png"/>',
      urlicon = '<img src="images/url.png"/>';

  var reload = function() {
    $("#html-table").html('');
    $(localStorage).each(function(index) {
      var i = localStorage.key(index);
      if (i.match(/^host\-\d+/)) {
        var url = localStorage.getItem(i),
            k = localStorage.getItem(url + '-key'),
            t = localStorage.getItem(url + '-title'),
            del = '<a href="#" class="delete" id="'+ i +'">' + deleteicon + '</a>',
            get = '<a href="'+ url +'" class="get" target="_blank">'+ urlicon +'</a>';

        $("#host-table tbody").append(
          '<tr><td><span class="edit" id="url-' + i + '">' + url +
          '</span></td><td><span class="edit" id="key-' + i +
          '">' + k + '</span></td><td><span class="edit" id="title-' +
          i + '">' + t + "</span></td>" +
          '<td>' + [get, del].join(' | ') + "</td></tr>"
        );
      }
    });
  };

  var addEntry = function(url, key, title, id) {
    if (!url.match(/\/robot\-vision\.html$/) || key == '') {
      alert ("Enter a valid host (http[s]://*:*/robot-vision.html) and key");
      return false;
    }

    if (localStorage[url + "-key"]) {
      alert ("Storage already has the entry.");
      return false;
    }

    localStorage.setItem("host-" + id + '', url);
    localStorage.setItem(url + '-key', key);
    localStorage.setItem(url + '-title', title);
    return true;
  };

  var removeEntry = function(id) {
    var url = localStorage.getItem(id);

    localStorage.removeItem(id);
    localStorage.removeItem(url + '-key');
    localStorage.removeItem(url + '-title');
  };

  $(".edit").live("click", function() {
    var splitted = $(this).attr('id').split('-'),
        type = splitted[0],
        id = [splitted[1], splitted[2]].join('-'),
        url = localStorage.getItem(id),
        key = localStorage.getItem(url + "-key"),
        title = localStorage.getItem(url + "-title"),
        entry = { url: url, key: key, title: title };
        span = $(this);

    span.html('<input type="text" value="' + entry[type] + '"/>');
    span.children().focus().on('focusout', function() {
      var newId = new Date().getTime(),
          hostId = "host-" + newId;
      removeEntry(id);
      entry[type] = $(this).val();
      if (addEntry(entry.url, entry.key, entry.title, newId)) {
        $("#" + id).attr('id', hostId);
        $("#url-" + id).attr('id', "url-" + hostId);
        $("#key-" + id).attr('id', "key-" + hostId);
        $("#title-" + id).attr('id', "title-" + hostId);
        span.text(entry[type]);
      }
    });

    return false;
  });

  $(".delete").live("click", function() {
    var i = $(this).attr('id'),
        url = localStorage.getItem(i);

    $(".msg").text("Are you sure you want to delete, " + url + "?");

    $(".confirm").off().on('click', function() {
      removeEntry(i);
      window.location.href = window.location.href;
    });

    $("#confirm-modal").modal('show');

    return false;
  });

  $("#add").on("click", function() {
    var url = $(hostInput).val(),
        title = $(titleInput).val() ? $(titleInput).val() : "Vision Host",
        id = new Date().getTime();

    if (addEntry(url, $(keyInput).val(), title, id)) {
      window.location.href = window.location.href;
    }

    return false;
  });

  reload();
});
