import { Manager } from './manager';
import { getNetworkName, getNetworkId } from './utils/blockchain';

async function start() {
  const newManager = new Manager();
  newManager.deploy();
}

try {
  start()
} catch(error) {
  console.log(error);
}
