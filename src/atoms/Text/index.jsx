import React, {forwardRef} from 'react';


export const Text = forwardRef(({ children, styled}, ref) => { //외부에 동작을 위임하는 Text 컴포넌트 작성

    
    return(
        <div style={{...styled}} ref={ref}>{children}</div>
    )
});