// GeoNames API
const geoNamesUrlStart = "http://api.geonames.org/searchJSON?formatted=true&q=";
const geoNamesApiName = "&username=espen_lindseth";
const geoNamesUrlEnd = "&style=full";

// WeatherBit API
const weatherBitUrlStart = "https://api.weatherbit.io/v2.0/current?lat=";
const weatherBitUrlEnd = "&key=4e969b9b176149ef9ab0b146e6739305";
const weatherBitApiKey = "4e969b9b176149ef9ab0b146e6739305";
// Pixabay API
const pixabayUrlStart = "https://pixabay.com/api/?key="
const pixabayApiKey = "16097076-bb872c7f2b0811e1705b5d943"

const geoNamesLookup = async (location) => {

  const geoNamesApiUrl = geoNamesUrlStart+location+geoNamesApiName+geoNamesUrlEnd;
  try {
    const response = await fetch(geoNamesApiUrl);
    if (response.ok) {
      const location = {};
      const jsonRes = await response.json();
      location.latitude = jsonRes.geonames[0].lat;
      location.longitude = jsonRes.geonames[0].lng;
      location.name = jsonRes.geonames[0].name;
      location.country_code = jsonRes.geonames[0].countryCode;
      location.country_name = jsonRes.geonames[0].countryName;
      return(location);
    }
  } catch (error) {
    console.log(error);
  }
}

async function weatherBitLookup(latitude, longitude, startDay, endDay) {

  const weatherBitUrl = "https://api.weatherbit.io/v2.0/normals?lat=" + latitude + "&lon=" + longitude + "&start_day=" + startDay + "&end_day=" + endDay + "&tp=daily&key=" + weatherBitApiKey;
  try {
    const response = await fetch(weatherBitUrl);
    if (response.ok) {
      const jsonRes = await response.json();
      return(jsonRes);
    }
  } catch (error) {
    console.log(error);
  }
}

async function pixabayLookup(location) {
    const pixabayUrl = pixabayUrlStart + pixabayApiKey + "&q=" + location + "&image_type=photo";
  try {
    const response = await fetch(pixabayUrl);
    if (response.ok) {
      const jsonRes = await response.json();
      return(jsonRes);
    }
  } catch (error) {
    console.log(error);
  }
}

async function apiLookup(location) {
  try {

  geoNamesLookup(location).then(data => {
    weatherBitLookup(data.latitude, data.longitude).then(data => {
      let apiData = {}
          apiData.temperature = data.data[0].temp;
          apiData.city_name = data.data[0].city_name;
          apiData.country_code = data.data[0].country_code;
          pixabayLookup(location).then(data => {
            apiData.image = data.hits[0].pageURL;
            return(apiData)
          })
      })
  })

  } catch (error) {
    console.log(error)
  }
}

export { geoNamesLookup }
export { weatherBitLookup }
export { pixabayLookup }
export { apiLookup }