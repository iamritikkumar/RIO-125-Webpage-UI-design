const API_KEY = "02da3a267634606159481b82abbe934"; 2


// Fetch from html-----

let search_btn = document.querySelector("#search-btn"); 
let search_box = document.querySelector("#search-box");
let city_name_div=document.querySelector(".city-name");
let curr_date_div = document.querySelector(".current-date"); 
let weather_img_div = document.querySelector("#weather-ing");
let weather_cond_div = document.querySelector(".weather-condition");
let curr_temp_div=document.querySelector(".current-temp"); 
let flag_div = document.querySelector("#country-flag");
let humidity_div = document.querySelector("#humidity");
let wind_div = document.querySelector("#wind");

// ---------x--------x--------x--------x--------x--------x

12

// Global Variabbles ------->>>

let temp; 
let humidity;
let wind;
let cityName;
let countryName;
let weather_ing; 
let weatherCond;
let currDate;
let issearchBar = false;

// current date ------->>>>>

const date=new Date();

const options={
    weekday: "long",
    year: 'numeric',
    month: 'long', 
    day: 'numeric'
};

currDate=date.toLocaleString("en-IN", options);

// --------x-------x-------x


defaultwork(); // for default screen or weather conditions

function defaultwork() {
    getCurrentLocation();
}

// Get current Location of user ----->>

function getCurrentLocation() {

    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(async (position) =>{

            // return the result set 
            fetchAP12( position.coords.latitude, position.coords.longitude);

        });

    }else{
        console.log("not working");
    }
}

// Show data on screen--->>>> 
function showDataOnScreen (result){
    
    // assign values to variables
    
    temp = $(result?.main?.temp.toFixed(2)); 
    humidity = 'humidity : S{result?.main?.humidity.toFixed(2)}';
    wind = 'Wind : S{result?.wind?.speed.toFixed(2)} mph';
    cityName = '$(result?.name}';
    countryName = '$(result?.sys?.country)'; 
    weatherCond = '${result?.weather?.[@]?.description)';
    weather_img = '$[result?.weather?.[0]?.icon)';
    

    // show on screen
    
    curr_temp_div.innerText = temp;
    humidity_div.innerText=humidity;
    wind_div.innerText = wind;
    city_name_div.innerText = cityName; 
    curr_date_div.innerText = currDate;
    weather_cond_div.innerText=weatherCond;
    
    flag_div.src="https://flagcdn.com/40x30/(countryName.toLowerCase()).png";
    
    weather_ing_div.src="https://openweathermap.org/img/w/5(weather_ing).png";


}
    
//fetch APIS
async function fetchAPI1(name) {
    
    try{
        const date= await fetch("https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${APT_KEY}&units=metric");

        const result = await data.json();

        showDataOnScreen(result);

    }catch (err) {
    
      // call the error method

    }
    

}
    
async function fetchAPI2(lat,lon) {
    
    try{

        let data = await fetch("https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}");
        
        let result = await data.json();

        showDataOnScreen(result);
    
    } catch(err){
        // call the error method

    }


}


search_btn.addEventListener("click", () =>{

    if (issearchBar) {
        // searching code
        let value = search_box.value; 
        fetchAPI1(value);

}else{
    issearchBar = true; 
    search_box.style.display="block";
}
});