import { HStack, Text, View } from 'native-base'
import React, { useEffect, useState } from 'react'
import {StyleSheet, TouchableOpacity} from 'react-native'
//import { TouchableOpacity } from 'react-native-gesture-handler'

const InboxContent = (props) => {
   const { chat, userLocalId, selectUser } = props
   const [user, setUser] = useState()

   useEffect(() => {
      const getUser = chat.users_id.filter(user => user._id !== userLocalId)
      setUser({
         _id: getUser[0]._id,
         name: getUser[0].name
      })
   }, [chat, userLocalId])

   return (
      <HStack style={styles.container}>
         <TouchableOpacity style={styles.touchableContainer} onPress={() => selectUser(user)}>
            <Text style={{ fontSize: 15, fontWeight:'bold' }}>{user?.name}</Text>
            <Text style={{ fontSize: 12 }}>
               {chat.messages.sent_by_id === userLocalId ? (
                     <Text style={{fontWeight:'bold', fontSize:12}}>Tú: </Text>
                  ) : (
                     ''
                  )
               }
               {`${chat.messages?.content?.slice(0, 50)}${chat.messages.content.length > 50 ? '...' : ''}`}
            </Text>
         </TouchableOpacity>
      </HStack>
   );
}

const styles = StyleSheet.create({
   container: {
      paddingVertical: 7,
      paddingHorizontal: 13,
      borderBottomWidth: 1,
      borderBottomColor: 'lightgray',
      backgroundColor: 'white'
   },
   touchableContainer: {
      width: '100%'
   }
})

export default InboxContent;