import React, { useState, useEffect } from 'react';
import { Space } from './space'
import { Tags } from './tags'
import battleship from '../img/battleship.png'

export function Board(){
    const tags = [[1,2,3,4,5,6,7,8,9,10],["A","B","C","D","E","F","G","H","I","J"]];
    const [matrix, setMatrix] = useState([])
    useEffect(()=>{
        let defaultMatrix = []
        for(var i = 0; i < 10; i++){
            defaultMatrix.push([])
            for(let j = 0; j < 10; j++){
                defaultMatrix[i].push({clicked: false, ship: false})
            }
        }
        setMatrix([...defaultMatrix])

    },[])
    console.log(matrix)
    return(<div id="board" className="mt-5">
        <div className="container">
            <div className="rowsTags">
            <img src={battleship} className="App-battleship" alt="battleship"/>
            {tags[0].map((element, index)=>{return(<div key={index}>
                    <Tags orientation="row" tag={element}/>
                </div>
            )})}
            </div>
            {matrix.map((row, rowIndex)=>{return(<div key={rowIndex}>
                <Tags orientation="column" tag={tags[1][rowIndex]}/>
                {row.map((element, elementIndex)=>{return (<div key={elementIndex}>
                    <Space clicked={element.clicked} ship={element.ship}/>
                </div>
                )})}
            </div>)})}
        </div>
    </div>)
}