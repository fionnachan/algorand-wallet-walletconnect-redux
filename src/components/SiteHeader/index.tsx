import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import WalletConnect from '@walletconnect/client';
import { Button, Select } from 'evergreen-ui';

import { ellipseAddress, formatBigNumWithDecimals } from '../../helpers/utilities';
import { IAssetData } from '../../helpers/types';
import { reset, setConnected, onConnect, onSessionUpdate, killSession, selectConnector, selectAssets, selectAddress, getAccountAssets, selectChain, selectConnected, walletConnectInit, switchChain, setFetching, selectFetching } from '../../features/walletConnectSlice';
import { setIsModalOpen } from '../../features/applicationSlice';
import { ChainType } from '../../helpers/api';

const SiteHeader: React.FC = () => {
  const loading = useSelector(selectFetching);
  const connector = useSelector(selectConnector);
  const connected = useSelector(selectConnected);
  const assets = useSelector(selectAssets);
  const address = useSelector(selectAddress);
  const chain = useSelector(selectChain);
  let nativeCurrency = assets && assets.find((asset: IAssetData) => asset && asset.id === 0);
  if (nativeCurrency === undefined || nativeCurrency == null) {
    nativeCurrency = {
      id: 0,
      amount: BigInt(0),
      creator: "",
      frozen: false,
      decimals: 6,
      name: "Algo",
      unitName: "Algo",
    };
  }

  const dispatch = useDispatch();

  useEffect(() => {
    if (window.localStorage.getItem("walletconnect") != null) {
      dispatch(walletConnectInit());
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (connected) {
      dispatch(setIsModalOpen(false));
    }
  }, [connected]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    // Check if connection is already established
    if (connector) {
      subscribeToEvents(connector);
      dispatch(setConnected(true));
      if (!connector.connected) {
        connector.createSession();
      }
      const { accounts } = connector;
      dispatch(onSessionUpdate(accounts));   
    }
  }, [connector]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    // Check if connection is already established
    if (connector && address && address.length > 0) {
      console.log("chain: ", chain)
      dispatch(getAccountAssets({chain, address}));
      dispatch(setFetching(true));
    }
  }, [address, chain]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    dispatch(setFetching(false));
  }, [assets]); // eslint-disable-line react-hooks/exhaustive-deps

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
      const { accounts } = payload.params[0];
      dispatch(onSessionUpdate(accounts));
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
    <div className="site-layout-background site-header">
      <div className="site-header-inner">
        <div>
          <span>Connected to </span>
          <Select
            defaultValue={ChainType.TestNet}
            onChange={event => dispatch(switchChain((event.target as HTMLSelectElement).value))}
            >
            <option value={ChainType.TestNet}>
              Testnet
            </option>
            <option value={ChainType.MainNet}>
              Mainnet
            </option>
          </Select>
        </div>
        {!address ?
          <Button onClick={() => dispatch(setIsModalOpen(true))}>
            {"Connect Wallet"}
          </Button>
        : <div className="header-address-info">
            {loading ? null : <span>
              {formatBigNumWithDecimals(nativeCurrency.amount, nativeCurrency.decimals)} {nativeCurrency.unitName || "units"}
            </span>}
            <span className="header-account">{ellipseAddress(address)}</span>
            <Button
              className="disconnect-button"
              onClick={() => dispatch(killSession())}
            >
              {"Disconnect"}
            </Button>
        </div>}
      </div>
    </div>
  );
}


export default SiteHeader;