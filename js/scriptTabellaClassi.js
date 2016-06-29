$(function() {
    $( "input[type=button]" )
      .button()
});

window.onload = function() {
	var btnIndietro = document.getElementById("btnIndietro");
	var btnAlunni = document.getElementById("btnAlunni");
	btnIndietro.setAttribute("onclick", "index()");
	btnAlunni.setAttribute("onclick", "tabAlunni()");
	
	//,{"classe":{"NomeClasse":"","Sezione":"","NumAlunni":"","MediaVotiClasse":""}}
	var json = '{"classi":[{"classe":{"NomeClasse":"4D","Sezione":"Informatica","NumAlunni":"24","MediaVotiClasse":"7.50"}},{"classe":{"NomeClasse":"3B","Sezione":"Liceo Scientifico","NumAlunni":"18","MediaVotiClasse":"7.20"}},{"classe":{"NomeClasse":"5A","Sezione":"Meccanica","NumAlunni":"20","MediaVotiClasse":"6.90"}},{"classe":{"NomeClasse":"1D","Sezione":"Elettronica","NumAlunni":"23","MediaVotiClasse":"7.20"}},{"classe":{"NomeClasse":"1F","Sezione":"Informatica","NumAlunni":"21","MediaVotiClasse":"8.00"}},{"classe":{"NomeClasse":"4D","Sezione":"Informatica","NumAlunni":"24","MediaVotiClasse":"7.50"}},{"classe":{"NomeClasse":"3B","Sezione":"Liceo Scientifico","NumAlunni":"18","MediaVotiClasse":"7.20"}},{"classe":{"NomeClasse":"5A","Sezione":"Meccanica","NumAlunni":"20","MediaVotiClasse":"6.90"}},{"classe":{"NomeClasse":"1D","Sezione":"Elettronica","NumAlunni":"23","MediaVotiClasse":"7.20"}},{"classe":{"NomeClasse":"1F","Sezione":"Informatica","NumAlunni":"21","MediaVotiClasse":"8.00"}},{"classe":{"NomeClasse":"4D","Sezione":"Informatica","NumAlunni":"24","MediaVotiClasse":"7.50"}},{"classe":{"NomeClasse":"3B","Sezione":"Liceo Scientifico","NumAlunni":"18","MediaVotiClasse":"7.20"}},{"classe":{"NomeClasse":"5A","Sezione":"Meccanica","NumAlunni":"20","MediaVotiClasse":"6.90"}},{"classe":{"NomeClasse":"1D","Sezione":"Elettronica","NumAlunni":"23","MediaVotiClasse":"7.20"}},{"classe":{"NomeClasse":"1F","Sezione":"Informatica","NumAlunni":"21","MediaVotiClasse":"8.00"}}]}';	
	var arr = JSON.parse(json);
	var classi = arr.classi;
	
	var table = document.getElementById("tabClassi");
	var tr1 = document.createElement("tr");
	tr1.setAttribute("class", "color1");
	for(key in classi[0].classe){
		var th = document.createElement("th");
		th.innerHTML = key;
		tr1.appendChild(th);
    }
	table.appendChild(tr1);
	
	for(i = 0; i < classi.length;i++)
    {
		var tr2 = document.createElement("tr");
		if((i % 2) == 0)
			tr2.setAttribute("class", "color2");
		else
			tr2.setAttribute("class", "color1");
		for(key in classi[i].classe)
		{	
			var td = document.createElement("td");
			td.innerHTML = classi[i].classe[key];
			tr2.appendChild(td);
		}
		table.appendChild(tr2);
    }
}

function tabAlunni(){
	open("alunni.html","_self");
}

function index(){
	open("index.html","_self");
}