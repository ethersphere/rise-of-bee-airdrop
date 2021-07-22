# README.md
## Context
- [Swarm is airdropping 1.000.000 BZZ](https://medium.com/ethereum-swarm/swarm-is-airdropping-1-000-000-bzz-bd3b706918d3)
- [Swarm airdrop is finishing](https://medium.com/ethereum-swarm/swarm-airdrop-is-finishing-on-21-june-2021-important-notice-to-all-participants-6a58f29017a2)
- [Swarm airdrop final details](#)

## Trusted Nodes

### Methodology
159 initial trusted nodes were selected and the final set of trusted nodes are these nodes _and_ all nodes that have received and cashed out at least one non-zero value cheque from the initial set of trusted nodes.

### Data sets
- Find the initial set of trusted nodes [here](./src/initial_trusted_nodes.json)
- Find the final set of trusted nodes [here](./trusted_nodes.json)

### Validate for yourself
Swarm values transparancy. You can validate the results by yourself by running

```sh
npm ci
npm start
```

The result will be in `./generated_trusted_nodes.json` file.

If you hit the API limit, you can also add your infura api key to line 5 in the [src/index.ts].

## Airdrop balances

### Methodology
The final airdrop reward has been calculated as follows: the awarded addresses are all beneficiaries who cashed out cheque from the trusted nodes between the blocks `4283397` and `5130433` including. The total gBZZ amount an address cashed from the trusted nodes has been summed and devided by the total gBZZ amount cashed from trusted nodes by all the addresses. This ratio then indicates how big portion of the 1 000 000 BZZ given awarded address will receive.

### Data sets
- Find the final set of addresses and the BZZ balances that they will be awarded [here](./airdrop_rewards.json).

## Extra airdrop

### Methodology
Due to the amount of participants, the airdrop was extended with an extra amount of 0.1 BZZ to each address that deployed a chequebook through an official chequebook factory and cashed out from any other chequebook deployed through an official chequebook factory.

### Data sets
- All the addresses that appear in the [airdrop rewards] list will receive extra 0.1 BZZ
