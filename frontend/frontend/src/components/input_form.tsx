import styled from "styled-components";
import React, { ChangeEventHandler } from 'react'

const Input: React.FC<{height? :string ,className?:string , width? :string, border?:string , fg? :string, bg? :string,pd?:boolean,type:string,value?:string,onChange?: ChangeEventHandler<HTMLInputElement>, name?: string, register?: any,defaultValue?:string}> =  (({height, width, border,fg,bg,pd,type,className,register,name,value,defaultValue,onChange}) => {
  
  return (register ?
    <input  {...register(name)} defaultValue={value} className={className} type={type || "text"} />
    : <input className={className} onChange={onChange} defaultValue={value} type={type || "text"} />
  )
  })

  export const InputStyled=styled(Input)`
  box-sizing: content-box; 
  height: ${props=>props.height || "40px"};
  font-size: 16px;
  font-family: 'Raleway';
  margin-top:10px;
  
  display: block;
  margin-bottom:10px;
font-style: normal;
  width: ${props => props.width || "420px"};
  padding: 4px 30px 4px 24px;
  border-radius: 32px;
  border: ${props => props.border || "2px solid #DE8667"};
  color: ${props => props.fg};
  background-color: ${props => props.bg || "#FFFFFF"};
   }
`