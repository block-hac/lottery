import React, { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Dialog, DialogContent } from "@material-ui/core";
import axios from 'axios';

// import jwt from 'jsonwebtoken';
import {SECRET, SERVICE_URL} from '../app/constants/config';
import { SET_USER, AUTH } from '../app/constants/actions';


const jwt = require('jsonwebtoken');

const Frame = props => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { frame, token } = router.query;

  const decodeToken = tokenPhrase => {
    jwt.verify(tokenPhrase, SECRET, async (err, decoded) => {
      if (err) {
        console.log(err);
        throw err;
      } else {
        // TODO: get balance from main service.
        const balance = await axios.get(SERVICE_URL + 'get-balance', {headers: {Authorization: tokenPhrase, crossdomain: true}}).then(res => res.data);
        console.log(balance);
        await localStorage.setItem('token', tokenPhrase);
        await localStorage.setItem('user', JSON.stringify(decoded));     
        console.log(decoded);   
        await dispatch(dispatchController => 
          dispatchController({
            type: SET_USER,
            payload: decoded,
          })  
        );
        await dispatch(dispatchController => 
          dispatchController({ type: AUTH.SUCCESS })
        );
        router.push("/");
      }
    });
  };

  useMemo(() => {
    if (token) {
      decodeToken(token);
    }
  }, [token]);

  return (
    <div>
      <Dialog
        open
        aria-labelledby="responsive-dialog-title"
      >
        <DialogContent className="loading_dlg_content">
          <DialogContent style={{textAlign: 'center'}}>
            <img src="/images/working.gif" className="loading_icon" alt="working" />
          </DialogContent>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Frame;