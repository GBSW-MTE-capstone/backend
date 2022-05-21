export default interface User {
  uid: string;
  email: string | unknown;
  nickname: string;
  profile: string;
  permission: number;
  createdAt: Date;
}
