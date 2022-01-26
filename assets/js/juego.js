
(() =>{
    
    'use strict'
 

    let deck = [];
    const tipos = ['C','D','H','S'],
          especiales = ['A','J','Q','K'];

    let puntosJugador = 0,
        puntosComputadora = 0;

    //let puntosJugadores = [0,0];


    // Referencias HTML
    const btnPedir = document.querySelector('#btnPedir'),
          btnDetener = document.querySelector('#btnDetener'),
          btnNuevo = document.querySelector('#btnNuevo');

    const puntosHTML = document.querySelectorAll('small'),
          divCartasJugador = document.querySelector('#jugador-cartas'),
          divCartasComputadora = document.querySelector('#computador-cartas');

    const inicializarJuego = ()=>{ deck = createDeck(); }
    //Esta función crea la baraja para le jugador
    const createDeck = () =>{
        deck =[];
        for( let i = 2; i<= 10; i++){
        for(let tipo of tipos){
            deck.push(i + tipo);
        }
        }

        for (let tipo of tipos){
            for (let esp of especiales){
                deck.push(esp + tipo)
            }
        }
        // Deck ordenado
        //console.log(deck);

    
        return _.shuffle( deck );
    }

    

    //Esta función me permite tomar una carta
    const pedirCarta = () => {
        if(deck.length === 0){
            throw 'No hay cartas en la baraja';
        }
        
        
        //console.log(deck);
        //console.log(carta);
        return deck.pop();
    }
    //console.log(pedirCarta());


    const valorCarta = ( carta ) => {
        const valor = carta.substring(0,carta.length-1);
        return ( isNaN ( valor ) ) ? 
            ( valor === 'A' ) ? 11 : 10
            : valor * 1;

    }

    const acumularPuntos = ()=>{


    }

    const turnoComputadora = ( puntosMinimos ) =>{
    do{
            const carta = pedirCarta();

            puntosComputadora += valorCarta(carta);
            puntosHTML[1].innerHTML = puntosComputadora;
        
            const imgCarta = document.createElement('img');
            imgCarta.src = 'assets/cartas/'+carta+'.png';
            imgCarta.classList.add('carta');
            divCartasComputadora.append( imgCarta );

            if( puntosMinimos > 21){
                break;
            }

        }while( ( puntosComputadora < puntosMinimos ) && puntosMinimos == 21 );
        setTimeout (() =>{
            if( ( puntosComputadora === puntosMinimos )){
                alert ('Nadie gana!');
            }else if ( puntosMinimos > 21){
                alert('Computadora Ganó!');
            }else if( puntosComputadora > 21){
                alert('Jugador Ganó!');
            } else if( ( puntosMinimos > puntosComputadora ) && puntosMinimos <= 21 ) {
                alert('Jugador Ganó!');
            } else {
                alert('Computadora Ganó!');        
            }
        
        

        }, 10);

    };


    // Eventos
    btnPedir.addEventListener('click', ()=>{
        const carta = pedirCarta();

        puntosJugador += valorCarta(carta);
        puntosHTML[0].innerHTML = puntosJugador;

        const imgCarta = document.createElement('img');
        imgCarta.src = 'assets/cartas/'+carta+'.png';
        imgCarta.classList.add('carta');

        divCartasJugador.append( imgCarta );
        if(puntosJugador > 21){
            console.warn('Ya perdió!');
            btnPedir.disabled = true;
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora( puntosJugador );
        }else if ( puntosJugador === 21){
            console.warn('21, genial');
            btnPedir.disabled = true;
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora( puntosJugador );

        }

    });

    btnDetener.addEventListener('click', () => {
        btnPedir.disabled = true;
        btnDetener.disabled = true;


        turnoComputadora( puntosJugador );


    });


    btnNuevo.addEventListener('click', () =>{
        console.clear();
        inicializarJuego();
        //deck = [];
        //deck = createDeck();
        puntosJugador = 0;
        puntosComputadora = 0;
        puntosHTML[0].innerHTML = 0;
        puntosHTML[1].innerHTML = 0;

        divCartasComputadora.innerHTML = '';
        divCartasJugador.innerHTML = '';
        btnPedir.disabled = false;
        btnDetener.disabled = false;
        //console.log(deck);
    });




})();

