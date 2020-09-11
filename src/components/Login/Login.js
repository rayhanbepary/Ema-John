import React, { useState, useContext } from 'react';
import { userContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { handleGoogleSignIn, handleFbSignIn, handleSignOut, initializeLoginFramework, createUserWithEmailAndPassword, signInWithEmailAndPassword } from './LoginManager';




function Login() {

  const [newUser, setNewUser] = useState(false);
  const [user,setUser] = useState({
    isSignedIn: false,
    isNewUser: false,
    name: '',
    email: '',
    password: '',
    photo: ''
  })

  initializeLoginFramework();

  const [loggedInUser, setLoggedInUser] = useContext(userContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };


  const googleSignIn = () => {
    handleGoogleSignIn()
    .then(res => {
        handleResponse(res, true)  
    })
 }

 const fbSignIn = () => {
    handleFbSignIn()
    .then(res => {
        handleResponse(res, true)
    })
 }

 const signOut = () => {
    handleSignOut()
    .then(res => {
        handleResponse(res, false)
    })
 }


 const handleResponse = (res, redirect) => {
    setUser(res);
    setLoggedInUser(res);
    if(redirect){
        history.replace(from);
    }
 }

  const handleChange = (event) => {
    let isFieldValid = true;
    if(event.target.name === 'email'){
       isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);
    }
    if(event.target.name === 'password'){
      const isPasswordValid = event.target.value.length > 6;
      const PasswordNumber = /\d{1}/.test(event.target.value);
      isFieldValid = isPasswordValid && PasswordNumber;

    }
    if(isFieldValid){
      const newUserInfo = {...user};
      newUserInfo[event.target.name] = event.target.value
      setUser(newUserInfo);
    }
  }


  const handleSubmit = (event) => {
    event.preventDefault();
    if(newUser && user.email && user.password){
        createUserWithEmailAndPassword( user.name, user.email, user.password )
        .then(res => {
            handleResponse(res, true)
        });
    }
    if(!newUser && user.email && user.password){
        signInWithEmailAndPassword(user.email, user.password)
        .then(res => {
            handleResponse(res, true)
        });
    }
 }

 
  return (
    <div style={{textAlign: 'center'}}>
      {
        user.isSignedIn ? <button onClick={signOut}>sign out</button>
        : <button onClick={googleSignIn}>sign up</button>
      }
      <br/>
      <button onClick={fbSignIn}>Sign up using Facebook</button>
      {
        user.isSignedIn ? <div>
          <h1>welcome {user.name}</h1>
          <h2>{user.email}</h2>
          <img src={user.photo} alt=""/>
        </div>
        : <h1>please sign in</h1>
      }
      
      <h1>Log in form</h1>
      <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id=""/>
      <label htmlFor="newUser">New user sign up</label>
      <form onSubmit={handleSubmit}>

        {newUser && <input name="name" onChange={handleChange} type="text" placeholder="your name"/> }
        <br/>
        <input type="email" name="email" onChange={handleChange} placeholder="your email" required/>
        <br/>
        <input type="password" name="password" onChange={handleChange} placeholder="your password" required/>
        <br/>
        <input type="submit" onClick={handleSubmit} value={newUser ? "sign up" : "sign in"}/>
      </form>
      {
        user.success ? <p>Successfully {newUser ? 'created account' : 'logged in'}</p> : <p>{user.error}</p>
      }
      <h1>{user.email}</h1>
      <h1>{user.password}</h1>
    </div>
  );
}

export default Login;
