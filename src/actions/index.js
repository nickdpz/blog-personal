import api from '../utils/api'

export const registerRequest = (payload) => ({
	type: 'REGISTER_REQUEST',
	payload,
});


export const deleteFavorite = (payload) => ({
	type: 'DELETE_FAVORITE',
	payload,
});

export const loginRequest = (payload) => ({
	type: 'LOGIN_REQUEST',
	payload,
});

export const logoutRequest = (payload) => ({
	type: 'LOGOUT_REQUEST',
	payload,
});

export const setError = (payload) => ({
	type: 'SET_ERROR',
	payload,
});

export const registerUser = (payload, redirectUrl) => {
	return async (dispatch) => {
		try {
			const data = await api.createUser(payload);
			if (!data.error) {
				await dispatch(registerRequest(data));
				window.location.href = redirectUrl;
			} else {
				dispatch(setError({ error: "Bad Request" }));
			}
		} catch (error) {
			dispatch(setError(error))
		}
	}
};

export const loginUser = (payload, redirectUrl) => {
	return async (dispatch) => {
		try {
			const data = await api.singIn(payload);
			if (!data.error) {
				document.cookie = `token=${data.token}`
				document.cookie = `email=${data.user.email}`;
				document.cookie = `name=${data.user.name}`;
				document.cookie = `id=${data.user.id}`;
				await dispatch(loginRequest(data.user));
				window.location.href = redirectUrl;
			} else {
				dispatch(setError({ error: "Bad Request" }));
			}
		} catch (error) {
			dispatch(setError(error))
		}
	};
};
