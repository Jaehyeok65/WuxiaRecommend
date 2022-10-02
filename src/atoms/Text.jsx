import React from 'react';


export const Text = ({ children, styled}) => { //외부에 동작을 위임하는 Text 컴포넌트 작성
    
    return(
        <span style={{...styled}}>{children}</span>
    )
}