export interface Transaction {
  hash: string;
  from: string;
  to: string;
  value: string;
  timeStamp: string;
  gasUsed: string;
  gasPrice: string;
  isError: string;
  blockNumber: string;
}

export interface EtherscanResponse {
  status: string;
  message: string;
  result: Transaction[];
}
