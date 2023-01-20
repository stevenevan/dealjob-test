export type iGetUserResponse = iUser;

export type iUser = {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  birthDate: string;
  image: string;
  bloodGroup: string;
  height: number;
  weight: number;
  eyeColor: string;
  hair: iHair;
  domain: string;
  ip: string;
  address: iAddress;
  macAddress: string;
  university: string;
  bank: iBank;
  company: iCompany;
  ein: string;
  ssn: string;
  userAgent: string;
};

export type iHair = {
  color: string;
  type: string;
};

export type iAddress = {
  address: string;
  city: string;
  coordinates: iCoordinates;
  postalCode: string;
  state: string;
};

export type iCoordinates = {
  lat: number;
  lng: number;
};

export type iBank = {
  cardExpire: string;
  cardNumber: string;
  cardType: string;
  currency: string;
  iban: string;
};

export type iCompany = {
  address: iCompanyAddress;
  department: string;
  name: string;
  title: string;
};

export type iCompanyAddress = {
  address: string;
  city: string;
  coordinates: iCompanyCoordinates;
  postalCode: string;
  state: string;
};

export type iCompanyCoordinates = {
  lat: number;
  lng: number;
};
