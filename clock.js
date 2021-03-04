
const today = moment();
const timezone = moment.tz();
console.log(today.format());
$("#search-button").on("click", function(event)
{
  event.preventDefault();

  function setClockChoice() {
    for (var radio of document.getElementsByName("choice")) 
      if (radio.checked) {
        clockChoice = radio.value;
        break;
      }
      if (clockChoice == "digital")
      { 
        setDigital();
      }else if (clockChoice == "analog")
      {
        setDigital();
        
      }
    console.log(clockChoice);
    }

  function myFunction() {
    var city = document.getElementById("search-city").value;
    console.log (city); 
    document.getElementById("display-city").innerHTML = city;
    setClockChoice();
  }
  function  setDigital(){
      var city = document.getElementById("search-city").value;
      console.log (city); 
      document.getElementById("display-city").innerHTML = city;
      var a = moment.tz("2013-11-18 11:55", "Asia/Taipei");
      var b = moment.tz("2013-11-18 11:55", "America/Toronto");
      console.log(a);
  }
})