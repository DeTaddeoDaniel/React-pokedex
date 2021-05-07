// importa react
import React from 'react'

// variabili per inizializzazione componente
const PokemonThumb = ({id, image, name, type, _callback }) => {
    
    // string = type pokemon + classe thumb-container 
    const style = type + " thumb-container";
    
    // ritorna il componente
    return (

        // div il colore del tipo di pokemon
        <div className={style}>

            {/* id del pokemon */}
            <div className="number"><small>#0{id}</small></div>

            {/* img pokemon */}
            <img src={image} alt={name} />

            
            <div className="detail-wrapper">

                {/* nome pokemon */}
                <h3>{name}</h3>

                {/* tipologia pokemon */}
                <small>Type: {type}</small>

            </div>
        </div>
    )
}

export default PokemonThumb