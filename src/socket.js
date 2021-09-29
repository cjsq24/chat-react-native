import { io } from 'socket.io-client'
import chatAction from './redux/chat/chatAction'
import constants from './components/constants'
import Config from 'react-native-config';
import { getItemLocal } from './helpers/localStorage'

export default function socket(store) {
   const ioClient = io.connect(Config.URL_SOCKET, {
      'forceNew': true,
      'reconnection': true
   });

   ioClient.on("connect", () => {
      //console.log('conectado')
   });

   ioClient.on("receive-message", async (data) => {
      try {
         console.log('recibimos del socket')
         const myLocalData = await getItemLocal(constants.localUser)
         if (data.userToId === myLocalData._id) {
            console.log(data.userToId, myLocalData._id)
            store.dispatch(chatAction.receiveMessage({
               ...data,
               userLocalId: data.userToId,
               userToId: data.userFromId
            }))
         }
      } catch (error) {
         console.log('error socket', error)
      }
   });
}