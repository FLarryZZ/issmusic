import styled from "styled-components";
import React from 'react'

const Button: React.FC<{height? :string ,className?:string , width? :string, border?:string , fg? :string, bg? :string,pd?:boolean,content?:string,onClick?: React.MouseEventHandler}> = ({onClick,height, width, border,fg,bg,pd,content,className}) => {
    return (
      <button onClick={onClick} type={pd ? "button" : "submit"} className={className}>
        {content}
      </button>
    )
  }

export const ButtonST = styled(Button)`
    box-sizing: content-box; 
    height: ${props=>props.height || "40px"};
    font-size: 16px;
    font-family: 'Raleway';
font-style: normal;
    width: ${props => props.width || "auto"};
    padding: 4px 30px 4px 24px;
    border-radius: 32px;
    border: ${props => props.border || "none"};
    color: ${props => props.fg};
    background-color: ${props => props.bg};
    &:hover{
      text-decoration: none;
        background-color: ${(props) => props.bg && `#${(parseInt(props.bg.substring(1), 16) - parseInt('070707', 16)).toString(16)}`};
        
        cursor: pointer;
    }
`