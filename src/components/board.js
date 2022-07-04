import React, { useEffect } from 'react';
import { Space } from './space'
import { Tags } from './tags'
import battleship from '../img/battleship.png'

export function Board(props){
    const tags = [[1,2,3,4,5,6,7,8,9,10],["A","B","C","D","E","F","G","H","I","J"]];//etiquetas del tablero
    return(<div className="board">
            <div className="rowsTags">
                <img src={battleship} className="App-battleship" alt="battleship"/>
                {tags[0].map((element, index)=>{return(<div key={index}>
                        <Tags orientation="row" tag={element}/>
                    </div>
                )})}
                </div>
                {props.matrix.map((row, rowIndex)=>{return(<div key={rowIndex}>
                    <Tags orientation="column" tag={tags[1][rowIndex]}/>
                    {props.placing === true && row.map((element, elementIndex)=>{return (<div key={elementIndex} onClick={()=>props.handleClickPlacing([rowIndex, elementIndex])}>
                        <Space clicked={element.clicked} ship={element.ship} show={props.show}/>
                    </div>
                    )})}
                    {props.placing === false && props.canfire === true && row.map((element, elementIndex)=>{return (<div key={elementIndex} onClick={()=>props.handleClickPlaying([rowIndex, elementIndex])}>
                        <Space clicked={element.clicked} ship={element.ship} show={props.show}/>
                    </div>
                    )})}
                    {props.placing === false && props.canfire === false && row.map((element, elementIndex)=>{return (<div key={elementIndex}>
                        <Space clicked={element.clicked} ship={element.ship} show={props.show}/>
                    </div>
                    )})}
                </div>)})}
                </div>)
}