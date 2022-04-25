import React, { createContext } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import store from "./store";
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "algorand-walletconnect-qrcode-modal";

const connectProps = {
  bridge: "https://bridge.walletconnect.org",
  qrcodeModal: QRCodeModal,
};
const connector = new WalletConnect(connectProps);
export const ConnectContext = createContext(connector);

const renderApp = () =>
  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <ConnectContext.Provider value={connector}>
          <App />
        </ConnectContext.Provider>
      </Provider>
    </React.StrictMode>,
    document.getElementById("root"),
  );

if (process.env.NODE_ENV !== "production" && (module as any).hot) {
  (module as any).hot.accept("./App", renderApp);
}

renderApp();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
