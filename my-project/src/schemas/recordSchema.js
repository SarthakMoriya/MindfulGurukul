import * as yup from "yup";

export const recordSchema=yup.object().shape({
    username: yup.string().required("Please enter a name"),
    email: yup.string().required("Please enter a email address"),
    phoneNo: yup.string().required("Please enter a phone number"),
   
    
})

export const initialValuesRecord = {
    username:"",
    email:"",
    phoneNo:""
  };