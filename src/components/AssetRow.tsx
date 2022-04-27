import Icon from "./Icon";
import ASAIcon from "./ASAIcon";
import algo from "../assets/algo.svg";
import { formatBigNumWithDecimals } from "../helpers/utilities";
import { IAssetData } from "../helpers/types";

const AssetRow = ({ asset }: { asset: IAssetData }) => (
  <div className="asset-row">
    <div className="asset-info">
      {asset.id === 0 ? <Icon src={algo} /> : <ASAIcon assetID={asset.id} />}
      <span>{asset.name}</span>
    </div>
    <div>
      <div>
        {`${formatBigNumWithDecimals(asset.amount as bigint, asset.decimals)} ${
          asset.unitName || "units"
        }`}
      </div>
    </div>
  </div>
);

export default AssetRow;
