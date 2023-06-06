export interface GlobalPropTypes {
  clientSocket: any;
  username: string;
  user?: UserObject;
  currentRoomData?: ExpeditionInterface;
  setCurrentRoomData?: (obj: ExpeditionInterface) => void;
}

export interface MessageInterface {
  user: string;
  message: string;
}

export interface ExpeditionInterface {
  _id: any;
  name: string;
  options: object;
  owner?: UserObject;
  members?: any[];
  characters: any[];
  messages: MessageInterface[];
}

export interface UserObject {
  _id?: any;
  username: string;
  password?: string;
  characters?: string[] | object[];
}

export interface LoginSignupProps {
  setToken: (token: string) => void;
  setUserObject: (obj: UserObject) => void;
}
