import axios from 'axios';
import { useEffect, useState } from "react";
import React, { Component } from "react";
import bg_image from '../../images/254381.jpeg'


function Register() {
    return (
        <div>
            <img
            src={bg_image}
            // width="1600"
            // height="700"
            style={{ flex: 1,
                aspectRatio:1,
                width: '100%',
                height: '100%',
                resizeMode: 'contain' }}
            alt="image"
          ></img>
        </div>
    );
}

export default Register;