const logger = ({ getState }: any) => (next: any) => (action: any) => {
    if (action.type === "walletConnect/setFetching") {
      console.log("setFetching: ", action.payload);
    }
    if (action.type === "walletConnect/switchChain") {
      console.log("switchChain chain: ", action.payload);
    }

    let result = next(action);
    if (action.type === "walletConnect/reset") {
      console.log("reset state", getState().walletConnect);
    }

    return result;
  };

export default logger;
