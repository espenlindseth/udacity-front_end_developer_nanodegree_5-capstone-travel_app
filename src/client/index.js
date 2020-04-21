// Import bootstrap
import 'bootstrap';

// Import Flatpicks
import flatpickr from "flatpickr";
flatpickr("#input-date", {mode: "range"});

// Import JS
import { handleSubmit } from './js/formHandler'
import { geoNamesLookup } from './js/apiHandlers'
import { weatherBitLookup } from './js/apiHandlers'
import { pixabayLookup} from './js/apiHandlers'
import { apiLookup} from './js/apiHandlers'
import { addTravel} from './js/domManipulation'
import { addTripData} from './js/domManipulation'
import { updateUserInterface } from './js/domManipulation'
import { eventListeners} from './js/eventListeners'

// Import SCSS/SASS
import './styles/base.scss'
import './styles/header.scss'
import './styles/navigation.scss'
import './styles/footer.scss'
import './styles/main.scss'

export { 
	handleSubmit ,
	geoNamesLookup,
	weatherBitLookup,
	pixabayLookup,
	apiLookup,
	addTravel,
	addTripData,
	updateUserInterface,
	eventListeners
} 

// Initialise Global array and eventlisteners
function ready(fn) {
  if (document.readyState != 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

ready(function() {
  window.tripArray = {}
  Client.eventListeners();
})
