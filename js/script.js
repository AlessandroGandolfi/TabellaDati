/* tramite una funzione jQuery applico le librerie grafiche di jQuery UI ai bottoni */
$(function() {
    $( "input[type=button]" )
      .button()
});

/* all'avvio della pagina, una funzione viene eseguita per attribuire delle funzioni
ai bottoni per poter cambiare pagina */
window.onload = function() {
	/* istanzio 2 variabili che userò come riferimenti ai tag HTML dei bottoni
	tramite i loro ID */
	var btnAlunni = document.getElementById("btnAlunni");
	var btnClassi = document.getElementById("btnClassi");
	
	/* setto l'attributo "onclick" dei due bottoni per poter richiamare funzioni diverse */
	btnAlunni.setAttribute("onclick", "tabAlunni()");
	btnClassi.setAttribute("onclick", "tabClassi()");

}

/* funzione che viene richiamata al click di un bottone tramite l'attributo "onclick",
apre la pagina per visualizzare i dati degli alunni */
function tabAlunni(){
	open("alunni.html","_self");
}


/* funzione che viene richiamata al click di un bottone tramite l'attributo "onclick",
apre la pagina per visualizzare i dati delle classi */
function tabClassi(){
	open("classi.html","_self");
}