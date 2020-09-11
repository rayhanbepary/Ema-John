import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

export const initializeLoginFramework = () => {
    if(firebase.apps.length === 0 ){
        firebase.initializeApp(firebaseConfig);
    }
};

export const handleGoogleSignIn = () =>{
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(googleProvider)
    .then(result => {
      const {displayName, email, photoURL} = result.user;
      const signedInUser = {
        isSignedIn: true,
        name: displayName,
        email: email,
        photo: photoURL,
        success: true
      }
      return signedInUser;

    })
    .catch( error => {
      console.log(error);
      console.log(error.code);
      console.log(error.message);
      console.log(error.email);
      console.log(error.credential);
    });
}

  export const handleFbSignIn = () => {
    const FbProvider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithPopup(FbProvider)
    .then( result => {
      var token = result.credential.accessToken;
      var user = result.user;
      user.success = true;
      return user;
    })
    .catch( error => {
      console.log(error);
      console.log(error.code);
      console.log(error.message);
      console.log(error.email);
      console.log(error.credential);
    });
}

  export const handleSignOut = () => {
    return firebase.auth().signOut()
    .then( () => {
      const signedOutUser = {
        isSignedIn: false,
        name: '',
        email: '',
        photo: '',
        error: '',
        success: false
      }
      return signedOutUser;
    })
    .catch( error => {
     console.log(error);
    });
}

  export const createUserWithEmailAndPassword = ( name, email, password ) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then( res => {
      const newUserInfo = res.user;
      newUserInfo.error = '';
      newUserInfo.success = true;
      updateUserInfo(name);
      return newUserInfo;
    })
    .catch( error => {
      const newUserInfo = {};
      newUserInfo.error = error.message
      newUserInfo.success = false;
      return newUserInfo;
    });
}

  export const signInWithEmailAndPassword = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
    .then(res => {
      const newUserInfo = res.user;
      newUserInfo.error = '';
      newUserInfo.success = true;
      return newUserInfo;
    })
    .catch( error =>{
      const newUserInfo = {};
      newUserInfo.error = error.message
      newUserInfo.success = false;
      return newUserInfo;
    });
}

const updateUserInfo = (name,photo) => {
    const user = firebase.auth().currentUser;
    user.updateProfile({
      displayName: name,
    })
    .then( () => console.log('user name updated successfully'))
    .catch( error => console.log(error));
}