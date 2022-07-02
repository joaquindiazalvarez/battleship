import React, { useState, useEffect } from 'react';
import { Space } from './space'
import { Tags } from './tags'
import battleship from '../img/battleship.png'

export function Board(){
    let defaultMatrix = []
    for(var i = 0; i < 10; i++){
        defaultMatrix.push([])
        for(let j = 0; j < 10; j++){
            defaultMatrix[i].push({clicked: false, ship: false})
        }
    }
    const tags = [[1,2,3,4,5,6,7,8,9,10],["A","B","C","D","E","F","G","H","I","J"]];
    const [matrix, setMatrix] = useState([...defaultMatrix])
    useEffect(()=>{
/*         let defaultMatrix = []
        for(var i = 0; i < 10; i++){
            defaultMatrix.push([])
            for(let j = 0; j < 10; j++){
                defaultMatrix[i].push({clicked: false, ship: false})
            }
        } */
        setMatrix([...defaultMatrix])
    /*     const start = false; */
        createAndRandomizeShips();

    },[])
 /*    useEffect(()=>{
        if(start)
    },[matrix]) */
    function createAndRandomizeShips(){
        let rmatrix = matrix;
        for(let i = 0; i < 25; i++){
            let rand = [Math.floor(Math.random()*10), Math.floor(Math.random()*10)]
            let ship = {clicked: true, ship: true}
            rmatrix = [...rmatrix.slice(0, rand[0]), [...rmatrix[rand[0]].slice(0, rand[1]), {...ship, clicked: true, ship: true}, ...rmatrix[rand[0]].slice(rand[1]+1)], ...rmatrix.slice(rand[0]+1)]
           }
        setMatrix([...rmatrix])

    }
    console.log(matrix)
    return(<div id="board" className="mt-5">
        <div className="container">
            <div className="rowsTags mt-3">
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