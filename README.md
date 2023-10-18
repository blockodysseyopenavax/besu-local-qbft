# Besu Local QBFT private network

Run besu local qbft private network.

## TL;DR

Just `docker compose up`.

## Getting Started

### Requirements

- docker

## Overview

### Network

The network consists of 4 validators.
This is minimum QBFT configuration where the number `f` of tolerable byzantine nodes is 1.
QBFT, as well as its predecessor IBFT 2.0, requires at least `3f+1` validators to tolerate `f` byzantine (i.e. faulty or malicious) nodes.

Here, we use all validators as bootnodes, and `validator-1` as rpc node.

### Chain

`genesis.json` defines chain configuration. Notable fields are the followings:

- `config.londonBlock`: 0
- `config.zeroBaseFee`: true, `baseFeePerGas`: "0x0"
- `config.qbft`
- `config.qbft.blockperiodseconds`: 12
- `config.qbft.epochlength`: 32
- `extraData`

These are intentionally chosen to

- use london hardfork
- configure free gas in post-london network ([docs](https://besu.hyperledger.org/stable/private-networks/how-to/configure/free-gas#4-enable-zero-base-fee-if-using-london-fork-or-later))
- use QBFT consensus
- have similar blocktime with ethereum (1 slot = 12 seconds)
- have similar epochlength with ethereum (1 epoch = 32 slots)
- encode genesis validators (required)

You can freely change above options. For example, you might want to change blocktime to 2 seconds, while having requesttimeoutseconds 4.

For more details, see [QBFT genesis file](https://besu.hyperledger.org/en/stable/private-networks/how-to/configure/consensus/qbft/?h=qbft#genesis-file).

### Block Explorer

We will spin up [Sirato free plan](https://github.com/web3labs/sirato-free) instance connected to `validator-1`.

First, install the git submodule _sirato-free_ by

```Bash
git submodule update
```

Then run the start script for Sirato by

```Bash
sh sirato-up.sh
```

After few minutes, it will be available at [localhost:8080](http://localhost:8080).
If port collision happens, change sirato `PORT` in `sirato-up.sh`.

To clean up, run

```Bash
sh sirato-down.sh
```