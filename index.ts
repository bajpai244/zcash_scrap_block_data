import { validateAndGetEnvVars } from './env';
import { getBlockData } from './rpc';

const main = async () => {
  // Validate and get environment variables
  const { ZCASH_RPC_URL, START_BLOCK_NUMBER, END_BLOCK_NUMBER } = validateAndGetEnvVars();

  const result = await getBlockData({
    blockNumber: START_BLOCK_NUMBER,
    zcashRpcUrl: ZCASH_RPC_URL,
  });

  console.log(result);
};

main();
