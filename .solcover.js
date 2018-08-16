module.exports = {
  port: 8555,
  testrpcOptions: "--db blockchain --networkId 50 --port 8555 --accounts 20 -e 1000000 -m 'concert load couple harbor equip island argue ramp clarify fence smart topic'",
  testCommand: 'node --max-old-space-size=4096 ../node_modules/.bin/truffle test --network coverage',
  copyPackages: ['zeppelin-solidity'],
  skipFiles: [
    'Migrations.sol',
    'mocks',
    'external',
    'RebalancingTokenFactory.sol'
  ],
};
