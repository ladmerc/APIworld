$(document).ready( function () {
  

  $('#button1').click(function () {
    var input = $('#topAlbum').val();
    var url = "http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=" + input + "&api_key=9876abfee897bc6c18c1ed4410811e0b&format=json"

    $('#section-one').html('<center><img src="img/loading2.gif" alt="loading..."></center>');
    var params = {
      artist: input,
      limit: 10,
      api_key: "9876abfee897bc6c18c1ed4410811e0b"
    };//end params

    var callback = function (json) {
      var viewHTML = '<ul>';
      // var errorHTML;
      console.log(json);
      $.each(json.topalbums.album, function (index, item) {
        viewHTML += '<li>';
        viewHTML += '<a href="' + item.url + '">';
        viewHTML += '<img src="' + item.image[2]["#text"] + '"></a>';
        viewHTML += '<p>' +item.name + '</p></li>'
        // viewHTML += '<div>' + "Your Search returned an error because " + json.message + '</div>'
      });//end each
      viewHTML += '</ul>'
      $('#section-one').html(viewHTML);
    }//end callback

    var xhr1 = $.getJSON(url, params, callback).fail(function(){
      $('#section-one').html('<center><p style="font-size: 3em"></p></center>');
    });//end fail function



    clearArtistInputField = function() {
      $('#topAlbum').val(" ");
    }//end clear function
    $('#topAlbum').focus(clearArtistInputField);
  })//end button1 click;


  $('#button2').click(function () {

    var requestedTrack = $('#trackSearch').val();
    var url2 = "http://ws.audioscrobbler.com/2.0/?method=track.search&track=" + requestedTrack + "&api_key=9876abfee897bc6c18c1ed4410811e0b&format=json"

    $('#section-two').html('<center><img src="img/loading2.gif" alt="loading..."></center>');
    var params2 = {
      track: requestedTrack,
      limit: 15,
      api_key: "9876abfee897bc6c18c1ed4410811e0b"
    };

    if(requestedTrack.trim()){
    var callback2 = function (json2) {
      var viewHTML2 = '<ul>';
      console.log(json2.results.trackmatches);
      if(json2.results.trackmatches.hasOwnProperty('track')) {
        $.each(json2.results.trackmatches.track, function (index2, item2) {
          viewHTML2 += '<li>';
          viewHTML2 += '<a href="' + item2.url + '">';
          if(item2.hasOwnProperty('image')) {
            viewHTML2 += '<img src="' + item2.image[2]["#text"] + '"></a>';
          }
          else {
            viewHTML2 += '<img src="img/andela_icon.png"></a>';
          }
          viewHTML2 += '<p>' +item2.name + ' by  ' +item2.artist + ' </p></li>'
        });//end each
        viewHTML2 += '</ul>'
     
      }
      else {
        console.log('error');
        viewHTML2 = '<div>Cannot Find this track on this database</div>';
        $('#trackSearch').focus(clearDisplayArea);
      }
      $('#section-two').html(viewHTML2);
    }//end callback

    
    $.getJSON(url2, params2, callback2);
  }

  else {
    alert("error");
  }
    clearTrackInputField = function() {
      $('#trackSearch').val(" ");
    }//end clear function
    
    $('#trackSearch').focus(clearTrackInputField);

    clearDisplayArea = function () {
      var viewHTML3 = ' ';
      $('#section-two').html(viewHTML3);
    }

  })//end button2 click;

});//end ready