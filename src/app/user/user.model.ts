export enum UserType {
  Student = 0,
  Client,
  Admin
}

export class User {
  key?: string | null;
  active: boolean;
  fName: string;
  sName: string;
  email: string;
  userType: UserType;
}
