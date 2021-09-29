import React from 'react'
import IconFA from 'react-native-vector-icons/FontAwesome'
import { HStack, Icon, IconButton } from 'native-base';

export default function StackSocialIcons() {
   return (
      <HStack justifyContent="center" alignItem='center'>
         <IconButton
            variant='unstyled'
            startIcon={
               <Icon as={<IconFA name="facebook" />} color='muted.700' size='sm' />
            }
         />
         <IconButton
            variant='unstyled'
            startIcon={
               <Icon as={<IconFA name="google" />} color='muted.700' size="sm" />
            }
         />
         <IconButton
            variant='unstyled'
            startIcon={
               <Icon as={<IconFA name="github" />} color='muted.700' size="sm" />
            }
         />
      </HStack>
   );
}