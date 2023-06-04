export interface GlobalPropTypes {
  clientSocket: any;
  username: string;
}

export interface MessageInterface {
  user: string;
  message: string;
}

export interface UserObject {
  _id?: any;
  username: string;
  password?: string;
  characters?: string[] | object[];
}
