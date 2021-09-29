import React from 'react'
import { Box, Button } from 'native-base'
import { useDispatch } from 'react-redux'
import userAction from '../../redux/user/userAction'

export default function Option({navigation}) {
   const dispatch = useDispatch()

   const logout = async () => {
      const resp = await dispatch(userAction.logout())
      if (resp) {
         navigation.reset({ index: 0, routes: [{ name: 'Login' }] })
      }
   }

   return (
      <Box>
         <Button onPress={logout}>Logout</Button>
      </Box>
   );
}