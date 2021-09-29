import { HStack, Text, View } from 'native-base'
import React, { useEffect, useState } from 'react'
import {StyleSheet, TouchableOpacity} from 'react-native'
//import { TouchableOpacity } from 'react-native-gesture-handler'

const SearchContent = (props) => {
   const { user, selectUser } = props

   return (
      <HStack style={styles.container}>
         <TouchableOpacity style={styles.touchableContainer} onPress={() => selectUser(user)}>
            <Text style={{ fontSize: 15, fontWeight:'bold' }}>
               {`${user.name} ${user.last_name}`}
            </Text>
            <Text style={{ fontSize: 12 }}>
               {user.email}
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

export default SearchContent;