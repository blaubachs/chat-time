export interface GlobalPropTypes {
  clientSocket: any;
  username: string;
}

export interface MessageInterface {
  user: string;
  message: string;
}

export interface MessageProps extends MessageInterface {
  isCurrentUser: boolean;
}
