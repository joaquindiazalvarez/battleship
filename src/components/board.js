import React, { useState, useEffect } from 'react';
import { Space } from './space'
import { Tags } from './tags'
import { Placing } from './placing'
import battleship from '../img/battleship.png'

export function Board(){
    //componente:tablero completo
    //donde ocurre el juego
    let defaultMatrix = []
    for(let i = 0; i < 10; i++){
        //se crea una matrix vacía
        defaultMatrix.push([]);
        for(let j = 0; j < 10; j++){
            defaultMatrix[i].push({clicked: false, ship: false});
        }
    }
    let shipsArray = []
    for(let i = 3; i >= 1; i--){
        //se crea el arreglo de barcos que van a posicionarse
        //en el tablero
        shipsArray.push({len: i, orientation: 'horizontal', coordinateds: []});
        shipsArray.push({len: i, orientation: 'vertical', coordinateds: []});
        if(i === 1) shipsArray.pop()
    }
    console.log(shipsArray)
    const tags = [[1,2,3,4,5,6,7,8,9,10],["A","B","C","D","E","F","G","H","I","J"]];//etiquetas del tablero
    const [showShips, setShowShips] = useState(true);
    const [counter, setCounter] = useState(11);
    const [matrix, setMatrix] = useState([...defaultMatrix]);
    const [playing, setPlaying] = useState(false);
    const [placing, setPlacing] = useState(true);
    const [placingCounter, updatePlacingCounter] = useState(0)
    const [ships, updateShips] = useState(shipsArray)
    useEffect(()=>{
        setMatrix([...defaultMatrix])
    },[])
    function createAndRandomizeShips(){
        //Cambia 25 veces(o menos) un espacio vacío a un espacio ocupado
        //por un barco aleatoriamente.
        //esta función la usé para iniciar un juego random en un principio
        let randomMatrix = [...defaultMatrix]
        //r de random
        let counterHelper = 0;
        for(let i = 0; i < 4; i++){
            let rand = [Math.floor(Math.random()*10), Math.floor(Math.random()*10)];
            if(randomMatrix[rand[0]][rand[1]].ship === false) counterHelper = counterHelper + 1;
            let defaultShip = {clicked: false, ship: true}
            randomMatrix = [...randomMatrix.slice(0, rand[0]), [...randomMatrix[rand[0]].slice(0, rand[1]), defaultShip, ...randomMatrix[rand[0]].slice(rand[1]+1)], ...randomMatrix.slice(rand[0]+1)]
            
        }
        setMatrix([...randomMatrix])
        setCounter(counterHelper)

    }
    function handleClickPlaying(c){
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
    function handleClickPlacing(c){
        //sirve para ir seteando los barcos en
        //su respectivo lugar uno a uno
            let obj = {...ships[placingCounter]}
            let shipHelper = [...ships]
            if(matrix[c[0]][c[1]].ship === false){
            if(obj.orientation === 'horizontal' && obj.coordinateds.length < obj.len){
                if(obj.coordinateds.length === 0){
                    //si la orientación es horizontal, y no se han 
                    //posicionado partes de un barco, entonces
                    //se puede posicionar la primera parte de un barco
                    if(!((c[0] === 0 && matrix[1][c[1]].ship === true) || (c[0] === 9 && matrix[8][c[1]].ship === true)) || obj.len === 1){
                        //este es el if más interno y en resumidas
                        //cuentas el código sirve para descartar
                        //las situaciones en que no se puede posicionar 
                        //un barco debido a que no hay suficiente espacio
                        //para posicionar el barco completo
                        setMatrix([...matrix.slice(0, c[0]), [...matrix[c[0]].slice(0, c[1]), {...matrix[c[0]][c[1]], ship: true}, ...matrix[c[0]].slice(c[1]+1)], ...matrix.slice(c[0]+1)])
                        //este setState sirve para cambiar un elemento de la matrix
                        //en este caso se posiciona una parte del barco
                        shipHelper[placingCounter].coordinateds = [...ships[placingCounter].coordinateds, [c[0], c[1]]];
                        updateShips([...shipHelper]);
                        //se agrega una coordenada al arreglo
                        //de coordenadas dentro de el objeto
                        //del barco(ships)
                    }
                }

                else if(obj.coordinateds.length === 1 && ((c[0] === obj.coordinateds[0][0] - 1)|| c[0] === obj.coordinateds[0][0] + 1) && c[1] === obj.coordinateds[0][1]){
                    //este if nos permite posicionar el segundo elemento 
                    //del barco, que solo se colorea si se clickea un espacio
                    //adyacente al primer elemento del barco. si el bargo
                    //posee una longitud de 1, no entra a este if

                    //las instrucciones siguientes son idénticas
                    //a las de el if de arriba
                    setMatrix([...matrix.slice(0, c[0]), [...matrix[c[0]].slice(0, c[1]), {...matrix[c[0]][c[1]], ship: true}, ...matrix[c[0]].slice(c[1]+1)], ...matrix.slice(c[0]+1)])
                    shipHelper[placingCounter].coordinateds = [...ships[placingCounter].coordinateds, [c[0], c[1]]];
                    updateShips([...shipHelper]);
                }
                else if(obj.coordinateds.length === 2 && ((c[0] === obj.coordinateds[0][0] - 1 || c[0] === obj.coordinateds[0][0] + 1)||(c[0] === obj.coordinateds[1][0] - 1 || c[0] === obj.coordinateds[1][0] + 1) && c[1] === obj.coordinateds[0][1])){
                    //este if nos permite posicionar el tercer elemento 
                    //del barco, solo puede ser adyacente a uno de los elementos
                    //del barco, y tiene que seguir la orientación horizontal del barco
                    //para esto en el último && lógico, se comparan las coordenadas
                    //verticales del segundo elemento y el tercer elemento 
                    setMatrix([...matrix.slice(0, c[0]), [...matrix[c[0]].slice(0, c[1]), {...matrix[c[0]][c[1]], ship: true}, ...matrix[c[0]].slice(c[1]+1)], ...matrix.slice(c[0]+1)]) 
                    shipHelper[placingCounter].coordinateds = [...ships[placingCounter].coordinateds, [c[0], c[1]]];
                    updateShips([...shipHelper]);
                }   
            }
            //este else hace lo mismo que el if anterior(el que está
            //en la misma jerarquía, solo que lo hace verticalmente 
            else if(obj.orientation === 'vertical' && obj.coordinateds.length < obj.len){
                if(obj.coordinateds.length === 0){
                    if(!((c[1] === 0 && matrix[c[0]][1].ship === true) || (c[1] === 9 && matrix[c[0]][8].ship === true) || ((c[1] === 0 || c[1] === 1)&& matrix[c[0]][2].ship === true) || ((c[1] === 9 || c[1] === 8)&& matrix[c[0]][7].ship === true))|| obj.len === 1){
                        setMatrix([...matrix.slice(0, c[0]), [...matrix[c[0]].slice(0, c[1]), {...matrix[c[0]][c[1]], ship: true}, ...matrix[c[0]].slice(c[1]+1)], ...matrix.slice(c[0]+1)])
                        shipHelper[placingCounter].coordinateds = [...ships[placingCounter].coordinateds, [c[0], c[1]]]
                        updateShips([...shipHelper]);
                    }
                }
                else if(obj.coordinateds.length === 1 && (c[1] === obj.coordinateds[0][1] - 1 || c[1] === obj.coordinateds[0][1] + 1)&& c[0] === obj.coordinateds[0][0]){
                    console.log("soy coordenadas", obj.coordinateds, c)
                    setMatrix([...matrix.slice(0, c[0]), [...matrix[c[0]].slice(0, c[1]), {...matrix[c[0]][c[1]], ship: true}, ...matrix[c[0]].slice(c[1]+1)], ...matrix.slice(c[0]+1)])
                    shipHelper[placingCounter].coordinateds = [...ships[placingCounter].coordinateds, [c[0], c[1]]]
                    updateShips([...shipHelper]);
                    console.log("cayendo en el segundo if")
                }
                else if(obj.coordinateds.length === 2 && ((c[1] === obj.coordinateds[0][1] - 1 || c[1] === obj.coordinateds[0][1] + 1)||(c[1] === obj.coordinateds[1][1] - 1 || c[1] === obj.coordinateds[1][1] + 1))&& c[0] === obj.coordinateds[0][0]){
                    setMatrix([...matrix.slice(0, c[0]), [...matrix[c[0]].slice(0, c[1]), {...matrix[c[0]][c[1]], ship: true}, ...matrix[c[0]].slice(c[1]+1)], ...matrix.slice(c[0]+1)]) 
                    shipHelper[placingCounter].coordinateds = [...ships[placingCounter].coordinateds, [c[0], c[1]]]
                    updateShips([...shipHelper]);
                }  
            }
        //setMatrix([...matrix.slice(0, c[0]), [...matrix[c[0]].slice(0, c[1]), {...matrix[c[0]][c[1]], ship: true}, ...matrix[c[0]].slice(c[1]+1)], ...matrix.slice(c[0]+1)])
        }
    }
    function restart(){
        //se retoman los valores iniciales
        //para volver a jugar
        setMatrix([...defaultMatrix]);
        setCounter(11);
        updatePlacingCounter(0);
        updateShips([...shipsArray]);
        setShowShips(true);
    }
    useEffect(()=>{
        if(placingCounter > 4){
            setPlacing(false);
            setPlaying(true);
        }
    },[placingCounter])
    useEffect(()=>{
        if(counter === 0 || counter < 0){
            setPlaying(false)
            restart();
        }
    },[counter])
    useEffect(()=>{
        //la variable placingCounter sirve para ir iterando 
        //los distintos barcos
        if(ships[placingCounter].coordinateds && ships[placingCounter].coordinateds.length === ships[placingCounter].len){
            if(placingCounter === 4){
                setPlacing(false);
                updatePlacingCounter(0);
            }
            updatePlacingCounter(placingCounter+1)
        }
    },[ships])
    console.log(matrix)
    return(<div id="game" className="mt-5">
        <div className="container">
            <div className="board">
                <div className="rowsTags">
                <img src={battleship} className="App-battleship" alt="battleship"/>
                {tags[0].map((element, index)=>{return(<div key={index}>
                        <Tags orientation="row" tag={element}/>
                    </div>
                )})}
                </div>
                {matrix.map((row, rowIndex)=>{return(<div key={rowIndex}>
                    <Tags orientation="column" tag={tags[1][rowIndex]}/>
                    {placing === true && row.map((element, elementIndex)=>{return (<div key={elementIndex} onClick={()=>handleClickPlacing([rowIndex, elementIndex])}>
                        <Space clicked={element.clicked} ship={element.ship} show={showShips}/>
                    </div>
                    )})}
                    {placing === false && row.map((element, elementIndex)=>{return (<div key={elementIndex} onClick={()=>handleClickPlaying([rowIndex, elementIndex])}>
                        <Space clicked={element.clicked} ship={element.ship} show={showShips}/>
                    </div>
                    )})}
                </div>)})}
            </div>
            {placing === true && <Placing len={shipsArray[placingCounter].len} orientation={shipsArray[placingCounter].orientation}/>}

        </div>
        {playing === true && placing === false && <h3 id="counter" className="mt-3">{counter} target remains!</h3>}
        {playing === false && placing === false && <h3 id="counter" className="mt-3">You won!</h3>}
        {placing === true && <h3 id="placingcounter" className="mt-3">You must place {4 - placingCounter} more ships!</h3>}
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
            {playing === false && placing === false && (<button 
                className="btn btn-secondary show" 
                type="button"
                onClick={()=>{setPlacing(true)}}
                >
                    Start Again!
                </button>)}
        </div>
    </div>)
}