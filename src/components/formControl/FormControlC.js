import React from 'react'
import { FormControl, Input } from 'native-base'

export default function FormControlC(props) {
   const { name, title, Controller, control, rules, errors, type, children } = props

   return (
      <FormControl
         isRequired
         isInvalid={`${name}` in errors}
      >
         <FormControl.Label _text={labelStyle}>
            {title}
         </FormControl.Label>
         <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
               <Input
                  variant='underlined'
                  _light={{ backgroundColor: "white" }}
                  onBlur={onBlur}
                  onChangeText={(val) => onChange(val)}
                  value={value}
                  type={type ? type : 'text'}
               />
            )}
            name={name}
            rules={rules}
         />
         <FormControl.ErrorMessage>
            {errors && errors[name] && 
               errors[name]?.message
            }
         </FormControl.ErrorMessage>
         {children}
      </FormControl>
   );
}

const labelStyle = {
   color: 'muted.700',
   fontSize: 'sm',
   fontWeight: 600
};