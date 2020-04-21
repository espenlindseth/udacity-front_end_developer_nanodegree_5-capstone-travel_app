function getSelectedTrip() {
	let selectedTrip = document.getElementById("selectedTripName").innerText;
	return (selectedTrip.split(',', 1)[0]);
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function eventListeners() {

	// Add Accommodation btn
	document.getElementById("accommodationSubmit").addEventListener("click", function(){

		let accData = {}
		accData.trip = getSelectedTrip();
		accData.type = "accommodation"
		accData.name = document.getElementById("accommodationModalFormName").value;
		accData.address = document.getElementById("accommodationModalFormAddress").value;
		accData.checkin = document.getElementById("accommodationModalFormCheckin").value;
		Client.addTripData(accData);
	});

	// Add Travel btn
	document.getElementById("travelSubmit").addEventListener("click", function(){
		let travelData = {}
		travelData.trip = getSelectedTrip();
		travelData.type = "travel"
		travelData.method = document.getElementById("travelModalFormControlSelect").value;
		travelData.depart_from = document.getElementById("travelModalFormDepartName").value;
		travelData.depart_at = document.getElementById("travelModalFormDepartTime").value;
		travelData.return_from = document.getElementById("travelModalFormReturnName").value;
		travelData.return_at = document.getElementById("travelModalFormReturnTime").value;
		Client.addTripData(travelData);
	});

	// Packing List: Add btn
	document.getElementById("packingAdd").addEventListener("click", function(){
		const packingItem = document.getElementById("packingModalFormItem").value;
		const packingList = document.getElementById("packingListGroup");
		const newList = document.createElement("li");
		newList.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
		const newSpan = document.createElement("span");
		newSpan.innerHTML = capitalizeFirstLetter(packingItem);
		newSpan.classList.add("packlist-item");
		const newSpanDelete = document.createElement("span");
		newSpanDelete.classList.add("pack-list-delete", "badge", "badge-danger");
		newSpanDelete.innerHTML = "X";
		newList.append(newSpan);
		newList.append(newSpanDelete);
		packingList.append(newList);
		document.getElementById("packingModalFormItem").value = "";
		newSpanDelete.addEventListener("click", function(){
			this.parentElement.remove();
		})
	});

	// Packing List: Submit btn
	document.getElementById("packingSubmit").addEventListener("click", function(){
		let packingData = {}
		packingData.trip = getSelectedTrip();
		packingData.type = "packing";

		let packList = []
		const packListItems = document.querySelectorAll('.packlist-item');
		for (const item of packListItems) {
			packList.push(item.textContent);
		}
		packingData.packList = packList;
		console.log(packingData)
		Client.addTripData(packingData);
	});

	// Add Notes btn
	document.getElementById("notesSubmit").addEventListener("click", function(){
		let notesData = {}
		notesData.trip = getSelectedTrip();
		notesData.type = "notes"
		notesData.note = document.getElementById("notesModalFormName").value;
		Client.addTripData(notesData);
	});

	// Cancel Trip btn
	document.getElementById("cancelSubmit").addEventListener("click", function(){
		delete tripArray[getSelectedTrip()];
		Client.updateUserInterface();
	});

	document.getElementById("addTripSubmit").addEventListener("click", function(e){
		e.preventDefault();
	    const inputLocation = document.getElementById('input-location').value
	    const inputDate = document.getElementById('input-date').value

	    if ( (!inputLocation) && (!inputDate) ) {
	    	document.getElementById("inputLocationInvalid").classList.add("d-block");
	    	document.getElementById("inputDateInvalid").classList.add("d-block");
	    } else if (!inputLocation) {
	    	document.getElementById("inputLocationInvalid").classList.add("d-block");
	    	document.getElementById("inputDateInvalid").classList.remove("d-block");
	    } else if (!inputDate) {
	    	document.getElementById("inputLocationInvalid").classList.remove("d-block");
	    	document.getElementById("inputDateInvalid").classList.add("d-block");
	    } else {
	    	document.getElementById("inputLocationInvalid").classList.remove("d-block");
	    	document.getElementById("inputDateInvalid").classList.remove("d-block");
	    	Client.handleSubmit();
	    }
	});
}

export { eventListeners }

