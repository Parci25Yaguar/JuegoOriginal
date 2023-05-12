/**
 * 2C = Two of Clubs
 * 2D = Two of Diamonds
 * 2H = Two of Hearts
 * 2S = Two of Spades
 */

let deck         = [];
const tipos      = ['C','D','H','S'];
const especiales = ['A','J','Q','K'];

let puntosJugador = 0,
    puntosComputadora = 0;

// Referencias del HTML
const btnNuevo             = document.querySelector('#btnNuevo')
const btnPedir             = document.querySelector('#btnPedir');
const btnDetener           = document.querySelector('#btnDetener')
const divCartasComputadora = document.querySelector('#computadora-cartas');
const divCartasJugador     = document.querySelector('#jugador-cartas');
const puntosHTML           = document.querySelectorAll('small');




// Esta función crea un nuevo deck
const crearDeck = () => {

    for( let i = 2; i <= 10; i++ ) {
        for( let tipo of tipos ) {
            deck.push( i + tipo);
        }
    }

    for( let tipo of tipos ) {
        for( let esp of especiales ) {
            deck.push( esp + tipo);
        }
    }
    // console.log( deck );
    deck = _.shuffle( deck );
    console.log( deck );
    return deck;
}

crearDeck();


// Esta función me permite tomar una carta
const pedirCarta = () => {

    if ( deck.length === 0 ) {
        throw 'No hay cartas en el deck';
    }
    const carta = deck.pop();
    return carta;
}

// PedirCarta();
const valorCarta = ( carta ) => {

    const valor = carta.substring(0, carta.length - 1);
    return ( isNaN( valor ) ) ? 
            ( valor === 'A' ) ? 11 : 10
            : valor * 1;
}

//Turno de la Cmputadra

const turnoCumputador = (puntosMinimos) => {

    do{
        const carta       = pedirCarta()
        puntosComputadora = puntosComputadora + valorCarta(carta)
        puntosHTML[1].innerText = puntosComputadora

        const imgCarta = document.createElement('img');
        imgCarta.src   = `assets/cartas/${carta}.png`
        imgCarta.classList.add('carta');
        divCartasComputadora.append(imgCarta);
        if( puntosMinimos > 21){
            break;
        }
    }while( (puntosComputadora < puntosMinimos) && (puntosMinimos <= 21) );

    setTimeout(() => { //Funcion permite ejercutar en milimes de segundo osea ejecuta bien rapido

        if( puntosComputadora === puntosMinimos){
            swal.fire({
                title:'<b>Nadie Gana 😔</b>',
                confirmButtonText: 'Aceptar'
        })
        }else if( puntosMinimos > 21 ){
            swal.fire({
                title:'<b>Gana la Computadora 🥶</b>',
                confirmButtonText: 'Aceptar'
            })
        }else if( puntosComputadora > 21){
            swal.fire({
                title:'<b>Jugador Gana 🤩</b>',
                confirmButtonText: 'Aceptar'
            })
        }else{
            swal.fire({
                title:'<b>Computadora Gana 🥶</b>',
                confirmButtonText: 'Aceptar'
        })
        }

    }, 100);
}


//Eventos para que salgas las cartas
btnPedir.addEventListener('click', function(){
    
    const carta   = pedirCarta()
    puntosJugador = puntosJugador + valorCarta(carta)
    puntosHTML[0].innerText = puntosJugador

    const imgCarta = document.createElement('img');
    imgCarta.src   = `assets/cartas/${carta}.png`
    imgCarta.classList.add('carta');
    divCartasJugador.append(imgCarta)

    if( puntosJugador > 21){
        console.warn('Perdiste');
        btnPedir.disabled   = true;
        btnDetener.disabled = true;
        turnoCumputador(puntosJugador);

    }else if( puntosJugador == 21){
        console.warn('21 Ganaste');
        btnPedir.disabled   = true;
        btnDetener.disabled = true;
        turnoCumputador(puntosJugador)
    }
})

btnDetener.addEventListener('click', function(){
    btnPedir,disabled   = true;
    btnDetener.disabled = true;

    turnoCumputador(puntosJugador);
})

btnNuevo.addEventListener('click', function(){
    
    console.clear()
    deck = [];
    deck = crearDeck();
    puntosJugador     = 0;
    puntosComputadora = 0;
    puntosHTML[1].innerText     = 0;
    puntosHTML[0].innerText     = 0;
    divCartasComputadora.innerHTML = '';
    divCartasJugador.innerHTML     = '';
    btnPedir.disabled   = false;
    btnDetener.disabled = false;

})
