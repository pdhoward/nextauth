import jwtDecode from 'jwt-decode'

const isauth = () => {
  // retrieve jwt for testing on server
  let token = localStorage.getItem("token")
  const data = await fetch("http://localhost:8000/api/users/verify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },      
    body: JSON.stringify({
      token
    }),
  })
  .then((d) => {return d.json()})  
    if (data.message) {
     return (
      <div className="default">
        <p>You are Not Authorized</p>
        <p>{data.message}</p>
        <p>You couldn't access this page</p>
    </div>) 
    } else {
      return (
        <div className="default">
          <p>You are Authorized</p>
          <p>{data.name}</p>
          <p>You couldn't access this page</p>
        </div>
        )
    }  
    
};

export default isauth
