import * as yup from 'yup'

export const Loginvalidation= yup.object({
   
   email:yup.string().email().required("please enter your email"),
   password:yup.string().min(8).required("please enter atleast 8 characters"),

});