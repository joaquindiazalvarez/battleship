import React from 'react';

export function Ship(props){
    const arr = []
    for(let i = 0; i < props.len; i++){
        arr.push(i);
    }
    return(<div>
        {props.orientation === 'horizontal' && (<div id="horizontal">
            {arr.map((element, index)=>{return(<div 
                    key={index} className="shipPart">            
                </div>
            )})}  
        </div>)}
        {props.orientation === 'vertical' && (<div id="vertical">
            {arr.map((element, index)=>{return(<div 
                    key={index} className="shipPart">
                </div>
            )})}  
        </div>)}
    </div>)
}