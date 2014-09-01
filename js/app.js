$(document).ready(function(){
	// variables
	var categoryDress = "Clothing/Women/Dress";
	var categoryPants = {};
	var categoryShoes = {};
	var categoryJewelry = {};
	var categoryBags = {};
	var base = $('#dressBase');


	$('#cart-wrapper').hide();
	$('.add-cart').click(function(){
		tester(categoryDress, base);
		$('#cart').show();
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


function tester(filter, buttonBase) {
	$.ajax({
		url: "https://openapi.etsy.com/v2/listings/active.js?api_key=6z1xqkz8tg0znk9ckgkf9p5p",
		dataType: "jsonp",
		data: {
			"category": filter,
			"limit": "7",
			"includes": "Images" + "\,User" + "\,ShippingInfo" + "\,Shop/About",   

		},
		type: "GET",
		success: function(data){

			// shows hidden overview list
			$('.overview-list').removeClass("hide");

			//sets user name and shop link
			setShopAndName(data, buttonBase);

			// sets the items picture
			buttonBase.parent('.details').prev().css("background-image", 'url(' + data.results[1].Images[0].url_570xN + ")");
			buttonBase.parent('.details').prev().attr('href', data.results[1].url);
			
			// sets the description text and replace html special characters
			var originalString = data.results[1].description;
			var editString = replaceHtmlEntites(originalString);
			buttonBase.parent('.details').find('.description').append(editString);

			//sets title
			buttonBase.parent('.details').find('.title').children('.title-descrip').text(data.results[1].title);
		

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
			buttonBase.parent('.details').find('.price').children('span').append(data.results[1].price);
			
			// Sets an array for the materails
			var materialArray = data.results[1].materials;

			// removed comma from long array list
		    $.each(materialArray, function(index, value){
		    	if(index == materialArray.length - 1){
		    		buttonBase.prev().find('.material').children('span').append(" " + value + '.');
		    		
		    	}
		    	else if(index < materialArray.length - 1)
					buttonBase.prev().find('.material').children('span').append(" " + value + ',');
			});

		    // sets shipping info
		   shippingIterate(data, buttonBase);

		   // sets handmade information
		   handmade(data, buttonBase);                  

		   //sets feedback score
		   var feedbackScore = data.results[1].User.feedback_info.count;
		   var feedbackLink = data.results[1].Shop.shop_name;
			buttonBase.prev().find('.score').html("Feedback: " + "<a href='" + "https://www.etsy.com/shop/" + feedbackLink + "/reviews?ref=shop_info" + "'" + "target=_blank" + ">"  + feedbackScore + " reviews" + "</a>");

		},
		error: function(jqXHR, error, errorThrown){
			alert(error);
		}
	});
}

//iterates over each ship array and then each object within
// each array looking for keywords.
function shippingIterate(data, buttonBase){
var shippingArray = data.results[1].ShippingInfo;

	$.each(shippingArray, function(index, value){
		$.each(value, function(key, value){
			
			if(value == "Everywhere Else"){
				buttonBase.prev().find('.shipping').children('.shipto').text('worldwide');
				return false;
			}

			else if(value != "Everywhere Else"){
				buttonBase.prev().find('.shipping').children('.shipto').text("to " + data.results[1].ShippingInfo[index].destination_country_name);
			}

			buttonBase.prev().find('.shipping').children('.shipfrom').text(data.results[1].ShippingInfo[index].origin_country_name);							
		});
	});
}


function handmade(data, buttonBase){
	var handmadeInfo = data.results[1].who_made;
	var supplyInfo = data.results[1].is_supply;

	if(handmadeInfo == "i_did" || handmadeInfo == "collective") {
		buttonBase.prev().find('.handmade').text('Handmade');

		if(supplyInfo == "true"){
			buttonBase.prev().find('.handmade').append(" " + "supply");
		}

		else if(supplyInfo == "false"){
			buttonBase.prev().find('.handmade').append(" " + "item");
		}
	} 

	else {
		buttonBase.prev().find('.handmade').hide();
	}
}

function setShopAndName(data, buttonBase) {
	// sets the sellers name
	buttonBase.prev().find('.seller-info').children('a').text(data.results[1].User.login_name);
	console.log(data.results[1]);

	//sets link to user shop
	var shopLink = data.results[1].Shop.url;
	buttonBase.prev().find('.seller-info').children('a').attr('href', shopLink);
}

