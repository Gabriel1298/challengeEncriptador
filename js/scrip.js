
let btn_encriptar = document.getElementById('btn_encriptar');// btn para encriptar
let btn_desencriptar = document.getElementById('btn_desencriptar') //btn para desencriptar
let btn_copiar =document.getElementById('btn_copiar') //btn para copiar
let img= document.getElementById('img');

let textArea = document.getElementById('entrada-texto'); //objeto del textaArea

let mensajes = document.getElementsByClassName('mensajes'); // div class que tendran los mensajes cuando no haya ingresado ningún texto
let respuesta = document.getElementById('respuesta-condicion'); // html P que almacenara la resuesta

let respuestaMayuscula = document.getElementById('respuesta-mayuscula');





function comprobar(texto){
    /*Comprueba que la entrada tenga un valor real o undefined. luego agrega las clases correspondientes
    para hidear el texto por defecto y que aparesca la respuesta.
    */
    let valor = textArea.value;
    if(valor == ""){
        valor = undefined;
    }

    if(valor == undefined){
        for(let i=0;i<mensajes.length;i++){
            mensajes[i].classList.remove("borrar");
        }
        respuesta.classList.add('borrar');
        btn_copiar.classList.add('borrar');
        img.classList.remove("borrar");

        return 0; //retorna 0 en caso de no haberse ingresado texto

    }else if(valor != undefined){
        for(let i=0;i<mensajes.length;i++){
            mensajes[i].classList.add('borrar');
        }
        respuesta.classList.remove('borrar');
        btn_copiar.classList.remove('borrar');
        img.classList.add("borrar");
        return 1; //retorna 1 en caso de haberse ingresado texto
    }   
}






// `La letra "e" es convertida para "enter"`
// `La letra "i" es convertida para "imes"`
// `La letra "a" es convertida para "ai"`
// `La letra "o" es convertida para "ober"`
// `La letra "u" es convertida para "ufat"`


function encriptar(){
    let texto = textArea.value;// document.getElementById('entrada-texto').value;  //texto = texto que se ingreso en el textarea
    let temporal="";
    if(comprobar(texto)==1){
        for(let i=0; i<texto.length;i++){
            temporal=temporal+texto[i];
            if(texto[i]=="e"){
                temporal=temporal+"nter";
            }
            if(texto[i]=="i"){
                temporal=temporal+"mes";
            }
            if(texto[i]=="a"){
                temporal=temporal+"i";
            }
            if(texto[i]=="o"){
                temporal=temporal+"ber";
            }
            if(texto[i]=="u"){
                temporal=temporal+"fat";
            }  
        } 
    }
    respuesta.innerText= temporal;
}

function desencriptar(){
    let respuesta = document.getElementById('respuesta-condicion');
    let texto = textArea.value;  //texto = texto que se ingreso en el textarea

    let temporal = texto;

    while(temporal.includes("enter")){
        temporal = temporal.replace("enter","e");  
    }
    while(temporal.includes("imes")){
        temporal = temporal.replace("imes","i");  
    }
    while(temporal.includes("ai")){
        temporal = temporal.replace("ai","a");  
    }
    while(temporal.includes("ober")){
        temporal = temporal.replace("ober","o");  
    }
    while(temporal.includes("ufat")){
        temporal = temporal.replace("ufat","u");  
    }
    
    return respuesta.innerText= temporal;
}






textArea.addEventListener("keyup", (event)=>{
    if(event.key=="Backspace"){
        let texto =textArea.value;
        texto.slice(-1);
        if(textArea.value == ""){
            comprobar();
        }
    }
})

textArea.addEventListener("keyup", (event)=>{
    let respuesta = document.getElementById('respuesta-condicion');
   // if(/[A-Z]/.test(event.key)){
    if(/[áàéèíìóòúùñ]/.test(textArea.value)|| /[A-Z]/.test(textArea.value)){
       
        let texto =textArea.value;
        console.log("No se admiten mayusculas o tildes.");
        respuestaMayuscula.classList.remove("borrar");
        btn_copiar.classList.add('borrar2');
        respuesta.classList.add('borrar2');
    }else{
        respuestaMayuscula.classList.add("borrar");
        btn_copiar.classList.remove('borrar2');
        respuesta.classList.remove('borrar2');
    }
    
})


btn_encriptar.addEventListener("click",encriptar)
btn_desencriptar.addEventListener("click", desencriptar)




function mostrar(){
    let texto = textArea.value;
    respuesta.textContent = texto;
}


textArea.addEventListener("keyup", (event)=>{
    comprobar(textArea.value)
    mostrar();
})

function copiar(){
    let texto = document.getElementById("respuesta-condicion").textContent;
    navigator.clipboard.writeText(texto);  
}

btn_copiar.addEventListener("click", copiar);



