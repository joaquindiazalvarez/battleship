import React from 'react';
import { Ship } from './ship';

export function Placing (props){
    return(<div className="placing">
        <h3 id="placingMessage">Placing this ship</h3>
        <Ship len={props.len} orientation={props.orientation}/> 
    </div>)
}