<script type="module">
import { ethers } from "https://cdn.jsdelivr.net/npm/ethers@6.8.1/dist/ethers.min.js";

/* =========================
   CONFIG
========================= */
const BSC_RPC = "https://bsc-dataseed.binance.org/";
const provider = new ethers.JsonRpcProvider(BSC_RPC);

const WALLET_ADDRESS = "0x142B679A6b23B4720d81CE4beD9f4dAfE9803066";

// Token contracts (BSC)
const TACC_CONTRACT = "PASTE_TACC_CONTRACT_ADDRESS_HERE";
const USDT_CONTRACT = "0x55d398326f99059fF775485246999027B3197955";

// Minimal ERC20 ABI
const ERC20_ABI = [
  "function balanceOf(address) view returns (uint256)",
  "function decimals() view returns (uint8)"
];

/* =========================
   FUNCTIONS
========================= */

// BNB Balance
async function loadBNB() {
  const balance = await provider.getBalance(WALLET_ADDRESS);
  document.getElementById("bnb-balance").innerText =
    parseFloat(ethers.formatEther(balance)).toFixed(4) + " BNB";
}

// ERC20 Balance
async function loadToken(contractAddress, elementId, symbol) {
  const contract = new ethers.Contract(contractAddress, ERC20_ABI, provider);
  const balance = await contract.balanceOf(WALLET_ADDRESS);
  const decimals = await contract.decimals();
  const formatted = ethers.formatUnits(balance, decimals);
  document.getElementById(elementId).innerText =
    parseFloat(formatted).toFixed(2) + " " + symbol;
}

/* =========================
   LOAD ALL
========================= */
loadBNB();
loadToken(USDT_CONTRACT, "usdt-balance", "USDT");
loadToken(TACC_CONTRACT, "tacc-balance", "TACC");
</script>
