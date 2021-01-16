

$("button").click(function() {
  var selection = $("select").val();
  console.log(selection);

  var liveAPIkey = "0f0c1950be32c8fb3bf766b86a8c9b34";
  var liveQueryURL = "http://api.coinlayer.com/live"
  + "?access_key=" + liveAPIkey;
  var rateQueryURL = "https://api.exchangeratesapi.io/latest?base=USD&symbols=USD," + selection;


  $.ajax({
      url: rateQueryURL,
      method: "GET"
    }).then(function(response) {
      var selectionRates = response.rates[selection];
      var USDRates = response.rates.USD;
      var anything = selectionRates/USDRates;
      console.log(anything);
      $(".selectedCurrency").text(selection);
      localStorage.setItem("exchangeRate", anything);
    });


  $.ajax({
      url: liveQueryURL,
      method: "GET"
    }).then(function(response) {
      var BTCRate = response.rates.BTC;
      console.log(BTCRate);
      var something = localStorage.getItem("exchangeRate");
      var final = something * BTCRate;
      var rounded = Math.round(final * 100)/100;
      Number.parseFloat(rounded).toFixed(2);
      $(".BTC-Conversion").text("$" + rounded);

    });


});

