import {useContext, useState} from  'react';
import { initializeApp } from "firebase/app";
import firebaseConfig from '../../FirebaseAuthConfig';
import { getAuth,GoogleAuthProvider,signInWithPopup,signOut,createUserWithEmailAndPassword,signInWithEmailAndPassword,updateProfile,FacebookAuthProvider} from "firebase/auth";
import { userContext } from '../../App';
import { useLocation, useNavigate } from 'react-router-dom';


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
function Login() {
  const provider = new GoogleAuthProvider();
  const fbProvider = new FacebookAuthProvider();
  
  const [newUser,setNewUser] = useState(false);
  const [users,setUsers] = useState({
    isSignedIn:false,
    name:'',
    email:'',
    photo:'',
    error:"",
    success:false
  });


  const [loggedInUser,setLoggedInUser] = useContext(userContext);
  const history = useNavigate();


  const handleSignIn = () => {
    signInWithPopup(auth, provider)
    .then((result) => {
      // The signed-in user info.
      const {displayName,photoURL,email} = result.user;
      const signedUser = {
        isSignedIn:true,
        name:displayName,
        email:email,
        photo:photoURL
      }
      setUsers(signedUser);
      setLoggedInUser(signedUser);
      history('/shipment');
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      console.log(errorCode,errorMessage,email);
     
      
    });
  }

  const handleSignOut = () => {
    signOut(auth).then(() => {
      const signedUser = {
        isSignedIn:false,
        name:'',
        email:'',
        photo:''
      }
      setUsers(signedUser);
    }).catch((error) => {
      // An error happened.
      console.log(error)
    });
  }

  const handlePasswordSignIn = (e) =>{
    let formValid;
        if(e.target.name==='email'){
          const regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
          formValid = regex.test(e.target.value);
          
        }
        if(e.target.name === 'password'){
          const pattern = /^(?=.*[0-9])/;
          const isPasswordValid = e.target.value.length>6;
          const passwordHasNumber = pattern.test(e.target.value);
          formValid = isPasswordValid && passwordHasNumber;
        }
        if(e.target.name === 'name'){
          formValid = true;
        }
        if(formValid){
           const newUserInfo = {...users};
           newUserInfo[e.target.name] = e.target.value;
           setUsers(newUserInfo)
        }
  }


  const handleSubmitForm = (e) =>{
        if(newUser && users.email && users.password){
          createUserWithEmailAndPassword(auth, users.email, users.password)
          .then((res) => {
            const newUserInfo = {...users};
            newUserInfo.success = true;
            newUserInfo.error = '';
            setUsers(newUserInfo);
            updateUserName(users.name);
            
          })
          .catch((error) => {
            const newUserInfo = {...users};
            newUserInfo.success = false;
             newUserInfo.error = error.message;
            setUsers(newUserInfo);
            // ..
          });
        }
        if(!newUser && users.email && users.password){
          signInWithEmailAndPassword(auth,users.email, users.password)
          .then((res) => {
            // Signed in 
            const newUserInfo = {...users};
            newUserInfo.success = true;
            newUserInfo.error = '';
            setUsers(newUserInfo);
            setLoggedInUser(newUserInfo);
            history('/shipment');
          })
          .catch((error) => {
            const newUserInfo = {...users};
            newUserInfo.success = false;
             newUserInfo.error = error.message;
            setUsers(newUserInfo);
           
            
          });
        }
        e.preventDefault();
  }

  const updateUserName= name => {
      
    updateProfile(auth.currentUser, {
      displayName: name
    }).then(() => {
      // Profile updated!
      console.log("UserName Updated SuccessFully")
    }).catch((error) => {
      console.log(error);
    });
  }
  const handleFbLogin = () => {
    signInWithPopup(auth, fbProvider)
  .then((result) => {
    // The signed-in user info.
    const user = result.user;

    console.log(user);
    

    // ...
  })
  .catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.email;
    // The AuthCredential type that was used.
    const credential = FacebookAuthProvider.credentialFromError(error);

    // ...
  });
  }

  const handlePasswordSignOut = () =>{
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  }
  return (
    <div className="App">
         {
         users.isSignedIn ? <button onClick={handleSignOut}>SignOut</button>:<button onClick={handleSignIn}>SignIn</button>
         }
         <h4>Name: {users.name}</h4>
         <p>Email: {users.email}</p>
         <img src={users.photo} alt="" />

         <button onClick={handleFbLogin}>Login With FaceBook</button>

         <h1>Our Own Authentication Here</h1>
             <input type="checkbox" name="newUser" onChange={()=>setNewUser(!newUser)} />
             <label htmlFor="newUser">New User SignUp</label><br />
         <form onClick={handleSubmitForm}>
             {newUser&&<input type="text" name="name" onBlur={handlePasswordSignIn} placeholder="Enter Your Name" required/>}<br />
             <input type="text" onBlur={handlePasswordSignIn} name="email" placeholder="Enter Your Email" required /><br />
             <input type="password" onBlur={handlePasswordSignIn} name="password" placeholder="Enter Your password" required /><br />
             {
               users.error && <p style={{color:"red"}}>{users.error}</p>
             }
             {
               users.success && <h4 style={{color:"green"}}>Account {newUser?"Created":"Logged In"} Successfully</h4>
             }
             {
               users.success ? <button onClick={handlePasswordSignOut}>SignOUt</button> : <input type="submit" value="Submit" />
             }
         </form>


    </div>
  );
}

export default Login;
