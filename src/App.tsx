import { bytesToStr, JsonRPCClient } from "@massalabs/massa-web3";
import { useEffect, useState } from "react";
import { MassaLogo } from "@massalabs/react-ui-kit";
import './App.css';
import '@massalabs/react-ui-kit/src/global.css';
import { ConnectButton } from "./components/wallet/connect-wallet-popup";


const sc_addr = "AS121byc9dBwjbeREk4rzUZisFyfMkdZ1Uhtcnm6n6s5hnCX6fsHc"; // TODO Update with your deployed contract address

/**
 * The key used to store the greeting in the smart contract
 */
const GREETING_KEY = "greeting_key";

/**
 * App component that handles interactions with a Massa smart contract
 * @returns The rendered component
 */
function App() {

  const [greeting, setGreeting] = useState<string | null>(null);

  /**
 * Initialize the web3 client
 */
  const client = JsonRPCClient.buildnet()

  /**
   * Fetch the greeting when the web3 client is initialized
   */
  useEffect(() => {
    getGreeting();
  });

  /**
   * Function to get the current greeting from the smart contract
   */
  async function getGreeting() {
    if (client) {
      const dataStoreVal = await client.getDatastoreEntry(GREETING_KEY, sc_addr, false)
      const greetingDecoded = dataStoreVal ? bytesToStr(dataStoreVal) : null;
      setGreeting(greetingDecoded);
    }
  }

  return (
    <>
      <div>
        <div className="logo-container">
          <MassaLogo className="logo" size={100} />
        </div>
        <div className="greeting-container">
          <h2 className="greeting-label">Greeting message:</h2>
          <h1 className="greeting-message">{greeting || 'Loading...'}</h1>
        </div>
      </div>
      <div className="wallet-container">
          <ConnectButton />
      </div>
    </>
  );
}

export default App;



