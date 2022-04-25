import AssetRow from "./AssetRow";
import { IAssetData } from "../helpers/types";

const AccountAssets = ({ assets }: { assets: IAssetData[] }) => {
  const nativeCurrency = assets.find((asset) => asset.id === 0)!;
  const tokens = assets.filter((asset) => asset.id !== 0);
  return (
    <div>
      <h2>Account Balance</h2>
      <AssetRow key={nativeCurrency.id} asset={nativeCurrency} />
      {tokens.map((token) => (
        <AssetRow key={token.id} asset={token} />
      ))}
    </div>
  );
};

export default AccountAssets;
