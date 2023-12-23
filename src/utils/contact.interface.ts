export interface ContactInterface {
    contact: {
      user: {
        _id: string;
        authInfo: {
          providerId?: string;
          email?: string;
        };
        userInfo: {
          name: string;
          avatar: string;
        };
        lastSeen: string;
        online: boolean;
      };
      isBlocked: boolean;
    };
    textTheme: string;
  }