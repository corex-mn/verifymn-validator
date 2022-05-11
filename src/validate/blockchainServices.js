import allSettled from 'promise.allsettled'
import Web3 from 'web3';
import {abi as CertifyAbi} from './abi/certify';

allSettled.shim();
const CERTIFY_CONTRACT_ADDRESS = process.env.REACT_APP_CERTIFY_CONTRACT_ADDRESS;

export const requestCertificationByHash = async (hash) => {
  const url = process.env.REACT_APP_COREXCHAIN_NODE_URL;
  const client = new Web3(url);
  const contract = new client.eth.Contract(CertifyAbi, CERTIFY_CONTRACT_ADDRESS);
  return await contract.methods.getCertification(hash).call();
}

export const requestIssuerByAddress = async (addr) => {
  const url = process.env.REACT_APP_COREXCHAIN_NODE_URL;
  const client = new Web3(url);
  const contract = await new client.eth.Contract(CertifyAbi, CERTIFY_CONTRACT_ADDRESS);
  return await contract.methods.getIssuer(client.utils.toChecksumAddress(addr)).call();
}
