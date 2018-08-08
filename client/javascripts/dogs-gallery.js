// jshint esversion: 6

let failHandler = () => {
  console.log("Fail -- unknown breed");
  $(".photos").empty().html("<h3>Error -- breed not found<h3>");
};

let clickHandler = function() {
  // build AJAX request URL
  let prefixURL = "https://dog.ceo/api/breed";
  let suffixURL = "&format=json&jsoncallback=?";
  //get value entered by user from textbox
  let flickrTag = $("input").val();
  //let flickrTag = "buddha";
  let requestURL = prefixURL + flickrTag + suffixURL;
  console.log(requestURL);
  //clear old photos
  $(".photos").html("");
  // sending AJAX request && process response

  $.getJSON(requestURL, function(dogAPI) {
    dogAPI.message.forEach(function(item, index) {

      //Flickr returns 20 images by default
      //We need only six images for the Gallery
      if (index < 6) {
        // create a new JQuery element to hold the image
        // but hide it so we can fade it in
        let $img = $("<img>").hide();

        // set the attribute to the url
        // contained in the response
        $img.attr("src", item);
        $img.attr("width", "100");

        // attach the img tag to the main
        // photos element and then fade it in
        $(".photos").append($img);
        $img.fadeIn();
      }
    });
  }).fail(failHandler);
};

$(document).ready(() => {
  $("button").on("click", clickHandler);
});