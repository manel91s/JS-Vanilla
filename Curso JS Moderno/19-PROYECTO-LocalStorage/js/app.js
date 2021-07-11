//Variables
const formulario = document.querySelector("#formulario");
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];

eventListeners();

// Event Listener
function eventListeners() {
    // Cuando el usuario agrega un nuevo tweet
    formulario.addEventListener('submit', agregarTweet);

    // Cuando el documento esta listo
    document.addEventListener('DOMContentLoaded', () => {
        tweets = (JSON.parse(localStorage.getItem('tweets'))) || [];
        crearHTML();
    })

    
}


//funciones

function agregarTweet(e) {
    e.preventDefault();
    
    //Text area donde el usuario escribe
    const tweet = document.querySelector('#tweet').value;
    
    if(tweet === '') {
        mostrarError('Un mensaje no puede ir vacio');
        return;
    }

    const tweetObj = {
        id: Date.now(),
        tweet
    }

    //añadir al arreglo de tweets
    tweets = [...tweets, tweetObj];

    //Una vez agregado vamos a crear el HTML
    crearHTML();

    //Reiniciar el formulario
    formulario.reset();

}

function mostrarError(error) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    //Insertarlo en el contenido
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    setTimeout(() => {
        mensajeError.remove();
    }, 3000);

}

function crearHTML() {

    limpiarHTML();
    if(tweets.length > 0 ){
        tweets.forEach(tweet => {
            //Agregar un boton de eliminar
            const btnEliminar = document.createElement('li');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerText = 'X';

            const li = document.createElement('li');

            //Añadir la función de eliminar
            btnEliminar.onclick = () => {
                borrarTweet(tweet.id);
            }

            //Añadir el texto
            li.textContent = tweet.tweet;

            //Asginar el boton
            li.appendChild(btnEliminar);
            //Crear el HTML
            
            
            listaTweets.appendChild(li);
        })
       
    }

    sincronizarStorage();

   
    
}

//Agrega los tweets actuales a LocalStorage
function sincronizarStorage() {
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

// Elimina un tweet
function borrarTweet(id) {
    tweets = tweets.filter(tweet => tweet.id !== id);
    crearHTML();
}

// Limpiar el HTML
function limpiarHTML() {
    while(listaTweets.firstChild) {
        listaTweets.removeChild(listaTweets.firstChild);
    }
}

