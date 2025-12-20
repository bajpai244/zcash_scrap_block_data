import axios from 'axios';

export interface GetBlockParams {
  blockNumber: string | number;
  zcashRpcUrl: string;
}

export interface RpcResponse<T = unknown> {
  jsonrpc: string;
  id: string;
  result?: T;
  error?: {
    code: number;
    message: string;
  };
}

/**
 * Fetches block data from Zcash RPC endpoint
 * @param params - Object containing blockNumber and zcashRpcUrl
 * @returns The RPC response containing block data
 * @throws {Error} If the RPC request fails
 */
export async function getBlockData(params: GetBlockParams): Promise<RpcResponse> {
  const { blockNumber, zcashRpcUrl } = params;

  const requestBody = {
    jsonrpc: '1.0',
    id: 'curltest',
    method: 'getblock',
    params: [String(blockNumber)],
  };

  try {
    const response = await axios.post<RpcResponse>(zcashRpcUrl, requestBody, {
      headers: {
        'content-type': 'text/plain;',
      },
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        `Failed to fetch block data: ${error.message}${error.response ? ` (Status: ${error.response.status})` : ''}`
      );
    }
    throw error;
  }
}
