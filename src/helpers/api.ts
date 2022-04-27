import algosdk from "algosdk";
import { IAssetData } from "./types";

export enum ChainType {
  MainNet = "mainnet",
  TestNet = "testnet",
}

const mainNetClient = new algosdk.Algodv2("", "https://mainnet-api.algonode.cloud", "");
const testNetClient = new algosdk.Algodv2("", "https://testnet-api.algonode.cloud", "");

function clientForChain(chain: ChainType): algosdk.Algodv2 {
  switch (chain) {
    case ChainType.MainNet:
      return mainNetClient;
    case ChainType.TestNet:
      return testNetClient;
    default:
      throw new Error(`Unknown chain type: ${chain}`);
  }
}

export async function apiGetAccountAssets(
  chain: ChainType,
  address: string,
): Promise<IAssetData[]> {
  const client = clientForChain(chain);

  const accountInfo = await client
    .accountInformation(address)
    .setIntDecoding(algosdk.IntDecoding.BIGINT)
    .do();

  const algoBalance = accountInfo.amount.toString();
  const assetsFromRes: Array<{
    "asset-id": bigint;
    amount: bigint;
    "is-frozen": boolean;
  }> = accountInfo.assets;

  const assets: IAssetData[] = assetsFromRes.map(
    ({ "asset-id": id, amount, "is-frozen": frozen }) => ({
      id: Number(id),
      amount: amount.toString(),
      frozen,
      decimals: 0,
      creator: "",
    }),
  );

  assets.sort((a, b) => a.id - b.id);

  await Promise.all(
    assets.map((asset, i) => {
      return new Promise<void>((resolve) => {
        setTimeout(async () => {
          try {
            const { params } = await client.getAssetByID(asset.id).do();
            asset.name = params.name;
            asset.unitName = params["unit-name"];
            asset.url = params.url;
            asset.decimals = params.decimals;
            asset.creator = params.creator;
          } catch (error) {
            console.error("asset:", asset.id, error.message);
          }
          resolve();
        }, 25 * i);
      });
    }),
  );

  assets.unshift({
    id: 0,
    amount: algoBalance,
    creator: "",
    frozen: false,
    decimals: 6,
    name: "Algo",
    unitName: "Algo",
  });

  return assets;
}

export async function apiGetTxnParams(chain: ChainType): Promise<algosdk.SuggestedParams> {
  const params = await clientForChain(chain).getTransactionParams().do();
  return params;
}

export async function apiSubmitTransactions(
  chain: ChainType,
  stxns: Uint8Array[],
): Promise<number> {
  const { txId } = await clientForChain(chain).sendRawTransaction(stxns).do();
  return await waitForTransaction(chain, txId);
}

async function waitForTransaction(chain: ChainType, txId: string): Promise<number> {
  const client = clientForChain(chain);

  let lastStatus = await client.status().do();
  let lastRound = lastStatus["last-round"];
  while (true) {
    const status = await client.pendingTransactionInformation(txId).do();
    if (status["pool-error"]) {
      throw new Error(`Transaction Pool Error: ${status["pool-error"]}`);
    }
    if (status["confirmed-round"]) {
      return status["confirmed-round"];
    }
    lastStatus = await client.statusAfterBlock(lastRound + 1).do();
    lastRound = lastStatus["last-round"];
  }
}
