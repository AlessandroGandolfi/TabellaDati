/* tramite una funzione jQuery applico le librerie grafiche di jQuery UI ai bottoni */
$(function() {
    $( "input[type=button]" )
      .button()
});

window.onload = function() {
	/* richiamo una funzione per settare l'attributo "onclick" dei bottoni */
	setFuncBtn();
	
	/* istanzio una variabile che conterrà il vettore di dati parsificati */
	var dati = arrJSON();
	
	/* richiamo una funzione per alimentare la tabella con i dati */
	alimTabella(dati);
}

/* funzione che viene eseguita per attribuire delle funzioni
ai bottoni per poter cambiare pagina */
function setFuncBtn() {
	/* istanzio 2 variabili che userò come riferimenti ai tag HTML dei bottoni
	tramite i loro ID */
	var btnIndietro = document.getElementById("btnIndietro");
	var btnClassi = document.getElementById("btnClassi");
	
	/* setto l'attributo "onclick" dei due bottoni per poter richiamare funzioni diverse */
	btnIndietro.setAttribute("onclick", "index()");
	btnClassi.setAttribute("onclick", "tabClassi()");
}	

/* funzione che viene richiamata al click di un bottone tramite l'attributo "onclick",
apre la pagina per visualizzare i dati delle classi */
function tabClassi(){
	open("classi.html","_self");
}

/* funzione che viene richiamata al click di un bottone tramite l'attributo "onclick",
apre la pagina principale di selezione */
function index(){
	open("index.html","_self");
}

/* funzione che parsifica la stringa JSON e ritorna i valori parsificati */
function arrJSON() {
	var json = '{"vettoreDati":[{"Nome":"Marco","Cognome":"Ciarmoli","Età":"19","Classe":"4DINFO","MediaVoti":"8.60","CreditiAttuali":"17"},{"Nome":"Sara","Cognome":"Novi","Età":"16","Classe":"3BLSSA","MediaVoti":"6.50","CreditiAttuali":"13"},{"Nome":"Riccardo","Cognome":"Malatesta","Età":"19","Classe":"5AMECC","MediaVoti":"6.70","CreditiAttuali":"13"},{"Nome":"Andrea","Cognome":"Cannito","Età":"15","Classe":"1DELT","MediaVoti":"7.30","CreditiAttuali":"14"},{"Nome":"Sabrina","Cognome":"Boarino","Età":"14","Classe":"1FINF","MediaVoti":"7.50","CreditiAttuali":"15"},{"Nome":"Marco","Cognome":"Ciarmoli","Età":"19","Classe":"4DINFO","MediaVoti":"8.60","CreditiAttuali":"17"},{"Nome":"Sara","Cognome":"Novi","Età":"16","Classe":"3BLSSA","MediaVoti":"6.50","CreditiAttuali":"13"},{"Nome":"Riccardo","Cognome":"Malatesta","Età":"19","Classe":"5AMECC","MediaVoti":"6.70","CreditiAttuali":"13"},{"Nome":"Andrea","Cognome":"Cannito","Età":"15","Classe":"1DELT","MediaVoti":"7.30","CreditiAttuali":"14"},{"Nome":"Sabrina","Cognome":"Boarino","Età":"14","Classe":"1FINF","MediaVoti":"7.50","CreditiAttuali":"15"},{"Nome":"Marco","Cognome":"Ciarmoli","Età":"19","Classe":"4DINFO","MediaVoti":"8.60","CreditiAttuali":"17"},{"Nome":"Sara","Cognome":"Novi","Età":"16","Classe":"3BLSSA","MediaVoti":"6.50","CreditiAttuali":"13"},{"Nome":"Riccardo","Cognome":"Malatesta","Età":"19","Classe":"5AMECC","MediaVoti":"6.70","CreditiAttuali":"13"},{"Nome":"Andrea","Cognome":"Cannito","Età":"15","Classe":"1DELT","MediaVoti":"7.30","CreditiAttuali":"14"},{"Nome":"Sabrina","Cognome":"Boarino","Età":"14","Classe":"1FINF","MediaVoti":"7.50","CreditiAttuali":"15"}]}';
	var arr = JSON.parse(json);
    return arr.vettoreDati;
}

/* funzione che alimenta la tabella con i dati ottenuti dalla parsificazione del JSON */
function alimTabella(dati){
	/* istanzio una variabile che userò come riferimento al tag HTML della tabella
	tramite il suo ID */
	var table = document.getElementById("tabAlunni");
	
	/* istanzio la prima riga della tabella che conterrà le intestazioni delle colonne */
	var tr1 = document.createElement("tr");
	
	/* attribuisco una classe alla prima riga per poterne modificare l'aspetto nel file CSS */
	tr1.setAttribute("class", "color1");
	
	/* loop che cicla in base al numero di chiavi presenti nella 
	primo elemento del vettore di dati */
	for(key in dati[0]){
		/* istanzio una casella di intestazione per ogni ciclo di loop */
		var th = document.createElement("th");
		
		/* inserisco la chiave del primo elemento del vettore di dati
		presa in considerazione dal ciclo come intestazione della casella */ 
		th.innerHTML = key;
		
		/* inserisco la casella con l'intestazione inserita nella prima riga */
		tr1.appendChild(th);
    }
	/*inserisco la prima riga nella tabella */
	table.appendChild(tr1);
	
	/* loop che cicla in base alla lunghezza del vettore di dati, equivalente al numero di righe */
	for(i = 0; i < dati.length;i++)
    {	
		/* istanzio una riga per ogni loop per contenere le caselle della tabella */
		var tr2 = document.createElement("tr");
		
		/* in base al numero pari o dispari, viene assegnata alla riga una classe
		diversa per potere rendere le righe più evidenti tramite il file CSS */
		if((i % 2) == 0)
			tr2.setAttribute("class", "color2");
		else
			tr2.setAttribute("class", "color1");
		
		/* loop che cicla in base al numero di chiavi presenti 
		negli elementi del vettore di dati, equivalente al numero di colonne */
		for(key in dati[i])
		{	
			/* istanzio una casella per ogni ciclo di loop */
			var td = document.createElement("td");
			
			/* inserisco il dato tramite chiave nella casella */
			td.innerHTML = dati[i][key];
			
			/* inserisco la casella nella riga */
			tr2.appendChild(td);
		}
		/* inserisco la riga nella tabella */
		table.appendChild(tr2);
    }
}