import React from 'react';
import { Button, Dialog } from 'evergreen-ui';
import { useDispatch, useSelector } from 'react-redux';

import './App.css';
import SiteHeader from './components/SiteHeader';
import { walletConnectInit } from './features/walletConnectSlice';
import { selectIsModalOpen, setIsModalOpen } from './features/applicationSlice';
import SiteBody from './components/SiteBody';
import algowallet from "./assets/algorandwallet.svg";

const App: React.FC = () => {
  const isModalOpen = useSelector(selectIsModalOpen);
  const dispatch = useDispatch();

  return (
    <div>
      <div className="site-layout">
        <SiteHeader/>
        <SiteBody/>
        <div className="footer">Made with 💖 by <a
            href="https://github.com/fionnachan"
            target="_blank"
            rel="noreferrer"
          >@fionnachan</a>
        </div>
        <Dialog
          isShown={isModalOpen}
          title="Connect to a wallet"
          hasFooter={false}
          onCloseComplete={() => dispatch(setIsModalOpen(false))}
        >
          <Button className="wallet-button" onClick={() => dispatch(walletConnectInit())}>
            <img className="wallet-icon" src={algowallet} alt="Algorand wallet"/>
            <span>Algorand Wallet</span>
          </Button>
        </Dialog>
      </div>
    </div>
  );
}

export default App;
