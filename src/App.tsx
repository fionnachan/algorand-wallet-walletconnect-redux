import React from 'react';
import { Button, Dialog } from 'evergreen-ui';

import './App.css';
import SiteHeader from './components/SiteHeader';
import { walletConnectInit } from './features/walletConnectSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsModalOpen, setIsModalOpen } from './features/applicationSlice';
import { myAlgoInit } from './features/myAlgoSlice';

const App: React.FC = () => {
  const isModalOpen = useSelector(selectIsModalOpen);
  const dispatch = useDispatch();

  return (
    <div style={{ minHeight: '100vh' }}>
      <div className="site-layout">
        <SiteHeader/>
        <div className="site-body"></div>
        <div className="footer">Where Defi ©2021 Created with ❤</div>
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
          <Button className="wallet-button" onClick={() => dispatch(myAlgoInit())}>
            <img className="wallet-icon" src="/wallet/myalgo.svg"/>
            <span>My Algo Wallet</span>
          </Button>
          <Button className="wallet-button">
            {/* onClick={() => dispatch(algoSignerInit())}> */}
            <img className="wallet-icon" src="/wallet/algosigner.svg"/>
            <span>AlgoSigner</span>
          </Button>
        </Dialog>
      </div>
    </div>
  );
}

export default App;
