import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App"
import * as serviceWorker from "./serviceWorker"
import { GithubProvider } from "./context/context"
import { Auth0Provider } from "@auth0/auth0-react"
const root = ReactDOM.createRoot(document.getElementById("root"))

//{process.env.REACT_APP_AUTH_DOMAIN}
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-xe3isswffk7hgz0y.us.auth0.com"
      clientId="DNR9hfhju8xWcHw4Y3TFpu40aUzRis8N"
      redirectUri={window.location.origin}
      cacheLocation="localstorage"
    >
      <GithubProvider>
        <App />
      </GithubProvider>
    </Auth0Provider>
  </React.StrictMode>
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
