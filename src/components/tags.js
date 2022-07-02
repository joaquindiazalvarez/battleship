import React from 'react';

export function Tags(props){
    //componente: etiquetas de las filas
    //y columnas, siempre van fijas
    return(<>
        {props.orientation === "row" && (<div className="rowTag">
            {props.tag}
        </div>)}
        {props.orientation === "column" && (<div className="columnTag">
            {props.tag}
        </div>)}
    </>)
}