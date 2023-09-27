import React, { ChangeEvent, useState } from 'react';

import "./Field.css";
interface TextFieldProps {
    label: string;
    value: string;
    

}



export default function Field(props: TextFieldProps) {

        return (
            <div className="blockField">
                <label>{props.label}</label>
                <div className='field'>
                <p>{props.value}</p>
                </div>
            </div>
    )

}

   
   

