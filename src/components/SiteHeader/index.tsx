import React, { useEffect } from 'react';

import { Layout, Button } from 'antd';
import { ellipseAddress, formatBigNumWithDecimals } from '../../helpers/utilities';
import { IAssetData } from '../../helpers/types';
import { useDispatch, useSelector } from 'react-redux';
import { reset, setConnected, onConnect, onSessionUpdate, killSession, selectConnector, selectAssets, selectAddress, getAccountAssets, selectChain, setAddress } from '../../features/walletConnectSlice';
import WalletConnect from '@walletconnect/client';
import { setIsModalOpen } from '../../features/applicationSlice';
import { myAlgoConnect, selectMyAlgoAccounts, selectMyAlgoConnector } from '../../features/myAlgoSlice';

const { Header } = Layout;

const SiteHeader: React.FC = () => {
  const connector = useSelector(selectConnector);
  const myAlgoConnector = useSelector(selectMyAlgoConnector);
  const assets = useSelector(selectAssets);
  const address = useSelector(selectAddress);
  const myAlgoAccounts = useSelector(selectMyAlgoAccounts);
  const chain = useSelector(selectChain);
  const nativeCurrency = assets && assets.find((asset: IAssetData) => asset && asset.id === 0) || {
    id: 0,
    amount: BigInt(0),
    creator: "",
    frozen: false,
    decimals: 6,
    name: "Algo",
    unitName: "Algo",
  };

  const dispatch = useDispatch();

  useEffect(() => {
    // Check if connection is already established
    if (connector) {
      subscribeToEvents(connector);

      if (!connector.connected) {
        connector.createSession();
      }
      const { accounts } = connector;
      dispatch(setIsModalOpen(false));
      dispatch(setConnected(true));
      dispatch(onSessionUpdate(accounts));   
    }
    if (myAlgoConnector) {
      dispatch(setIsModalOpen(false));
      dispatch(myAlgoConnect(myAlgoConnector));
    }
  }, [connector, myAlgoConnector]);

  useEffect(() => {
    // Check if connection is already established
    console.log("in address useEffect")
    console.log("connector", connector)
    console.log("address", address)
    if (connector && address && address.length > 0) {
      dispatch(getAccountAssets({chain, address}));
    }
  }, [address]);

  useEffect(() => {
    if (myAlgoAccounts && myAlgoAccounts.length > 0) {
      console.log("myAlgoAccounts", myAlgoAccounts[0])
      const address = myAlgoAccounts[0] && myAlgoAccounts[0].address;
      dispatch(setAddress(address));
      dispatch(getAccountAssets({chain, address}));
    }
  }, [myAlgoAccounts]);

  const subscribeToEvents = (connector: WalletConnect) => {
    console.log("%cin subscribeToEvents", "background: yellow")
    if (!connector) {
      return;
    }
    // Subscribe to connection events
    connector.on("connect", (error, payload) => {
      console.log("%cOn connect", "background: yellow");
      if (error) {
        throw error;
      }
      dispatch(onConnect(payload));
    });
    
    connector.on("session_update", (error, payload) => {
      console.log("%cOn session_update", "background: yellow");
      if (error) {
        throw error;
      }
      const { connectedAccounts } = payload.params[0];
      dispatch(onSessionUpdate(connectedAccounts));
    });
    
    connector.on("disconnect", (error, payload) => {
      console.log("%cOn disconnect", "background: yellow");
      if (error) {
        throw error;
      }
      dispatch(reset());
    });
  }

  return (
    <Header className="site-layout-background site-header">
      <span>Connected to {chain}</span>
      {!address ?
        <Button onClick={() => dispatch(setIsModalOpen(true))}>
          {"Connect Wallet"}
        </Button>
      : <div className="header-address-info">
          <span>
            {formatBigNumWithDecimals(nativeCurrency.amount, nativeCurrency.decimals)} {nativeCurrency.unitName || "units"}
          </span>
          <span className="header-account">{ellipseAddress(address)}</span>
          <Button
            className="disconnect-button"
            onClick={() => dispatch(killSession())}
          >
            {"Disconnect"}
          </Button>
        </div>}
    </Header>
  );
}


export default SiteHeader;