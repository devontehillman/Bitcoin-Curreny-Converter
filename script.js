
// This is the click function that kicks off all of the functionality and updates
$("button").click(function () {
  // These variables holdd the user's currency selection so we can call on it later and the symbol of the selected currency
  var selection = $("select").val();
  var locale = $('#country').find(":selected").data('locales')
  console.log(selection);

  // These variables house our URLS and API Keys for our AJAX queries
  var liveAPIkey = "4a8e4865703019c1bf2a1adb05d5b6eb";
  var liveQueryURL = "http://api.coinlayer.com/live"
    + "?access_key=" + liveAPIkey;
  var rateQueryURL = "https://api.exchangeratesapi.io/latest?base=USD&symbols=USD," + selection;
  var kanyeAPI = "https://api.kanye.rest";

  // This ajax function is a GET method to get a quote from the "Kanye Rest" API
  $.ajax({
    url: kanyeAPI,
    method: "GET"
  }).then(function (response) {
    console.log(response);
    // This is where we append the quote we retrieved using the "Kanye Rest" API
    $(".Kanye").text("Kanye inspirational quote:").append("<br>").append("<h1>" + "'" + response.quote + "'");
  });

  // This ajax function is a GET method to get the exchage rate of the specified currency
  $.ajax({
    url: rateQueryURL,
    method: "GET"
  }).then(function (response) {
    // These three variables hold the Rate of the selected currency in EUR, the USD currency in EUR and the selected currency in USD
    var selectionRates = response.rates[selection];
    var USDRates = response.rates.USD;
    var anything = selectionRates / USDRates;
    console.log(anything);
    // This is where we added text to the HTML showing what the user selected
    $(".selectedCurrency").text(selection);
    // We stored the selected currency rate in USD in local storage so we could call it later in a seperate ajax function
    localStorage.setItem("exchangeRate", anything);
  });

  // This ajax function is a GET method to get the current Bitcoin rate
  $.ajax({
    url: liveQueryURL,
    method: "GET"
  }).then(function (response) {
    // These variables hole the current Bitcoin rate, the selected currency rate in USD that we pulled from local storage, The selected currency rate in Bitcoin, and the selected currency rate in Bitcoin
    var BTCRate = response.rates.BTC;
    console.log(BTCRate);
    var something = localStorage.getItem("exchangeRate");
    var final = something * BTCRate;
    var rounded = Math.round(final * 100) / 100;
    var input = parseInt(inputfield);
    // This is to format the rate to #,###.##
    Number.parseFloat(rounded).toFixed(2);
    // This is to add the text to the HTML to show the final converted price and symbol of the selected currency in Bitcoin
    $(".BTC-Conversion").text(new Intl.NumberFormat(locale, {style: 'currency',currency: selection}).format(rounded)); 


    if (0 < input < 1000000) {
      $(".BTC-Conversion").text(new Intl.NumberFormat(locale, {style: 'currency',currency: selection}).format(rounded * input));
    } else if (input >= 1000000) {
      $(".BTC-Conversion").append(button);
    } else {
      $(".BTC-Conversion").text("Error: Please enter a valid number");
    };
  });


});

