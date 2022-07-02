import React, { useState, useEffect } from 'react';
import { Space } from './space'
import { Tags } from './tags'
import battleship from '../img/battleship.png'

export function Board(){
    //componente:tablero completo
    //donde ocurre el juego
    let defaultMatrix = []
    for(var i = 0; i < 10; i++){
        defaultMatrix.push([])
        for(let j = 0; j < 10; j++){
            defaultMatrix[i].push({clicked: false, ship: false})
        }
    }
    const tags = [[1,2,3,4,5,6,7,8,9,10],["A","B","C","D","E","F","G","H","I","J"]];
    const [showShips, setShowShips] = useState(false)
    const [matrix, setMatrix] = useState([...defaultMatrix])
    useEffect(()=>{
        setMatrix([...defaultMatrix])
        createAndRandomizeShips();

    },[])
    function createAndRandomizeShips(){
        //Cambia 25 veces(o menos) un espacio vacío a un espacio ocupado
        //por un barco aleatoriamente.
        let rmatrix = matrix;
        for(let i = 0; i < 25; i++){
            let rand = [Math.floor(Math.random()*10), Math.floor(Math.random()*10)]
            let defaultShip = {clicked: false, ship: true}
            rmatrix = [...rmatrix.slice(0, rand[0]), [...rmatrix[rand[0]].slice(0, rand[1]), defaultShip, ...rmatrix[rand[0]].slice(rand[1]+1)], ...rmatrix.slice(rand[0]+1)]
           }
        setMatrix([...rmatrix])

    }
    function handleClick(c){
        //setea como clickeado el espacio
        //cuyas coordenadas(array de dos numeros) se reciben como 
        //parámetro
        setMatrix([...matrix.slice(0, c[0]), [...matrix[c[0]].slice(0, c[1]), {...matrix[c[0]][c[1]], clicked: true}, ...matrix[c[0]].slice(c[1]+1)], ...matrix.slice(c[0]+1)])
        //se actualiza matrix haciendo que las nuevas coordenadas 
        //cambien de color al ser clickeadas
        console.log("you clicked", c)
    }
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
                {row.map((element, elementIndex)=>{return (<div key={elementIndex} onClick={()=>handleClick([rowIndex, elementIndex])}>
                    <Space clicked={element.clicked} ship={element.ship} show={showShips}/>
                </div>
                )})}
            </div>)})}
        </div>
        <div className="mt-4">
            {showShips === false && (<button 
                className="btn btn-secondary show" 
                type="button"
                onClick={()=>{setShowShips(true)}}
                >
                    Show Battleships
                </button>)}
            {showShips === true && (<button 
                className="btn btn-secondary show" 
                type="button"
                onClick={()=>{setShowShips(false)}}
                >
                    Hide Battleships
                </button>)}
        </div>
    </div>)
}