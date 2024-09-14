import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';

// noew object created in every request
// garbage collected after end of request
@Injectable({ scope: Scope.REQUEST })
export class RequestContextService {
  constructor(@Inject(REQUEST) private request: any) {}

  getRequest() {
    return this.request;
  }

  getUser(): Record<string, any | string | number> {
    return this.request.user as Record<string, any | string | number>;
  }

  getRequestHeaders() {
    return this.request.headers;
  }

  getUserWalletAddress() {
    return this.request.headers.walletaddress;
  }
}
