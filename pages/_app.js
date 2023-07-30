import "../styles/globals.css";
import { NextUIProvider } from "@nextui-org/react";
import { UserProvider } from "../contexts/userContext";
function MyApp({ Component, pageProps }) {
  return (
    <NextUIProvider>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </NextUIProvider>
  );
}

export default MyApp;
