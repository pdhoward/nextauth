import { useState } from "react";
import { useRouter } from "next/router";
const login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleSubmit = async e => {
    e.preventDefault();

    const data = await fetch("http://localhost:8000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },      
        body: JSON.stringify({
          email,
          password,
        }),
      })
      .then((d) => {return d.json()})
    
    // note data object includes user name, and jwt authorizing access
    localStorage.setItem('token', data.token)
    
    await router.push({
      pathname: "/profile",
      query: data
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-div">
          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="email"
            id="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className="form-div">
          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="password"
            id="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <div className="form-div">
          <button className="button" type="submit">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default login;
