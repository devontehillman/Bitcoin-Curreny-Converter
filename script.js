var APIkey = "0f0c1950be32c8fb3bf766b86a8c9b34";
var liveQueryURL = "http://api.coinlayer.com/live"
+ "?access_key=" + APIkey;


$.ajax({
    url: liveQueryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response.rates.BTC);
  });

 