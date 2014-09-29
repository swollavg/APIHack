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
	

	
	$('#cart-wrapper').hide();

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

// Stackoverflow function that replaces html special characters with their regex
//http://stackoverflow.com/questions/1229518/javascript-regex-replace-html-chars
var replaceHtmlEntites = (function() {
  var translate_re = /&(nbsp|amp|quot|lt|gt);/g;
  var translate = {
    "nbsp": " ", 
    "amp" : "&", 
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


function processEtsyData(filter, buttonBase, off, randomNumber) {
	$.ajax({
		url: "https://openapi.etsy.com/v2/listings/active.js?api_key=6z1xqkz8tg0znk9ckgkf9p5p",
		dataType: "jsonp",
		data: {
			"category": filter,
			"limit": "6",
			"offset": off,
			"includes": "Images" + "\,User" + "\,ShippingInfo" + "\,Shop/About",   

		},
		type: "GET",
		beforeSend: function(){
			//removes the listing img after each randomize
			buttonBase.parent('.details').prev().css('background-image', '');
			// Adds loading Gif
			buttonBase.parent('.details').prev().append('<div class="img-wrap"><img src="images/ajax-loader.gif" class="loader" /></div>');
		},
		success: function(data){
			console.log(data.results[randomNumber]);
			// Removes loading GIF once the image fully loads
			buttonBase.parent('.details').prev().text('');

			// shows fields for new randomly generated listing
			buttonBase.prev().prev().find('.overview-list').show();
			buttonBase.parent('.details').find('.description').show();
			buttonBase.parent('.details').find('.title').children('.title-descrip').show();
			buttonBase.prev().prev().find('.seller-info').children('a').show();
			buttonBase.parent('.details').find('.price').children('span').show();

			// shows hidden overview list
			$('.overview-list').removeClass("hide");

			//sets user name and shop link
			setShopAndName(data, buttonBase, randomNumber);

			// sets the items picture
			buttonBase.parent('.details').prev().css("background-image", 'url(' + data.results[randomNumber].Images[0].url_570xN + ")");
			buttonBase.parent('.details').prev().attr('href', data.results[randomNumber].url);
			
			// sets the description text and replace html special characters
			var originalString = data.results[randomNumber].description;
			var editString = replaceHtmlEntites(originalString);
			buttonBase.parent('.details').find('.description').text(editString);

			//sets title
			buttonBase.parent('.details').find('.title').children('.title-descrip').text(data.results[randomNumber].title);
		

			//Jquery plugin self running function that truncates
			$(function(){
				$('.description').succinct({
					size: 450
				});
				$('.title-descrip').succinct({
					size: 55
				});
				
			});

			// sets price
			buttonBase.parent('.details').find('.price').children('span').text(data.results[randomNumber].price);
			
			// Sets an array for the materails
			var materialArray = data.results[randomNumber].materials;

			// removed comma from long array list
		    $.each(materialArray, function(index, value){
		    	if(index == materialArray.length - 1){
		    		buttonBase.prev().prev().find('.material').children('span').append(" " + value + '.');
		    		
		    	}
		    	else if(index < materialArray.length - 1)
					buttonBase.prev().prev().find('.material').children('span').append(" " + value + ',');
			});

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
	console.log(data.results);

	//sets link to user shop
	var shopLink = data.results[randomNumber].Shop.url;
	buttonBase.prev().prev().find('.seller-info').children('a').attr('href', shopLink);
}

