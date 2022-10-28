const API_key = '5c0a40017cf660a6eac4b3bf1a0ff911';

const fetchData = posicion => {
    const { latitude, longitude } = posicion.coords;
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_key}&units=metric`)
        .then(response => response.json() )
        .then(data => obtenerDatosClima(data));
}

const obtenerDatosClima = data => {
    const mainDict = {
        Thunderstorm: 'Tormenta',
        Drizzle: 'Llovizna',
        Rain: 'Lluvia',
        Snow: 'Nieve',
        Mist: 'Bruma',
        Smoke: 'Humo',
        Haze: 'Neblina',
        Dust: 'Polvo',
        Fog: 'Niebla',
        Sand: 'Arena',
        Ash: 'Ceniza',
        Squall: 'Chubasco',
        Tornado: 'Tornado',
        Clear: 'Despejado',
        Clouds: 'Nubes'
      }
    const DatosClima = {
        localizacion: data.name,
        descripcion: mainDict[data.weather[0].main],
        humedad: data.main.humidity,
        presion: data.main.pressure,
        temperatura: Math.floor(data.main.temp),
        dia: obtenerFecha(),
    }

    Object.keys(DatosClima).forEach( key => {
        setTextContent(key, DatosClima[key]);
    });

    limpiar();
}

const limpiar = () => {
    let container = document.getElementById('container');
    let loader = document.getElementById('loader');

    loader.style.display = 'none'; 
    container.style.display = 'flex'; 
}

const obtenerFecha = () => {
    let dia = new Date();
    return `${dia.getDate()}-${ ('0' + (dia.getMonth() + 1)).slice(-2)}-${dia.getFullYear()}`;
}

const setTextContent = (element, text) => {
    document.getElementById(element).textContent = text;
}

const onLoad = () => {
    navigator.geolocation.getCurrentPosition(fetchData)
}
