import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { Center, HStack, Input, ScrollView, Text, View, VStack, Icon, Spinner } from 'native-base';
import IconFA from 'react-native-vector-icons/FontAwesome';

import { getItemLocal } from '../../helpers/localStorage';
import chatAction from '../../redux/chat/chatAction'
import userAction from '../../redux/user/userAction'
import { useDispatch, useSelector } from 'react-redux';
import InboxContent from '../../components/InboxContent';
import SearchContent from '../../components/SearchContent';
import constants from '../../components/constants';

const Inbox = ({navigation}) => {
   const dispatch = useDispatch()
   const [loading, setLoading] = useState(true)
   const [userLocal, setUserLocal] = useState()
   const chat = useSelector(store => store.chat)
   const [search, setSearch] = useState('')
   const [userList, setUserList] = useState([])
   
   useEffect(() => {
      const loadInbox = async () => {
         await dispatch(chatAction.list())
         setUserLocal(await getItemLocal(constants.localUser))
         setLoading(false)
      }
      
      loadInbox()
   }, [])
   
   const filterUser = async () => {
      if (search === '') return
      const resp = await dispatch(userAction.filter(search))
      if (resp.success) {
         setUserList(resp.values)
      }
   }
   
   const resetFilter = () => {
      setUserList([])
      setSearch('')
   }
   
   const selectUser = (user) => {
      navigation.navigate('Chat', { 
         user, 
         userLocal
      })
      resetFilter()
   }
   
   return (
      <VStack style={{ backgroundColor: 'white', flex: 1 }}>
         <View style={{ padding: 10 }}>
            <Input
               style={{ borderColor: 'black' }}
               placeholder='Buscar un usuario'
               variant='underlined'
               onChangeText={(v) => setSearch(v)}
               value={search}
               InputRightElement={
                  <HStack>
                     <TouchableOpacity onPress={filterUser}>
                        <Icon
                           as={<IconFA name={'search'} />}
                           size={6}
                           mr="2"
                           style={{color: 'gray'}} 
                        />
                     </TouchableOpacity>
                     {search !== '' &&
                        <TouchableOpacity onPress={resetFilter}>
                           <Icon
                              as={<IconFA name={'remove'} />}
                              size={7}
                              mr="2"
                              ml="1"
                              style={{color: 'red'}} 
                           />
                        </TouchableOpacity>
                     }
                  </HStack>
               }
            />
         </View>
         {!loading && chat.list?.length > 0 && userList.length == 0 &&
            <ScrollView>
               {chat.list.map((chat, i) => (
                  <InboxContent key={i} chat={chat} userLocalId={userLocal._id} selectUser={selectUser} />
               ))}
            </ScrollView>
         }

         {loading &&
            <View style={{flex: 1, justifyContent:'center', alignItems:'center'}}>
               <Spinner size='lg' />
            </View>
         }

         {userList.length > 0 &&
            <ScrollView>
               {userList.map((user, i) => (
                  <SearchContent key={i} user={user} selectUser={selectUser} />
               ))}
            </ScrollView>
         }

      </VStack>
   );
}

export default Inbox;