import * as actionTypes from './types'
import { firebase } from '../firebase/firebase'

export const login = (uid) => ({
  type: actionTypes.LOGIN,
  uid
})

export const startLogin = (email, password) => {
  return dispatch => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === 'auth/wrong-password') {
          alert('Wrong password.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
      });
  }
}

export const logout = () => ({
  type: actionTypes.LOGOUT
})

export const startLogout = () => {
  return () => {
    return firebase.auth().signOut()
  }
}
