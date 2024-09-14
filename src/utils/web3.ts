import { Contract, JsonRpcProvider, ethers } from 'ethers';
import { ERC2771FORWARDER } from './forwarder-abi';

export async function createContractSigner(abi: any, address: string) {
  //  Create wallet from private key
  const provider = new JsonRpcProvider(process.env.NETWORK_PROVIDER);
  const privateKey = process.env.ADMIN_PRIVATE_KEY;
  const wallet = new ethers.Wallet(privateKey, provider);
  //  Create an instance of the contract
  const contracts = new Contract(address, abi, wallet);
  return contracts;
}

export const executeMetaTxRequest = async (params: any) => {
  const { metaTxRequest } = params;

  if (!process.env.ERC2771_FORWARDER_ADDRESS) {
    throw Error('No Forwarder Address Found in the environment.');
  }
  const forwarderContract = await createContractSigner(
    ERC2771FORWARDER,
    process.env.ERC2771_FORWARDER_ADDRESS,
  );

  metaTxRequest.gas = BigInt(metaTxRequest.gas);
  metaTxRequest.nonce = BigInt(metaTxRequest.nonce);
  metaTxRequest.value = BigInt(metaTxRequest.value);
  const tx = await forwarderContract.execute(metaTxRequest);
  const res = await tx.wait();

  return { txHash: res.hash, status: res.status };
};
