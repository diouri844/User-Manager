import React, { useEffect } from 'react'

import { useNavigate } from 'react-router-dom';

function logout() {
  const navigation = useNavigate();
  // try to get the current user token from localstorage : 
  useEffect(
    ()=>{
      try{
        const currentUserToken = localStorage.getItem('AuthToken');
        if(currentUserToken){
          localStorage.removeItem('AuthToken');
          //console.log( "token deleted ");
          // loging out :
          setTimeout(
            ()=>{
              // redirect to login page : 
              navigation('/');
            },500
          );
        }
      }catch( error )
      {
        console.error(
          "Catch auth token error : \n"
          + error
        );
        navigation('/');
      }
  });
  return (<></>);
}
export default logout;