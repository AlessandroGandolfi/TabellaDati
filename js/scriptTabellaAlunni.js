$(function() {
    $( "input[type=button]" )
      .button()
});

window.onload = function() {
	var btnIndietro = document.getElementById("btnIndietro");
	var btnClassi = document.getElementById("btnClassi");
	btnIndietro.setAttribute("onclick", "index()");
	btnClassi.setAttribute("onclick", "tabClassi()");

	//,{"alunno":{"Nome":"","Cognome":"","Età":"","MediaVoti":"","CreditiAttuali":"","Classe":""}}
	var json = '{"alunni":[{"alunno":{"Nome":"Marco","Cognome":"Ciarmoli","Età":"19","Classe":"4DINFO","MediaVoti":"8.60","CreditiAttuali":"17"}},{"alunno":{"Nome":"Sara","Cognome":"Novi","Età":"16","Classe":"3BLSSA","MediaVoti":"6.50","CreditiAttuali":"13"}},{"alunno":{"Nome":"Riccardo","Cognome":"Malatesta","Età":"19","Classe":"5AMECC","MediaVoti":"6.70","CreditiAttuali":"13"}},{"alunno":{"Nome":"Andrea","Cognome":"Cannito","Età":"15","Classe":"1DELT","MediaVoti":"7.30","CreditiAttuali":"14"}},{"alunno":{"Nome":"Sabrina","Cognome":"Boarino","Età":"14","Classe":"1FINF","MediaVoti":"7.50","CreditiAttuali":"15"}},{"alunno":{"Nome":"Marco","Cognome":"Ciarmoli","Età":"19","Classe":"4DINFO","MediaVoti":"8.60","CreditiAttuali":"17"}},{"alunno":{"Nome":"Sara","Cognome":"Novi","Età":"16","Classe":"3BLSSA","MediaVoti":"6.50","CreditiAttuali":"13"}},{"alunno":{"Nome":"Riccardo","Cognome":"Malatesta","Età":"19","Classe":"5AMECC","MediaVoti":"6.70","CreditiAttuali":"13"}},{"alunno":{"Nome":"Andrea","Cognome":"Cannito","Età":"15","Classe":"1DELT","MediaVoti":"7.30","CreditiAttuali":"14"}},{"alunno":{"Nome":"Sabrina","Cognome":"Boarino","Età":"14","Classe":"1FINF","MediaVoti":"7.50","CreditiAttuali":"15"}},{"alunno":{"Nome":"Marco","Cognome":"Ciarmoli","Età":"19","Classe":"4DINFO","MediaVoti":"8.60","CreditiAttuali":"17"}},{"alunno":{"Nome":"Sara","Cognome":"Novi","Età":"16","Classe":"3BLSSA","MediaVoti":"6.50","CreditiAttuali":"13"}},{"alunno":{"Nome":"Riccardo","Cognome":"Malatesta","Età":"19","Classe":"5AMECC","MediaVoti":"6.70","CreditiAttuali":"13"}},{"alunno":{"Nome":"Andrea","Cognome":"Cannito","Età":"15","Classe":"1DELT","MediaVoti":"7.30","CreditiAttuali":"14"}},{"alunno":{"Nome":"Sabrina","Cognome":"Boarino","Età":"14","Classe":"1FINF","MediaVoti":"7.50","CreditiAttuali":"15"}}]}';
	var arr = JSON.parse(json);
    var alunni = arr.alunni;
	
	var table = document.getElementById("tabAlunni");
	var tr1 = document.createElement("tr");
	tr1.setAttribute("class", "color1");
	for(key in alunni[0].alunno){
		var th = document.createElement("th");
		th.innerHTML = key;
		tr1.appendChild(th);
    }
	table.appendChild(tr1);
	
	for(i = 0; i < alunni.length;i++)
    {
		var tr2 = document.createElement("tr");
		if((i % 2) == 0)
			tr2.setAttribute("class", "color2");
		else
			tr2.setAttribute("class", "color1");
		for(key in alunni[i].alunno)
		{	
			var td = document.createElement("td");
			td.innerHTML = alunni[i].alunno[key];
			tr2.appendChild(td);
		}
		table.appendChild(tr2);
    }
	/*
	var arrTh = ["Nome", "Cognome", "Età"];
	var arrNomi = ["Marco", "Sara", "Riccardo", "Andrea", "Sabrina"];
	var arrCognomi = ["Ciarmoli", "Novi", "Malatesta", "Cannito", "Boarino"];
	var arrEta = [19, 22, 19, 18, 18];
	
	var table = document.getElementById("tabAlunni");
	var tr1 = document.createElement("tr");
	for(var i = 0; i < arrTh.length; i++){
		var th = document.createElement("th");
		th.innerHTML = arrTh[i];
		tr1.appendChild(th);
	}
	table.appendChild(tr1);
	
	for(i = 0; i < arrNomi.length; i++){
		var tr2 = document.createElement("tr");
		var tdNome = document.createElement("td");
		var tdCognome = document.createElement("td");
		var tdEta = document.createElement("td");
		tdNome.innerHTML = arrNomi[i];
		tdCognome.innerHTML = arrCognomi[i];
		tdEta.innerHTML = arrEta[i];
		tr2.appendChild(tdNome);
		tr2.appendChild(tdCognome);
		tr2.appendChild(tdEta);
		table.appendChild(tr2);
	}
	*/
}

function tabClassi(){
	open("classi.html","_self");
}

function index(){
	open("index.html","_self");
}