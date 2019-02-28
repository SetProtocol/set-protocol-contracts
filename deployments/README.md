# Getting Started

Before getting started, make sure you have the following `env` variables set:

```
// Private key to deploy with. Must be prepended with '0x'
DEPLOYMENT_PRIVATE_KEY="0xA..."

// The variable set here will use constants from `network-constants.ts`
// Examples of networks include `production`, `staging`, `development`
DEPLOYMENT_CONSTANT="production"

// Network id will indicate which chain to run on
// Main-net = 1, Kovan = 42, Test_RPC = 50
DEPLOYMENT_NETWORK_ID=50;
```

## Deploying

The deployment script will output all addresses to `outputs.json`. 

To deploy, simply run `yarn deploy`. Test are automatically run at the end.

## Tests

In order to run tests the outputs file should contain addresses for the contracts you would like to test against and the `.env` file should have the same `DEPLOYMENT_CONSTANT` and `DEPLOYMENT_NETWORK_ID`.

Then run `yarn test-development`