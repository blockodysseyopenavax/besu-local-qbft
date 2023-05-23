const { ethers } = require("ethers");
const path = require("path");
const fs = require("fs");

const nodename = process.argv[2];
if (!nodename) {
  console.log(`Error: nodename ${nodename} is invalid!`);
  console.log(`Usage: node ${path.basename(__filename)} <nodename>`);
  process.exit(1);
}

const wallet = ethers.Wallet.createRandom();
const privateKey = wallet.privateKey;
const publicKey = wallet.publicKey;
const address = wallet.address;

const keyDir = `${nodename}`;
const privateKeyFile = path.join(keyDir, `key.priv`);
const publicKeyFile = path.join(keyDir, `key.pub`);
const addressFile = path.join(keyDir, `address`);
fs.mkdirSync(nodename);
fs.writeFileSync(privateKeyFile, privateKey);
fs.writeFileSync(publicKeyFile, publicKey);
fs.writeFileSync(addressFile, address);

console.log(`${nodename}'s key is generated!`);
console.log("privateKey:", privateKey);
console.log("publicKey:", publicKey);
console.log("address:", address);
