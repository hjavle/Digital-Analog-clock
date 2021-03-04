
var currentTimeZoneInSeconds="";
var totalTimeZoneOffsetInSeconds=""; 
var cityTime="";
var DateTime = 0;
var seconds = 0; 
var minutes = 0;
var hours = 0;
var offset = 0; 
const hourHand = document.querySelector('[data-hour-hand]')
const minuteHand = document.querySelector('[data-minute-hand]')
const secondHand = document.querySelector('[data-second-hand]')
$(document).ready(function(event) {
    
    var digital = document.getElementById("digital clock");
    var analog = document.getElementById("analog clock");
    analog.style.display = "none";
    digital.style.display = "none";
   
$("#submit").on("click", function(event) {
    event.preventDefault();
    let apiKey = '&appid=9a7029fbfe4996b5ec005452b631a685';
    console.log(apiKey);    
    var city = $("#search-city").val();
    console.log(city);
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + apiKey;
    console.log(queryURL);    
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
    
    $("#display-city").text(JSON.stringify(response));
    console.log("user timezone :" + moment.tz());
    currentTimeZoneInSeconds = new Date().getTimezoneOffset() * 60;
    console.log(currentTimeZoneInSeconds);
    totalTimeZoneOffsetInSeconds = response.timezone + currentTimeZoneInSeconds;
    console.log(totalTimeZoneOffsetInSeconds);
    DateTime = new Date(response.dt * 1000);
    DateTime.setUTCSeconds(totalTimeZoneOffsetInSeconds);
    cityTime =  DateTime.toLocaleTimeString();
    console.log(city +" "+ cityTime);
    var seconds = DateTime.getSeconds();
    console.log (seconds);
    var minutes = DateTime.getMinutes();
    console.log (minutes);
    var hours = DateTime.getHours();
    console.log (hours);
    $('input:radio[name="choice"]').change(function(){
        if($(this).is(':checked')  && $(this).val() == 'digital'){
            setDigital();
            DateTime = new Date(response.dt * 1000);
            DateTime.setUTCSeconds(totalTimeZoneOffsetInSeconds);
            $("#Atlanta-time").text("Atlanta  "  + moment().format('LTS')); 
            $("#city-time").text(DateTime.toLocaleTimeString()); 
            
        } else if($("#analog").is(':checked')  && $("#analog").val() == 'analog'){
            setAnalog();
            const secondsRatio = seconds/60;
            const minutesRatio = (minutes + secondsRatio) /60;
            const hoursRatio = (hours + minutesRatio + offset) / 12; 
            setRotation(secondHand, secondsRatio);
            setRotation(minuteHand, minutesRatio);
            setRotation(hourHand, hoursRatio); 
            
        }
        function setRotation(element, rotationRatio)
        {
            element.style.setProperty(`--rotation`, rotationRatio * 360);
        }
        function setDigital() {
            var digital = document.getElementById("digital clock");
            var analog = document.getElementById("analog clock");
            analog.style.display = "none";
            digital.style.display = "flex";
        }
        
        function setAnalog() {    
            var analog = document.getElementById("analog clock");
            var digital = document.getElementById("digital clock");
            analog.style.display = "flex";
            digital.style.display = "none";
        } 
    });
    
});

})
});
