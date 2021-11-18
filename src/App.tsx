import React from 'react';
import { Layout, Breadcrumb, Button, Modal } from 'antd';

import './App.css';
import SiteMenu from './components/SiteMenu';
import SiteHeader from './components/SiteHeader';
import { walletConnectInit } from './features/walletConnectSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsModalOpen, setIsModalOpen } from './features/applicationSlice';
import { myAlgoInit } from './features/myAlgoSlice';

const { Content, Footer } = Layout;

const App: React.FC = () => {
  const isModalOpen = useSelector(selectIsModalOpen);
  const dispatch = useDispatch();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <SiteMenu/>
      <Layout className="site-layout">
        <SiteHeader/>
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
        <Modal
          visible={isModalOpen}
          title="Connect to a wallet"
          footer={null}
          onCancel={() => dispatch(setIsModalOpen(false))}
        >
          <Button className="wallet-button" onClick={() => dispatch(walletConnectInit())}>
            <img className="wallet-icon" src="/wallet/algorandwallet.svg"/>
            <span>Algorand Wallet</span>
          </Button>
          <Button className="wallet-button" onClick={() => dispatch(myAlgoInit())}>
            <img className="wallet-icon" src="/wallet/myalgo.svg"/>
            <span>My Algo Wallet</span>
          </Button>
        </Modal>
      </Layout>
    </Layout>
  );
}

export default App;
