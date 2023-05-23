const { ethers } = require("ethers");
const path = require("path");
const fs = require("fs");

const validators = process.argv.slice(2);
if (validators.length < 4) {
  console.log(`Error: need at least 4 validators (given ${validators.length})`);
  console.log(
    `Usage: node ${path.basename(
      __filename
    )} <validator 1 name> <validator 2 name> ...`
  );
  process.exit(1);
}

const validatorAddresses = validators.map((validator) =>
  fs.readFileSync(path.join(validator, "address")).toString()
);

const plainObject = [
  "0x0000000000000000000000000000000000000000000000000000000000000000", // vanity for genesis block
  validatorAddresses.map((address) => address.toLowerCase()),
  [], // Any validator votes. No vote is included in the genesis block.
  "0x", // The round the block was created on. The round in the genesis block is 0.
  [], // A list of seals of the validators (signed block hashes). No seals are included in the genesis block.
];
const extraData = ethers.utils.RLP.encode(plainObject);

console.log(extraData);
