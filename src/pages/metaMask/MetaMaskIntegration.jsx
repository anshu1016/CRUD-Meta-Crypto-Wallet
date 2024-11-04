/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { toast } from "react-toastify";

const MetaMaskIntegration = ({ onWalletConnected }) => {
  const [walletAddress, setWalletAddress] = useState("");
  const [isConnected, setIsConnected] = useState(false);

  // Check if MetaMask is installed and set up event listeners
  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          setIsConnected(true);
          onWalletConnected(accounts[0]);
        } else {
          setWalletAddress("");
          setIsConnected(false);
          onWalletConnected(null);
        }
      });
    } else {
      toast.error("MetaMask is not installed. Please install it to continue.");
    }
  }, [onWalletConnected]);

  const connectWallet = async () => {
    try {
      if (typeof window.ethereum !== "undefined") {
        // Request account access
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0]);
        setIsConnected(true);
        onWalletConnected(accounts[0]);
        toast.success("Wallet connected successfully!");
      } else {
        toast.error(
          "MetaMask is not installed. Please install it to continue."
        );
      }
    } catch (err) {
      console.error("Error connecting to MetaMask:", err);
      toast.error("Failed to connect wallet. Please try again.");
    }
  };

  return (
    <div className="meta-mask-integration">
      {isConnected ? (
        <p className="text-green-500">Connected Wallet: {walletAddress}</p>
      ) : (
        <button
          onClick={connectWallet}
          className="bg-[#AD49E1] text-white py-2 px-4 rounded-lg hover:bg-[#EBD3F8] transition duration-300"
        >
          Connect MetaMask Wallet
        </button>
      )}
    </div>
  );
};

export default MetaMaskIntegration;
