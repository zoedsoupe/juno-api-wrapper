import { AxiosInstance } from 'axios';

interface Options {
  accessToken: string;
  resourceToken: string;
  isSandbox: boolean;
}

interface Balance {
  balance: number;
  withheldBalance: number;
  transferableBalance: number;
}

interface NewCharge {
  description: string;
  amount: string;
  installments: number;
  paymentType: 'BOLETO' | 'CREDIT_CARD';
}

interface Billing {
  name: string;
  document: string;
  email: string;
  phone: string;
}

interface ChargeStatus {
  amount: number;
  payments: {
    id: string;
    code: number;
    status: string;
    date: string;
    amount: number;
    transactionId: string;
    failReason: string;
  }[];
}

interface CardDetails {
  creaditCardHash: string;
  creaditCardId?: string;
}

type BanksResponse = { name: string; number: string }[];

type ChargesResponse = {
  id: string;
  code: number;
  dueDate: string;
}[];

interface Payment {
  transactionId: string;
  installments: number;
  payments: {
    id: string;
    chargeId: string;
    date: string;
    realeaseDate: string;
    amount: number;
    fee: number;
    type: string;
    status: string;
    transactionId: string;
    failReason: string;
  }[];
}

declare function getAccessToken(
  clientId: string,
  clientSecret: string,
  isSandbox: boolean
): Promise<string>;

declare class Juno {
  private api: AxiosInstance;
  private headers: { [key: string]: string | number };
  private options: Options;

  constructor(options: Options);

  listBanks(): Promise<BanksResponse>;
  getBalance(): Promise<Balance>;
  createCharge(charge: NewCharge, billing: Billing): Promise<ChargesResponse>;
  checkChargeStatus(chargeId: string): Promise<ChargeStatus>;
  createPayment(
    chargeId: string,
    billing: { email: string; address: string },
    creditCardDetails: CardDetails
  ): Promise<Payment>;
}