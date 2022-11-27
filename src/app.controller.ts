import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ethers } from 'ethers';
import { AppService } from './app.service';

export class claimTokenDto {
  address: string
}


export class connectBallotDto {
  address: string
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('token-address')
  getTokenAddress() {
    return this.appService.getTokenAddress();
  }

  @Post('claim-tokens')
  claimTokens(@Body() body: claimTokenDto) {
    return this.appService.claimTokens(body.address);
  }

  @Post('connect-ballot-contract')
  connectBallotContract(@Body() body: connectBallotDto) {
    return this.appService.connectBallotContract(body.address);
  }
}
