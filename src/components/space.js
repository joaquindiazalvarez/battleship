import React from 'react';

export function Space(props){
    //espacio que cambia de color y de modo
    //según los props que reciba
    return(<>
        <div className={"space " + (props.clicked === true ? "clicked ":'') + (props.ship === true ? "ship ": '') + (props.show === true ? "show": '')}></div>
    </>)
}