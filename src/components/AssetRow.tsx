import Icon from "./Icon";
import ASAIcon from "./ASAIcon";
import algo from "../assets/algo.svg";
import { formatBigNumWithDecimals } from "../helpers/utilities";
import { IAssetData } from "../helpers/types";

const AssetRow = (props: { asset: IAssetData }) => {
  const { asset } = props;
  const nativeCurrencyIcon = asset.id === 0 ? algo : null;
  return (
    <div className="asset-row" {...props}>
      <div className="asset-info">
        {nativeCurrencyIcon ? <Icon src={nativeCurrencyIcon} /> : <ASAIcon assetID={asset.id} />}
        <span>{asset.name}</span>
      </div>
      <div>
        <div>
          {`${formatBigNumWithDecimals(asset.amount, asset.decimals)} ${asset.unitName || "units"}`}
        </div>
      </div>
    </div>
  );
};

export default AssetRow;
