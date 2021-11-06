import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    LOGIN_FAIL,
    LOGIN_LOADING,
    LOGIN_SUCCESS,
} from '../../constants/actionsTypes/index';
import axiosInstance from '../../helpers/axiosInstance';

export default  (values) => (dispatch) => {
    dispatch({
        type: LOGIN_LOADING,
    });
    axiosInstance
        .post('refresh')
        .then((res) => {
            AsyncStorage.setItem('token', res.data.access_token);
            AsyncStorage.setItem('user', JSON.stringify(res.data.user));
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data,
            });
        })
        .catch((err) => {
            dispatch({
                type: LOGIN_FAIL,
                payload: err.response
                    ? err.response.data
                    : {error: 'Veuillez vérifier vos identifiants'},
            });
        });
};
