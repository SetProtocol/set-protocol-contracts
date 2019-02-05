import { Manager } from './manager';

let processName: string = process.argv[2];
let processNetworkId: string = process.argv[3];

const newManager = new Manager(processName, processNetworkId);
newManager.deploy();