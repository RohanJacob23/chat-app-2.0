export interface User {
  id: string;
  name: string | null;
  email: string;
  password: string | null;
  emailVerified: Date | null;
  image: string | null;
}

export interface FriendRequests {
  friendRequest: {
    id: string;
    senderId: string;
    receiverId: string;
    createdAt: Date | null;
  };
  user: User;
}

export interface FriendList {
  user: User;
  friend: {
    id: string;
    createdAt: Date | null;
    userId1: string;
    userId2: string;
  };
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string | null;
  createdAt: Date | null;
}
