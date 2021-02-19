import cartType from './customers/_cart';

export interface ApiClient {
  cart: cartType;
}

export interface ApiClientFactoryArgs {
  username: string;
  password: string;
}

declare function ApiClientFactory(args: ApiClientFactoryArgs) : ApiClient

export = ApiClientFactory
