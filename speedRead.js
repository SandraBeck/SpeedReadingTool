/**
 * Speed-Reading-Tool. 
 * This js-file has to be importet into header of LaTex-document. 
 *
 * @author Sandra Beck
 */

var i = 0; 
var letters = 15; 
var myStringArray;
var GroupArray;
var id;
var stop = false;

function doSpeedRead(){	
	stop = false;
    var wpm = setTimer();
    myStringArray = ["Start:", ""];
    GroupArray = [""];
	this.getField("Present").value = myStringArray[i];
    var currentString = this.getField("Content").value 
    while (currentString.length != 0){
        var indexOfBlanc = currentString.indexOf(' ');
        if (indexOfBlanc == -1){
            var firstWord = currentString;
            currentString = "";
        }
				else
				{
            var firstWord = currentString.substring(0, indexOfBlanc+1);
            currentString = currentString.substring(indexOfBlanc + 1, currentString.length);
        }
        myStringArray.push(firstWord);
    }
    createGroups();
    id = app.setInterval("present()", wpm);
}

function present()
{  
    i = i + 1;
    if (i < GroupArray.length && !stop){
		this.getField("Present").value = GroupArray[i];
    }  
    else{
        clearGuiAndVars();
    }
}

function setTimer(){ 
    var timer = this.getField("Speed").value;  
    var patt = new RegExp('^\\d+$');
    var res = patt.test(timer);
    if (!res){
        app.alert("Ungueltige Angabe fuer Woerter pro Minute");
		res = true;
    } 
	if(timer<150){
		app.alert("Dies ist ein sehr niedriger Wert, sind Sie sicher, dass die fortfahren moechten?");
	}
	if(timer>1000){
		app.alert("Dies ist ein sehr hoher Wert, sind Sie sicher, dass die fortfahren moechten?");
	}
	//Umrechnung in Milisekunden
    timer = 60000 / timer;
    //Da ca. 3 Woerter pro Gruppe:
    timer = timer * 3;
	return timer;
}

function clearGuiAndVars(){
    i = 0;
    this.getField("Present").value = "Beendet!"; 
    app.clearInterval(id);
}

function pause(){
    if (stop == false){
        stop = true;
    } 
	else{
        stop = false;
    }
}
//this function bundles the words to groups 
function createGroups(){ 
    var group = "";
    var sumOfLetters = 0;
    var numOfWords = 0; 
    var arrayLength = myStringArray.length; 
    for (var i = 0; i < arrayLength; i++) {
       
        if ((sumOfLetters <= letters) || (sumOfLetters >= letters && numOfWords == 0)){
            group = group + myStringArray[i];
            numOfWords = numOfWords + 1;
            sumOfLetters = sumOfLetters + myStringArray[i].length;
        } 
        else{ 
            i--;
            GroupArray.push(group); 
            group = "";
            sumOfLetters = 0;
            numOfWords = 0;
        }
    } 
}