import React, { useState, useEffect } from 'react'
import { HStack, Input, ScrollView, Text, View, VStack, Icon, Spinner, Button, IconButton, Pressable } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
//import { Pressable } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import IconFA from 'react-native-vector-icons/FontAwesome';
import { useForm, Controller } from 'react-hook-form';

import ShowMessages from './ShowMessages'
import chatAction from '../../redux/chat/chatAction'
import userAction from '../../redux/user/userAction'

const Chat = ({ navigation, route }) => {
   const { user, userLocal } = route.params
   const dispatch = useDispatch()
   const [loading, setLoading] = useState(true)
   const [userSelected, setUserSelected] = useState()
   const chat = useSelector(store => store.chat)
   const [message, setMessage] = useState('')
   const [sendingMessage, setSendingMessage] = useState(false)
   const [messagesInProgress, setMessagesInProgress] = useState([])

   const { control, handleSubmit, formState: { errors }, setValue } = useForm();

   useEffect(() => {
      let isMounted = true;
      if (user?._id) {
         navigation.setOptions({ title: `${user.name}` })
         const getChat = async () => {
            const resp = await dispatch(userAction.get(user._id))
            if (resp.success && isMounted) {
               setUserSelected(resp.values)
               await dispatch(chatAction.getChat(user._id))
               setLoading(false)
            }
         }
         getChat()
      }

      return () => { isMounted = false }
   }, [])

   const sendMessage = async ({message}) => {
      setSendingMessage(true)
      setValue('message', '')
      const resp = await dispatch(chatAction.sendMessage({
         user_local_id: userLocal._id,
         user_to_id: userSelected._id,
         content: message
      }))

      if (resp.success) {
         const filterMessagesInProgress = messagesInProgress.filter(message => message !== message)
         setMessagesInProgress(filterMessagesInProgress)
      }
      //setMessage('')
      setSendingMessage(false)
   }

   //console.log(messagesInProgress)

   return (
      <VStack style={{ flex: 1, height: '100%' }}>
         <ShowMessages loading={loading} messages={chat.messages} userLocal={userLocal} messagesInProgress={messagesInProgress} />
         <View style={{ height: '10%', justifyContent: 'center', alignItems: 'center', padding: 5, backgroundColor: 'white' }}>
            <Controller
               control={control}
               render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                     onChangeText={(val) => onChange(val)}
                     value={value}
                     InputRightElement={
                        sendingMessage ? (
                           <View
                              style={{
                                 width: 60,
                                 height: '100%',
                                 justifyContent: 'center',
                                 alignItems: 'center'
                              }}
                           >
                              <Spinner size='lg' />
                           </View>
                        ) : (
                           <Pressable
                              onPress={handleSubmit(sendMessage)}
                              style={{
                                 width: 60,
                                 height: '100%',
                                 justifyContent: 'center',
                                 alignItems: 'center'
                              }}
                              _pressed={{}}
                           >
                              <IconFA name={'send'} style={{ color: 'gray', fontSize: 20 }} />
                           </Pressable>
                        )
                     }
                  />
               )}
               name={'message'}
               rules={{ required: true }}
            />
            {/*<Input
               placeholder='Escribe aquí tu mensaje'
               value={message}
               onChangeText={(v) => setMessage(v)}
               InputRightElement={
                  sendingMessage ? (
                     <View
                        style={{
                           width: 60,
                           height: '100%',
                           justifyContent: 'center',
                           alignItems: 'center'
                        }}
                     >
                        <Spinner size='lg' />
                     </View>
                  ) : (
                     <Pressable
                        onPress={sendMessage}
                        style={{
                           width: 60,
                           height: '100%',
                           justifyContent: 'center',
                           alignItems: 'center'
                        }}
                        _pressed={{}}
                     >
                        <IconFA name={'send'} style={{ color: 'gray', fontSize: 20 }} />
                     </Pressable>
                  )
               }
            />*/}
         </View>
      </VStack>
   );
}

export default Chat;