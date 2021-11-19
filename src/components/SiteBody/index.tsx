import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAssets } from '../../features/walletConnectSlice';
import AccountAssets from '../AccountAssets';

const SiteBody: React.FC = () => {
  const assets = useSelector(selectAssets);

  return (
    <div className="site-body">
      <div className="site-body-inner">
        <AccountAssets assets={assets}/>
      </div>
    </div>
  )
}

export default SiteBody;