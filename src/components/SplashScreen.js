import React, { useEffect, useState } from 'react'
import { Center, HStack, Heading, Spinner } from 'native-base';
import { getItemLocal } from '../helpers/localStorage';
import Navigation from '../Navigation'
import constants from '../components/constants'

export default function SplashScreen() {
   const [loading, setLoading] = useState(true)
   const [initialRoute, setInitialRoute] = useState()

   useEffect(() => {
      setTimeout(async () => {
         setInitialRoute((await getItemLocal(constants.localUser)) ? 'TabNavigation' : 'Login')
         setLoading(false)
      }, 1000);
   }, [])

   if (loading) {
      return (
         <Center flex={1} style={{backgroundColor:'white'}}>
            <HStack space={2}>
               <Heading color="primary.300">Loading... </Heading>
               <Spinner accessibilityLabel="Loading" />
            </HStack>
         </Center>
      );
   } else {
      return (
         <Navigation initialRoute={initialRoute} />
      );
   }
}