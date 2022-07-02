import React from 'react';

export function Tags(props){
 
    return(<>
        {props.orientation === "row" && (<div className="rowTag">
            {props.tag}
        </div>)}
        {props.orientation === "column" && (<div className="columnTag">
            {props.tag}
        </div>)}
    </>)
}