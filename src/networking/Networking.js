/**
 * @format
 * @flow
 */
 import axios, { Method } from 'axios';
 const qs = require('qs');

 export async function networkCall(
   path,
   type,
   apiParams,
   headers,
   logOut,
 ) {
   try {
     const response = await axios({
       method: type,
       url: path,
       data: apiParams,
       maxRedirects: 0,
       headers: {
         'Content-Type': 'application/json',
         Accept: 'application/json',
        //  Authorization: '33|VT1YtcHUqDqgSbiXltBIw7FqcIbI7sRTsl4ygjpJ'
       },
       paramsSerializer(params) {
         return qs.stringify(params, { arrayFormat: 'brackets' });
       },
     });
     console.log("response=====", response)
     return response;
   } catch (error) {
     if (error.toJSON().message === 'Network Error') {
       //showToast({ message: translate('NO_INTERNET_MSG') });
     }
     console.error('TCL: error', JSON.stringify(error));
     return error.response;
   }
 }

 