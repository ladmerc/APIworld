var lastFm = {
  
 button1Click: function () {
  $('#button1').click( function () {
    console.log("click");
    lastFm.initializeTopAlbum();
    $.getJSON(lastFm.url, lastFm.params, lastFm.callback);
    $('#topAlbum').focus(lastFm.clearArtistInputField);
  });
  
  },

  initializeTopAlbum:  function () {
    $('#section-one').html('<center><img src="img/loading2.gif" alt="loading..."></center>');
    var input =  $('#topAlbum').val();
    lastFm.params = {
      artist: input,
      limit: 12,
      api_key: "9876abfee897bc6c18c1ed4410811e0b"
    };//end params
    lastFm.url = "http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=" + input + "&api_key=9876abfee897bc6c18c1ed4410811e0b&format=json";   
  },

  callback: function (json) {
    var viewHTML = '<ul>';
    console.log(json);
    $.each(json.topalbums.album, function (index, item) {
      viewHTML += '<li>';
      viewHTML += '<a href="' + item.url + '">';
      viewHTML += '<img src="' + item.image[2]["#text"] + '"></a>';
      viewHTML += '<p>' +item.name + '</p></li>'
    });//end each

    viewHTML += '</ul>'
    $('#section-one').html(viewHTML);
  },//end callback

    clearArtistInputField: function() {
      $('#topAlbum').val(" ");
  },

/*************************************END FIRST JSON CALL*******************************************************************

********************************************************************************************************************************

*************************************BEGIN SECOND JSON CALL*******************************************************************/
 
  
  button2Click: function () {
    $('#button2').click( function () {
      console.log("click2");
      lastFm.initializeSearchTrack();
      lastFm.checkforSpace();
      $.getJSON(url2, params2, lastFm.callback2);
      $('#trackSearch').focus(lastFm.clearTrackInputField);
    });
  },

  initializeSearchTrack: function () {
    requestedTrack = $('#trackSearch').val();    
    $('#section-two').html('<center><img src="img/loading2.gif" alt="loading..."></center>');
    params2 = {
      track: requestedTrack,
      limit: 8,
      api_key: "9876abfee897bc6c18c1ed4410811e0b"
    };
    url2 = "http://ws.audioscrobbler.com/2.0/?method=track.search&track=" + requestedTrack + "&api_key=9876abfee897bc6c18c1ed4410811e0b&format=json"
  },

  checkforSpace: function () {
    if(requestedTrack.trim()) { //if input field is not left empty
      lastFm.callback2;
    }
    else {
        lastFm.clearDisplayArea(); // if input field is empty, display error and then alert a message
       alert("Please Enter a Valid Input");
    }
  },

  callback2: function (json2) {
    var viewHTML2 = '<ul>';
    console.log(json2);
    if(json2.results.trackmatches.hasOwnProperty('track')) { //If condition to handle when searched result is not found
      $.each(json2.results.trackmatches.track, function (index2, item2) {
        viewHTML2 += '<li>';
        viewHTML2 += '<a href="' + item2.url + '">';
        if(item2.hasOwnProperty('image')) { // condition to replace images for results that don't have images attached
            viewHTML2 += '<img src="' + item2.image[2]["#text"] + '"></a>';
        }
        else {
            viewHTML2 += '<img src="img/default.png"></a>';
        }
        viewHTML2 += '<p>' +item2.name + ' by  ' +item2.artist + ' </p></li>'
      });//end each
      viewHTML2 += '</ul>'
    }
    else {
      console.log('error');
      viewHTML2 = '<div><h2>Cannot Find this track on this database</h2></div>';
      $('#trackSearch').focus(lastFm.clearDisplayArea); // This clears the output area when input field is focused
    }
    $('#section-two').html(viewHTML2);
  },//end callback

  
/*CLEAR BOTH INPUT FIELDS AND OUTPUT AREA,  RESPECTIVELY WHEN INPUT FIELD HAS FOCUS*/
  clearTrackInputField: function() {
    $('#trackSearch').val(" ");
  },
    
  clearDisplayArea: function () {
      var viewHTML3 = "";
      $('#section-two').html(viewHTML3);
  }
};//end object


lastFm.button1Click();
lastFm.button2Click();