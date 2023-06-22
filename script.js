// relogio
const divDa = document.querySelector("#data")
const spanHo = document.querySelector(".pis")
const timer = document.querySelector("#timer")
//buttons
const btnAtivar = document.getElementById("ativar")
const btnParar = document.getElementById("parar")
//p e inputs
const pAlarmeHo= document.getElementById("alarmeHora")
const inputTimer = document.getElementById("inTi")

const audio = new Audio("som.mp3")
audio.loop = 1

let ts_atual = null
let ts_alarme = null
let alarme_ativado = false
let alarme_tocando = false

btnAtivar.addEventListener("click",()=>{
    ts_atual = Date.now()
    ts_alarme = ts_atual + (inputTimer.value * 1000)
    alarme_ativado = true
    const dt_alarme = new Date(ts_alarme)
    pAlarmeHo.innerHTML = "Hora do Alarme: " + dt_alarme.getHours()+":"+dt_alarme.getMinutes() + ":" + dt_alarme.getSeconds()
})

btnParar.addEventListener("click",()=>{
    alarme_ativado = false
    alarme_tocando = false
    pAlarmeHo.innerHTML = "Hora do Alarme:"
    inputTimer.value = 0
    timer.classList.remove("alarme")
    audio.pause()
    audio.currentTime = 0;
})

const relogio = () => {    
    const data = new Date()   
    const ano = data.getFullYear()
    let mes = data.getMonth() + 1
    let diaMes = data.getDate()
    const hora = data.getHours()
    let minutos = data.getMinutes()
    let segundos = data.getSeconds()    
    if(mes < 10){mes = "0" + mes}
    if(diaMes < 10){diaMes = "0" + diaMes}
    if(minutos < 10){minutos = "0" + minutos}
    if(segundos < 10){segundos = "0" + segundos}    
    const dataResu =  mes + "/" + diaMes+ "/" + ano            
    const hora_formatada = hora + ":" + minutos + ":" + segundos
    spanHo.innerHTML = hora_formatada
    divDa.innerHTML = dataResu
    if(alarme_ativado && !alarme_tocando) {
        if(data.getTime() >= ts_alarme) {
            alarme_tocando = true
            audio.play()
            timer.classList.add("alarme")
        }
    }
}

const intervalo = setInterval(relogio,1000)
