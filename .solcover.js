module.exports = {
  testCommand: 'node --max-old-space-size=4096 ../node_modules/.bin/truffle test --network coverage',
  copyPackages: ['zeppelin-solidity'],
  skipFiles: [
    'Migrations.sol',
    'test',
    // Temporarily skipped
    'core/SetToken.sol',
    'core/SetTokenRegistry.sol',
  ],
};
