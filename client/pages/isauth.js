import { useEffect, useState } from "react";
import jwtDecode from 'jwt-decode'

const isauth = () => {
  // retrieve jwt for testing on server
  const [response, setResponse] = useState({});
  const [auth, setAuth] = useState(false);

  let token = localStorage.getItem("token")
  
  useEffect(async () => {
      try {
          await fetch("http://localhost:8000/api/users/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },      
            body: JSON.stringify({
              token
            }),
          })
          .then((d) => d.json())
          .then((data) => {
            setAuth(true)
            console.log(data)
            setResponse(data)
          })
        } catch (err) {
          console.log(err)
          setAuth(false);
          setResponse({message: "Error when fetching data"});
        }
      },[])
    

  console.log(response)
  let {message, name} = response
  if (message) {
    return (
      <div className="default">
        <p>You are Not Authorized</p>
        <p>{message}</p>
        <p>You can't access this page</p>
      </div>
      )
  }
  return (
    <div className="default">
      <p>You are Authorized {name}</p>      
      <p>You can access this page</p>
    </div>
    )
};

export default isauth
