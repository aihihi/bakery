import axios from 'axios';

export default class Auth0API {
  constructor(domain) {
    this.domain = `https://${domain}`;
    this.request = axios.create({
      baseURL: this.domain,
      // timeout: 4000,
    });
  }

  getToken(username, password) {
    return this.request
      .post('/api/users/authenticate', {
        username,
        password,
        // connection: 'Username-Password-Authentication',
        // grant_type: 'password',
        // audience: this.audience,
        // response_type: 'access_token',
        // scope: 'openid email',
      })
      .catch((error) => {
        const response = error.response;
        const newError = new Error('Login Failed');

        if (response && response.data && response.data.error) {
          newError.type = response.data.error;
          newError.description = response.data.error;
          throw newError;
        }

        throw error;
      })
      .then((response) => response.data);
  }

  getUserInfo(accessToken) {
    return this.request('/userinfo', {
      params: {
        access_token: accessToken,
      },
    })
    .then((response) => response.data);
  }


}
