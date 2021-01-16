
var liveAPIkey = "0f0c1950be32c8fb3bf766b86a8c9b34";
var liveQueryURL = "http://api.coinlayer.com/live"
+ "?access_key=" + liveAPIkey;
var rateQueryURL = "https://api.exchangeratesapi.io/latest??symbols=USD,EUR";

$("button").click(function() {
  var selection = $("select").val();
  console.log(selection);

  var liveAPIkey = "0f0c1950be32c8fb3bf766b86a8c9b34";
  var liveQueryURL = "http://api.coinlayer.com/live"
  + "?access_key=" + liveAPIkey;
  var rateQueryURL = "https://api.exchangeratesapi.io/latest??symbols=USD," + selection;

  $.ajax({
    url: liveQueryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response.rates.BTC);
  });
 
 
  $.ajax({
    url: rateQueryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response.rates.USD);
  });



});

