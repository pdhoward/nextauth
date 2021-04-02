import { useEffect, useState } from "react";
import { useRouter } from "next/router"

const profile = props => {
  const [message, setMessage] = useState("");

  const [auth, setAuth] = useState(false);

  const router = useRouter()

  useEffect(async () => {
   
      try {  
        const {name, token} = router.query     
        setAuth(true); 
        setMessage(`Welcome ${name}`);
      } catch (err) {
        setAuth(false);
        console.log(err)
        setMessage("You are not authenticated");
      }
    }, [])


  return <div className="default">{message}</div>;
};

export default profile;
