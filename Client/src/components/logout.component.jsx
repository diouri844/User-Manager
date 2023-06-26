import React, { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom';

function logout() {
  const navigation = useNavigate();
  // try to get the current user token from localstorage : 
  useEffect(
    ()=>{
      try{
        setLogoutState(true);
        const currentUserToken = localStorage.getItem('AuthToken');
        if(!currentUserToken){
          navigation('/');
          return;
        }else{
          localStorage.removeItem('AuthToken');
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