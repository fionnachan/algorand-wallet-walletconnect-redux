import React, { useState } from 'react';

import { Layout, Button } from 'antd';
import { ellipseAddress } from '../../helpers/utilities';
import { IAssetData } from '../../helpers/types';
import { ChainType } from '../../helpers/api';

const { Header } = Layout;

const SiteHeader: React.FC<{
    chain: ChainType,
    walletConnectInit: React.MouseEventHandler,
    address: string,
    assets: IAssetData[]
  }> = ({
    chain,
    walletConnectInit,
    address,
    assets
  }) => {
    const [collapsed, setCollapsed] = useState<boolean>(false);

    return (
      <Header className="site-layout-background" style={{ padding: 0, color: 'white' }}>
        <span>Connected to {chain}</span>
        {!address ?
          <Button onClick={walletConnectInit}>
            {"Connect to WalletConnect"}
          </Button>
        : <>
          <span>{ellipseAddress(address)}</span>
          <span>{assets}</span>
          </>}
      </Header>
  );
}


export default SiteHeader;