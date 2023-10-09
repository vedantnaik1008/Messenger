import Pusher from "pusher";
import ClientPusher from "pusher-js";

export const serverPusher = new Pusher ({
    // appId: "1673736",
    // key: "b972b1dd30fbd0b39b97",
    // secret: "b3523aa816c2931ffba0",
    // cluster: "ap2",
    appId : "1684160",
    key : "80c229dd83bc4b0b4d69",
    secret : "753501dc31decf76a9cd",
    cluster : "ap2",
    useTLS: true,
})

export const clientPusher = new ClientPusher ('80c229dd83bc4b0b4d69', {
    cluster: 'ap2',
    forceTLS: true,
  })