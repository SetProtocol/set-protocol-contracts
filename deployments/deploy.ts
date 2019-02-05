import { Manager } from './manager';

async function start() {
  const newManager = new Manager();

  try {
    await newManager.deploy();
  } catch(error) {
    console.log(error);
  }
}

start()

