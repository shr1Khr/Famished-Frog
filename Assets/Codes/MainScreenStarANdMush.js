#pragma strict


private var i = 0;
private var k = 0;

var Coinstxt : UI.Text;
var Mushtext : UI.Text;
var Startext : UI.Text;
var firstLogin : GameObject;
var dailyBonus : GameObject;

function DisplayText(){
Coinstxt.text = PlayerPrefs.GetInt("Coins").ToString();
/*
yield WaitForSeconds(1);
var date : int = System.DateTime.Now.get_Day();
if (date != PlayerPrefs.GetInt("Date")){
	PlayerPrefs.SetInt("Date", date);
	dailyBonus.SetActive(true);
	PlayerPrefs.SetInt("Coins", PlayerPrefs.GetInt("Coins")+5);
}

Coinstxt.text = PlayerPrefs.GetInt("Coins").ToString();
*/
}


function check(){
    var date : int = System.DateTime.Now.get_Day();
    if (Application.loadedLevel == 0){
        if (!PlayerPrefs.HasKey("Coins")){
            yield WaitForSeconds(2);
            firstLogin.SetActive(true);
            PlayerPrefs.SetInt("Coins", 15);
            PlayerPrefs.SetInt("Date", date);
            DisplayText();
        }
    }
}

function Start () {
i = 0 ; 
k = 0 ;
check();
DisplayText();
countStarAndMush();
//showOnScreen();
showOnScreenAgain();

}

function Update () {

    


}

InvokeRepeating("CoinsFix", 0, 1);
InvokeRepeating("MushCountUpdate", 0, 5);

private var mushCount : int = 0;

function MushCountUpdate(){
    CountMush();
    mushCount = mushCount + PlayerPrefs.GetInt("Mush");
    Debug.Log("mush count update "+ mushCount);
    Mushtext.text = ""+mushCount;

}
function CountMush () {
    mushCount = 0;
    for (var a : int = 0; a < 100; a++) {
        mushCount = mushCount + PlayerPrefs.GetInt("Mush"+a);
    }
}

function CoinsFix () {
    Coinstxt.text = PlayerPrefs.GetInt("Coins").ToString();
}

function countStarAndMush(){

	for (var a : int = 2; a < 500; a++){
		var j = PlayerPrefs.GetInt("Star"+a);
			i = j + i;
		}


	for (var b : int = 2; b < 500; b++){
		var l = PlayerPrefs.GetInt("Mush"+b);
			k = l + k;
		}

		k = k + PlayerPrefs.GetInt("MushPaid");


//Debug.Log("Star collected "+i +" Mush "+ k);
}



function showOnScreen(){

var c = this.gameObject.GetComponentsInChildren(Transform);

Debug.Log(c.Length); 

//eg i = 23   k = 4
//mushrooms
if (k > 9){var t = c[3].transform.gameObject.GetComponent(SpriteRenderer); t.enabled = true;}
else { t = c[2].transform.gameObject.GetComponent(SpriteRenderer); t.enabled = true;}

for (var a : int = 0; a < 10; a++){
if (a == k){ // 0 = 13, 9 = 22
	t = c[a+13].transform.gameObject.GetComponent(SpriteRenderer); t.enabled = true;
	}
}


//Star
var j : int = i / 10; // this is tens place of # of Star

var m : int = i - (j*10) ; // this is Units place of # of Star

for (var b : int = 0; b < 10; b++){
if (b == j){ // 0 = 24, 9 = 33
	t = c[b+24].transform.gameObject.GetComponent(SpriteRenderer); t.enabled = true;
	}
}

for (var d : int = 0; d < 10; d++){
if (d == m){ // 0 = 35, 9 = 44
	t = c[d+35].transform.gameObject.GetComponent(SpriteRenderer); t.enabled = true;
	}
}


// 45 
// 0,1 (2 - 11) M Tens
// 12 (13 - 22) M Units
// 23 (24 - 33) S Tens
// 34 (35 - 44) S Units



}


function showOnScreenAgain(){

///Debug.Log("Star collected "+i +" Mush "+ k);
//Coinstxt.text = PlayerPrefs.GetInt("Coins").ToString();
Startext.text = i.ToString();
Mushtext.text = k.ToString();
}