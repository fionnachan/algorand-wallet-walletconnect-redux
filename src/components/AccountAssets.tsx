import AssetRow from "./AssetRow";
import { IAssetData } from "../helpers/types";

const AccountAssets = (props: { assets: IAssetData[] }) => {
  const { assets } = props;

  const nativeCurrency = assets.find((asset: IAssetData) => asset && asset.id === 0) || {
    id: 0,
    amount: BigInt(0),
    creator: "",
    frozen: false,
    decimals: 6,
    name: "Algo",
    unitName: "Algo",
  };

  const tokens = assets.filter((asset: IAssetData) => asset && asset.id !== 0);

  return (
    <div>
      <h2>Account Balance</h2>
      <AssetRow key={nativeCurrency.id} asset={nativeCurrency} />
      {tokens.map(token => (
        <AssetRow key={token.id} asset={token} />
      ))}
    </div>
  );
};

export default AccountAssets;
