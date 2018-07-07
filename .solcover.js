module.exports = {
  testCommand: 'node --max-old-space-size=4096 ../node_modules/.bin/truffle test --network coverage',
  copyPackages: ['zeppelin-solidity'],
  skipFiles: [
    'Migrations.sol',
    'mocks',
    'external',
    'core/lib/ERC20Wrapper.sol', // TODO: Find a cleaner way to test state mutating functions, we will skip
    'core/exchange-wrappers/ZeroExExchangeWrapper.sol' // TODO: test this
  ],
};
