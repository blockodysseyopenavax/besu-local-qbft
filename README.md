# Besu Local QBFT private network

Run besu local qbft private network via docker.

## Getting Started

### Requirements

- docker

### TL;DR

Just `docker compose up`.

## Overview

### Network

The network consists of 1 bootnode and 4 validators.
This is minimum QBFT configuration where the number `f` of tolerable byzantine nodes is 1.
QBFT, as well as its predecessor IBFT 2.0, requires at least `3f+1` validators to tolerate `f` byzantine (faulty or malicious) nodes.

Technically, bootnode is auxiliary but [strongly recommended](https://github.com/ConsenSys/quorum-kubernetes#production-network-guidelines) in general.

In this repo, we use bootnode as rpc node too.

### Chain

`genesis.json` defines (initial) chain configuration. Notable fields are the followings:

- `config.berlinBlock`: 0
- `config.qbft`
- `config.qbft.blockperiodseconds`: 12
- `config.qbft.epochlength`: 32
- `extraData`

These are intentionally chosen to

- use berlin hardfork, most recent milestone where besu is stable
- use QBFT consensus
- have similar blocktime with ethereum (1 slot = 12 seconds)
- have similar epochlength with ethereum (1 epoch = 32 slots)
- encode genesis validators (required)

You can freely change these. For example, you might want to change blocktime to 2 seconds, while having requesttimeoutseconds 4.

For more details, see [QBFT genesis file](https://besu.hyperledger.org/en/stable/private-networks/how-to/configure/consensus/qbft/?h=qbft#genesis-file).

#### Caveats on hardfork

It seems safe to use berlin hardfork for sufficiently recent versions of besu. But using london or later may cause some issues.

[Bugs on zeroBaseFee option before 23.4.0](https://github.com/hyperledger/besu/blob/main/CHANGELOG.md#2340)

If you need EIP-1559, you may try london & besu 23.4.0, where `baseFeePerGas` is required.
In this setting, you can make gas-free network via `config.zeroBaseFee = true` and `baseFeePerGas = '0x0'`.

## Block Explorer

[Sirato free plan](https://github.com/web3labs/sirato-free) is used as block explorer for the network.
Sirato instance is configured to connect to rpc node, which is currently `bootnode-1`.
For simplicity, we use its own docker compose.

To start a sirato instance, open another terminal and run

```Bash
sh sirato-up.sh
```

After few minutes, it will be available at [localhost:8080](http://localhost:80).
If port collision happens, change sirato's port in `sirato-up.sh` then re-run it.

To clean up, run

```Bash
sh sirato-down.sh
```

## Features

- [x] Basic Network
  - [x] genesis.json
  - [x] bootnode
  - [x] validators
- [ ] Privacy
  - [ ] tessera for each validator
  - [ ] privacy transaction test
- [ ] Permissioning
  - [ ] node permissioning
  - [ ] account permissioning
- [ ] Monitoring
  - [ ] network
    - [ ] prometheus
    - [ ] grafana
  - [x] chain
    - [x] sirato block explorer
