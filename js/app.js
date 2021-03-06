//counter used for the images array and shopping cart needs to be in global space
var current = 0;
var counterCart = 0;

$(document).ready(function(){

	// Category filter variables
	var categoryDress = "Clothing/Women/Dress";
	var categoryPants = "Clothing/Women/Pants";
	var categoryShoes = "Clothing/Shoes/Women";
	var categoryJewelry = "Jewelry";
	var categoryBag = "Bags and Purses";

	// The "base" buttons for each category.
	var dressBase = $('#dress-button');
	var pantsBase = $('#pants-button');
	var shoesBase = $('#shoes-button');
	var jewelryBase = $('#jewelry-button');
	var bagBase = $('#bag-button');
	var firstTimeShirt = true;
	var firstTimePants = true;
	var firstTimeShoes = true;
	var firstTimeJewelry = true;
	var firstTimeBags = true;
	
	var current = 0;

	
	$('#cart-wrapper').hide();

	// removes item from the cart. Adds a class that has a fancy animation transition
	$(document).on('click', '.cart-button', function(){
		$(this).closest('.cart-item-wrapper').addClass('cart-button-transition').one('webkitAnimationEnd oanimationend msAnimationEnd animationend',   
            function(e) {
    			$(this).remove();
    			counterCart--;
			}); 
	});

	// Dropdown for shirts
	$('#shirt-drop').click(function(event){
		event.preventDefault();
		$('.shirt').slideToggle(function(){

			// on the first toggle down. The AJAX function is run and info is generated.
			if(firstTimeShirt == true) {
				var randomOff = Math.floor((Math.random() * 500) + 1);
				var randomNumber = Math.floor((Math.random() * 6) + 1);

				processEtsyData(categoryDress, dressBase, randomOff, randomNumber);
				firstTimeShirt = false;
			}
		});
	});

	//Dropdown for pants
	$('#pants-drop').click(function(event){
		event.preventDefault();
		$('.pants').slideToggle(function(){

			// on the first toggle down. The AJAX function is run and info is generated.
			if(firstTimePants == true) {
				var randomOff = Math.floor((Math.random() * 500) + 1);
				var randomNumber = Math.floor((Math.random() * 6) + 1);

				processEtsyData(categoryPants, pantsBase, randomOff, randomNumber);
				firstTimePants = false;
			}
		});
	});

	//Dropdown for shoes
	$('#shoes-drop').click(function(event){
		event.preventDefault();
		$('.shoes').slideToggle(function(){

			// on the first toggle down. The AJAX function is run and info is generated.
			if(firstTimeShoes == true) {
				var randomOff = Math.floor((Math.random() * 500) + 1);
				var randomNumber = Math.floor((Math.random() * 6) + 1);

				processEtsyData(categoryShoes, shoesBase, randomOff, randomNumber);
				firstTimeShoes = false;
			}
		});
	});

	//Dropdown for jewelry
	$('#jewelry-drop').click(function(event){
		event.preventDefault();
		$('.jewelry').slideToggle(function(){

			// on the first toggle down. The AJAX function is run and info is generated.
			if(firstTimeJewelry == true) {
				var randomOff = Math.floor((Math.random() * 500) + 1);
				var randomNumber = Math.floor((Math.random() * 6) + 1);

				processEtsyData(categoryJewelry, jewelryBase, randomOff, randomNumber);
				firstTimeJewelry = false;
			}
		});
	});

	//Dropdown for bags
	$('#bags-drop').click(function(event){
		event.preventDefault();
		$('.bags').slideToggle(function(){

			// on the first toggle down. The AJAX function is run and info is generated.
			if(firstTimeBags == true) {
				var randomOff = Math.floor((Math.random() * 500) + 1);
				var randomNumber = Math.floor((Math.random() * 6) + 1);

				processEtsyData(categoryBag, bagBase, randomOff, randomNumber);
				firstTimeBags = false;
			}
		});
	});



	
	// Processes Dress data
	$(dressBase).click(function(){
		
		//generate random number and offset with each click event
		var randomOff = Math.floor((Math.random() * 500) + 1);
		var randomNumber = Math.floor((Math.random() * 6) + 1);

		// resets the main fields when a new listing is being generated.
		dressBase.prev().prev().find('.material').children('span').text('');
		dressBase.prev().prev().find('.overview-list').hide();
		dressBase.parent('.details').find('.description').text('');
		dressBase.parent('.details').find('.title').children('.title-descrip').text('');
		dressBase.prev().prev().find('.seller-info').children('a').text('');
		dressBase.parent('.details').find('.price').children('span').text('');
		

		// main AAX request function
		processEtsyData(categoryDress, dressBase, randomOff, randomNumber);
	});

	// Processes Pants data
	$(pantsBase).click(function(){

		//generate random number and offset with each click event
		var randomOff = Math.floor((Math.random() * 500) + 1);
		var randomNumber = Math.floor((Math.random() * 6) + 1);

		// resets the main fields when a new listing is being generated.
		pantsBase.prev().prev().find('.material').children('span').text('');
		pantsBase.prev().prev().find('.overview-list').hide();
		pantsBase.parent('.details').find('.description').text('');
		pantsBase.parent('.details').find('.title').children('.title-descrip').text('');
		pantsBase.prev().prev().find('.seller-info').children('a').text('');
		pantsBase.parent('.details').find('.price').children('span').text('');
		
		// main AAX request function
		processEtsyData(categoryPants, pantsBase, randomOff, randomNumber);
	});

	// Processes Shoes data
	$(shoesBase).click(function(){

		//generate random number and offset with each click event
		var randomOff = Math.floor((Math.random() * 500) + 1);
		var randomNumber = Math.floor((Math.random() * 6) + 1);

		// resets the main fields when a new listing is being generated.
		shoesBase.prev().prev().find('.material').children('span').text('');
		shoesBase.prev().prev().find('.overview-list').hide();
		shoesBase.parent('.details').find('.description').text('');
		shoesBase.parent('.details').find('.title').children('.title-descrip').text('');
		shoesBase.prev().prev().find('.seller-info').children('a').text('');
		shoesBase.parent('.details').find('.price').children('span').text('');

		// main AAX request function
		processEtsyData(categoryShoes, shoesBase, randomOff, randomNumber);
	});

	// Processes Jewelry data
	$(jewelryBase).click(function(){

		//generate random number and offset with each click event
		var randomOff = Math.floor((Math.random() * 500) + 1);
		var randomNumber = Math.floor((Math.random() * 6) + 1);

		// resets the main fields when a new listing is being generated.
		jewelryBase.prev().prev().find('.material').children('span').text('');
		jewelryBase.prev().prev().find('.overview-list').hide();
		jewelryBase.parent('.details').find('.description').text('');
		jewelryBase.parent('.details').find('.title').children('.title-descrip').text('');
		jewelryBase.prev().prev().find('.seller-info').children('a').text('');
		jewelryBase.parent('.details').find('.price').children('span').text('');

		// main AAX request function
		processEtsyData(categoryJewelry, jewelryBase, randomOff, randomNumber);
	});

	// Processes bag data
	$(bagBase).click(function(){

		//generate random number and offset with each click event
		var randomOff = Math.floor((Math.random() * 500) + 1);
		var randomNumber = Math.floor((Math.random() * 6) + 1);

		// resets the main fields when a new listing is being generated.
		bagBase.prev().prev().find('.material').children('span').text('');
		bagBase.prev().prev().find('.overview-list').hide();
		bagBase.parent('.details').find('.description').text('');
		bagBase.parent('.details').find('.title').children('.title-descrip').text('');
		bagBase.prev().prev().find('.seller-info').children('a').text('');
		bagBase.parent('.details').find('.price').children('span').text('');

		// main AAX request function
		processEtsyData(categoryBag, bagBase, randomOff, randomNumber);
	});
	
	// Shows the shopping cart
	$('.about a').click(function(){
		$('.header-wrapper').slideUp(function(){
			$('.header-wrapper').hide();
			$('#cart-wrapper').slideDown();
		});
	});

	//hides shopping cart and re-displays logo
	$('.cart a').click(function(){
		$('#cart-wrapper').slideUp(function(){
			$('#cart-wrapper').hide();
			$('.header-wrapper').slideDown();
		});
	});

});




function processEtsyData(filter, buttonBase, off, randomNumber) {
	$.ajax({
		url: "https://openapi.etsy.com/v2/listings/active.js?api_key=6z1xqkz8tg0znk9ckgkf9p5p",
		dataType: "jsonp",
		data: {
			"category": filter,
			"limit": "7",
			"offset": off,
			"includes": "User" + "\,Images" + "\,ShippingInfo" + "\,Shop/About"   

		},
		type: "GET",
		beforeSend: function(){

			//removes the listing img after each randomize
			buttonBase.parent('.details').prev().children('.list-img').css('background-image', '');
			// Adds loading Gif
			buttonBase.parent('.details').prev().children('.list-img').html('<div class="img-wrap"><img src="images/ajax-loader.gif" class="loader" /></div>');
		},
		success: function(data){

			//removes click event from cart images
			buttonBase.prev().off();

			// removes click eventhandler from previous listing
			buttonBase.parent('.details').prev().children('.next-arrow').off();

			// array of images
			var picArray = data.results[randomNumber].Images;

			var mainImg = data.results[randomNumber].Images[0].url_570xN;
			var mainImgUrl = data.results[randomNumber].url;
			
			// Removes loading GIF once the image fully loads
			buttonBase.parent('.details').prev().children('.list-img').text('');

			// shows fields for new randomly generated listing
			buttonBase.prev().prev().find('.overview-list').show();
			buttonBase.parent('.details').find('.description').show();
			buttonBase.parent('.details').find('.title').children('.title-descrip').show();
			buttonBase.prev().prev().find('.seller-info').children('a').show();
			buttonBase.parent('.details').find('.price').children('span').show();

			// shows hidden overview list
			buttonBase.prev().prev().find('.overview-list').removeClass("hide");
			
			// sets the items first picture 
			buttonBase.parent('.details').prev().children('.list-img').css("background-image", 'url(' + mainImg + ")");
			buttonBase.parent('.details').prev().children('.list-img').attr('href', mainImgUrl);

			buttonBase.parent('.details').prev().children('.next-arrow').on('click', function(){
				next(data, buttonBase, randomNumber, picArray);
			});


			console.log(data.results[randomNumber].Images);

			// add images to the cart
			buttonBase.prev().on('click', function(){
				addToCart(data, buttonBase, randomNumber, mainImg, mainImgUrl);
			});
			

			//sets user name and shop link
			setShopAndName(data, buttonBase, randomNumber);

			// Stackoverflow function that replaces html special characters with their regex
			//http://stackoverflow.com/questions/1229518/javascript-regex-replace-html-chars
			var replaceHtmlEntites = (function() {
			  var translate_re = /&(nbsp|amp|#39|quot|lt|gt);/g;
			  var translate = {
			    "nbsp": " ", 
			    "amp" : "&", 
			    "#39" : "\'",
			    "quot": "\"",
			    "lt"  : "<", 
			    "gt"  : ">"
			  };
			  return function(s) {
			    return ( s.replace(translate_re, function(match, entity) { 
			      return translate[entity]; 
			    }) );
			  }
			})();

			// sets the description text and replace html special characters
			var originalString = data.results[randomNumber].description;
			var editString = replaceHtmlEntites(originalString);
			buttonBase.parent('.details').find('.description').text(editString);

			//sets title
			buttonBase.parent('.details').find('.title').children('.title-descrip').text(data.results[randomNumber].title);
		

			//Jquery plugin self running function that truncates
			$(function(){
				$('.description').succinct({
					size: 400
				});
				$('.title-descrip').succinct({
					size: 45
				});
				
			});

			// sets price
			buttonBase.parent('.details').find('.price').children('span').text(data.results[randomNumber].price);
			
			// sets material info
			setMaterial(data, buttonBase, randomNumber);

		    // sets shipping info
		   shippingIterate(data, buttonBase, randomNumber);

		   // sets handmade information
		   handmade(data, buttonBase, randomNumber);                  

		   //sets feedback score
		   var feedbackScore = data.results[randomNumber].User.feedback_info.count;
		   var feedbackLink = data.results[randomNumber].Shop.shop_name;
			buttonBase.prev().prev().find('.score').html("Feedback: " + "<a href='" + "https://www.etsy.com/shop/" + feedbackLink + "/reviews?ref=shop_info" + "'" + "target=_blank" + ">"  + feedbackScore + " reviews" + "</a>");

		},
		error: function(jqXHR, error, errorThrown){
			alert(error);
		}
	});
}

//iterates over each ship array and then each object within
// each array looking for keywords.
function shippingIterate(data, buttonBase, randomNumber){
var shippingArray = data.results[randomNumber].ShippingInfo;
var notFound = true;

	$.each(shippingArray, function(index, value){
		
		$.each(value, function(key, value){
			
			if(value == "Everywhere Else"){
				buttonBase.prev().prev().find('.shipping').children('.shipto').text('worldwide');
			    notFound = false;
				return notFound;
			}

			else if(key == "destination_country_name" && value != "Everywhere Else"){
				if(shippingArray.length <= 8){
					buttonBase.prev().prev().find('.shipping').children('.shipto').append("to " + data.results[randomNumber].ShippingInfo[index].destination_country_name);
					notFound == true;
				}
			}

			buttonBase.prev().prev().find('.shipping').children('.shipfrom').text(data.results[randomNumber].ShippingInfo[index].origin_country_name);	
									
		}); 
		return notFound;
		
	});
}


function handmade(data, buttonBase, randomNumber){
	var handmadeInfo = data.results[randomNumber].who_made;
	var supplyInfo = data.results[randomNumber].is_supply;

	if(handmadeInfo == "i_did" || handmadeInfo == "collective") {
		buttonBase.prev().prev().find('.handmade').text('Handmade');

		if(supplyInfo == "true"){
			buttonBase.prev().prev().find('.handmade').append(" " + "supply");
		}

		else if(supplyInfo == "false"){
			buttonBase.prev().prev().find('.handmade').append(" " + "item");
		}
	} 

	else {
		buttonBase.prev().prev().find('.handmade').hide();
	}
}

function setShopAndName(data, buttonBase, randomNumber) {
	// sets the sellers name
	buttonBase.prev().prev().find('.seller-info').children('a').text(data.results[randomNumber].User.login_name);
	

	//sets link to user shop
	var shopLink = data.results[randomNumber].Shop.url;
	buttonBase.prev().prev().find('.seller-info').children('a').attr('href', shopLink);
}

function setMaterial(data, buttonBase, randomNumber) {

	//shows material list item after it has been removed if array is empty.
	buttonBase.prev().prev().find('.material').show();

	// Sets an array for the materails
	var materialArray = data.results[randomNumber].materials;

	//checks if array is empty.
	if(materialArray.length == 0){
    	buttonBase.prev().prev().find('.material').hide();
    }

    else {

		// sets materials info and adds period to last item. only prints 6 items total.
	    $.each(materialArray, function(index, value){

	    	if(index == materialArray.length - 1){
	    		buttonBase.prev().prev().find('.material').children('span').append(" " + value + '.');
	    		
	    	}
	    	else if(index < 5 && index < materialArray.length - 1)
				buttonBase.prev().prev().find('.material').children('span').append(" " + value + ',');
			
		});
	}
}


function next(data, buttonBase, randomNumber, picArray) {
	// scrolls through images on click
	current++;
	console.log(current);
	
	var arrayLength = picArray.length;

	if(current >= arrayLength){
		current = 0;
	}
	
	
	buttonBase.parent('.details').prev().children('.list-img').css("background-image", 'url(' + picArray[current].url_570xN + ")");
	buttonBase.parent('.details').prev().children('.list-img').attr('href', data.results[randomNumber].url);
    

}

function addToCart(data, buttonBase, randomNumber, mainImg, mainImgUrl) {
	
	counterCart++;

	if(counterCart <= 9) {
	 	var addCartClone = buttonBase.parents('.wrapper').find('#firstCart').clone();

	 	// changes the rest of the cart items to block. 
	 	addCartClone.css('display', 'block');

	 	// changes src of image
	 	addCartClone.find('.cart-pic').attr('src', mainImg);

	 	// changes link of image
	 	addCartClone.find('.cart-pic-link').attr('href', mainImgUrl);

	 	// adds the cloned element to the DOM
		$('.cart-instruct').after(addCartClone);

		buttonBase.next().finish().fadeIn().delay(3000).fadeOut(1500);
	}

	else {
		alert('You can only have 9 items in your cart');
	}

}

function successText(data, buttonBase, randomNumber) {
	
}

