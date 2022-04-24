const logger = ({ getState }: any) => (next: any) => (action: any) => {    
    if (action.type === "walletConnect/switchChain") {
      console.log("switch chain: ", action.payload);
    }
    if (action.type === "walletConnect/getAccountAssets/pending") {
      console.log("loading assets...");
    }
    if (action.type === "walletConnect/getAccountAssets/fulfilled") {
      console.log("assets sucessfully loaded");
    }
    if (action.type === "walletConnect/getAccountAssets/rejected") {
      console.error(action.error.message);
    }

    let result = next(action);
    if (action.type === "walletConnect/reset") {
      console.log("reset state", getState().walletConnect);
    }

    return result;
  };

export default logger;
