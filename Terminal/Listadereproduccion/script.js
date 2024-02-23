if (!localStorage.getItem('islogged')) {
  window.location.href = "../Listadereproduccion/Login.html"
}


/* Cancion y componentes*/

class Cancion {
  constructor({ id, nombre, duración, artista, año, genero, portada, urlCancion }) {
    this.id = id;
    this.nombre = nombre;
    this.duración = duración;
    this.artista = artista;
    this.año = año;
    this.genero = genero;
    this.portada = portada;
    this.urlCancion = urlCancion;
  };

  /*getters para todos los atributos */
  getSongName() {
    return this.nombre;
  }

  getSongDuracion() {
    return this.duración;
  }

  getSongAño() {
    return this.año;
  }

  getSongGenero() {
    return this.genero;
  }

  getSongPortada() {
    return this.portada
  }

  getSongurlCancio() {
    return this.urlCancion
  }
}


class playlist {
  listaCanciones;
  currentIndex; 

  constructor(nombre) {
    this.nombre = nombre;
    this.listaCanciones = [];
    this.currentIndex = 0;  
  }


  /* Agregar una cancion a la playlist*/
  addSongtoPlaylist(song) {
    this.listaCanciones.push(song);
    this.dibujarCanciones();
  }


  dibujarCanciones() {
    let canciones = document.getElementById(this.nombre)
    let alterna2 = "";
    let alterna3 = "";
    switch (this.nombre) {
      case 'myplaylist':
        alterna2 = 'fa fa-heart';
        alterna3 = 'fa fa-minus-square-o';
        break;

      case 'Favoritas':
        alterna2 = 'fa fa-heart-o';
        alterna3 = 'fa fa-plus';
        break;
    }

    canciones.innerHTML = '';
    this.listaCanciones.forEach(song => {
      canciones.innerHTML +=
        `<li id="play_${song.id}" class="cancion">${song.nombre} 
    <i class="PlaySong fa fa-play" data-idcancion="${song.id}"></i> 
    <i class="favoritos fa ${alterna2}"  data-idcancion="${song.id}"></i> 
      <i class="addplaylist fa ${alterna3}" data-idcancion="${song.id}"></i>
      </li>`;

    });

    // creacion del listener para playsong click
    this.onPlay();

  }


  onPlay() {
    let playSongs = document.getElementsByClassName("PlaySong");
    for (let i = 0; i < playSongs.length; i++) {
      playSongs[i].addEventListener("click", () => {
        let id = playSongs[i].getAttribute('data-idcancion');
        let cancion = this.listaCanciones.find(song => song.id = id);
        this.currentIndex = i; 
        let event = new CustomEvent('PlaySong', { detail: { song: cancion, nombre: this.nombre }, });
        document.dispatchEvent(event);

      });
    }
  }
  /* Remover una cancion de la playlist*/
  removeSongFromplaylist(song) {
    this.listaCanciones = this.listaCanciones.filter(s => s !== song);
    this.dibujarCanciones();
  }

 
  nextCancion(id) {
    let index = this.listaCanciones.findIndex(song => song.id == id);
    return this.listaCanciones[index + 1];
  }  




}



class reproductor {
  catalagoCanciones;
  currentCancion;
  audio;
  cancionesFiltradas;
  currentplaylist = 'busqueda';
  favoritos;
  myplaylist;
  isPaused;
  lasActive;


  constructor() {
    this.catalagoCanciones = [
      new Cancion({ id: 1, nombre: "cancion 1", duracion: "duracion 1", artista: "artista 1", año: "año 1", genero: "genero 1", portada: "./Portadas/1.jpg", urlSong: './Canciones/1.mp3' }),
      new Cancion({ id: 2, nombre: "cancion 2", duracion: "duracion 2", artista: "artista 2", año: "año 2", genero: "genero 2", portada: "./Portadas/2.jpg", urlSong: "./Canciones/2.mp3" }),
      new Cancion({ id: 3, nombre: "cancion 3", duracion: "duracion 3", artista: "artista 3", año: "año 3", genero: "genero 3", portada: "./Portadas/3.jpg", urlSong: "./Canciones/3.mp3" }),
      new Cancion({ id: 4, nombre: "cancion 4", duracion: "duracion 4", artista: "artista 4", año: "año 4", genero: "genero 4", portada: "./Portadas/4.jpg", urlSong: "..Canciones/4.mp3" }),
      new Cancion({ id: 5, nombre: "cancion 5", duracion: "duracion 5", artista: "artista 5", año: "año 5", genero: "genero 5", portada: "./Portadas/5.jpg", urlSong: "./Canciones/5.mp3" }),
      new Cancion({ id: 6, nombre: "cancion 6", duracion: "duracion 6", artista: "artista 6", año: "año 6", genero: "genero 6", portada: "./Portadas/6.jpg", urlSong: "./Canciones/6.mp3" }),
      new Cancion({ id: 7, nombre: "cancion 7", duracion: "duracion 7", artista: "artista 7", año: "año 7", genero: "genero 7", portada: "./Portadas/7.jpg", urlSong: "./Canciones/7.mp3" }),
      new Cancion({ id: 8, nombre: "cancion 8", duracion: "duracion 8", artista: "artista 8", año: "año 8", genero: "genero 8", portada: "./Portadas/8.jpg", urlSong: "./Canciones/8.mp3" }),
      new Cancion({ id: 9, nombre: "cancion 9", duracion: "duracion 9", artista: "artista 9", año: "año 9", genero: "genero 9", portada: "./Portadas/9.jpg", urlSong: "./Canciones/9.mp3" }),
      new Cancion({ id: 10, nombre: "cancion 10", duracion: "duracion 10", artista: "artista 10", año: "año 10", genero: "genero 10", portada: "./Portadas/10.jpg", urlSong: "./Canciones/10.mp3" }),
      new Cancion({ id: 11, nombre: "cancion 11", duracion: "duracion 11", artista: "artista 11", año: "año 11", genero: "genero 11", portada: "./Portadas/11.jpg", urlSong: "./Canciones/11.mp3" }),
      new Cancion({ id: 12, nombre: "cancion 12", duracion: "duracion 12", artista: "artista 12", año: "año 12", genero: "genero 12", portada: "./Portadas/12.jpg", urlSong: './Canciones/12.mp3' }),
      new Cancion({ id: 13, nombre: "cancion 13", duracion: "duracion 13", artista: "artista 13", año: "año 13", genero: "genero 13", portada: "./Portadas/13.jpg", urlSong: "./Canciones/13.mp3" }),
      new Cancion({ id: 14, nombre: "cancion 14", duracion: "duracion 14", artista: "artista 14", año: "año 14", genero: "genero 14", portada: "./Portadas/14.jpg", urlSong: "./Canciones/14.mp3" }),
      new Cancion({ id: 15, nombre: "cancion 15", duracion: "duracion 15", artista: "artista 15", año: "año 15", genero: "genero 15", portada: "./Portadas/15.jpg", urlSong: "./Canciones/15.mp3" }),
      new Cancion({ id: 16, nombre: "cancion 16", duracion: "duracion 16", artista: "artista 16", año: "año 16", genero: "genero 16", portada: "./Portadas/16.jpg", urlSong: "./Canciones/16.mp3" }),
      new Cancion({ id: 17, nombre: "cancion 17", duracion: "duracion 17", artista: "artista 17", año: "año 17", genero: "genero 17", portada: "./Portadas/17.jpg", urlSong: "./Canciones/17.mp3" }),
      new Cancion({ id: 18, nombre: "cancion 18", duracion: "duracion 18", artista: "artista 18", año: "año 18", genero: "genero 18", portada: "./Portadas/18.jpg", urlSong: "./Canciones/18.mp3" }),
      new Cancion({ id: 19, nombre: "cancion 19", duracion: "duracion 19", artista: "artista 19", año: "año 19", genero: "genero 19", portada: "./Portadas/19.jpg", urlSong: "./Canciones/19.mp3" }),
      new Cancion({ id: 20, nombre: "cancion 20", duracion: "duracion 20", artista: "artista 20", año: "año 20", genero: "genero 20", portada: "./Portadas/20.jpg", urlSong: "./Canciones/20.mp3" }),
      new Cancion({ id: 21, nombre: "cancion 21", duracion: "duracion 21", artista: "artista 21", año: "año 21", genero: "genero 21", portada: "./Portadas/21.jpg", urlSong: "./Canciones/21.mp3" }),
      new Cancion({ id: 22, nombre: "cancion 22", duracion: "duracion 22", artista: "artista 22", año: "año 22", genero: "genero 22", portada: "./Portadas/22.jpg", urlSong: "./Canciones/22.mp3" }),
      new Cancion({ id: 23, nombre: "cancion 23", duracion: "duracion 23", artista: "artista 23", año: "año 23", genero: "genero 23", portada: "./Portadas/23.jpg", urlSong: './Canciones/23.mp3' }),
      new Cancion({ id: 24, nombre: "cancion 24", duracion: "duracion 24", artista: "artista 24", año: "año 24", genero: "genero 24", portada: "./Portadas/24.jpg", urlSong: "./Canciones/24.mp3" }),
      new Cancion({ id: 25, nombre: "cancion 25", duracion: "duracion 25", artista: "artista 25", año: "año 25", genero: "genero 25", portada: "./Portadas/25.jpg", urlSong: "./Canciones/25.mp3" }),
      new Cancion({ id: 26, nombre: "cancion 26", duracion: "duracion 26", artista: "artista 26", año: "año 26", genero: "genero 26", portada: "./Portadas/26.jpg", urlSong: "./Canciones/26.mp3" }),
      new Cancion({ id: 27, nombre: "cancion 27", duracion: "duracion 27", artista: "artista 27", año: "año 27", genero: "genero 27", portada: "./Portadas/27.jpg", urlSong: "./Canciones/27.mp3" }),
      new Cancion({ id: 28, nombre: "cancion 28", duracion: "duracion 28", artista: "artista 28", año: "año 28", genero: "genero 28", portada: "./Portadas/28.jpg", urlSong: "./Canciones/28.mp3" }),
      new Cancion({ id: 29, nombre: "cancion 29", duracion: "duracion 29", artista: "artista 29", año: "año 29", genero: "genero 29", portada: "./Portadas/29.jpg", urlSong: "./Canciones/29.mp3" }),
      new Cancion({ id: 30, nombre: "cancion 30", duracion: "duracion 30", artista: "artista 30", año: "año 30", genero: "genero 30", portada: "./Portadas/30.jpg", urlSong: "./Canciones/30.mp3" })
    ];

    this.mostrarCanciones();

    this.currentCancion = this.catalagoCanciones[0];
    this.audio = new Audio();
    this.currentplaylist = 'busqueda';
    this.myplaylist = new playlist('myplaylist', []);
    this.Favoritas = new playlist('Favoritas', []);


    document.addEventListener('PlaySong', (e) => {
      this.currentCancion = e.detail.song;
      this.lasActive = e.detail.nombre;
      this.play();
    });


    this.isPaused = false;
    this.inicializarControles();

  }


  inicializarControles() {
    //Escuchar cuando alguien le da click
    let buscar = document.getElementById("search");
    buscar.addEventListener("click", () => {
      this.buscarCancion(document.getElementById("buscar").value)

    });


    //BOTONES DE LA CANCION EN PORTADA

    let play = document.getElementById("play");
    play.addEventListener("click", () => {
      this.play();
    });


    let stop = document.getElementById("stop");
    stop.addEventListener("click", () => {
      this.stop();

    });

    let pause = document.getElementById("pause");
    pause.addEventListener("click", () => {
      this.isPaused = true;
      this.pause();
    });

    //Audio para cuando la cancion termine
    let nextboton = document.getElementById("next");
    nextboton.addEventListener("click", () => {
      this.next();
      
    });

    this.audio.addEventListener("click", 
      this.nextCancion,
      console.log("si funciona next")
    );


  }

  mostrarCanciones = function () {
    let canciones = document.getElementById("listaCanciones");
    this.catalagoCanciones.forEach(song => {
      canciones.innerHTML += `<li class="cancion" data-idcancion="${song.id}">${song.nombre} 
      <i class="PlaySong fa fa-play" data-idcancion="${song.id}"></i> 
      <i class="favoritos fa fa-heart" data-idcancion="${song.id}" ></i> 
      <i class="addplaylist fa fa-plus" data-idcancion="${song.id}" ></i></li>`;
    });


      //listener para las canciones
    let playSongs = document.getElementsByClassName("PlaySong");
    for (let i = 0; i < playSongs.length; i++) {
      playSongs[i].addEventListener("click", () => {
        this.currentplaylist = 'busqueda';
        let id = playSongs[i].parentElement.getAttribute('data-idcancion');
        this.currentIndex = i;
        this.currentCancion = this.catalagoCanciones.find(song => song.id = id);
        this.play();
        });

    }


    let favoritos = document.getElementsByClassName("favoritos");
    for (let i = 0; i < favoritos.length; i++) {
      favoritos[i].addEventListener("click", () => {
        let id = favoritos[i].getAttribute('data-idcancion');
        this.addplaylist(id, 'Favoritas');
      });
    }

    let addplaylist = document.getElementsByClassName("addplaylist");
    for (let i = 0; i < addplaylist.length; i++) {
      addplaylist[i].addEventListener("click", () => {
        let id = addplaylist[i].getAttribute('data-idcancion');
        this.addplaylist(id, 'myplaylist');
      });
    }

//Eliminar cancion de las playlist favoritos y myplaylist

    let favoritoseliminado = document.getElementsByClassName("fa-heart-o");
    for (let i = 0; i < favoritoseliminado.length; i++) {
      favoritoseliminado[i].addEventListener("click", () => {
        let id = favoritoseliminado[i].getAttribute('data-idcancion');
        this.addplaylist1(id, 'Favoritas')
      });
    }

    let addplaylisteliminado = document.getElementsByClassName("fa-minus-square-o");
    for (let i = 0; i < addplaylisteliminado.length; i++) {
      addplaylisteliminado[i].addEventListener("click", () => {
        let id = addplaylisteliminado[i].getAttribute('data-idcancion');
        this.addplaylist1(id, 'myplaylist');
      });
    }
  }


  addplaylist = function (id, playlist) {
    let cancion = this.catalagoCanciones.find(song => song.id == id);
    switch (playlist) {
      case 'Favoritas': this.Favoritas.addSongtoPlaylist(cancion);
        break;
      case 'myplaylist': this.myplaylist.addSongtoPlaylist(cancion);
        break;
    }
  }

  addplaylist1 = function (id, playlist) {
    let cancion = this.catalagoCanciones.find(song => song.id == id);
    switch (playlist) {
      case 'Favoritas': this.Favoritas.removeSongFromplaylist(cancion);
        break;
      case 'myplaylist': this.myplaylist.removeSongFromplaylist(cancion);
        break;
    }
  }


  mostrarBusqueda(filtrodeCanciones) {
    let canciones = document.getElementById("listaCanciones");
    filtrodeCanciones.forEach(song => {
      canciones.innerHTML += `<li id="${song.id}" class="cancion">${song.nombre} 
      <i class="fa fa-play"></i> 
      <i class="fa fa-heart"></i> 
      <i class="fa fa-plus"></i>
      </li>`;
    });

  }


  buscarCancion = function (inputBuscar) {
    inputBuscar = inputBuscar.trim(inputBuscar);
    inputBuscar = inputBuscar.toLowerCase();
    let canciones = document.getElementById("listaCanciones");
    canciones.innerHTML = '';
    let lisNombre = this.catalagoCanciones.filter(song => song.nombre.match(inputBuscar));
    let lisArtista = this.catalagoCanciones.filter(song => song.artista.match(inputBuscar));
    let lisGenero = this.catalagoCanciones.filter(song => song.genero.match(inputBuscar));
    let filtrodeCanciones = [...lisNombre, ...lisArtista, ...lisGenero];
    filtrodeCanciones = [...new Set(filtrodeCanciones)]
    this.mostrarBusqueda(filtrodeCanciones);

  }

  // Cambiar la portada de acuerdo a la cancion
  cambiarportada = function () {
    const portada = document.getElementById("portadaimagen");
    portada.src = './Portadas/' + this.currentCancion.id + ".jpg";
  }

  //Cambiar informacion de la cancion
  cambiarinfoSong = function () {
    const infoSong = document.getElementById("texto-cancion");
    infoSong.innerHTML = `<p>Nombre: ${"cancion " + this.currentCancion.id}</p>
    <p>Duración: ${"duración " + this.currentCancion.id}</p>
    <p>Artista: ${"artista " + this.currentCancion.id}</p>
    <p>Año: ${"año " + this.currentCancion.id}</p>
    <p>Género: ${"genero " + this.currentCancion.id}</p>`
  }
  

  /* metodo para play la cancion si #boton play hacen click*/

  play = function () {
    if (this.currentCancion !== undefined && this.isPaused == false) {
      this.audio.src = "./Canciones/" + this.currentCancion.id + ".mp3";
      this.audio.play();
      this.cambiarportada();
      this.cambiarinfoSong();
    } else {
      this.audio.play();
      this.isPaused = true
    }
  }

  /* metodo para pausar la cancion si #boton pausar hacen click*/

  pause = function () {
    this.audio.pause();
  }

  /* metodo para parar la cancion si #boton parar hacen click*/
  stop = function () {
    this.isPaused = false;
    this.audio.pause();
    this.audio.currentTime = 0;
  }

  
  next = function () {
    let id = this.currentCancion;
    switch (this.lasActive) {
      case 'listaCanciones':
        this.currentCancion = this.catalagoCanciones[id];
        this.play();
        break;
      case 'myplaylist':
        this.currentCancion = this.myplaylist.nextCancion(id);
        this.play();
        break;
      case 'Favoritas':
        this.currentCancion = this.favoritos.nextCancion(id);
        this.play();
        break;
    }
   
    this.currentCancion = this.currentplaylist
    
    this.play();


  }

  
}


let Reproductor = new reproductor();



   




