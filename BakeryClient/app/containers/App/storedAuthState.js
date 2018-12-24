export function setStoredAuthState(accessToken, profile) {
  // localStorage.setItem('id_token', idToken);
  localStorage.setItem('access_token', accessToken);
  localStorage.setItem('profile', JSON.stringify(profile));
}

export function removeStoredAuthState() {
  // localStorage.removeItem('id_token');
  localStorage.removeItem('access_token');
  localStorage.removeItem('profile');
}

export function getStoredAuthState() {
  try {
    // const idToken = localStorage.getItem('id_token');
    const accessToken = localStorage.getItem('access_token');
    const profile = JSON.parse(localStorage.getItem('profile'));

    // Checks incase some error happened sometime during previous auth and the
    // auth was set to some bogus values.

    // if (idToken === null || typeof idToken === 'undefined' || idToken === 'undefined' || idToken === '') {
    //   return null;
    // }

    if (accessToken === null || typeof accessToken === 'undefined' || accessToken === 'undefined' || accessToken === '') {
      return null;
    }

    if (profile === null || typeof profile === 'undefined' || profile === 'undefined' || profile === '') {
      return null;
    }

    return { accessToken, profile };
  } catch (error) {
    removeStoredAuthState();

    return null;
  }
}
