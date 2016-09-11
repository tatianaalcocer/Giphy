$(document).ready(function(){

//VARIABLES: ==========================================================================

var animals = ['Otter', 'Hedgehog', 'Cow', 'Sloth', 'Cat', 'Dog', 'Panda'];







// EVENT LISTENERS: ================================================================




//FUNCTIONS: =============================================================================
 
function renderButtons(){ 

	// Loops through the array of buttons
	for (var i = 0; i < animals.length; i++){

	    var a = $('<button>') 

	    a.addClass('animal btn btn-primary btn-lg');  
	    a.attr('data-name', animals[i]); 
	    a.text(animals[i]); 
	    $('.button-display').append(a);
	}

	$('.animal').on('click', callApi);
}


function callApi(event) {
	console.log('calling api')
	console.log(event)

	var animal = $(event.currentTarget).data('name');
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10";
	
	$.ajax({
        url: queryURL,
        method: 'GET'
    })
    .done(function(response) {

        console.log(queryURL)
        console.log(response)

        var results = response.data;
        console.log("results: " + results);



        for (var i = 0; i < results.length; i++) {

	        var animalDiv = $("<div>");

	        var p = $("<p>" + results[i].rating + "</p>");

	        var animalImage = $("<img>");
	        animalImage.attr('src', results[i].images.fixed_height.url);

	        animalDiv.append(p);
	        animalDiv.append(animalImage);
	        $(".gif-main").prepend(animalDiv);
	        //--------------------------------
	    }

    });
}


// MAIN SECTION: =============================================

renderButtons();








}) // END OF DOCUMENT READY FUNCTION

