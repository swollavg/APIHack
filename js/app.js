$(document).ready(function(){
	// variables
	var categoryDress = "Clothing/Women/Dress";
	var categoryPants = {};
	var categoryShoes = {};
	var categoryJewelry = {};
	var categoryBags = {};


	$('#cart-wrapper').hide();
	$('.add-cart').click(function(){
		tester(categoryDress);
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


function tester(filter) {
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
			var base = $('.add-cart');
			// shows hidden overview list
			$('.overview-list').removeClass("hide");

			//sets user name and shop link
			setShopAndName(data);

			// sets the items picture
			$('#shirt-pic').css("background-image", 'url(' + data.results[1].Images[0].url_570xN + ")");
			$('#shirt-pic').attr('href', data.results[1].url);
			
			// sets the description text and replace html special characters
			var originalString = data.results[1].description;
			var editString = replaceHtmlEntites(originalString);
			$('#dress-description').append(editString);

			//sets title
			base.siblings('.description-wrapper').children('.title').children('.title-descrip').text(data.results[1].title);
		

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
			$('.price span').append(data.results[1].price);

			// iterates over materials
			var arr = data.results[1].materials;

			// removed comma from long array list
		    $.each(arr, function(index, value){
		    	if(index == arr.length - 1){
		    		$('.material').append(" " + value + '.');
		    	}
		    	else if(index < arr.length - 1)
				$('.material').append(" " + value + ',');
			});

		    // sets shipping info
		   shippingIterate(data);

		   // sets handmade information
		   handmade(data);                  

		   //sets feedback score
		   var feedbackScore = data.results[1].User.feedback_info.count;
		   var feedbackLink = data.results[1].Shop.shop_name;
			$('.score').html("Feedback: " + "<a href='" + "https://www.etsy.com/shop/" + feedbackLink + "/reviews?ref=shop_info" + "'" + "target=_blank" + ">"  + feedbackScore + " reviews" + "</a>");

			
		
		},
		error: function(jqXHR, error, errorThrown){
			alert(error);
		}
	});
}

function shippingIterate(data){
//iterates over each ship array and then each object within each array looking for keywords.
var shippingArray = data.results[1].ShippingInfo;

	$.each(shippingArray, function(index, value){
		$.each(value, function(key, value){

			$('.shipfrom').text(data.results[1].ShippingInfo[index].origin_country_name);

			if(value == "Everywhere Else"){
				$('.shipto').text('worldwide');
				return false;
			}

			else if(value != "Everywhere Else"){
				$('shipto').text(data.results[1].ShippingInfo[index].destination_country_name);
			}							
		});
	});
}


function handmade(data){
	var handmadeInfo = data.results[1].who_made;
	var supplyInfo = data.results[1].is_supply;
	if(handmadeInfo == "i_did" || handmadeInfo == "collective") {
			$('.handmade').text('Handmade');

			if(supplyInfo == "true"){
				$('.handmade').append(" " + "supply");
			}

			else if(supplyInfo == "false"){
				$('.handmade').append(" " + "item");
			}
		} 

	else {
		$('.handmade').hide();
	}
}

function setShopAndName(data) {
	// sets the sellers name
	$('#dressSeller a').text(data.results[1].User.login_name);
	console.log(data.results[1]);

	//sets link to user shop
	var shopLink = data.results[1].Shop.url;
	$('#dressSeller a').attr('href', shopLink);
}

