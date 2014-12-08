/***********************************************
  CREATING OVERLAY FOR IMAGES
  ***********************************************/
//When image link is hovered on

$(document).ready(function () {
  var $overlay = $('<div id="overlay"></div>');
  var placeHolder = '#content li';
  $(placeHolder).append($overlay);

  $("#overlay").hide();


  $('#content a').mouseenter(function () {
    var href = $(this).attr("href");
    console.log(href);
    $("#overlay").show(); 
    });//end mousenter

  $('#content a').mouseleave(function () {
  var href = $(this).attr("href");
  console.log("OVER");
  $("#overlay").hide();

}); //end mouseleave

  
})//end ready

