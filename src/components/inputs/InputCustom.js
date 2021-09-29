import React from 'react'
import { Input, FormControl } from 'native-base'

export default function InputCustom(props) {
   const { name, Controller, control, rules, errors } = props
   return (
      <>
         <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
               <Input
                  variant='underlined'
                  _light={{ backgroundColor: "white" }}
                  onBlur={onBlur}
                  onChangeText={(val) => onChange(val)}
                  value={value}
               />
            )}
            name={name}
            rules={rules}
         />
         <FormControl.ErrorMessage>
            {errors?.name?.message}
         </FormControl.ErrorMessage>
      </>
   );
}