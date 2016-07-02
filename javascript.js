$(document).ready(function() {
    

    //When search is submitted do all of this...
    $("#search").submit(function(event) {

        //Get query and store it as query variable
      var query = document.getElementById("query").value;

      //Prevent default form submission. Just going to grab info and display results dynamically
      event.preventDefault();

      //Clear out wikientries in html if there is a value
      if (query !== "") {
            $("#wikientries").html("<h1 class='text-center'>Wikipedia Results: </h1></br>");
      }
      else {
            $("#wikientries").html("<h1 class='text-center'>Wikipedia Viewer<small><br>Please Perform Search</small></h1>")
      }

      //set up initial variables
      var title = [];
      var description = [];
      var link = [];

      //Get the URL for the API
      var url = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + query + "&limit=10&namespace=0&format=json&callback=jsonp"

      //Make API connection  
      $.ajax({
        url: url,
        dataType: "jsonp",
        //On successful connection do this
        success: function(results) {
              //Get rid of first item in returned array. It's just the search result repeated
              results.shift();


              //Organize variables into appropriate lists
              title.push(results[0]);
              title = title[0];
              description.push(results[1]);
              description = description[0];
              link.push(results[2]);
              link = link[0];

              //Get number of returned results. Title description and link should all have same number.
              var numresults = title.length;

              //If no results then return this
              if (numresults === 0 && query !== "") {
                 $("#wikientries").html("<h1 class='text-center'>No Results Found<small><br>Please Try Again</small></h1>")
              }


              //Display the results into the wikientries html <div>
              for (var i = 0; i < numresults; i++) {

                        //Add title and add link url
                        $("#wikientries").append("<a target='_blank' href=" + link[i] + "><h4>" + title[i] + "</h4></a>");

                        //Add appropriate description or display not available
                        if(description[i] === "") {
                             $("#wikientries").append("<p class='entry'>No preview available. Click link to learn more.</p>");
                        }
                        else {
                             $("#wikientries").append("<p class='entry'>" + description[i] + "</p>");
                        }

                 };



        } // End of the "do this" success api handler function     

      }); // End api call


    }); //End of query process. Now wait for new query.
    
    
    
    
}); //End whole document