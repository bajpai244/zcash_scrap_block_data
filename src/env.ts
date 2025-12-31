// Required environment variables
const REQUIRED_ENV_VARS = ['ZCASH_RPC_URL', 'START_BLOCK_NUMBER', 'END_BLOCK_NUMBER'] as const;

export type EnvVars = {
  ZCASH_RPC_URL: string;
  START_BLOCK_NUMBER: string;
  END_BLOCK_NUMBER: string;
};

/**
 * Validates that all required environment variables are present
 * @throws {Error} If any required environment variable is missing
 */
export function validateEnvVars(): void {
  const missing: string[] = [];

  for (const envVar of REQUIRED_ENV_VARS) {
    if (!process.env[envVar]) {
      missing.push(envVar);
    }
  }

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}\n` +
        `Please check your .env file and ensure all required variables are set.`
    );
  }
}

/**
 * Validates that all required environment variables are present and returns them
 * @returns An object containing all required environment variables
 * @throws {Error} If any required environment variable is missing
 */
export function validateAndGetEnvVars(): EnvVars {
  validateEnvVars();

  return {
    ZCASH_RPC_URL: process.env.ZCASH_RPC_URL!,
    START_BLOCK_NUMBER: process.env.START_BLOCK_NUMBER!,
    END_BLOCK_NUMBER: process.env.END_BLOCK_NUMBER!,
  };
}
