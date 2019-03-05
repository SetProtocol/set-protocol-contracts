module.exports = {
  port: 8545,
  norpc: true,
  testCommand: "node --max-old-space-size=4096 ../node_modules/.bin/truffle test `find ./transpiled/test/contracts -name '*.spec.js'` --network coverage",
  copyPackages: ['openzeppelin-solidity'],
  skipFiles: [
    'Migrations.sol',
    'lib/AddressArrayUtils.sol',
    'mocks',
    'external',
    // https://github.com/sc-forks/solidity-coverage/blob/master/docs/faq.md#why-are-send-and-transfer-throwing
    'supplementary/PayableExchangeIssuance.sol' // Transfer functions cannot be properly tested. See link above.
  ],
};
