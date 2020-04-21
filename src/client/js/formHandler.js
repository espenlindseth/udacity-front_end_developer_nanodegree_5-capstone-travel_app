function handleSubmit(e) {
    const inputLocation = document.getElementById('input-location').value
    const inputDate = document.getElementById('input-date').value
    const dateArray = inputDate.split(" to ");
	Client.geoNamesLookup(inputLocation).then(data => {
		let apiData = {}
		apiData.name = data.name;
		apiData.country_code = data.country_code;
		apiData.country_name = data.country_name;
		Client.weatherBitLookup(data.latitude, data.longitude, dateArray[0].slice(5), dateArray[1].slice(5)).then(data => {
	        apiData.avg_temperature = data.data[0].temp;
	        apiData.min_temperature = data.data[0].min_temp;
	        apiData.max_temperature = data.data[0].max_temp;

	        Client.pixabayLookup(inputLocation).then(data => {
	        	apiData.image = data.hits[0].largeImageURL;
	        	apiData.dates = inputDate;
	        	apiData.startDate = dateArray[0];
	        	apiData.endDate = dateArray[1];
	        	Client.addTravel(apiData);
	        })
	    })
	});

}

export { handleSubmit }
