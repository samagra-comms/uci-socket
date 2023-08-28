import { io, Socket } from 'socket.io-client';

class UCI {
  socket: Socket | undefined;
  msgReceiveCb: any;
  session: any;
  constructor(URL: string, socketOptions: any, onRecieveCallback: any) {
    this.socket = io(URL, socketOptions);

    this.msgReceiveCb = onRecieveCallback;
    this.socket.connect();

    this.socket.on("botResponse", this.handleMessage);
    this.socket.on("session", this.handleSocketSession);
  }

  handleMessage = (message: any) => {
    //ReceiveCallback to be used here
    console.log(message);
    this.msgReceiveCb(message);
  };

  handleSocketSession = (session:any) => {
    this.session = session;
  };

  onDisconnect = () => {
    this.socket?.disconnect()
  }
  

  sendMessage = ({ text, to, from, optional, conversationId, asrId, userId }: any) => {
    this.socket?.emit("botRequest", {
      content: {
        text,
        to,
        appId: optional?.appId,
        channel: optional?.channel,
        conversationId: conversationId || null, 
        asrId: asrId || null,
        from,
        userId: userId || this.session.userID,
        context: null,
        accessToken: null,
      },
      to,
    });
  };
}

export { UCI };


