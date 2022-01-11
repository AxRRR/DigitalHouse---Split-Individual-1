
const autos = [
    {
        marca: 'Ford',
        modelo: 'Fiesta',
        precio: 150000,
        km: '200 kilómetros',
        color: 'Azul',
        cuotas: 12,
        anio: 2019,
        patente: 'APL123',
        vendido: false
    },
    {
        marca: 'Toyota ',
        modelo: 'Fiesta',
        precio: 100000,
        km: '0 kilómetros',
        color: 'Blanco',
        cuotas: 14,
        anio: 2019,
        patente: 'JJK116',
        vendido: false
    }
];

// let autos = require('./autos');

let concesionaria = {
    autos,
    buscarAuto: function(findPatente){
        let response = null;
        this.autos.forEach(auto => {
            if(auto.patente == findPatente){
                return response = auto;
            }
        });
        return response;
    },
    venderAuto: function(patenteAuto){
        let response = this.buscarAuto(patenteAuto);

        if(response === null){
            return console.log('El auto no existe');
        }
        response.vendido = true;
    },
    autosParaLaVenta: function(){
        return this.autos.filter( auto => auto.vendido !== true);
    },
    autosNuevos: function(findAuto){
        let enVenta = this.autosParaLaVenta();

        return enVenta.filter( auto => auto.km <= 100);
    },
    listaDeVentas: function(){
        let ventasTotales = [];

        this.autos.forEach(auto => {
           if(auto.vendido === true){
               ventasTotales.push(auto.precio)
           }
        });

        return ventasTotales;
    },
    totalDeVentas: function(){
        let response = this.listaDeVentas();
        let ventasTotales = 0;

        if(response.length >= 1){
            ventasTotales = response.reduce((pValue, cValue) => pValue + cValue);
        }
        return ventasTotales;
    },
    puedeComprar: function(auto, personData){
        let { precio, cuotas } = auto;
        let { capacidadDePagoTotal, capacidadDePagoEnCuotas } = personData;
        let totalCuota = precio / cuotas;

        return capacidadDePagoTotal >= precio && capacidadDePagoEnCuotas >= totalCuota;
    },
    autosQuePuedeComprar: function(personData){
        let autosEnVenta = this.autosParaLaVenta();
        let autosDisponibles = [];

        autosEnVenta.forEach( auto => {
            if(this.puedeComprar(auto, personData)){
                autosDisponibles.push(auto);
            }
        });
        return autosDisponibles;
    }
    
}