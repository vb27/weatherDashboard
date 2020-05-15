var searches = []; 

$(document).on("click",".prevSearch",prevSearch);

render(); 

$("#searchBtn").on("click",function(event) {
    event.preventDefault(); 
    searchInput = $("#search").val().trim(); 
    saveSearch(searchInput); 
    search(searchInput); 
    $("#search").val(""); 
}); 

function render() {
    $("#prevSearches").empty(); 
    searches = JSON.parse(localStorage.getItem("searches")); 
    if(searches) {
        for(var i = 0; i < searches.length; i++) {
            var newRow = $("<div>"); 
            console.log(newRow); 
            newRow.attr("class","row"); 
            
            var newBtn = $("<button>");
            newBtn.attr("class","prevSearch btn btn-secondary");  
            newBtn.html(searches[i]); 

            newRow.append(newBtn); 
            $("#prevSearches").prepend(newRow); 
        }
        search(searches[searches.length - 1]); 
    }   
}
function saveSearch(searchItem) {
    if(!searches) {
        searches = []; 
    }
    searches.push(searchItem); 

    localStorage.setItem("searches",JSON.stringify(searches)); 

    render(); 
}

function search(searchItem) {
    
    var apiKey = "6f539c63cd3802e2eb82a7cccf50e151"; 
    var weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchItem + "&appid=" + apiKey;
    var fiveDayURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchItem + "&appid=" + apiKey;


    $.ajax({
        url: weatherURL, 
        method: "GET"
    }).then(function(response) {
        console.log(response); 

        var lat = response.coord.lat; 
        var lon = response.coord.lon; 
        var uvURL = "https://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey + "&lat=" + lat + "&lon=" + lon; 
        $.ajax({
            url: uvURL, 
            method: "GET"
        }).then(function(uvResponse) {
            console.log(uvResponse); 

            var cityName = response.name; 
            cityName = cityName.substring(0,1).toUpperCase() + cityName.substring(1); 
            var weather = response.weather[0].description; 

            var date = response.dt; 

            date = new Date(date*1000);
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var day = date.getDate();
            
            date = "(" + month + "/" + day + "/" + year + ")"; 
            var temp = ((response.main.temp - 273.15) * 1.80 + 32).toFixed(2);
            var humidity = response.main.humidity;
            var windSpeed = response.wind.speed; 
            var uv = uvResponse.value; 

            var uvTag = $("<p>"); 
            uvTag.attr("id","uvTag"); 
            uvTag.text(uv); 
    
            if(parseFloat(uv) <= 2) {
                uvTag.attr("class","text-success");
            }
            else if(parseFloat(uv) <= 5) {
                uvTag.attr("class","text-warning");
            }
            else {
                uvTag.attr("class","text-danger")
            }

            $("#cityDiv").html("<h3>" + cityName + " " + date + "</h3>"); 
            $("#weatherDiv").html("<p>Weather: " + weather + "</p>"); 
            $("#tempDiv").html("<p>Temperature: " + temp + 	"&#176;" + "F</p>");  
            $("#humidityDiv").html("<p>Humidity: " +  humidity + "%</p>"); 
            $("#windSpeedDiv").html("<p>Wind Speed: " + windSpeed + "MPH</p>"); 
            $("#uvDivCol1").html(uvTag);
        }); 
    }); 

    $.ajax({
        url: fiveDayURL, 
        method: "GET"
    }).then(function(response) {
        console.log(response); 
            var date = response.list[8].dt; 

            date = new Date(date*1000);
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var day = date.getDate();
            
            date = month + "/" + day + "/" + year; 
            var weather = response.list[8].weather[0].main; 
            var temp = ((response.list[8].main.temp - 273.15) * 1.80 + 32).toFixed(2);
            var humidity = response.list[8].main.humidity; 

            $("#dayOneDate").html("<h4>" + date + "</h4>"); 
            $("#dayOneWeather").html("<p>Weather: " + weather + "</p>"); 
            $("#dayOneTemp").html("<p>Temperature: " + temp + "&#176;" + "F</p>"); 
            $("#dayOneHumidity").html("<p>Humidity: " + humidity + "%</p>"); 

            date = response.list[16].dt; 

            date = new Date(date*1000);

            year = date.getFullYear();
            month = date.getMonth() + 1;
            day = date.getDate();
            
            date = month + "/" + day + "/" + year; 
            var weather = response.list[16].weather[0].main; 
            var temp = ((response.list[16].main.temp - 273.15) * 1.80 + 32).toFixed(2);
            var humidity = response.list[16].main.humidity; 

            $("#dayTwoDate").html("<h4>" + date + "</h4>"); 
            $("#dayTwoWeather").html("<p>Weather: " + weather + "</p>"); 
            $("#dayTwoTemp").html("<p>Temperature: " + temp + "&#176;" + "F</p>"); 
            $("#dayTwoHumidity").html("<p>Humidity: " + humidity + "%</p>"); 

            date = response.list[24].dt; 

            date = new Date(date*1000);

            year = date.getFullYear();
            month = date.getMonth() + 1;
            day = date.getDate();
            
            date = month + "/" + day + "/" + year; 
            var weather = response.list[24].weather[0].main; 
            var temp = ((response.list[24].main.temp - 273.15) * 1.80 + 32).toFixed(2);
            var humidity = response.list[24].main.humidity; 

            $("#dayThreeDate").html("<h4>" + date + "</h4>"); 
            $("#dayThreeWeather").html("<p>Weather: " + weather + "</p>"); 
            $("#dayThreeTemp").html("<p>Temperature: " + temp + "&#176;" + "F</p>"); 
            $("#dayThreeHumidity").html("<p>Humidity: " + humidity + "%</p>"); 

            date = response.list[32].dt; 

            date = new Date(date*1000);

            year = date.getFullYear();
            month = date.getMonth() + 1;
            day = date.getDate();
            
            date = month + "/" + day + "/" + year; 
            var weather = response.list[32].weather[0].main; 
            var temp = ((response.list[32].main.temp - 273.15) * 1.80 + 32).toFixed(2);
            var humidity = response.list[32].main.humidity; 

            $("#dayFourDate").html("<h4>" + date + "</h4>"); 
            $("#dayFourWeather").html("<p>Weather: " + weather + "</p>"); 
            $("#dayFourTemp").html("<p>Temperature: " + temp + "&#176;" + "F</p>"); 
            $("#dayFourHumidity").html("<p>Humidity: " + humidity + "%</p>");  

            date = response.list[39].dt; 

            date = new Date(date*1000);

            year = date.getFullYear();
            month = date.getMonth() + 1;
            day = date.getDate();
            
            date = month + "/" + day + "/" + year; 
            var weather = response.list[39].weather[0].main; 
            var temp = ((response.list[39].main.temp - 273.15) * 1.80 + 32).toFixed(2);
            var humidity = response.list[39].main.humidity; 

            $("#dayFiveDate").html("<h4>" + date + "</h4>"); 
            $("#dayFiveWeather").html("<p>Weather: " + weather + "</p>"); 
            $("#dayFiveTemp").html("<p>Temperature: " + temp + "&#176;" + "F</p>"); 
            $("#dayFiveHumidity").html("<p>Humidity: " + humidity + "%</p>"); 
    }); 
}
function prevSearch() {
    var searchItem = $(this).text(); 
    search(searchItem); 
}