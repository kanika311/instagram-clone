import * as yup from 'yup'

export const Formvalidation= yup.object({
    name:yup.string().min(2).max(25).required("please enter your name"),
   email:yup.string().email().required("please enter your email"),
   password:yup.string().min(8).required("please enter atleast 8 characters"),
   username:yup.string().min(2).max(25).required("please enter username")
});