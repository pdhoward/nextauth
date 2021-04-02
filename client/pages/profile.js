import { useEffect, useState } from "react";
import { useRouter } from "next/router"

const profile = props => {
  const [message, setMessage] = useState("");

  const [auth, setAuth] = useState(false);

  const router = useRouter()

  useEffect(() => {
    (async () => {
      try {
        const {id, name, email, token} = router.query
        console.log(name, token)        
        setAuth(true);        
        setMessage(`Welcome ${user}`);
      } catch (err) {
        setAuth(false);
        setMessage("You are not authenticated");
      }
    })();
  });

  return <div className="default">{message}</div>;
};

export default profile;
