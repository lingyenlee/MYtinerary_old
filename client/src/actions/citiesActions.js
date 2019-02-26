import { GET_CITIES } from './types';
import axios from 'axios';

//the dispatch is action and triggers a state change
export const getCities = () => (dispatch) => {
	// console.log("getting response");
	axios.get('/api/cities').then((response) =>
		dispatch({
			type: GET_CITIES,
			payload: response.data,
		})
	);
};
