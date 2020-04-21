function timeUntilTravel(startDate) {
    var currentDate = new Date(); 
	var travelDate = new Date(startDate); 

	var Difference_In_Time = travelDate.getTime() - currentDate.getTime(); 
	var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24); 
	return Math.round(Difference_In_Days);
}

function addTravel(apiData) {
    const tripName = apiData.name;
	tripArray[tripName] = apiData;
	updateUserInterface(tripArray)
	document.getElementById('next-trip').classList.add("visible");
	document.getElementById('no-trip').classList.add("hidden");

}

function nextTripRender(data) {
	const selectedTripImage = document.getElementById('selectedTripImage').getElementsByTagName('img')[0];
	selectedTripImage.src = data.image;

	const selectedTripName = document.getElementById('selectedTripName');
	selectedTripName.innerHTML = data.name + ", " + data.country_name;

	const selectedTripEta = document.getElementById('selectedTripEta');
	selectedTripEta.innerHTML = timeUntilTravel(data.startDate);

	const selectedTripStartDate = document.getElementById('selectedTripStartDate');
	selectedTripStartDate.innerHTML = data.startDate;

	const selectedTripTempAvg = document.getElementById('selectedTripTempAvg');
	selectedTripTempAvg.innerHTML = data.avg_temperature;

	const selectedTripTempMax = document.getElementById('selectedTripTempMax');
	selectedTripTempMax.innerHTML = data.max_temperature;

	const selectedTripTempMin = document.getElementById('selectedTripTempMin');
	selectedTripTempMin.innerHTML = data.min_temperature;

	const selectedTripAccommodation = document.getElementById('selectedTripAccommodation');
	const selectedTripTravel = document.getElementById('selectedTripTravel');
	const selectedTripPacking = document.getElementById('selectedTripPacking');
	const selectedTripNotes = document.getElementById('selectedTripNotes');

	selectedTripAccommodation.textContent = "";
	selectedTripTravel.textContent = "";
	selectedTripPacking.textContent = "";
	selectedTripNotes.textContent = "";

	if (data.accommodation) {
		selectedTripAccommodation.append(data.accommodation);
	}
	if (data.travel) {
		selectedTripTravel.append(data.travel);
	}
	if (data.packing) {
		selectedTripPacking.append(data.packing);
	}
	if (data.notes) {
		selectedTripNotes.append(data.notes);
	}
}

function updateUserInterface() {
	// delete current cards
	  const cardContent = document.getElementById("travel-items");
	  cardContent.textContent = "";


	// Iterate through the saved objects to create the cards
	for (let [key, value] of Object.entries(tripArray)) {

		const newCard = document.createElement("div");
		newCard.classList.add("card");
		newCard.setAttribute('data-trip-name', key);
		newCard.setAttribute('data-trip-start', value.startDate);


		const newCardBody = document.createElement("div");
		newCardBody.classList.add("card-body");

		const newCardTitle = document.createElement("h5");
		newCardTitle.classList.add("card-title");
		newCardTitle.innerHTML = value.name;
		
		const newCardText = document.createElement("p");
		newCardText.classList.add("card-text");
		newCardText.innerHTML = value.dates;

		const newCardImage = document.createElement("img");
		newCardImage.src = value.image;

		newCard.append(newCardBody);
		newCardBody.append(newCardTitle);
		newCardBody.append(newCardText);
		newCard.append(newCardImage);

	    const travelItems = document.getElementById('travel-items');
	    travelItems.append(newCard);

		newCard.addEventListener("click", function(){
			nextTripRender(tripArray[this.getAttribute("data-trip-name")]);
			document.getElementById("selectedTripHeader").textContent = "Selected Trip:";
		})
	}

	// Get the next trip from the data-attributes
	let tripDateArr = []
	const tripDateNodeList = document.querySelectorAll("[data-trip-start]");
	tripDateNodeList.forEach(function(val){
		tripDateArr.push(val.getAttribute('data-trip-start'));
	})
	tripDateArr.sort();

	const nextTrip = document.querySelector("[data-trip-start='"+tripDateArr[0]+"']").getAttribute("data-trip-name");
	nextTripRender(tripArray[nextTrip]);
	document.getElementById("selectedTripHeader").textContent = "Your Next Trip:";
}

function addTripData(formData) {
	switch (formData.type) {
		case "accommodation":
			const selectedTripAccommodation = document.getElementById('selectedTripAccommodation');
		    selectedTripAccommodation.textContent = "";

			const newTripAccommodation = document.createElement("p");
			newTripAccommodation.innerHTML = "You're staying at:<br>"+formData.name+"<br>"+formData.address+"<br>Check-in at: "+formData.checkin;
			selectedTripAccommodation.append(newTripAccommodation);

			tripArray[formData.trip].accommodation = newTripAccommodation;
			break;
		case "travel":
			const selectedTripTravel = document.getElementById('selectedTripTravel');
		    selectedTripTravel.textContent = "";
			const newTripTravel = document.createElement("p");
			newTripTravel.innerHTML = "Travel Information:<br>Mode of transport: "+formData.method+"<br>"+"Departing from: "+formData.depart_from+", at "+formData.depart_at+"<br>Returning from: "+formData.return_from+", at "+formData.return_at
			selectedTripTravel.append(newTripTravel);

			tripArray[formData.trip].travel = newTripTravel;
			break;
		case "packing":
			const selectedTripPacking = document.getElementById('selectedTripPacking');
		    selectedTripPacking.textContent = "";
			const newTripPacking = document.createElement("p");
			newTripPacking.innerHTML = "Packing List:<br>"+formData.packList;
			selectedTripPacking.append(newTripPacking);

			tripArray[formData.trip].packing = newTripPacking;
			break;
		case "notes":
			const selectedTripNotes = document.getElementById('selectedTripNotes');
		    selectedTripNotes.textContent = "";
			const newTripNote = document.createElement("p");
			newTripNote.innerHTML = "Notes:<br>"+formData.note;
			selectedTripNotes.append(newTripNote);
			tripArray[formData.trip].notes = newTripNote;
			break;
		default:
		    // This should not happen, print to console for debug.
		    console.log(formData.note);
	}
}

export { addTravel }
export { addTripData }
export { updateUserInterface }