$(function() {
    $( "input[type=button]" )
      .button()
});

window.onload = function() {
	var btnAlunni = document.getElementById("btnAlunni");
	var btnClassi = document.getElementById("btnClassi");
	
	btnAlunni.setAttribute("onclick", "tabAlunni()");
	btnClassi.setAttribute("onclick", "tabClassi()");

}

function tabAlunni(){
	open("alunni.html","_self");
}

function tabClassi(){
	open("classi.html","_self");
}