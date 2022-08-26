let myChart 

async function getCurrency(currency){
    try {
    const res = await fetch("https://mindicador.cl/api/" + currency);
    const data = await res.json();
    return data;
}
catch(e){
    par = document.querySelector("#resultado")
    par.innerHTML = "ERROR FAIL TO FETCH"
}
}


let btnBuscar = document.querySelector("#btn-buscar");

btnBuscar.addEventListener("click", async () => {
    const clpAmount = document.querySelector("#input").value;
    const currency = document.querySelector("#selector-moneda").value;
    let resultado = await getCurrency(currency); 
    let result = document.querySelector("#resultado");
    console.log(resultado);
    result.innerHTML = "El resultado es: $ " + clpAmount / resultado.serie[0]["valor"];
    renderGrafica()
});

function prepararConfiguracionParaLaGrafica(currency){
    const tipoDeGrafica = "line"
    const nombreDeLaDivisa = currency.serie.slice(0,9).reverse()
    const titulo = "Historial Divisa"
    const colorDeLinea = "red"
    let valores = Array()
    let fechas = Array()
    const valor = nombreDeLaDivisa.map((moneda) => {
        valores.push(moneda.valor)
        fechas.push(moneda.fecha)
    }) 
    const config = {
        type: tipoDeGrafica,
        data: {
            labels: fechas,
            datasets: [
                {
                    label: titulo,
                    backgroundColor: colorDeLinea,
                    data: valores
                }
            ]
        }
    }
    return config
}

async function renderGrafica(){
    let select = document.querySelector("#selector-moneda").value
    const currency = await getCurrency(select)
    const config = prepararConfiguracionParaLaGrafica(currency)
    const chartDOM = document.getElementById("myChart")
    if(myChart){
        myChart.destroy()
    }    
    myChart = new Chart(chartDOM, config)
}





