#pragma strict

public var LivesPanel : GameObject;

private var MC : GameObject;

public var On : GameObject;
public var Off1 : GameObject;
public var Off2 : GameObject;
public var Off3 : GameObject;
public var Image1 : GameObject;
public var Image2 : GameObject;
public var Image3 : GameObject;
public var Image4 : GameObject;

public var locked : GameObject[];

public var locked2 : GameObject;
public var locked3 : GameObject;
public var locked4 : GameObject;
public var locked5 : GameObject;
public var locked6 : GameObject;
public var locked7 : GameObject;
public var locked8 : GameObject;
public var locked9 : GameObject;
public var locked10 : GameObject;
public var locked11 : GameObject;
public var locked12 : GameObject;
public var locked13 : GameObject;
public var locked14 : GameObject;
public var locked15 : GameObject;
public var locked16 : GameObject;
public var locked17 : GameObject;
public var locked18 : GameObject;
public var locked19 : GameObject;
public var locked20 : GameObject;
public var locked21 : GameObject;
public var locked22 : GameObject;
public var locked23 : GameObject;
public var locked24 : GameObject;
public var locked25 : GameObject;
public var locked26 : GameObject;
public var locked27 : GameObject;
public var locked28 : GameObject;
public var locked29 : GameObject;
public var locked30 : GameObject;


function livesPanell(){

    LivesPanel.SetActive(true);
}

function resetLevelLocks(){
	PlayerPrefs.DeleteAll();
	Application.LoadLevel(Application.loadedLevel);
}
function Start () {
	var b = -5;
	loadGO();
	MC = GameObject.FindGameObjectWithTag("MainCamera");

	for (var a : int = 2; a < 31; a++){
		var i = PlayerPrefs.GetInt("Star"+a);
		if ( i == 0){ a = 31; }
		else {
			var GO = locked[a];
			GO.SetActive(false);
		}
	}
}


function loadGO(){
 locked = new GameObject[42];

 locked[0] = locked2;
 locked[1] = locked2;
 locked[2] = locked2;
 locked[3] = locked3;
 locked[4] = locked4;
 locked[5] = locked5;
 locked[6] = locked6;
 locked[7] = locked7;
 locked[8] = locked8;
 locked[9] = locked9;
 locked[10] = locked10;
 locked[11] = locked11;
 locked[12] = locked12;
 locked[13] = locked13;
 locked[14] = locked14;
 locked[15] = locked15;
 locked[16] = locked16;
 locked[17] = locked17;
 locked[18] = locked18;
 locked[19] = locked19;
 locked[20] = locked20;
 locked[21] = locked21;
 locked[22] = locked22;
 locked[23] = locked23;
 locked[24] = locked24;
 locked[25] = locked25;
 locked[26] = locked26;
 locked[27] = locked27;
 locked[28] = locked28;
 locked[29] = locked29;
 locked[30] = locked30;
}


public var AS : AudioSource;

function playButtonClickAudio(){
    Debug.Log("Horn Sound");
    if (PlayerPrefs.GetInt("BGMusic") == 1){
        AS.Play();
    }
}


function next(){
playButtonClickAudio();
if ((MC.transform.position.x > -1 )&&((MC.transform.position.x < 10))){
	var tp = On.transform.position;
	On.transform.position = Off1.transform.position;
	Off1.transform.position = tp;
	Image1.SetActive(false);
	Image2.SetActive(true);
}

if ((MC.transform.position.x >15)&&((MC.transform.position.x < 35))){
var tp2 = On.transform.position;
	On.transform.position = Off2.transform.position;
	Off2.transform.position = tp2;
	Image2.SetActive(false);
	Image3.SetActive(true);
}

if ((MC.transform.position.x > 36 )&&((MC.transform.position.x < 60))){
var tp3 = On.transform.position;
	On.transform.position = Off3.transform.position;
	Off3.transform.position = tp3;
	Image3.SetActive(false);
	Image4.SetActive(true);
	}
}

function back(){
playButtonClickAudio();
if ((MC.transform.position.x > 15 )&&((MC.transform.position.x < 25))){
	var tp = On.transform.position;
	On.transform.position = Off1.transform.position;
	Off1.transform.position = tp;
	Image2.SetActive(false);
	Image1.SetActive(true);
}

if ((MC.transform.position.x > 32 )&&((MC.transform.position.x < 40))){
var tp2 = On.transform.position;
	On.transform.position = Off2.transform.position;
	Off2.transform.position = tp2;
	Image3.SetActive(false);
	Image2.SetActive(true);
}

if ((MC.transform.position.x > 50 )&&((MC.transform.position.x < 60))){
var tp3 = On.transform.position;
	On.transform.position = Off3.transform.position;
	Off3.transform.position = tp3;
	Image4.SetActive(false);
	Image3.SetActive(true);
	}
}


function LevelButtons(){

Debug.Log(this.transform.parent.gameObject.name);
}






function Level1(){
    if (PlayerPrefs.GetInt("Lives") > 0){
        Application.LoadLevel(2);
    }
    else {livesPanell();}
}

function Level2(){
    if (PlayerPrefs.GetInt("Lives") > 0){
        Application.LoadLevel(3);
    }else {livesPanell();}
}
function Level3(){
    if (PlayerPrefs.GetInt("Lives") > 0){
        Application.LoadLevel(4);
    }else {livesPanell();}
}

function Level4(){
    if (PlayerPrefs.GetInt("Lives") > 0){
        Application.LoadLevel(5);
    }else {livesPanell();}
}

function Level5(){
    if (PlayerPrefs.GetInt("Lives") > 0){
        Application.LoadLevel(6);
    }else {livesPanell();}

}


function Level6(){
    if (PlayerPrefs.GetInt("Lives") > 0){
        Application.LoadLevel(7);
    }else {livesPanell();}

}


function Level7(){
    if (PlayerPrefs.GetInt("Lives") > 0){
        Application.LoadLevel(8);
    }else {livesPanell();}

}


function Level8(){
    if (PlayerPrefs.GetInt("Lives") > 0){
        Application.LoadLevel(9);
    }else {livesPanell();}

}


function Level9(){
    if (PlayerPrefs.GetInt("Lives") > 0){
        Application.LoadLevel(10);
    }else {livesPanell();}
}


function Level10(){
    if (PlayerPrefs.GetInt("Lives") > 0){
        Application.LoadLevel(11);
    }else {livesPanell();}
}


function Level11(){
    if (PlayerPrefs.GetInt("Lives") > 0){
        Application.LoadLevel(12);
    }else {livesPanell();}}

function Level12(){
    if (PlayerPrefs.GetInt("Lives") > 0){
        Application.LoadLevel(13);
    }else {livesPanell();}}


function Level13(){
    if (PlayerPrefs.GetInt("Lives") > 0){
        Application.LoadLevel(14);
    }else {livesPanell();}}

function Level14(){
    if (PlayerPrefs.GetInt("Lives") > 0){
        Application.LoadLevel(15);
    }else {livesPanell();}}

function Level15(){
    if (PlayerPrefs.GetInt("Lives") > 0){
        Application.LoadLevel(16);
    }else {livesPanell();}}

function Level16(){
    if (PlayerPrefs.GetInt("Lives") > 0){
        Application.LoadLevel(17);
    }else {livesPanell();}}

function Level17(){
    if (PlayerPrefs.GetInt("Lives") > 0){
        Application.LoadLevel(18);
    }else {livesPanell();}}

function Level18(){
    if (PlayerPrefs.GetInt("Lives") > 0){
        Application.LoadLevel(19);
    }else {livesPanell();}}

function Level19(){
    if (PlayerPrefs.GetInt("Lives") > 0){
        Application.LoadLevel(20);
    }else {livesPanell();}}

function Level20(){
    if (PlayerPrefs.GetInt("Lives") > 0){
        Application.LoadLevel(21);
    }else {livesPanell();}}


function Level21(){
    if (PlayerPrefs.GetInt("Lives") > 0){
        Application.LoadLevel(22);
    }else {livesPanell();}}


function Level22(){
    if (PlayerPrefs.GetInt("Lives") > 0){
        Application.LoadLevel(23);
    }else {livesPanell();}}


function Level23(){
    if (PlayerPrefs.GetInt("Lives") > 0){
        Application.LoadLevel(24);
    }else {livesPanell();}}


function Level24(){
    if (PlayerPrefs.GetInt("Lives") > 0){
        Application.LoadLevel(25);
    }else {livesPanell();}}



function Level25(){
    if (PlayerPrefs.GetInt("Lives") > 0){
        Application.LoadLevel(26);
    }else {livesPanell();}}


function Level26(){
    if (PlayerPrefs.GetInt("Lives") > 0){
        Application.LoadLevel(27);
    }else {livesPanell();}}


function Level27(){
    if (PlayerPrefs.GetInt("Lives") > 0){
        Application.LoadLevel(28);
    }else {livesPanell();}}


function Level28(){
    if (PlayerPrefs.GetInt("Lives") > 0){
        Application.LoadLevel(29);
    }else {livesPanell();}}


function Level29(){
    if (PlayerPrefs.GetInt("Lives") > 0){
        Application.LoadLevel(30);
    }else {livesPanell();}}


function Level30(){
    if (PlayerPrefs.GetInt("Lives") > 0){
        Application.LoadLevel(31);
    }else {livesPanell();}}