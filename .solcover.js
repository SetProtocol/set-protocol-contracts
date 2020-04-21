module.exports = {
  port: 8555,
  testrpcOptions: "--db blockchain --networkId 50 --port 8555 --accounts 20 -e 1000000 -m 'concert load couple harbor equip island argue ramp clarify fence smart topic'",
  testCommand: "node --max-old-space-size=4096 ../node_modules/.bin/truffle test `find ./transpiled/test/contracts -name '*.spec.js'` --network coverage",
  copyPackages: [
    'openzeppelin-solidity',
    'set-protocol-contract-utils'
  ],
  skipFiles: [
    'Migrations.sol',
    'lib/AddressArrayUtils.sol',
    'mocks',
    'external',
    // https://github.com/sc-forks/solidity-coverage/blob/master/docs/faq.md#why-are-send-and-transfer-throwing
    'core/modules/RebalancingSetExchangeIssuanceModule.sol', // Transfer functions cannot be properly tested. See link above.
    'core/modules/RebalancingSetIssuanceModule.sol', // Transfer functions cannot be properly tested. See link above.
    'helper/RebalancingSetEthBidder.sol' // Transfer functions cannot be properly tested. See link above.
  ],
};
