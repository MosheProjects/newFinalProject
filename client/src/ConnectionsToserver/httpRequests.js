import React from "react";
import axios from "axios";





export const  checkConnection =async (data) => 
  await axios
    .get("http://localhost:3000/user/checkConnection",{
      headers: {
        'Authorization': 'Bearer your-token', 
        'Content-Type': 'application/json',
      },
      withCredentials: true})
    .then((response) => {
      return response;
    })
    

export const showAllConnections = (data) =>
  axios
    .get("http://localhost:3000/user/showAllConnections")
    .then((response) => {
      console.log(response.data, "headers:", response.headers);
      return response.data;
    });

export const signupNode = (data) =>
  axios.post("http://localhost:3000/user/signup", data).then((response) => {
    return response;
  });



  export const loginNode = (data) =>

  axios.post('http://localhost:3000/user/login',data,{
    headers: {
      'Authorization': 'Bearer your-token', 
      'Content-Type': 'application/json',
    },
    withCredentials: true}).then((response) =>
{    return response;
}    )



export const endConnection = (data) =>
  axios.delete("http://localhost:3000/user/endConnection",{
    headers: {
      'Authorization': 'Bearer your-token', 
      'Content-Type': 'application/json',
    },
    withCredentials: true}).then((response) => {
    return response.data;
  });

export const endAllConnections = (data) =>
  axios
    .delete("http://localhost:3000/user/endAllConnections")
    .then((response) => {
      return response.data;
    });
