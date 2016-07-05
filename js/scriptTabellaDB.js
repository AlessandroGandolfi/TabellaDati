/* applica le librerie grafiche di jQuery UI ai bottoni */
$(function() {
    $( "input[type=submit]" )
		.button()
});

/* applica le librerie grafiche di jQuery UI per la generazione di un dialog di conferma, usato per confermare l'eliminazione di dati */
$(function() {
    $("#dialogElim").dialog({
		autoOpen: false,
		resizable: false,
		height:212,
		width:400,
		modal: true,
		buttons: {
			/* bottoni presenti nella dialog, "Elimina dati" richiama la funzione per eliminare i dati definitivamente */
			"Elimina dati": function() {
				eliminaDati();
				$( this ).dialog( "close" );
			},
			"Annulla": function() {
				$( this ).dialog( "close" );
			}
		}
	});
	$("#dialogElim").css("font-size", "15px");
});

/* applica le librerie grafiche di jQuery UI per la generazione di un dialog, usato per confermare il salvataggio di dati */
$(function() {
	$( "#dialogSalva" ).dialog({
		autoOpen: false,
		modal: true,
		buttons: {
			Ok: function() {
				$( this ).dialog( "close" );
			}
		}
	});
	$("#dialogSalva").css("font-size", "15px");
});

/* applica le librerie grafiche di jQuery UI per la generazione di un dialog, usato nel 
caso si provi a salvare un nuovo dato con lo stesso campo "variable" di un dato già esistente */
$(function() {
	$( "#dialogDatoEsist" ).dialog({
		autoOpen: false,
		modal: true,
		buttons: {
			Ok: function() {
				$( this ).dialog( "close" );
			}
		}
	});
	$("#dialogDatoEsist").css("font-size", "15px");
});

/* applica le librerie grafiche di jQuery UI per la generazione di un dialog, usato nel caso 
si provi a salvare un nuovo dato senza scrivere nel campo "variable" */
$(function() {
	$( "#dialogInsVar" ).dialog({
		autoOpen: false,
		modal: true,
		buttons: {
			Ok: function() {
				$( this ).dialog( "close" );
			}
		}
	});
	$("#dialogInsVar").css("font-size", "15px");
});

/* funzioni che vengono richiamate all'avvio della pagina */
window.onload = function() {
	setFuncBtn();
	
	/* salvo i dati per alimentare la tabella in una variabile per poi usarla in altre funzioni */
	var dati = arrJSON();
	
	alimTabella(dati);
}

/* definisce l'attributo onclick dei bottoni per salvare e eliminare dati */
function setFuncBtn() {
	var btnSalva = document.getElementById("btnSalva");
	var btnElimina = document.getElementById("btnElimina");
	btnSalva.setAttribute("onclick", "salvaMod()");
	btnElimina.setAttribute("onclick", "apriDialogElim()");
}

/* apre il dialogo di conferma per l'eliminazione dei dati */
function apriDialogElim(){
	$("#dialogElim").dialog("open");
}

/* alimenta la tabella con i dati già esistenti e aggiunge in seguito le checkbox */
function alimTabella(dati){
	var table = document.getElementById("tabDati");
	var tr = document.createElement("tr");
	tr.setAttribute("class", "color1");
	
	for(key in dati[0]){
		var th = document.createElement("th");
		th.innerHTML = key;
		tr.appendChild(th);
    }
	table.appendChild(tr);
	
	for(i = 0; i < dati.length;i++)
    {	
		creaRigaTab(dati[i]);
    }
	
	tdCheckBox();
	rigaVuota();
}

/* aggiunge una checkbox alla fine di ogni riga della tabella */
function tdCheckBox() {
	var table = document.getElementById("tabDati");
	for(var i = 1; i < table.childNodes.length; i++){
		if(i == 1){
			var th = document.createElement("th");
			th.innerHTML = "Elimina";
			table.childNodes[i].appendChild(th);
		}
		else{
			var td = document.createElement("td");
			var checkbox = document.createElement("input");
			checkbox.setAttribute("type", "checkbox");
			td.appendChild(checkbox);
			table.childNodes[i].appendChild(td);
		}
	}
}

/* crea una riga della tabella che contiene dati già esistenti e ne definisce il colore tramite due classi */
function creaRigaTab(dato) {
	var table = document.getElementById("tabDati");
	var tr = document.createElement("tr");
	if(table.lastChild.className == "color1")
		tr.setAttribute("class", "color2");
	else
		tr.setAttribute("class", "color1");
	
	for(key in dato)
	{	
		var td = document.createElement("td");
		/* collego una classe alle caselle dei campi "comment" e "NOTES" per poter dare la possibilità all'utente 
		di modificare i campi in questione tramite delle textarea che compaiono facendo doppio click sulla casella */
		if(key == "comment" || key == "NOTES")
			td.setAttribute("class", "tdChange");
		td.innerHTML = dato[key];
		tr.appendChild(td);
	}
	table.appendChild(tr);
}

/* aggiunge l'ultima riga della tabella con le textarea per l'aggiunta di nuovi dati */
function rigaVuota() {
	var table = document.getElementById("tabDati");
	var intest = table.childNodes[1];
	var tr = document.createElement("tr");
	
	if(table.lastChild.className == "color1")
		tr.setAttribute("class", "color2");
	else
		tr.setAttribute("class", "color1");
		
	for(var i = 0; i < intest.childNodes.length; i++)
	{	
		var td = document.createElement("td");
		//metto delle textarea solo nelle caselle dei campi "variable", "comment" e "NOTES"
		if(intest.childNodes[i].innerHTML == "variable" || intest.childNodes[i].innerHTML == "comment" || intest.childNodes[i].innerHTML == "NOTES"){
			var textarea = document.createElement("textarea");
			td.appendChild(textarea);
			td.setAttribute("class", "tdChange");
		}
		tr.appendChild(td);
	}
	table.appendChild(tr);
	
	abilitaTD();
}

/* al tentativo di salvataggio di un dato nuovo salva in un array tutti i precedenti campi "variable" già inseriti */
function controlloVarEsistente() {
	var table = document.getElementById("tabDati");
	var arrayVarEsis = [];
	for(var i = 1; i < table.childNodes.length-1; i++){
		arrayVarEsis[i] = table.childNodes[i].firstChild.innerHTML;
	}
	return arrayVarEsis;
}

/* salva le modifiche apportate alla tabella dei dati */
function salvaMod(){
	var i;
	var table = document.getElementById("tabDati");

	for(i = 2; i < table.childNodes.length-1; i++){
		//per ogni riga tolgo le textarea, se presenti, e salvo il testo modificato all'interno delle td
		var rigaCol = table.childNodes[i];
		
		var celComm = rigaCol.childNodes[1];
		var celNotes = rigaCol.childNodes[3];

		if(celComm.hasChildNodes() == true){
			if(celComm.firstChild.tagName == "TEXTAREA"){
				celComm.innerHTML = celComm.firstChild.value;
			}
		}
		
		if(celNotes.hasChildNodes() == true){
			if(celNotes.firstChild.tagName == "TEXTAREA"){
				celNotes.innerHTML = celNotes.firstChild.value;
			}
		}
	}
	
	//se è presente del testo nelle textarea dell'ultima riga, avvio la funzione per il salvataggio di un nuovo dato
	//altrimenti confermo eventuali modifiche ai dati già esistenti
	var lastVar = table.lastChild.firstChild;
	var lastComm = table.lastChild.childNodes[1];
	var lastNotes = table.lastChild.childNodes[3];
	var innerVarTA = lastVar.firstChild;
	var innerCommTA = lastComm.firstChild;
	var innerNotesTA = lastNotes.firstChild;
	if(innerCommTA.value != "" || innerNotesTA.value != "" || innerVarTA.value != "")
		salvaUltimaRiga();
	else
		$( "#dialogSalva" ).dialog("open");
}

/* gestisce il salvataggio di nuovi dati nell'ultima riga della tabella */
function salvaUltimaRiga(){
	var table = document.getElementById("tabDati");
	var lastVar = table.lastChild.firstChild;
	var lastComm = table.lastChild.childNodes[1];
	var lastNotes = table.lastChild.childNodes[3];
	var innerVarTA = lastVar.firstChild;
	var innerCommTA = lastComm.firstChild;
	var innerNotesTA = lastNotes.firstChild;

	if(innerVarTA.value != ""){ //controllo che nel campo "variable" ci sia scritto qualcosa
		if(controlloVarEsistente().indexOf(innerVarTA.value) == -1){ //controllo che il testo scritto nel campo "variable" non sia già presente in dati precedenti
			//inserisco il testo modificato all'interno delle td delle textarea, togliendo quest'ultime
			lastVar.innerHTML = innerVarTA.value;
			lastComm.innerHTML = innerCommTA.value;
			lastNotes.innerHTML = innerNotesTA.value;
			lastVar.setAttribute("class","noChange"); //toglie la possibilità di poter cambiare il campo "variable" al dato appena salvato
			disabilitaTD();
			nuovaCB();
			rigaVuota();
			$("#dialogSalva").dialog("open"); //apro il dialog per la conferma del salvataggio
		}
		else{ //nel caso un dato sia già esistente, avviso l'utente tramite un dialog
			$( "#dialogDatoEsist" ).dialog("open");
		}
	}
	else if(innerCommTA.value != "" || innerNotesTA.value != ""){ //nel caso il campo "variable" del nuovo dato sia vuoto, avviso l'utente tramite un dialog
		$( "#dialogInsVar" ).dialog("open");
	}
}

/* crea e mette una nuova checkbox nell'ultima td dell'ultima riga della tabella ogni volta che si salva un nuovo dato */
function nuovaCB(){
	var table = document.getElementById("tabDati");
	var checkbox = document.createElement("input");
	checkbox.setAttribute("type", "checkbox");
	table.lastChild.lastChild.appendChild(checkbox);
}

/* elimina le righe di dati che sono state selezionate tramite le checkbox, solo dopo aver dato la conferma tramite il dialog */
function eliminaDati(){
	var table = document.getElementById("tabDati");
	for(var i = 1; i < table.childNodes.length-1; i++){
		if(table.childNodes[i].lastChild.firstChild.checked == true){ //controllo per ogni riga che la checkbox sia stata spuntata o meno
			table.removeChild(table.childNodes[i]); //se è la checkbox stata spuntata, elimino la riga
			i--; //decremento la i del ciclo a causa dell'eliminazione di dati precedenti
		}
	}
	
	//cambio la classe di colori nelle righe in base a quella precedente, alternando una all'altra
	for(var i = 2; i < table.childNodes.length; i++){
		if(table.childNodes[i - 1].className == "color1")
			table.childNodes[i].setAttribute("class", "color2");
		else
			table.childNodes[i].setAttribute("class", "color1");
	}
}

/* disabilita la possibilità di modificare il campo "variable" nei dati già salvati */
function disabilitaTD() {
	$('.noChange').off('dblclick');
}

/* abilita la modifica dei campi "comment", "NOTES" e "variable" (quest'ultimo solo nella creazione di un nuovo dato) tramite un doppio click */
function abilitaTD() {
	$('.tdChange').on('dblclick', function() {
		$this = $(this);
		//al doppio click si crea una textarea all'interno della td con lo stesso testo della casella
		$input = $('<textarea>', {
			html: $this.text(),
			submit: function() {
				$this.html($input.val());
			}
		}).appendTo($this.empty());
	});
}

/* ritorna l'array parsificato contenente i dati per alimentare la tabella */
function arrJSON() {
	var json = '{"tesikcm":[{"variable":"glb.const.tabgen.auto_id","comment":"/* 20120328 - simone.scarzello@partners.gruppotesi.com - TICKET: 0041879 Questa configurazione serve per dare un codice automatico su una tabella gestita tramite tabgen. Deve essere inoltre inserito un nuovo sistema di numerazione standard (TGE120/TGE125 - procedura/azione GE/65) con valore uguale al nome della tabella. Questa gestione non visualizzerà la lingua di inserimento, ma verranno caricati tanti record quante sono le lingue di sistema (TGE030Lingua). In questo modo sulla pagina di gestione della tabella solo durante l\'inserimento verrà visualizzato <AUTO_ID> e non più la lingua, e al salvataggio del dato verrà assegnato un nuovo codice in automatico. NB: il sistema di numerazione deve essere configurato per assegnare un nuovo valore progressivo e non deve superare i 30 caratteri di lunghezza Esempio: glb.const.tabgen.auto_id[glb.const.tabgen.nome_tabella] = true */","origin":"framework","NOTES":"  -  Questa configurazione serve per dare un codice automatico su una tabella gestita tramite tabgen. Deve essere inoltre inserito un nuovo sistema di numerazione standard (TGE120/TGE125 - procedura/azione GE/65) con valore uguale al nome della tabella. Questa gestione non visualizzerà la lingua di inserimento, ma verranno caricati tanti record quante sono le lingue di sistema (TGE030Lingua). In questo modo sulla pagina di gestione della tabella solo durante l\'inserimento verrà visualizzato <AUTO_ID> e non più la lingua, e al salvataggio del dato verrà assegnato un nuovo codice in automatico. NB: il sistema di numerazione deve essere configurato per assegnare un nuovo valore progressivo e non deve superare i 30 caratteri di lunghezza Esempio: glb.const.tabgen.auto_id[glb.const.tabgen.nome_tabella] = true ","ticket":"41879","summary":"Tabgen: configurazione per la gestione del codice automatico","description":"Cliente: Benetton Descrizione: serve gestire in automatico un codice progressivo su una tabella della tabgen (TXT000TABGEN). Per poterlo fare è stata prevista una nuova configurazione (glb.const.tabgen.auto_id) nella quale ci saranno tutte le tabelle che vorranno avere questa gestione. Esempio:   glb.const.tabgen.auto_id[glb.const.tabgen.nome_tabella] = true;  Inoltre deve essere inserito un nuovo sistema di numerazione standard (TGE120/TGE125 - procedura/azione GE/65) con valore uguale al nome della tabella.  ATTENZIONE: Questa gestione non visualizzerà la lingua di inserimento, ma caricherà tanti record quante sono le lingue di sistema (TGE030Lingua). In questo modo sulla pagina di gestione della tabella solo durante l\'inserimento verrà visualizzato <AUTO_ID> e non più la lingua, e al salvataggio del dato  verrà assegnato un nuovo codice in automatico. NB: il sistema di numerazione deve essere configurato per assegnare un nuovo valore progressivo e non deve superare i 30 caratteri di lunghezza","additional_information":""},{"variable":"glb.const.tabgen.all_lang","comment":"/* 20120330 - simone.scarzello@partners.gruppotesi.com - TICKET: 0042129 Questa configurazione serve per inserire in automatico il record in tutte le lingue su una tabella gestita tramite tabgen. Questa gestione non visualizzerà la lingua di inserimento, ma verranno caricati tanti record quante sono le lingue di sistema (TGE030Lingua). Esempio: glb.const.tabgen.all_lang[glb.const.tabgen.nome_tabella] = true */","origin":"framework","NOTES":"  -  Questa configurazione serve per inserire in automatico il record in tutte le lingue su una tabella gestita tramite tabgen. Questa gestione non visualizzerà la lingua di inserimento, ma verranno caricati tanti record quante sono le lingue di sistema (TGE030Lingua). Esempio: glb.const.tabgen.all_lang[glb.const.tabgen.nome_tabella] = true ","ticket":"42129","summary":"Tabgen: configurazione per gestire tutte le lingue in automatico","description":"Cliente: Benetton Descrizione: serve gestire su una tabella della tabgen (TXT000TABGEN) tutte le lingue in automatico, e quindi non gestirla più a video. Per poterlo fare è stata prevista una nuova configurazione (glb.const.tabgen.all_lang) nella quale ci saranno tutte le tabelle che vorranno avere questa gestione. Esempio:   glb.const.tabgen.all_lang[glb.const.tabgen.nome_tabella] = true;  ATTENZIONE: Questa gestione non visualizzerà più la lingua sia in elenco che in modifica, ma gestirà tanti record quante sono le lingue di sistema (TGE030Lingua) per tutte le diverse operazioni di inserimento/modifica/cancellazione.","additional_information":""},{"variable":"glb.const.login.idprocedura","comment":"//20100429 - stefania.peretti@gruppotesi.com - TICKET:0018255","origin":"framework","NOTES":"","ticket":"18255","summary":"Login user-check su tentativi effettuati (rif ToDoList SOGEFI n.100)","description":"Occore bloccare un utente quando i tentativi di login falliti arrivano consecutivamente (nell\' ambito del giorno)  a 5 (numero da parametrizzare)   Per gli utenti che vengono bloccati occorre avvisare alcune persone via mail (con un ruolo che contiene processo e persone ??) che l\'utente é stato disabilitato    Dopo di che queste persone dovranno essere in grado di rimettere in gioco l\'utente, per cui nella gestione user prevedere la possibilità di sbloccarlo ","additional_information":"la gestione di questa funzione deve essere terminata entro fine marzo poiché  SOGEFI sta incrementanto il numero d utenti interni e prossimamente anche quelli esterni.   Verificare fattbilità e numero di giorni, eventualmente si puo\' addebitare una parte alla commessa SOGEFI.  "}]}';
	var arr = JSON.parse(json);
    return arr.tesikcm;
}