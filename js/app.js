$(document).ready(function(){
	// variables
	var categoryDress = "Clothing/Women/Dress";
	var categoryPants = "Clothing/Women/Pants";
	var categoryShoes = "Clothing/Shoes/Women";
	var categoryJewelry = "Jewelry";
	var categoryBag = "Bags and Purses";

	var dressBase = $('#dress-button');
	var pantsBase = $('#pants-button');
	var shoesBase = $('#shoes-button');
	var jewelryBase = $('#jewelry-button');
	var bagBase = $('#bag-button');

	
	$('#cart-wrapper').hide();

	// Processes Dress data
	$(dressBase).click(function(){
		var randomOff = Math.floor((Math.random() * 500) + 1);
		alert(randomOff);
		processEtsyData(categoryDress, dressBase, randomOff);
	});

	// Processes Pants data
	$(pantsBase).click(function(){
		processEtsyData(categoryPants, pantsBase, randomOff);
	});

	// Processes Shoes data
	$(shoesBase).click(function(){
		processEtsyData(categoryShoes, shoesBase, randomOff);
	});

	// Processes Jewelry data
	$(jewelryBase).click(function(){
		processEtsyData(categoryJewelry, jewelryBase, randomOff);
	});

	// Processes bag data
	$(bagBase).click(function(){
		processEtsyData(categoryBag, bagBase, randomOff);
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


function processEtsyData(filter, buttonBase, off) {
	$.ajax({
		url: "https://openapi.etsy.com/v2/listings/active.js?api_key=6z1xqkz8tg0znk9ckgkf9p5p",
		dataType: "jsonp",
		data: {
			"category": filter,
			"limit": "15",
			"offset": off,
			"includes": "Images" + "\,User" + "\,ShippingInfo" + "\,Shop/About",   

		},
		type: "GET",
		success: function(data){

			var randomNumber = Math.floor((Math.random() * 15) + 1);
		
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
			buttonBase.parent('.details').find('.description').append(editString);

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

	$.each(shippingArray, function(index, value){
		var notFound = true;
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

