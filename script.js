$("button").click(function() {
  var selection = $("select").val();
  var currencySymbol = $('#country').find(":selected").data('currency')
  var locale = $('#country').find(":selected").data('locales')
  // console.log(currencySymbol);
  // console.log(selection);

  var liveAPIkey = "4a8e4865703019c1bf2a1adb05d5b6eb";
  var liveQueryURL = "http://api.coinlayer.com/live"
  + "?access_key=" + liveAPIkey;
  var rateQueryURL = "https://api.exchangeratesapi.io/latest?base=USD&symbols=USD," + selection;
  var kanyeAPI = "https://api.kanye.rest";

  $.ajax({
    url: kanyeAPI,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    $(".Kanye").text("Kanye inspirational quote:").append("<br>").append("<h1>" + "'" + response.quote + "'");

  });

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
      $(".BTC-Conversion").text(currencySymbol +" "+ rounded);
      $(".BTC-Conversion").text(new Intl.NumberFormat(locale, {style: 'currency',currency: selection}).format(rounded)); 
  

    });


});

