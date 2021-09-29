import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Text, Heading, VStack, FormControl, Input, Link, Button, HStack, Divider } from 'native-base';
import { StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import StackSocialIcons from '../../components/StackSocialIcons';
import FormControlC from '../../components/formControl/FormControlC';
import validations from './validations';

import userAction from '../../redux/user/userAction';

export default function Login({ navigation, ...props }) {
   const dispatch = useDispatch()
   const { control, handleSubmit, formState: { errors } } = useForm();

   const onSubmit = async (data) => {
      const res = await dispatch(userAction.login(data))
      if (res.success) {
         navigation.reset({ index: 0, routes: [{ name: 'TabNavigation' }] })
      }
   };

   useEffect(() => {
   }, [])

   return (
      <Box safeArea flex={1} p={2} w="90%" mx='auto' mt={5}>
         <Heading size="lg" color='primary.500'>Welcome</Heading>
         <Heading color="muted.400" size="xs">Sign in to continue!</Heading>

         <VStack space={2} mt={5}>
            <FormControlC
               title='Email'
               name='email'
               rules={validations.email}
               Controller={Controller} control={control} errors={errors}
            />
            <FormControlC 
               title='Password' 
               name='password' 
               type='password'
               rules={validations.password} 
               Controller={Controller} control={control} errors={errors}
            >
               <Link
                  _text={{ fontSize: 'xs', fontWeight: '700', color: 'cyan.500' }}
                  alignSelf="flex-end"
                  mt={1}
               >
                  Forget Password?
               </Link>
            </FormControlC>
            <VStack space={2} mt={5}>
               <Button onPress={handleSubmit(onSubmit)} colorScheme="cyan" _text={{ color: 'white' }}>Login</Button>
               <StackSocialIcons />
            </VStack>
            <HStack justifyContent="center">
               <Text fontSize='sm' color='muted.700' fontWeight={400}>I'm a new user. </Text>
               <Link _text={{ color: 'cyan.500', bold: true, fontSize: 'sm' }} onPress={() => navigation.navigate('Register')}>
                  Sign Up
               </Link>
            </HStack>
         </VStack>
      </Box>
   );
}

const styles = StyleSheet.create({
   label: {}
});

const labelStyle = {
   color: 'muted.700',
   fontSize: 'sm',
   fontWeight: 600
};