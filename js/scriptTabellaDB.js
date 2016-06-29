$(function() {
    $( "input[type=button]" )
      .button()
});

window.onload = function() {
	setFuncBtn();
	
	var dati = arrJSON();
	
	alimTabella(dati);
}

function setFuncBtn() {
	var btnAggiungi = document.getElementById("btnAggiungi");
	btnAggiungi.setAttribute("onclick", "aggCampo()");
}

function arrJSON() {
	var json = '{"tesikcm":[{"variable":"glb.const.tabgen.auto_id","comment":"/* '+'20120328 - simone.scarzello@partners.gruppotesi.com - TICKET: 0041879 '+'Questa configurazione serve per dare un codice automatico su una tabella '+'gestita tramite tabgen. Deve essere inoltre inserito un nuovo sistema di numerazione '+'standard (TGE120/TGE125 - procedura/azione GE/65) con valore uguale al nome della tabella. '+'Questa gestione non visualizzerà la lingua di inserimento, ma verranno caricati tanti '+'record quante sono le lingue di sistema (TGE030Lingua). '+'In questo modo sulla pagina di gestione della tabella solo durante l\'inserimento '+'verrà visualizzato <AUTO_ID> e non più la lingua, e al salvataggio del dato '+'verrà assegnato un nuovo codice in automatico. '+'NB: il sistema di numerazione deve essere configurato per assegnare un nuovo valore '+'progressivo e non deve superare i 30 caratteri di lunghezza '+'Esempio: '+'glb.const.tabgen.auto_id[glb.const.tabgen.nome_tabella] = true '+'*/","origin":"framework","NOTES":" '+' -  '+'Questa configurazione serve per dare un codice automatico su una tabella '+'gestita tramite tabgen. Deve essere inoltre inserito un nuovo sistema di numerazione '+'standard (TGE120/TGE125 - procedura/azione GE/65) con valore uguale al nome della tabella. '+'Questa gestione non visualizzerà la lingua di inserimento, ma verranno caricati tanti '+'record quante sono le lingue di sistema (TGE030Lingua). '+'In questo modo sulla pagina di gestione della tabella solo durante l\'inserimento '+'verrà visualizzato <AUTO_ID> e non più la lingua, e al salvataggio del dato '+'verrà assegnato un nuovo codice in automatico. '+'NB: il sistema di numerazione deve essere configurato per assegnare un nuovo valore '+'progressivo e non deve superare i 30 caratteri di lunghezza '+'Esempio: '+'glb.const.tabgen.auto_id[glb.const.tabgen.nome_tabella] = true '+'","ticket":"41879","summary":"Tabgen: configurazione per la gestione del codice automatico","description":"Cliente: Benetton '+'Descrizione: serve gestire in automatico un codice progressivo su una tabella della tabgen (TXT000TABGEN). Per poterlo fare è stata prevista una nuova configurazione (glb.const.tabgen.auto_id) nella quale ci saranno tutte le tabelle che vorranno avere questa gestione. '+'Esempio: '+'  glb.const.tabgen.auto_id[glb.const.tabgen.nome_tabella] = true; '+' '+'Inoltre deve essere inserito un nuovo sistema di numerazione '+'standard (TGE120/TGE125 - procedura/azione GE/65) con valore uguale al nome della tabella. '+' '+'ATTENZIONE: '+'Questa gestione non visualizzerà la lingua di inserimento, ma caricherà tanti record quante sono le lingue di sistema (TGE030Lingua). '+'In questo modo sulla pagina di gestione della tabella solo durante l\'inserimento '+'verrà visualizzato <AUTO_ID> e non più la lingua, e al salvataggio del dato  '+'verrà assegnato un nuovo codice in automatico. '+'NB: il sistema di numerazione deve essere configurato per assegnare un nuovo valore progressivo e non deve superare i 30 caratteri di lunghezza","additional_information":""},{"variable":"glb.const.tabgen.all_lang","comment":"/* '+'20120330 - simone.scarzello@partners.gruppotesi.com - TICKET: 0042129 '+'Questa configurazione serve per inserire in automatico il record in tutte le lingue su una tabella '+'gestita tramite tabgen. '+'Questa gestione non visualizzerà la lingua di inserimento, ma verranno caricati tanti '+'record quante sono le lingue di sistema (TGE030Lingua). '+'Esempio: '+'glb.const.tabgen.all_lang[glb.const.tabgen.nome_tabella] = true '+'*/","origin":"framework","NOTES":" '+' -  '+'Questa configurazione serve per inserire in automatico il record in tutte le lingue su una tabella '+'gestita tramite tabgen. '+'Questa gestione non visualizzerà la lingua di inserimento, ma verranno caricati tanti '+'record quante sono le lingue di sistema (TGE030Lingua). '+'Esempio: '+'glb.const.tabgen.all_lang[glb.const.tabgen.nome_tabella] = true '+'","ticket":"42129","summary":"Tabgen: configurazione per gestire tutte le lingue in automatico","description":"Cliente: Benetton '+'Descrizione: serve gestire su una tabella della tabgen (TXT000TABGEN) tutte le lingue in automatico, e quindi non gestirla più a video. Per poterlo fare è stata prevista una nuova configurazione (glb.const.tabgen.all_lang) nella quale ci saranno tutte le tabelle che vorranno avere questa gestione. '+'Esempio: '+'  glb.const.tabgen.all_lang[glb.const.tabgen.nome_tabella] = true; '+' '+'ATTENZIONE: '+'Questa gestione non visualizzerà più la lingua sia in elenco che in modifica, ma gestirà tanti record quante sono le lingue di sistema (TGE030Lingua) per tutte le diverse operazioni di inserimento/modifica/cancellazione.","additional_information":""},{"variable":"glb.const.login.idprocedura","comment":"//20100429 - stefania.peretti@gruppotesi.com - TICKET:0018255","origin":"framework","NOTES":"","ticket":"18255","summary":"Login user-check su tentativi effettuati (rif ToDoList SOGEFI n.100)","description":"Occore bloccare un utente quando i tentativi di login falliti arrivano consecutivamente (nell\' ambito del giorno)  a 5 (numero da parametrizzare)  '+' '+'Per gli utenti che vengono bloccati occorre avvisare alcune persone via mail (con un ruolo che contiene processo e persone ??) che l\'utente é stato disabilitato   '+' '+'Dopo di che queste persone dovranno essere in grado di rimettere in gioco l\'utente, per cui nella gestione user prevedere la possibilità di sbloccarlo ","additional_information":"la gestione di questa funzione deve essere terminata entro fine marzo poiché  '+'SOGEFI sta incrementanto il numero d utenti interni e prossimamente anche quelli esterni.  '+' '+'Verificare fattbilità e numero di giorni, eventualmente si puo\' addebitare una parte alla commessa SOGEFI.  "}]}';
	var arr = JSON.parse(json);
    return arr.tesikcm;
}

function alimTabella(dati){
	var table = document.getElementById("tabDati");
	var tr1 = document.createElement("tr");
	tr1.setAttribute("class", "color1");
	
	for(key in dati[0]){
		var th = document.createElement("th");
		th.innerHTML = key;
		tr1.appendChild(th);
    }
	table.appendChild(tr1);
	
	for(i = 0; i < dati.length;i++)
    {	
		creaRigaTab(dati[i], table);
    }
	
	modificaTD(table);
}

function creaRigaTab(dato, table) {
	var tr2 = document.createElement("tr");
	if((i % 2) == 0)
		tr2.setAttribute("class", "color2");
	else
		tr2.setAttribute("class", "color1");
	
	for(key in dato)
	{	
		var td = document.createElement("td");
		if(key == "comment" || key == "NOTES")
			td.setAttribute("class", "tdChange");
		td.innerHTML = dato[key];
		tr2.appendChild(td);
	}
	table.appendChild(tr2);
}

function aggCampo(){
	var table = document.getElementById("tabDati");
	var tr = document.createElement("tr");
	if(table.lastChild.className == "color1")
		tr.setAttribute("class", "color2");
	else
		tr.setAttribute("class", "color1");
	for(var i = 0; i < 8; i++){
		var td = document.createElement("td");
		if(i == 0 || i == 1 || i == 3)
			td.setAttribute("class", "tdChange");
		tr.appendChild(td);
	}
	table.appendChild(tr);
	modificaTD();
	newVariable(table);
}

function newVariable(table) {
	var textarea = document.createElement("textarea");
	var tdVariable = table.lastChild.firstChild;
	tdVariable.appendChild(textarea);
	textarea.focus();
	controlloTextArea();
	$(document).keypress(function (e) {
		if (e.which == 13) {
			if(controlloVarEsistente(table).indexOf(textarea.value) != (-1))
				alert("Dato già esistente");
			else if(textarea.value == "")
				table.removeChild(table.lastChild);
			else{
				tdVariable.innerHTML = textarea.value;
				tdVariable.removeAttribute("class");
			}
		}
	});
}


function controlloVarEsistente(table) {
	var arrayVarEsis = [];
	for(var i = 1; i < table.childNodes.length-1; i++){
		arrayVarEsis[i] = table.childNodes[i].firstChild.innerHTML;
	}
	return arrayVarEsis;
}

function controlloTextArea(){
	var i;
	var table = document.getElementById("tabDati");
	
	for(i = 1; i < table.childNodes.length; i++){
		console.log(i);
		var rigaCol = table.childNodes[i];
		
		var celVar = rigaCol.childNodes[0];
		var celComm = rigaCol.childNodes[1];
		var celNotes = rigaCol.childNodes[3];
		
		if(celVar.hasChildNodes() == true){
			celVar.value = celVar.firstChild.value;
		}
		if(celComm.hasChildNodes() == true){
			celComm.value = celComm.firstChild.value;
		}
		if(celNotes.hasChildNodes() == true){
			celNotes.value = celNotes.firstChild.value;
		}
		
	}
}

function modificaTD() {
	$('.tdChange').dblclick('click', function() {
		controlloTextArea();
		$this = $(this);
		$input = $('<textarea>', {
			html: $this.text(),
			blur: function() {
				$this.html($input.val());
			},
			keyup: function(e) {
				if (e.which === 13) {
					$input.blur();
				}
			}
		}).appendTo( $this.empty() ).focus();
	});
}