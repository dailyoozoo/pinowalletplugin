// walletPlugin.js

class Web3WalletPlugin {
  constructor() {
    this.selectedAddress = null;
    this.networkId = null;
    this.web3 = null;
    this.providers = {
      // Add your supported providers here
      // Example: 'metamask': window.ethereum
    };
  }

  async enable() {
    try {
      if (window.ethereum) {
        this.web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
        this.selectedAddress = await this.web3.eth.getCoinbase();
        this.networkId = await this.web3.eth.net.getId();
      } else {
        throw new Error('Non-Ethereum browser detected. You should consider trying MetaMask!');
      }
    } catch (error) {
      console.error('Error enabling Web3 wallet:', error);
    }
  }

  async sendTransaction(txObject) {
    try {
      const txHash = await this.web3.eth.sendTransaction(txObject);
      return txHash;
    } catch (error) {
      console.error('Error sending transaction:', error);
      throw error;
    }
  }

  async getBalance() {
    try {
      const balance = await this.web3.eth.getBalance(this.selectedAddress);
      return this.web3.utils.fromWei(balance, 'ether');
    } catch (error) {
      console.error('Error getting balance:', error);
      throw error;
    }
  }

  // Add more methods as needed

  disconnect() {
    this.selectedAddress = null;
    this.networkId = null;
    this.web3 = null;
  }
}

// Export as a module
module.exports = Web3WalletPlugin;
