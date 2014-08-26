$(document).ready(function(){
	$('.add-cart').click(function(){
		tester();
	});
});

function tester() {
	$.ajax({
		url: "https://openapi.etsy.com/v2/listings/active.js?api_key=6z1xqkz8tg0znk9ckgkf9p5p",
		dataType: "jsonp",
		data: {
			"category":"Clothing/Women/Dress",
			"limit": "5",
		},
		type: "GET",
		success: function(data){
			console.log(data.results[0]);
		},
		error: function(jqXHR, error, errorThrown){
			alert(error);
		}
	});
}