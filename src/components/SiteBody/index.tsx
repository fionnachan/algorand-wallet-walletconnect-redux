import React from "react";
import { selectAssets } from "../../features/walletConnectSlice";
import { useAppSelector } from "../../store/hooks";
import AccountAssets from "../AccountAssets";
import LoadingIcon from "../LoadingIcon";

const SiteBody: React.FC = () => {
  const loading = useAppSelector((state) => state.walletConnect.fetching);
  const assets = useAppSelector(selectAssets);

  return (
    <div className="site-body">
      <div className="site-body-inner">
        {loading ? <LoadingIcon /> : <AccountAssets assets={assets} />}
      </div>
    </div>
  );
};

export default SiteBody;
