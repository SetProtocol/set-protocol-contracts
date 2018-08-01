module.exports = {
  testCommand: 'node --max-old-space-size=4096 ../node_modules/.bin/truffle test --network coverage',
  copyPackages: ['zeppelin-solidity'],
  skipFiles: [
    'Migrations.sol',
    'mocks',
    'external',
    'core/exchange-wrappers/ZeroExExchangeWrapper.sol',
    'core/exchange-wrappers/lib/ZeroExOrderDataHandler.sol'
  ],
};
