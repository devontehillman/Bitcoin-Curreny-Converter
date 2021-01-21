$("button").click(function() {
  // var ratesArray = [""];
  var selection = $("select").val();
  console.log(selection);

  var liveAPIkey = "0f0c1950be32c8fb3bf766b86a8c9b34";
  var liveQueryURL = "http://api.coinlayer.com/live"
  + "?access_key=" + liveAPIkey;
  var rateQueryURL = "https://api.exchangeratesapi.io/latest?base=USD&symbols=USD," + selection;


  function exchangeRate() {
    var dataToReturn = "Error";
    $.ajax({
      url: rateQueryURL,
      method: "GET",
      async: false, // stops ajax from returning before response is back so we can return the value
      success: function(response) {
        var selectionRates = response.rates[selection];
        var USDRates = response.rates.USD;
        dataToReturn = selectionRates/USDRates; // conversion 
        $(".selectedCurrency").text(selection);
      }
    });
      return dataToReturn;
    };


  $.ajax({
    url: liveQueryURL,
    method: "GET"
  }).then(function(response) {
    var BTCRate = response.rates.BTC;
    var hello = exchangeRate();
    var final = hello * BTCRate;// coversion from bit/usd to bit/selected
    console.log(final.toFixed(2));
  });


});






// var liveAPIkey = "0f0c1950be32c8fb3bf766b86a8c9b34";
// var liveQueryURL = "http://api.coinlayer.com/live"
// + "?access_key=" + liveAPIkey;
// var rateQueryURL = "https://api.exchangeratesapi.io/latest?symbols=USD,EUR";

// $("button").click(function() {
//   var selection = $("select").val();
//   // console.log(selection);

//   var liveAPIkey = "0f0c1950be32c8fb3bf766b86a8c9b34";
//   var liveQueryURL = "http://api.coinlayer.com/live"
//   + "?access_key=" + liveAPIkey;
//   var rateQueryURL = "https://api.exchangeratesapi.io/latest?symbols=USD," + selection;
//   console.log(rateQueryURL)
//   $.ajax({
//     url: liveQueryURL,
//     method: "GET"
//   }).then(function(response) {
//     console.log(response.rates.BTC);
//   });
 
 
//   $.ajax({
//     url: rateQueryURL,
//     method: "GET"
//   }).then(function(response) {
//     console.log(response.rates[selection]);
//     // console.log("hello"+selection);
//     //console.log(response.rates[0]);
//   });



// });