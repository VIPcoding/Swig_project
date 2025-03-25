import React, { useEffect, useState } from "react";
import "./App.css";
import {useNavigate} from "react-router-dom"

function App() {

  const [isVisible, setisVisible] = useState(false);

  const [data, setData] = useState([]);

  const [alpha, setAlpha] = useState('');
  const [beta, setBeta] = useState('');
  const[error, setError]= useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword]= useState('');
  const navigate = useNavigate();


  useEffect(() => {
    fetch("http://localhost:3004/data").then(resp => resp.json()).then(json => {
      setData(json)
    });

  }, [])

  const ShowPage = () => {
    setisVisible(true);
  }

  const ClosePage = () => {
    setisVisible(false);
  }

  const CheckData = (e) => {
  
    e.preventDefault();
    if(email==="" && password===""){
      setError('Enter Email and Password');
    }else{
      console.log("click")
      let user = data.find((x)=>x.email==email&&x.password==password);
          if(user){
            alert('Login Successfull');
            navigate("/Dashboard");
            setEmail('');
            setPassword('');
          }
      
      }
  }

  const Onsubmit = (e)=>{
    e.preventDefault();
    if(alpha==="" && beta===""){
      setError('Enter Email and Password');
    }else{
      fetch("http://localhost:3004/data",{
        method:"POST",
        headers:{
          'content-type':"application/json"
        },
        body: JSON.stringify({
          email:alpha,
          password:beta
        })
      })
      setAlpha('');
      setBeta("")
      setisVisible(false);
    }
    
  }

  return (
    <div className="brandBody">
      <div className="Brand">
        <div className="row">
          <div className="col-lg-6">
            <div className="container">
              <div className="navbar-brand">
                <img className="float-start mt-3" src="https://product-assets.faasos.io/eatsure_cms/production/333b405b-13b6-429f-82db-900e9795da54.png" height={'90px'} />
              </div>
              <button className="btn btn-primary float-end mt-4" onClick={() => { ShowPage() }}>Sign in </button>
              {
                isVisible && (
                  <div className="popup" style={{ display: isVisible ? 'block' : 'none' }}>
                    <button className="btn btn-primary float-end mt-1 ms-1" onClick={() => { ClosePage() }}>Close </button>
                    <h1>Sign in Page</h1>
                    <form style={{ position: 'relative', top: '-30px' }} onSubmit={Onsubmit}>
                      <input value={alpha} onChange={(e)=>{setAlpha(e.target.value)}}  type="text" className="form-control mt-3" placeholder="Email" />
                      <span>{error}</span>
                      <input value={beta} onChange={(e)=>{setBeta(e.target.value)}} type="password" className="form-control mt-3" placeholder="Password" />
                      <span>{error}</span>
                      <button className="btn btn-primary mt-2" type="submit">Submit </button>
                    </form>
                  </div>
                )
              }
              <div className="brandContent">
                <div className="row">
                  <div className="col-lg-12 mt-5">
                    <h1 style={{ fonsize: '3rem', fontWeight: "500" }}>Skip boring food and indulge in flavoursome Wraps, Meals and Bowls!</h1>
                  </div>
                  <div className="col-lg-12 mt-5">
                    <form  onSubmit={CheckData}>
                      <input value={email} onChange={(e)=>{setEmail(e.target.value)}} type="text"  className="form-control w-75" placeholder="Email" />
                       <span>{error}</span>
                      <input value={password}  onChange={(e)=>{setPassword(e.target.value)}} type="password"  className="form-control w-75 mt-3" placeholder="Password"  />
                       <span>{error}</span>
                      <button className="btn btn-primary mt-3" type="submit" >Submit </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="brandSideImage">
              <img src="https://product-assets.faasos.io/eatsure_cms/production/333b405b-13b6-429f-82db-900e9795da54.png" />
            </div>
          </div>
        </div>


      </div>
    </div>
  )
}

export default App;