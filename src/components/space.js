import React from 'react';

export function Space(props){
    return(<>
        {props.clicked === true && props.ship === true && (<div
            className="space clicked ship">
        </div>)}
        {props.clicked === true && props.ship === false && (<div
            className="space clicked void">
        </div>)}
        {props.clicked === false && props.ship === true && (<div
            className="space unclicked ship">
        </div>)}
        {props.clicked === false && props.ship === false && (<div
            className="space unclicked void">
        </div>)}
    </>)
}