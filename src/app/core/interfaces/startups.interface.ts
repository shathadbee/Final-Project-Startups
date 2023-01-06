import { Sectors } from './sectors.interfaace';

export interface Startup {
  key?: string;
  name: string;
  logo?: string;
  city?: string;
  sectors?: Sectors[];
  numberOfEmployees?: number;
  yearOfEstablish?: string;
  websiteUrl: string;
  emailAddress: string;
}
