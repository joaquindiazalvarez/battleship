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
    const [counter, setCounter] = useState()
    const [matrix, setMatrix] = useState([...defaultMatrix])
    const [playing, setPlaying] = useState(true)
    useEffect(()=>{
        setMatrix([...defaultMatrix])
        createAndRandomizeShips();

    },[])
    function createAndRandomizeShips(){
        //Cambia 25 veces(o menos) un espacio vacío a un espacio ocupado
        //por un barco aleatoriamente.
        let rmatrix = [...defaultMatrix]
        //r de random
        let counterHelper = 0;
        for(let i = 0; i < 4; i++){
            let rand = [Math.floor(Math.random()*10), Math.floor(Math.random()*10)];
            if(rmatrix[rand[0]][rand[1]].ship === false) counterHelper = counterHelper + 1;
            let defaultShip = {clicked: false, ship: true}
            rmatrix = [...rmatrix.slice(0, rand[0]), [...rmatrix[rand[0]].slice(0, rand[1]), defaultShip, ...rmatrix[rand[0]].slice(rand[1]+1)], ...rmatrix.slice(rand[0]+1)]
            
        }
        setMatrix([...rmatrix])
        setCounter(counterHelper)

    }
    function handleClick(c){
        //setea como clickeado el espacio
        //cuyas coordenadas(array de dos numeros) se reciben como 
        //parámetro
        if(playing === true){
            if(matrix[c[0]][c[1]].clicked === false){
                setMatrix([...matrix.slice(0, c[0]), [...matrix[c[0]].slice(0, c[1]), {...matrix[c[0]][c[1]], clicked: true}, ...matrix[c[0]].slice(c[1]+1)], ...matrix.slice(c[0]+1)])
                //se actualiza matrix haciendo que las nuevas coordenadas 
                //cambien de color al ser clickeadas
                if(matrix[c[0]][c[1]].ship === true) setCounter(counter-1);
            }
        }
    }
    useEffect(()=>{
        if(counter === 0 || counter < 0){
            setPlaying(false)
        }
    },[counter])
    useEffect(()=>{
        //si el juego vuelve a empezar, se reinicia la matrix
        if(playing === true){            
            setMatrix([...defaultMatrix]);
            createAndRandomizeShips();
        }
    },[playing])
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
        {playing === true && <h3 id="counter" className="mt-3">{counter} target remains!</h3>}
        {playing === false && <h3 id="counter" className="mt-3">You won!</h3>}
        <div className="mt-4">
            {showShips === false && playing === true &&(<button 
                className="btn btn-secondary show" 
                type="button"
                onClick={()=>{setShowShips(true)}}
                >
                    Show Battleships
                </button>)}
            {showShips === true && playing === true && (<button 
                className="btn btn-secondary show" 
                type="button"
                onClick={()=>{setShowShips(false)}}
                >
                    Hide Battleships
                </button>)}
        </div>
        <div className="mt-4">
            {playing === false && (<button 
                className="btn btn-secondary show" 
                type="button"
                onClick={()=>{setPlaying(true)}}
                >
                    Start Again!
                </button>)}
        </div>
    </div>)
}