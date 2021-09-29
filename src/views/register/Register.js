import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Heading, VStack, FormControl, Input, Link, Button } from 'native-base';
import { useForm, Controller } from 'react-hook-form';
import StackSocialIcons from '../../components/StackSocialIcons';
import FormControlC from '../../components/formControl/FormControlC';
import validations from './validations';

import userAction from '../../redux/user/userAction';

export default function Register({navigation}) {
   const dispatch = useDispatch()
   const user = useSelector(store => store.user)
   const { control, handleSubmit, formState: {errors} } = useForm();

   const onSubmit = async (data) => {
      const res = await dispatch(userAction.register(data))
      if (res.success) {
         navigation.navigate('Login')
      }
   };

   return (
      <Box safeArea flex={1} p={2} w="90%" mx='auto' mt={5}>
         <Heading size="lg" color='primary.500'>Welcome</Heading>
         <Heading color="muted.400" size="xs">Sign up to continue!</Heading>

         <VStack space={2} mt={5}>
            <FormControlC 
               title='Name' 
               name='name' 
               rules={validations.name} 
               Controller={Controller} control={control} errors={errors}
            />

            <FormControlC 
               title='Last Name' 
               name='last_name' 
               rules={validations.last_name} 
               Controller={Controller} control={control} errors={errors}
            />

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
            />

            <FormControlC 
               title='Confirm Password' 
               name='confirm_password' 
               rules={validations.confirm_password} 
               Controller={Controller} control={control} errors={errors}
            />
            <VStack space={2} mt={5}>
               <Button onPress={handleSubmit(onSubmit)} colorScheme="cyan" _text={{ color: 'white' }}>Sign Up</Button>
               <StackSocialIcons />
            </VStack>
         </VStack>
      </Box>
   );
}

const labelStyle = {
   color: 'muted.700',
   fontSize: 'sm',
   fontWeight: 600
};