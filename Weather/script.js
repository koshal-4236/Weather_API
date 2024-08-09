const input=document.querySelector('.in');
const search=document.getElementById('butt');
const weather=document.querySelector('.w-img');
const temperature=document.querySelector('.temp');
const description=document.querySelector('.desc');
const humidity=document.getElementById('humid');
const speed=document.getElementById('speed');
const locationn=document.querySelector('.location');
const weatherr_body=document.querySelector('.weather');
const barr=document.querySelector('.bar');

input.addEventListener("keypress",function(event){
    if(event.key==="Enter"){
        event.preventDefault();
        search.click();
    }
})
async function checkWeather(city){
    const api_key='63dbf9a5d62d9d0800bc6be955535718';
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    const weather_data=await fetch(`${url}`)
    .then(response=>response.json());
    console.log(weather_data);

    if(weather_data.cod==='404'){
        locationn.style.display="flex";
        weatherr_body.style.display="none";
        barr.style.display="none";
        console.log('error');
        return;
    }
    locationn.style.display="none";
    weatherr_body.style.display="flex";
    barr.style.display="none";
    temperature.innerHTML=`${Math.round(weather_data.main.temp-273.15)}°C`;
    description.innerHTML=`${weather_data.weather[0].description}`;
    humidity.innerHTML=`${weather_data.main.humidity}%`;
    speed.innerHTML=`${weather_data.wind.speed}km/H`;

    switch(weather_data.weather[0].main){
        case 'Clouds':
            weather.src="../assets/cloud.png";
            break;
        case 'Clear':
            weather.src="../assets/clear.png";
            break;
        case 'Mist':
            weather.src="../assets/mist.png";     
            break;
        case 'Rain':
            weather.src="../assets/rain.png";
            break;
        case 'Snow':
            weather.src="../assets/snow.png";  
            break;         
    }
}
search.addEventListener('click',()=>{
    checkWeather(input.value);
})

