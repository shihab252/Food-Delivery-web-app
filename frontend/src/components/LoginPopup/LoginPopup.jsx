import React, { useContext,useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/frontend_assets/assets'
import { StoreContext } from '../../Context/StoreContext'
import axios from 'axios'

const LoginPopup = ({setShowLogin}) => {


   const {url,setToken}= useContext(StoreContext)
    const [currState,setCurrState]= useState("Login")
    const [data,setData]=useState({
      name:"",
      email:"",
      password:""
    })

    const onChangeHander= (event)=>{
      const name=event.target.name;
      const value= event.target.value;
      setData(data=>({...data,[name]:value}))
    }

    const onLogin= async (event)=>{

      event.preventDefault();

      let newUrl =url;
      if (currState==="Login") {
        newUrl+="/api/user/login"
        
      }
      else{
        newUrl+="/api/user/registration"
      }

      const response= await axios.post(newUrl,data);
      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token",response.data.token);
        setShowLogin(false)


        
      }
      else{
        alert(response.data.message);
      }





    }












  return (
    <div className='login-popup'>
      <form  onSubmit={onLogin} action="" className="login-popup-container">
        <div className="login-popup-title">
            <h2>{currState}</h2>
            <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-input">
            {currState==="Login"?<></>:< input name='name' onChange={onChangeHander} value={data.name} type="text" placeholder='your name' required/>}
            
            <input name='email' onChange={onChangeHander} value={data.email} type="email" placeholder='Your E-mail' required />
            <input name='password' onChange={onChangeHander} value={data.password} type="password" placeholder='Password' required />
        </div>
        <button type='submit'>{currState==="Sign Up"?"Create account":"Login"}</button>
        <div className="login-popup-condition">
            <input type="checkbox" required />
            <p>By continuing, I agree to all the terms of use & privacy Policy</p>
        </div>
        {currState==="Login"?<p>Create a new account? <span onClick={()=>setCurrState("Sign Up")}>Click here</span></p>
        :
        <p>Alrady habe an account? <span onClick={()=>setCurrState("Login")}>Login here</span></p>}
        
        
      </form>
    </div>
  )
}

export default LoginPopup
