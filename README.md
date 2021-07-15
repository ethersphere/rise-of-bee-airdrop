# README.md
## Context
- [Swarm is airdropping 1.000.000 BZZ](https://medium.com/ethereum-swarm/swarm-is-airdropping-1-000-000-bzz-bd3b706918d3)
- [Swarm airdrop is finishing](https://medium.com/ethereum-swarm/swarm-airdrop-is-finishing-on-21-june-2021-important-notice-to-all-participants-6a58f29017a2)
- [Swarm airdrop final details](#)

## Methodology
159 initial trusted nodes were selected and the final set of trusted nodes are these nodes _and_ all nodes that have received and cashed out at least one non-zero value cheque from the initial set of trusted nodes.

## Trusted nodes
- Find the initial set of trusted nodes [here](./src/initial_trusted_nodes.json)
- Find the final set of trusted nodes [here](./trusted_nodes.json)

## Validate for yourself
Swarm values transparancy. You can validate the results by yourself by running

```sh
npm ci
npm start
```

The result will be in [`./trusted_nodes.json`](./trusted_nodes.json) file.

If you hit the API limit, you can also add your infura api key to line 5 in the [src/index.ts].
