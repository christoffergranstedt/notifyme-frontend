import React from 'react'
import axios from 'axios'
import * as https from 'https'
import { HTTPMethod } from '@granch_web/common'

interface UseRequestProps {
	url: string;
	method: HTTPMethod;
	body?: any;
	token: string | null
}

export const useRequest = () => {

  const sendRequest = React.useCallback(async ({ url, method, body, token }: UseRequestProps) => {
    const fullURL = `${process.env.REACT_APP_BACKEND_URL}${url}`
    const { data } = await axios({
      url: fullURL,  
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      data: body,
      httpsAgent: new https.Agent({
        rejectUnauthorized: false
      })
    })
    return data
  }, [])
 
  return { sendRequest }
}