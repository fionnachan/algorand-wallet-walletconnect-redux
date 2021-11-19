import React from 'react';
import { useSelector } from 'react-redux';
import { selectAssets, selectFetching } from '../../features/walletConnectSlice';
import AccountAssets from '../AccountAssets';
import LoadingIcon from '../LoadingIcon';

const SiteBody: React.FC = () => {
  const assets = useSelector(selectAssets);
  const loading = useSelector(selectFetching);

  return (
    <div className="site-body">
      <div className="site-body-inner">
        {loading ? 
          <LoadingIcon/>
          : <AccountAssets assets={assets}/>
        }
      </div>
    </div>
  )
}

export default SiteBody;