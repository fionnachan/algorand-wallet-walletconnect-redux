import React, { useContext, useEffect } from "react";
import { Button, Select } from "evergreen-ui";
import { ellipseAddress, formatBigNumWithDecimals } from "../../helpers/utilities";
import { IAssetData } from "../../helpers/types";
import {
  reset,
  onSessionUpdate,
  getAccountAssets,
  switchChain,
  selectAssets,
} from "../../features/walletConnectSlice";
import { setIsModalOpen } from "../../features/applicationSlice";
import { ChainType } from "../../helpers/api";
import { ConnectContext } from "../..";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

const SiteHeader: React.FC = () => {
  const { fetching: loading, address, chain } = useAppSelector((state) => state.walletConnect);
  const assets = useAppSelector(selectAssets);
  const dispatch = useAppDispatch();
  const connector = useContext(ConnectContext);

  useEffect(() => {
    // Check if connection is already established
    if (connector.connected) {
      const { accounts } = connector;
      dispatch(onSessionUpdate(accounts));
    }

    // Subscribe to connection events
    console.log("%cin subscribeToEvents", "background: yellow");
    connector.on("connect", (error, payload) => {
      console.log("%cOn connect", "background: yellow");
      if (error) {
        throw error;
      }
      const { accounts } = payload.params[0];
      dispatch(onSessionUpdate(accounts));
      dispatch(setIsModalOpen(false));
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

    return () => {
      console.log("%cin unsubscribeFromEvents", "background: yellow");
      connector.off("connect");
      connector.off("session_update");
      connector.off("disconnect");
    };
  }, [dispatch, connector]);

  useEffect(() => {
    // Retrieve assets info
    if (address?.length > 0) {
      console.log("chain: ", chain);
      dispatch(getAccountAssets({ chain, address }));
    }
  }, [dispatch, address, chain]);

  const nativeCurrency = assets.find((asset: IAssetData) => asset.id === 0)!;

  return (
    <div className="site-layout-background site-header">
      <div className="site-header-inner">
        <div>
          <span>Connected to </span>
          <Select
            value={chain}
            onChange={(event) => dispatch(switchChain(event.target.value as ChainType))}
          >
            <option value={ChainType.TestNet}>Testnet</option>
            <option value={ChainType.MainNet}>Mainnet</option>
          </Select>
        </div>
        {!address ? (
          <Button onClick={() => dispatch(setIsModalOpen(true))}>Connect Wallet</Button>
        ) : (
          <div className="header-address-info">
            {!loading && (
              <span>
                {formatBigNumWithDecimals(nativeCurrency.amount, nativeCurrency.decimals)}{" "}
                {nativeCurrency.unitName || "units"}
              </span>
            )}
            <span className="header-account">{ellipseAddress(address)}</span>
            <Button
              className="disconnect-button"
              onClick={() => connector.killSession().catch((err) => console.error(err.message))}
            >
              Disconnect
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SiteHeader;
