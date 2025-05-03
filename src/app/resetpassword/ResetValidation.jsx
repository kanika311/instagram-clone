import * as yup from 'yup'

export const ResetValidation= yup.object({
   
   email:yup.string().email().required("please enter your email"),
  

});