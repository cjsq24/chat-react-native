import React from 'react'
import { StyleSheet, FlatList } from 'react-native';
import { Spinner, View } from 'native-base';
import moment from 'moment'
import 'moment/locale/es';
import MessageContainer from './MessageContainer';

moment.locale('es')

const ShowMessages = ({ loading, messages, userLocal }) => {
   console.log('showMEssages')
   return (
      <View style={styles.container}>
         {!loading && messages?.length > 0 &&
            <FlatList
               inverted
               initialNumToRender={20}
               maxToRenderPerBatch={20}
               data={messages}
               renderItem={({ item }) => <MessageContainer message={item} userLocalId={userLocal._id} />}
               keyExtractor={item => item._id}
               style={{ width: '95%' }}
            />
         }
         {loading &&
            <Spinner size='lg' />
         }
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      height: '90%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
   },
})

const areEqual = (prevProps, nextProps) => {
   const { messages, loading } = nextProps;
   const { messages: prevMessages, loading: prevLoading } = prevProps;

   /*if the props are equal, it won't update*/
   const messagesEqual = (messages === prevMessages && loading === prevLoading);

   return messagesEqual;
};

export default React.memo(ShowMessages, areEqual);