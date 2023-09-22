import Pusher from "pusher";
import ClientPusher from "pusher-js";

export const serverPusher = new Pusher ({
    appId: "1673736",
    key: "b972b1dd30fbd0b39b97",
    secret: "b3523aa816c2931ffba0",
    cluster: "ap2",
    useTLS: true 
})

export const clientPusher = new ClientPusher ('b972b1dd30fbd0b39b97', {
    cluster: 'ap2',
    forceTLS: true,
  })