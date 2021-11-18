import React from 'react';
import { Layout, Breadcrumb } from 'antd';

import './App.css';
import SiteMenu from './components/SiteMenu';
import SiteHeader from './components/SiteHeader';

const { Content, Footer } = Layout;

const App: React.FC = () => {

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
        </Layout>
      </Layout>
  );
}

export default App;
