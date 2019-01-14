$(document).ready(function() {
// 1. Before you can make any part of our site work, you need to create an array of strings, each one related to a topic that interests you. Save it to a variable called `topics`.
    var topics = [];
  
       function grabGIF() {    
      var userData=$(this).data("search");
      console.log(userData);    
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + userData + "&api_key=Gj3MlmvXuw6CVtWLK7bY5brDtKLLp9ET&limit=10";    
      console.log(queryURL);
    
      $.ajax({
              url: queryURL,
              method: "GET"
            }).done(function(response) {
              var results = response.data;
              console.log(results);
              for (var i = 0; i < results.length; i++) {              
              var topicDiv = $("<div class='col-md-4'>");    
              var animated = results[i].images.fixed_height.url;
              var still = results[i].images.fixed_height_still.url;
              var image = $("<img>");
              var rating = results[i].rating;
              var p = $("<p>").text("Rating: " + rating);    
              image.attr("src", still);
              image.addClass("Giphy");
              image.attr("data-state", "still");
              image.attr("data-still", still);
              image.attr("data-animate", animated);
              topicDiv.append(image);
              topicDiv.append(p);
              $("#displayFrame").prepend(topicDiv);    
            }
      });
    }
    
// 2. Your app should take the topics in this array and create buttons in your HTML.
      $("#userSubmit").on("click", function(event) {
        event.preventDefault();
        var newTopic = $("#mainTerm").val().trim();
        topics.push(newTopic);
        console.log(topics);
        $("#mainTerm").val('');
        displayButtons();
      });

      function displayButtons() {
        $("#initButtons").empty();
        for (var i = 0; i < topics.length; i++) {
          var a = $('<button class="btn btn-light">');
          a.attr("id", "topic");
          a.attr("data-search", topics[i]);
          a.text(topics[i]);
          $("#initButtons").append(a);
        }
      }
  

      // 3. When the user clicks on a button, the page should grab 10 static, non-animated gif images from the GIPHY API and place them on the page.
      displayButtons();
      $(document).on("click", "#topic", grabGIF);
      $(document).on("click", ".Giphy", jugglePlay);

      function jugglePlay() {
         var state = $(this).attr("data-state");
          if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
          } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
      }
    }
    
    });





//    * Try using a loop that appends a button for each string in the array.



// 4. When the user clicks one of the still GIPHY images, the gif should animate. If the user clicks the gif again, it should stop playing.


//    * This data is provided by the GIPHY API.
//    * Only once you get images displaying with button presses should you move on to the next step.

// 6. Add a form to your page takes the value from a user input box and adds it into your `topics` array. Then make a function call that takes each topic in the array remakes the buttons on the page.
