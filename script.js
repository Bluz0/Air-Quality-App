const pollutionScale = [
    {
      scale: [0, 50],
      quality: "Good",
      src: "happy",
      background: "linear-gradient(to right, #45B649, #DCE35B)",
    },
    {
      scale: [51, 100],
      quality: "Moderate",
      src: "thinking",
      background: "linear-gradient(to right, #F3F9A7, #CAC531)",
    },
    {
      scale: [101, 150],
      quality: "Unhealthy",
      src: "unhealthy",
      background: "linear-gradient(to right, #F16529, #E44D26)",
    },
    {
      scale: [151, 200],
      quality: "Bad",
      src: "bad",
      background: "linear-gradient(to right, #ef473a, #cb2d3e)",
    },
    {
      scale: [201, 300],
      quality: "Very bad",
      src: "mask",
      background: "linear-gradient(to right, #8E54E9, #4776E6)",
    },
    {
      scale: [301, 500],
      quality: "Terrible",
      src: "terrible",
      background: "linear-gradient(to right, #7a2828, #a73737)",
    },
  ];


const loader = document.querySelector(".loader"); //All loading card
const emote = document.querySelector(".emoji-img"); // Select emoji
const info_user = document.querySelector(".text-city"); // text bottom emoji


async function getPollutionData(){ // async always send answer
    // fetch wait url aee9b22d-406c-418a-b053-a0b4aaa109c4
    // await means wait until fetch is resolved or reject(error)
  try{
    const response = await fetch("http://api.airvisual.com/v2/nearest_city?key=aee9b22d-406c-418a-b053-a0b4aaa109c4").catch(error =>{

      throw new Error(error) //network error

    })  

    if(!response.ok){ // client & server error
      throw new Error(`Problem ! A ${response.status} error has been detected. ${response.statusText}`) // go to catch(error)

    }
    
    console.log(response);

    const responsedata = await response.json(); // Read body 
    console.log(responsedata);

    const pollutionLevel = responsedata.data.current.pollution.aqius;
    console.log(pollutionLevel);


    const sortedData = {

      city : responsedata.data.city,
      aqi : pollutionLevel,
      ...pollutionScale.find(obj => pollutionLevel >= obj.scale[0] && pollutionLevel <= obj.scale[1]) // if pollutionlvl between 0 and 50
      //... = Spread
    }

    console.log(sortedData);
    populationUi(sortedData);

  }

  catch(error){

    loader.classList.remove("active");
    emote.src = "./ressources/browser.svg";
    info_user.textContent = error.message;

  }
  
}




const cityName = document.querySelector(".text-one");
const pollutionInfo = document.querySelector(".text-second");
const pollutionValue = document.querySelector(".text-three");
const backgroundcolor = document.querySelector(".bg")

function populationUi(data){

  emote.src = "ressources/"+data.src+".png";
  info_user.textContent = "Information of : " + data.city ; // textContent > innertext
  cityName.textContent = data.city;
  pollutionInfo.textContent = data.quality;
  pollutionValue.textContent = data.aqi;
  backgroundcolor.style.backgroundImage = data.background;
  loader.classList.remove("active");

  pointerPlacement(data.aqi);
}


const locationPointer = document.querySelector(".point");

function pointerPlacement(Aqivalue){

  const parentWidth = locationPointer.parentElement.scrollWidth;
  console.log(parentWidth);
  console.log(Aqivalue/500); // divided by 500 because [0;500]
  console.log((Aqivalue/500)*parentWidth);

  locationPointer.style.transform = `translateX(${(Aqivalue / 500) * parentWidth}px) rotate(180deg)`;
}
  






getPollutionData();

