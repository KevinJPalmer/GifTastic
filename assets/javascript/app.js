$(document).ready(function() {
  // array for inputs
  var topics = [];

  function displayBreeds() {
    var x = $(this).data("search");
    // console.log(x);
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + x + "&api_key=Me3xyN0NT8iV1G0fB9r2a0Hd2h69VQ62&limit=10";
    // console.log(queryURL);
    // Ajax calling function/append to html
    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response){
        var results = response.data;
        // console.log(results);
        for (var i=0; i<results.length; i++){
          var showDiv = $("<div class='col-md-4'>");
          var rating = results[i].rating;
          var defaultAnimation = results[i].images.fixed_height.url;
          var staticGif = results[i].images.fixed_height_still.url;
          var showImage = $("<img>");
          var p = $("<p>").text("Rating: " + rating);

          showImage.attr("src", staticGif);
          showImage.addClass("dogGiphy");
          showImage.attr("data-state", "still");
          showImage.attr("data-still", staticGif);
          showImage.attr("data-animate", defaultAnimation);
          showDiv.append(p);
          showDiv.append(showImage);
          $("#gifResults").prepend(showDiv);
        }
    });
  }
  // submit button
$("#addBreed").on("click", function(event) {
  event.preventDefault();
  var newBreed = $("#search").val().trim();
  topics.push(newBreed);
  // console.log(topics);
$("#search").val('');
displayButtons();
});

function displayButtons() {
  $("#myButtons").empty();
  for (var i=0; i < topics.length; i++) {
    var a = $('<button class="btn btn-primary">');
    a.attr("id", "breeds");
    a.attr("data-search", topics[i]);
    a.text(topics[i]);
    $("#myButtons").append(a);
  }
}

displayButtons();

$(document).on("click", "#breeds", displayBreeds);
$(document).on("click", ".dogGiphy", pausePlayGifs);
function pausePlayGifs() {
  var state = $(this).attr("data-state");
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  }
  else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
}


});
