import { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useUserContext } from "../../context/UserContext";

const SignIn = () => {
  const { setUser } = useUserContext();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  async function signUserIn(data) {
    const result = await axios.post("/api/user/logUserIn", {
      ...data,
    });
    console.log(result);
    Cookies.set("token", result.data.token, { expires: 7 });
    setUser(result.data.token);
    // Il faudra ajouter headers.Authorization = `Bearer ${result.data.token}`;
    // Eventuellement prendre le user aussi dans la réponse
    // setUser
    // setUser(result.data.user);
  }

    const handleSubmit = (e) => {
      e.preventDefault();
      const data = {
        email: email,
        // password: password,
      };
      signUserIn(data);
    };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Connexion</h1>

      <div className="form-group">
        <label htmlFor="email">Email *</label>
        <input
          id="email"
          type="text"
          onChange={handleEmail}
          className="form-control"
        />
      </div>

      <div className="form-group">
        <label htmlFor="password">Mot de passe *</label>
        <input
          id="password"
          type="text"
          onChange={handlePassword}
          className="form-control"
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Connexion
      </button>
    </form>
  );
};

export default SignIn;
