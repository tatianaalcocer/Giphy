$(document).ready(function(){

//VARIABLES: ==========================================================================

var animals = ['Otter', 'Hedgehog', 'Cow', 'Sloth', 'Cat', 'Dog', 'Panda', 'Penguin'];




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
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=20";
	
	$.ajax({
        url: queryURL,
        method: 'GET'
    })
    .done(function(response) {

        console.log(queryURL)

        renderAnimals(response.data);

    });
}

function renderAnimals(results) {

	$('.gif-main').empty();

    for (var i = 0; i < results.length; i++) {

	    var animalDiv = $("<div>");
	    animalDiv.addClass('animal-tile')

	    var p = $("<p>Rating: " + results[i].rating + "</p>");

	    var animalImage = $("<img>");
	    animalImage.attr('src', results[i].images.fixed_width_still.url);
	    animalDiv.append(p);
	    animalDiv.append(animalImage);

	    $(animalDiv).data('state', 'still');
	    $(animalDiv).data('stillUrl', results[i].images.fixed_width_still.url);
	    $(animalDiv).data('animatedUrl', results[i].images.fixed_width.url);

	    $(".gif-main").prepend(animalDiv);

    	$(animalDiv).on("click", toggleStillImage);

	}


}

function toggleStillImage(event) {

	// Assign the target div to a variable
	var animal = event.currentTarget;

	// Assign the image to a variable
	var image = $(animal).find('img');

	// Assign the stillUrl value to a variable
	var stillUrl = $(animal).data('stillUrl');

	// Assign the animatedUrl value to a variable
	var animatedUrl = $(animal).data('animatedUrl');

	if($(animal).data('state') === 'still') {

		$(animal).data('state', 'animated');

		// Change the image source to the still image
		$(image).attr('src', animatedUrl);

	} else {

		$(animal).data('state', 'still');

		// Change the image source the animated image
		$(image).attr('src', stillUrl);
	}
}




// MAIN SECTION: =============================================

renderButtons();








}) // END OF DOCUMENT READY FUNCTION

