// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const { ethers } = require("hardhat");
const hre = require("hardhat");

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

async function main() {
  const [deployer]= await ethers.getSigners()//set 1 account as owner i.e msg.sender, first account
  const NAME = 'ETH Daddy'// Set the local variable name
  const SYMBOL = 'ETHD'// Set the loacl variabl;e symbol

  const ETHDaddy = await ethers.getContractFactory('ETHDaddy') // convert contract from solidity and store it in avariable 
  const ethDaddy = await ETHDaddy.deploy(NAME,SYMBOL)// deploy the contract stored in variable with the state variables
  await ethDaddy.deployed()// wait until ethDaddy is deployed

  console.log(`Deployed domain contract at:  ${ethDaddy.address}\n`);
  // Set some random domain while deploying
  const names = ['jack.eth','john.eth','henry.eth','cobra.eth','tate.eth','andrew.eth']
  const cost = [tokens(0.1),tokens(1000),tokens(100),tokens(101),tokens(100),tokens(1),]

  for(var i = 0;i<6;i++){
    const transaction = await ethDaddy.connect(deployer).list(names[i],cost[i])
    await transaction.wait()

    console.log(`Listed Domain ${i+1}: ${names[i]}`);
  }

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
