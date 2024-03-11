import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

const checkTokenExpiry = (accessToken) => {
  if (!accessToken) {
    console.log('ACCESS TOKEN REQUIRED FOR CHECKING EXPIRY');
    return true;
  }

  const expirationTime = deocdeAndGetExpiryTime(accessToken);
  const currentTime = Math.floor(Date.now() / 1000);

  return currentTime >= expirationTime;
};

const deocdeAndGetExpiryTime = (token) => {
  try {
    const decodedToken = jwtDecode(token);

    if (!decodedToken) {
      console.log('FAILED WHILE FETCHING DECODED TOKEN');
      return 0;
    }
    return decodedToken.exp;
  } catch (error) {
    console.log('FAILED TO DECODE TOKEN AND FETCH EXPIRY TIMING');
    return 0;
  }
};

const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem('refreshToken');

  try {
    const response = await axios.post(
      '/api/v1/users/refresh-token',
      refreshToken
    );
    console.log(response.data);
    return response.data.data;
  } catch (error) {
    console.log('FAILED TO REFRESH ACCESS TOKEN FROM FRONTEND SIDE', error);
    return 0;
  }
};

const authenticationCheck = async () => {
  const accessToken = localStorage.getItem('accessToken');

  if (accessToken) {
    const isAccessTokenExpired = checkTokenExpiry(accessToken);

    if (isAccessTokenExpired) {
      console.log("refreshing the expired token");
      const response = await refreshAccessToken();
      console.log(response.data.data.accessToken);
      console.log(response.data.data.refreshToken);
      localStorage.setItem('refreshToken', response.data.data.refreshToken);
      localStorage.setItem('accessToken', response.data.data.accessToken);
    }

    return true;
  }
};

export {
  deocdeAndGetExpiryTime,
  checkTokenExpiry,
  refreshAccessToken,
  authenticationCheck,
};
