import React, { useState } from 'react';
import { Layout, Breadcrumb } from 'antd';
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "algorand-walletconnect-qrcode-modal";
import { IInternalEvent } from "@walletconnect/types";
import { formatJsonRpcRequest } from "@json-rpc-tools/utils";
import algosdk from "algosdk";

import './App.css';
import SiteMenu from './components/SiteMenu';
import { apiGetAccountAssets, ChainType } from './helpers/api';
import { IAssetData } from './helpers/types';
import { ellipseAddress } from './helpers/utilities';
import SiteHeader from './components/SiteHeader';
import { useDispatch } from 'react-redux';

const { Header, Content, Footer } = Layout;

const App: React.FC = () => {

  const dispatch = useDispatch();

  const [connected, setConnected] = useState<boolean>(false);
  const [accounts, setAccounts] = useState<string[]>([]);
  const [address, setAddress] = useState<string>("");
  const [chain, setChain] = useState<ChainType>(ChainType.TestNet);
  const [assets, setAssets] = useState<IAssetData[]>([]);
  const [connector, setConnector] = useState<WalletConnect | null>(null);

  const walletConnectInit = async () => {
    console.log("%cin walletConnectInit", "background: yellow")
    // Create a connector
    const walletConnector = new WalletConnect({
      bridge: "https://bridge.walletconnect.org", // Required
      qrcodeModal: QRCodeModal,
    });

    setConnector(walletConnector);
  
    // Check if connection is already established
    if (connector && !connector.connected) {
      // create new session
      await connector.createSession();
    } else {
      setConnected(true);
    }

    await subscribeToEvents();
  }

  const subscribeToEvents = async () => {
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
      onConnect(payload);
    });
    
    connector.on("session_update", (error, payload) => {
      console.log("%cOn session_update", "background: yellow");
      if (error) {
        throw error;
      }
      const { connectedAccounts } = payload.params[0];
      onSessionUpdate(connectedAccounts);
    });
    
    connector.on("disconnect", (error, payload) => {
      console.log("%cOn disconnect", "background: yellow");
      if (error) {
        throw error;
      }
    });

    if (connector.connected) {
      const { accounts } = connector;
      const address = accounts[0];
      setConnected(true);
      setAccounts(accounts);
      setAddress(address);
      onSessionUpdate(accounts);
    }
  }
  
  const onConnect = async (payload: IInternalEvent) => {
    const { connectedAccounts } = payload.params[0];
    await setConnected(true);
    await setAccounts(connectedAccounts);
    await setAddress(connectedAccounts[0]);
    getAccountAssets();
  };

  const onSessionUpdate = async (accounts: string[]) => {
    const address = accounts[0];
    await setAccounts(accounts);
    await setAddress(address);
    await getAccountAssets();
  };

  const getAccountAssets = async () => {
    try {
      // get account balances
      const assets = await apiGetAccountAssets(chain, address);

      await setAssets(assets);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
        <SiteMenu/>
        <Layout className="site-layout">
          <SiteHeader
            chain={chain}
            walletConnectInit={walletConnectInit}
            address={address}
            assets={assets}
          />
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              Bill is a cat.
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Where Defi ©2021 Created with ❤</Footer>
        </Layout>
      </Layout>
  );
}

export default App;
