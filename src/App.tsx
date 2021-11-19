import React from 'react';
import { Button, Dialog } from 'evergreen-ui';

import './App.css';
import SiteHeader from './components/SiteHeader';
import { walletConnectInit } from './features/walletConnectSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsModalOpen, setIsModalOpen } from './features/applicationSlice';

const App: React.FC = () => {
  const isModalOpen = useSelector(selectIsModalOpen);
  const dispatch = useDispatch();

  return (
    <div style={{ minHeight: '100vh' }}>
      <div className="site-layout">
        <SiteHeader/>
        <div className="site-body"></div>
        <Dialog
          isShown={isModalOpen}
          title="Connect to a wallet"
          hasFooter={false}
          onCloseComplete={() => dispatch(setIsModalOpen(false))}
        >
          <Button className="wallet-button" onClick={() => dispatch(walletConnectInit())}>
            <img className="wallet-icon" src="/wallet/algorandwallet.svg"/>
            <span>Algorand Wallet</span>
          </Button>
        </Dialog>
      </div>
    </div>
  );
}

export default App;
