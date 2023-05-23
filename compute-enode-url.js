const { ethers } = require("ethers");
const path = require("path");
const fs = require("fs");

const nodename = process.argv[2];
if (!nodename) {
  console.log(`Error: nodename ${nodename} is invalid!`);
  console.log(`Usage: node ${path.basename(__filename)} <nodename>`);
  process.exit(1);
}

const keyDir = `${nodename}`;
const publicKeyFile = path.join(keyDir, `key.pub`);
const publicKey = fs.readFileSync(publicKeyFile).toString();
const enodeUrl = new URL(`enode://${publicKey.substring(4)}@${nodename}:30303`); // remove prefix 0x04
console.log(enodeUrl.toString());
