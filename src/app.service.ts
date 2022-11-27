import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ethers, utils } from 'ethers';
import * as tokenJson from '../assets/MyToken.json';
import * as ballotJson from '../assets/Ballot.json';

const TOKENIZED_VOTES_ADDRESS = '0x1C2beB56ED4F2101085051C40D6B7861429D82f3';
const DEFAULT_BALLOT_VOTE_ADDRESS =
  '0xA23d6495698860967658Da93d4619B4D290Ec77C';

@Injectable()
export class AppService {
  provider: ethers.providers.Provider;
  wallet: ethers.Wallet;
  signer: ethers.Wallet;
  tokenContract: ethers.Contract;
  ballotContract: ethers.Contract;
  mintedAddresses: string[];

  votesPerUser = ethers.utils.parseEther('1');

  constructor(private configService: ConfigService) {
    this.provider = ethers.getDefaultProvider('goerli');
    this.wallet = ethers.Wallet.fromMnemonic(
      this.configService.get<string>('MNEMONIC'),
    );
    this.connectTokenContract(TOKENIZED_VOTES_ADDRESS);
    this.connectBallotContract(DEFAULT_BALLOT_VOTE_ADDRESS);
  }

  getTokenAddress() {
    return { result: TOKENIZED_VOTES_ADDRESS };
  }

  async claimTokens(address: string) {
    this.tokenContract['mint'](address, this.votesPerUser).then((tx) => {
      return tx;
    });
    // if (!this.mintedAddresses[address]) {
    //   this.tokenContract['mint'](address, this.votesPerUser).then((tx) => {
    //     return tx;
    //   });
    // } else {
    //     return { result: 'failed'};
    //   return;
    // }
    // this.mintedAddresses.push(address);


    // TODO: build contract object
    // TODO: pick signer using the .env keys
    // TODO: connect the contract object to the signer
    // TODO: make trasaction mint tokens
    // TODO: await the transaction, get the receipt, return the hash

    return { result: `transaction hash for tokens minted for ${address}` };
  }

  connectBallotContract(address: string) {
    this.ballotContract = new ethers.Contract(
      address,
      ballotJson.abi,
      this.wallet,
    );
    return { result: 'success' }
  }

  connectTokenContract(address: string) {
    this.tokenContract = new ethers.Contract(
      address,
      tokenJson.abi,
      this.wallet,
    );
    return { result: 'success' }
  }
}
