import React, { useState, useEffect } from 'react';
import { Placing } from './placing'
import { Board } from './board'


export function Game (){
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
        //en el tablero propio
        shipsArray.push({len: i, orientation: 'horizontal', coordinateds: []});
        shipsArray.push({len: i, orientation: 'vertical', coordinateds: []});
        if(i === 1) shipsArray.pop()
    }
    const [showShips, setShowShips] = useState(false);
    const [counter, setCounter] = useState(11);
    const [botCounter, setBotCounter] = useState(11);
    const [matrix, setMatrix] = useState([...defaultMatrix]);
    const [botMatrix, setBotMatrix] = useState([...defaultMatrix]);
    const [playing, setPlaying] = useState(false);
    const [placing, setPlacing] = useState(true);
    const [placingCounter, updatePlacingCounter] = useState(0)
    const [botPlacingCounter, updateBotPlacingCounter] = useState(0)
    const [ships, updateShips] = useState(shipsArray);
    const [botShips, updateBotShips] = useState(shipsArray);
    
    useEffect(()=>{
        //primer renderizado...
        setMatrix([...defaultMatrix])
        setBotMatrix([...defaultMatrix])
        createAndRandomizeShips();
        console.log(matrix)
    },[])
    function createAndRandomizeShips(){
        //Cambia 11 veces(o menos) un espacio vacío a un espacio ocupado
        //por un barco aleatoriamente.
        //los barcos tienen solo un espacio de medida
        let randomMatrix = [...defaultMatrix]
        //r de random
        let counterHelper = 0;
        for(let i = 0; i < 11; i++){
            let rand = [Math.floor(Math.random()*10), Math.floor(Math.random()*10)];
            if(randomMatrix[rand[0]][rand[1]].ship === false) counterHelper = counterHelper + 1;
            let defaultShip = {clicked: false, ship: true}
            randomMatrix = [...randomMatrix.slice(0, rand[0]), [...randomMatrix[rand[0]].slice(0, rand[1]), defaultShip, ...randomMatrix[rand[0]].slice(rand[1]+1)], ...randomMatrix.slice(rand[0]+1)]
            
        }
        setBotMatrix([...randomMatrix])
        setBotCounter(counterHelper)
    }
    function handleClickPlaying(c){
        //setea como clickeado el espacio
        //cuyas coordenadas(array de dos numeros) se reciben como 
        //parámetro
        if(playing === true){
            if(botMatrix[c[0]][c[1]].clicked === false){
                setBotMatrix([...botMatrix.slice(0, c[0]), [...botMatrix[c[0]].slice(0, c[1]), {...botMatrix[c[0]][c[1]], clicked: true}, ...botMatrix[c[0]].slice(c[1]+1)], ...botMatrix.slice(c[0]+1)])
                //se actualiza matrix haciendo que las nuevas coordenadas 
                //cambien de color al ser clickeadas
                if(botMatrix[c[0]][c[1]].ship === true) setBotCounter(botCounter-1);
                botFire();
            }
        }
    }
    function botFire(){
        //setea como clickeado el espacio
        //cuyas coordenadas(array de dos numeros) se reciben como 
        //parámetro
        let c = [Math.floor(Math.random()*10), Math.floor(Math.random()*10)];
            while(matrix[c[0]][c[1]].clicked === true){
                c = [Math.floor(Math.random()*10), Math.floor(Math.random()*10)];
            }
                setMatrix([...matrix.slice(0, c[0]), [...matrix[c[0]].slice(0, c[1]), {...matrix[c[0]][c[1]], clicked: true}, ...matrix[c[0]].slice(c[1]+1)], ...matrix.slice(c[0]+1)])
                //se actualiza matrix haciendo que las nuevas coordenadas 
                //cambien de color al ser clickeadas
                if(matrix[c[0]][c[1]].ship === true) setCounter(counter-1);
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
    function botPlacing(){
        //IGNORAR ESTA FUNCION
        //Esta funcion iba a ser para colocar los barcos
        //de forma aleatoria y que mantuvieran su estructura
        //y forma de barco, pero no funcionó antes del limite de tiempo
        //**realmente lo intenté...**
        //si se cambian las dos llamadas a createAndRandomizeShips()
        //por botPlacing(), se podrán ver los avances que tuve.
        //
        //lo que hacía hasta el momento era colorear barcos aleatorios,
        //pero se coloreaba el tablero del jugador y no del bot
        let shipsCounter = 0
        let array = [...shipsArray]
        var matrixHelper = [...defaultMatrix]
        let c;
        while (shipsCounter < 5){
            while(array[shipsCounter].coordinateds.length < array[shipsCounter].len){
                c = [Math.floor(Math.random()*10), Math.floor(Math.random()*10)];
                if(array[shipsCounter].coordinateds.length === 0 && matrixHelper[c[0]][c[1]].ship === false && array[shipsCounter].len === 1){
                    matrixHelper[c[0]][c[1]].ship = true;
                    array[shipsCounter].coordinateds.push(c);
                    console.log("se lleno el primer elemento")
                }
                else if(array[shipsCounter].coordinateds.length === 0 && matrixHelper[c[0]][c[1]].ship === false && array[shipsCounter].len === 2 && array[shipsCounter].orientation === "horizontal"){
                    if(typeof matrixHelper[c[0] + 1]!== "undefined" && typeof matrixHelper[c[0] - 1]!== "undefined" && (matrixHelper[c[0] + 1][c[1]].ship === false || matrixHelper[c[0] - 1][c[1]].ship === false)){
                        if((c[0] !== 0 || matrixHelper[c[0] + 1][c[1]].ship === false)&& (c[0] !== 9 || matrixHelper[c[0] - 1][c[1]].ship === false )){
                            matrixHelper[c[0]][c[1]].ship = true;
                            array[shipsCounter].coordinateds.push(c);
                        }
                        else{
                            c = [Math.floor(Math.random()*10), Math.floor(Math.random()*10)];
                        }
                    }
                    else{
                        c = [Math.floor(Math.random()*10), Math.floor(Math.random()*10)];
                    }
                    console.log("se lleno el primer elemento")
                }
                else if(array[shipsCounter].coordinateds.length === 0 && matrixHelper[c[0]][c[1]].ship === false && array[shipsCounter].len === 2 && array[shipsCounter].orientation === "vertical"){
                    if(typeof matrixHelper[c[0]][c[1]+1]!== "undefined"&& typeof matrixHelper[c[0]][c[1]-1]!== "undefined" && (matrixHelper[c[0]][c[1]+1].ship === false || matrixHelper[c[0]][c[1]-1].ship === false)){
                        if((c[1] !== 0 || matrixHelper[c[0]][c[1] + 1].ship === false)&& (c[1] !== 9 || matrixHelper[c[0]][c[1] - 1].ship === false )){
                            matrixHelper[c[0]][c[1]].ship = true;
                            array[shipsCounter].coordinateds.push(c);
                        }
                        else{
                            c = [Math.floor(Math.random()*10), Math.floor(Math.random()*10)];
                        }
                    }
                    else{
                        c = [Math.floor(Math.random()*10), Math.floor(Math.random()*10)];
                    }
                    console.log("se lleno el primer elemento")
            
                }
                else if(array[shipsCounter].coordinateds.length === 0 && matrixHelper[c[0]][c[1]].ship === false && array[shipsCounter].len === 3 && array[shipsCounter].orientation === "horizontal"){
                    if(typeof matrixHelper[c[0]+1]!== "undefined"&& typeof matrixHelper[c[0]+2]!== "undefined" && (matrixHelper[c[0]+1][c[1]].ship === false && matrixHelper[c[0]+2][c[1]].ship === false) && c[0] < 8){
                        matrixHelper[c[0]][c[1]].ship = true;
                        array[shipsCounter].coordinateds.push(c);
                    }
                    else if(typeof matrixHelper[c[0] - 1]!== "undefined" && typeof matrixHelper[c[0]-2]!== "undefined" && (matrixHelper[c[0]-1][c[1]].ship === false && matrixHelper[c[0]-2][c[1]].ship === false) && c[0] > 1){
                        matrixHelper[c[0]][c[1]].ship = true;
                        array[shipsCounter].coordinateds.push(c);
                    }
                    else if(typeof matrixHelper[c[0]-1]!== "undefined" && typeof matrixHelper[c[0]+1]!== "undefined" && (matrixHelper[c[0]-1][c[1]].ship === false && matrixHelper[c[0]+1][c[1]].ship === false) && (c[0] == 1 && c[0] == 8)){
                        matrixHelper[c[0]][c[1]].ship = true;
                        array[shipsCounter].coordinateds.push(c);
                    }
                    else{
                        c = [Math.floor(Math.random()*10), Math.floor(Math.random()*10)];
                    }
                    console.log("se lleno el primer elemento")
                
                }
                else if(array[shipsCounter].coordinateds.length === 0 && matrixHelper[c[0]][c[1]].ship === false && array[shipsCounter].len === 3 && array[shipsCounter].orientation === "vertical"){
                    if(typeof matrixHelper[c[0]][c[1]+1]!== "undefined"&& typeof matrixHelper[c[0]][c[1]+2]!== "undefined" && (matrixHelper[c[0]][c[1]+1].ship === false && matrixHelper[c[0]][c[1]+2].ship === false) && c[0] < 8){
                        matrixHelper[c[0]][c[1]].ship = true;
                        array[shipsCounter].coordinateds.push(c);
                    }
                    else if(typeof matrixHelper[c[0]][c[1]-1]!== "undefined" && typeof matrixHelper[c[0]][c[1]-2]!== "undefined" && (matrixHelper[c[0]][c[1]-1].ship === false && matrixHelper[c[0]][c[1]-2].ship === false) && c[0] > 1){
                        matrixHelper[c[0]][c[1]].ship = true;
                        array[shipsCounter].coordinateds.push(c);
                    }
                    else if(typeof matrixHelper[c[0]][c[1]-1]!== "undefined" && typeof matrixHelper[c[0]][c[1]+1]!== "undefined" && (matrixHelper[c[0]][c[1]-1].ship === false && matrixHelper[c[0]][c[1]+1].ship === false) && (c[0] == 1 && c[0] == 8)){
                        matrixHelper[c[0]][c[1]].ship = true;
                        array[shipsCounter].coordinateds.push(c);
                    }
                    else{
                        c = [Math.floor(Math.random()*10), Math.floor(Math.random()*10)];
                    }
                    console.log("se lleno el primer elemento")
                
                }
                if(array[shipsCounter].coordinateds.length === 1 && array[shipsCounter].orientation === "horizontal"){
                    let next = Math.floor(Math.random()*10%2)
                    //genera un número entre 0 y 1
                    if(typeof matrixHelper[c[0] - 1]!== "undefined" && next === 0 && c[0] !== 0 && matrixHelper[c[0] - 1][c[1]].ship === false){
                        matrixHelper[c[0]-1][c[1]].ship = true;
                        array[shipsCounter].coordinateds.push(c);
                    }
                    else if(typeof matrixHelper[c[0] + 1]!== "undefined"&& next === 1 && c[0] !== 9 && matrixHelper[c[0] + 1][c[1]].ship ===false){
                        matrixHelper[c[0]+1][c[1]].ship = true;
                        array[shipsCounter].coordinateds.push(c);
                    }
                    c = array[shipsCounter].coordinateds[1]
                }
                else if(array[shipsCounter].coordinateds.length === 1 && array[shipsCounter].orientation === "vertical"){
                    let next = Math.floor(Math.random()*10%2)
                    //genera un número entre 0 y 1
                    if(typeof matrixHelper[c[0]][c[1]-1]!== "undefined"&& next === 0 && c[1] !== 0 && matrixHelper[c[0]][c[1]-1].ship === false){
                        matrixHelper[c[0]][c[1]-1].ship = true;
                        array[shipsCounter].coordinateds.push(c);
                    }
                    else if(typeof matrixHelper[c[0]][c[1]+1]!== "undefined" && next === 1 && c[1] !== 9 && matrixHelper[c[0]][c[1]+1].ship ===false){
                        matrixHelper[c[0]][c[1]+1].ship = true;
                        array[shipsCounter].coordinateds.push(c);
                    }
                    c = array[shipsCounter].coordinateds[1]
                }
                if(array[shipsCounter].coordinateds.length === 2 && array[shipsCounter].orientation === "horizontal"){
                    let next = Math.floor(Math.random()*10%2)
                    //genera un número entre 0 y 1
                    if(typeof matrixHelper[c[0] - 1]!== "undefined" && next === 0 && c[0] !== 0 && matrixHelper[c[0] - 1][c[1]].ship === false){
                            matrixHelper[c[0]-1][c[1]].ship = true;
                            array[shipsCounter].coordinateds.push(c);
                    }
                    else if(typeof matrixHelper[array[shipsCounter].coordinateds[0][0]-1][c[1]].ship!== "undefined" && next === 0 && array[shipsCounter].coordinateds[0][0] !== 0 && matrixHelper[array[shipsCounter].coordinateds[0][0]-1][c[1]].ship === false){
                        matrixHelper[array[shipsCounter].coordinateds[0][0] -1][c[1]].ship = true;
                        array[shipsCounter].coordinateds[2] = c
                    }
                    else if(typeof matrixHelper[c[0] + 1]!== "undefined" && next === 1 && c[0] !== 9 && matrixHelper[c[0] + 1][c[1]].ship ===false){
                        matrixHelper[c[0]+1][c[1]].ship = true;
                        array[shipsCounter].coordinateds.push(c);
                    }
                    else if(typeof matrixHelper[array[shipsCounter].coordinateds[0][0]+1]!== "undefined" && next === 1 && array[shipsCounter].coordinateds[0][0] !== 9 && matrixHelper[array[shipsCounter].coordinateds[0][0]+1][c[1]].ship === false){
                        matrixHelper[array[shipsCounter].coordinateds[0][0] +1][c[1]].ship = true;
                        array[shipsCounter].coordinateds.push(c);
                    }
                    c = array[shipsCounter].coordinateds[2]
                }
                else if(array[shipsCounter].coordinateds.length === 2 && array[shipsCounter].orientation === "vertical"){
                    let next = Math.floor(Math.random()*10%2)
                    //genera un número entre 0 y 1
                    if(typeof matrixHelper[c[0]][c[1]-1]!== "undefined" && next === 0 && c[1] !== 0 && matrixHelper[c[0]][c[1]-1].ship === false){
                            matrixHelper[c[0]][c[1]-1].ship = true;
                            array[shipsCounter].coordinateds.push(c);
                    }
                    else if(typeof matrixHelper[c[0]][array[shipsCounter].coordinateds[0][0]-1]!== "undefined" && next === 0 && array[shipsCounter].coordinateds[0][1] !== 0 && matrixHelper[c[0]][array[shipsCounter].coordinateds[0][0]-1].ship === false){
                        matrixHelper[c[0]][array[shipsCounter].coordinateds[0][0]-1].ship = true;
                        array[shipsCounter].coordinateds.push(c);
                    }
                    else if(typeof matrixHelper[c[0]][c[1]+1]!== "undefined" && next === 1 && c[1] !== 9 && matrixHelper[c[0]][c[1]+1].ship ===false){
                        matrixHelper[c[0]][c[1]+1].ship = true;
                        array[shipsCounter].coordinateds.push(c);
                    }
                    else if(typeof matrixHelper[c[0]][array[shipsCounter].coordinateds[0][0]+1]!== "undefined" && next === 1 && array[shipsCounter].coordinateds[0][1] !== 9 && matrixHelper[c[0]][array[shipsCounter].coordinateds[0][0]+1].ship === false){
                        matrixHelper[c[0]][array[shipsCounter].coordinateds[0][0] + 1].ship = true;
                        array[shipsCounter].coordinateds.push(c);
                    }
                    c = array[shipsCounter].coordinateds[2]
                }
            }
            shipsCounter++
        }
        setBotCounter(11)
        setBotMatrix([...matrixHelper]);
        updateBotShips([...array])
    }
    function restart(){
        //se retoman los valores iniciales
        //para volver a jugar
        setMatrix([...defaultMatrix]);
        setBotMatrix([...defaultMatrix]);
        setBotCounter(4);
        setCounter(11);
        updatePlacingCounter(0);
        updateBotPlacingCounter(0);
        updateShips([...shipsArray]);
        updateBotShips([...ships])
        setShowShips(true);
        setPlacing(true);
        createAndRandomizeShips();
    }
    useEffect(()=>{
        //se entra al if cuando se termina de colocar los barcos
        if(placingCounter > 4){
            setPlacing(false);
            setPlaying(true);
        }
    },[placingCounter])
    useEffect(()=>{
        //cuando uno de los contadores llega a 0 se acaba el juego
        if(counter === 0 || counter < 0 || botCounter === 0 || botCounter < 0){
            setPlaying(false)
            updateShips([...shipsArray])
        }
    },[counter, botCounter])
    useEffect(()=>{
        //la variable placingCounter sirve para ir iterando 
        //los distintos barcos
        if(ships[placingCounter] && ships[placingCounter].coordinateds.length === ships[placingCounter].len){
            if(placingCounter === 4){
                setPlacing(false);
                updatePlacingCounter(0);
            }
            updatePlacingCounter(placingCounter+1)
        }
    },[ships])
    useEffect(()=>{
        //la variable placingCounter sirve para ir iterando 
        //los distintos barcos
        if(botShips[botPlacingCounter].coordinateds && botShips[botPlacingCounter].coordinateds.length === botShips[botPlacingCounter].len){
            if(botPlacingCounter === 4){
                updateBotPlacingCounter(0);
            }
            updatePlacingCounter(botPlacingCounter+1)
        }
    },[botShips])
    return(<div id="game" className="mt-5">
        <div className="container">
        <Board canfire={false} matrix={matrix} placing={placing} show={true} handleClickPlacing={handleClickPlacing} handleClickPlaying={handleClickPlaying}/> 
        {placing === true && <Placing len={shipsArray[placingCounter].len} orientation={shipsArray[placingCounter].orientation}/>}
        {placing === false && <Board canfire={true} matrix={botMatrix} placing={placing} show={showShips} handleClickPlacing={handleClickPlacing} handleClickPlaying={handleClickPlaying}/>}
        </div>
        {playing === true && placing === false && <h3 id="counter" className="mt-3">{botCounter} of machine's targets remains!</h3>}
        {playing === true && placing === false && <h3 id="counter" className="mt-3">{counter} of your targets remains!</h3>}
        {playing === false && placing === false && botCounter === 0 && <h3 id="counter" className="mt-3">You won!</h3>}
        {playing === false && placing === false && counter === 0 && <h3 id="counter" className="mt-3">Machine won {":("}</h3>}
        {placing === true && <h3 id="placingcounter" className="mt-3">You must place {4 - placingCounter} more ships!</h3>}
        <div className="mt-4">
            {showShips === false && playing === true &&(<button 
                className="btn btn-secondary show" 
                type="button"
                onClick={()=>{setShowShips(true)}}
                >
                    Show Machine's Battleships
                </button>)}
            {showShips === true && playing === true && (<button 
                className="btn btn-secondary show" 
                type="button"
                onClick={()=>{setShowShips(false)}}
                >
                    Hide Machine's Battleships
                </button>)}
        </div>
        <div className="mt-4">
            {playing === false && placing === false && (<button 
                className="btn btn-secondary show" 
                type="button"
                onClick={()=>{restart()}}
                >
                    Start Again!
                </button>)}
        </div>
    </div>)
}