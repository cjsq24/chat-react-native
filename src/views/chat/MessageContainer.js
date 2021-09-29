import React from 'react'

import { Spinner, Text, View, VStack } from 'native-base';
import { StyleSheet } from 'react-native'
import moment from 'moment'

const MessageContainer = ({ userLocalId, message, sending }) => {

   const type = (userLocalId === message.sent_by_id) ? 'sent' : 'received'

   return (
      <VStack
         style={{ 
            display: 'flex', 
            alignItems: (type === 'sent') ? 'flex-end' : 'flex-start', 
            padding: 5 
         }}
      >
         <View style={[
               styles.containerMessage, 
               type === 'sent' ? styles.containerMsgSent : styles.containerMsgReceived
            ]}
         >
            <Text style={{}}>{message.content}</Text>
            <Text style={{ fontSize: 10, color: 'gray' }} className={`content-message`}>
               {message?.date &&
                  moment(message.date).format('HH:mm a')
               }
               {sending &&
                  <Spinner size='sm' />
               }
            </Text>
         </View>
      </VStack>
   );
}

const styles = StyleSheet.create({
   containerMessage: {
      borderRadius: 10,
      paddingHorizontal: 10,
      paddingVertical: 3,
      maxWidth: '90%'
   },
   containerMsgSent: {
      backgroundColor: '#CEF0FF',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end'
   },
   containerMsgReceived: {
      backgroundColor: '#FFE4CC',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start'
   }
})

export default MessageContainer;