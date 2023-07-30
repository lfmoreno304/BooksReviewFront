
import { createContext, useContext, useState } from "react";
import { useRouter } from "next/router";
import  jwt  from "jsonwebtoken";
const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const [jwtToken, setJwtToken] = useState(null);
  function getCookie(name) {
    const value = "; " + document.cookie;
    const parts = value.split("; " + name + "=");
    if (parts.length === 2) return parts.pop().split(";").shift();
  }
  const credentials = () => {
    const tokenFromCookie = getCookie("token");
    setJwtToken(tokenFromCookie);
    try {
      const decoded = jwt.decode(tokenFromCookie);
      setUser(decoded);
    } catch (error) {
      console.error("Error al decodificar el token:", error.message);
    }
  };
  const logOut = () =>{
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    router.push("/");
  }
  return (
    <UserContext.Provider value={{ user, setUser, credentials, logOut, jwtToken }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser debe ser usado dentro de UserProvider");
  }
  return context;
}
