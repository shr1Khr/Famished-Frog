#pragma strict

public var rockHint : GameObject;

public var BF1 : GameObject;
public var BF2 : GameObject;
public var BF3 : GameObject;
public var GF1 : GameObject;
public var GF2 : GameObject;
public var GF3 : GameObject;

public var WonCanvas : GameObject;
public var frogGOJump : GameObject;
public var frogGOJumpBlue : GameObject;

private var tempGOJump : GameObject;

private var emptyLeaffNo : int = 4;
private var EmptyPos = 0.5;
private var clickedFrog : GameObject;
private var  move : int;

function Check(){

if (( GF1.transform.position.x == -7)&&( GF2.transform.position.x == -4.5)&&( GF3.transform.position.x == -2)&&
( BF1.transform.position.x == 3)&&( BF2.transform.position.x == 5.5)&&( BF3.transform.position.x == 8)){

if (!WonCanvas.activeSelf){
PlayerPrefs.SetInt("Star"+Application.loadedLevel, 3);
if (PlayerPrefs.GetInt("BGMusic") == 1){ var AS = GetComponent(AudioSource); AS.Play();}
if (!PlayerPrefs.HasKey("Bonus 1")){
    PlayerPrefs.SetInt("Bonus 1", 1);
    PlayerPrefs.SetInt("Coins", PlayerPrefs.GetInt("Coins") + 3);
}
WonCanvas.SetActive(true);

		}
	}
}



function NowMove(MovePos : float){

	var frogGO = clickedFrog;


	//frogGOJump.transform.position.x = frogGO.transform.position.x;
	var ST = 0.02;
	var velo = 0.0;
	if (!(Mathf.Approximately(frogGOJump.transform.position.x, MovePos))){
		frogGO.SetActive(false);
		frogGOJump.SetActive(true);
		frogGOJump.transform.position.x = Mathf.SmoothDamp(frogGOJump.transform.position.x, MovePos, velo, ST);	
		}
	else {
	frogGO.transform.position.x = MovePos;
	frogGO.SetActive(true);
	frogGOJump.SetActive(false);
	move = 0;
	EmptyPos = tempPos;
	if (clickedFrog.tag == "Blue"){
		frogGOJump = tempGOJump;
	}
	}
}


function Start () {
 move = 0;

}

function Update () {

if (move == 0){
#if UNITY_ANDROID || UNITY_WEBGL
	if (Input.touchCount > 0 && Input.GetTouch(0).phase == TouchPhase.Began){
		var hit = Physics2D.Raycast (Camera.main.ScreenToWorldPoint((Input.GetTouch (0).position)), Vector2.zero);
		if(hit.collider != null){
				if(hit.collider.gameObject.tag == "Green"){ clickedFrog = hit.collider.gameObject ;frogClicked(clickedFrog);}
				else if(hit.collider.gameObject.tag == "Blue") { clickedFrog = hit.collider.gameObject ;frogClicked(clickedFrog);}
		}
	}
#endif



#if UNITY_EDITOR
  if (Input.GetMouseButtonDown(0)){
  		var hit2 = Physics2D.Raycast (Camera.main.ScreenToWorldPoint((Input.mousePosition)), Vector2.zero);
		if(hit2.collider != null){
				if(hit2.collider.gameObject.tag == "Green"){ clickedFrog = hit2.collider.gameObject ; frogClicked(clickedFrog);}
				else if(hit2.collider.gameObject.tag == "Blue") { clickedFrog = hit2.collider.gameObject ;frogClicked(clickedFrog);}
		}
	}
#endif
}

if (move == 2){
//Debug.Log("clickedFrog "+clickedFrog);

NowMove(EmptyPos); 


}

Check();

}


private var tempPos : float;  

private var val : int;

function frogClicked(GO : GameObject){
move = 1;
//var tempPos = GO.transform.position.x; NowMove(EmptyPos); emptyLeaffNo = i; EmptyPos = tempPos; // NowMove(EmptyPos);
//Debug.Log(GO.name);
var i = GetLeaf(GO);


if (GO.gameObject.tag == "Green"){
	if ( emptyLeaffNo == (i-1)){
		move = 2; 
		emptyLeaffNo = GetLeaf(clickedFrog); 
		frogGOJump.transform.position = clickedFrog.transform.position;
		tempPos = clickedFrog.transform.position.x;
	}
	else if ( emptyLeaffNo == (i-2)){
		 move = 2; 
		 emptyLeaffNo = GetLeaf(clickedFrog); 
		 frogGOJump.transform.position = clickedFrog.transform.position;
		 tempPos = clickedFrog.transform.position.x;
	}
}


else if (GO.gameObject.tag == "Blue"){
	if ( emptyLeaffNo == (i+1)){
		move = 2; 
		emptyLeaffNo = GetLeaf(clickedFrog); 
		frogGOJumpBlue.transform.position = clickedFrog.transform.position;
		tempPos = clickedFrog.transform.position.x;
    }
	else if ( emptyLeaffNo == (i+2)){
		move = 2; 
		emptyLeaffNo = GetLeaf(clickedFrog); 
		frogGOJumpBlue.transform.position = clickedFrog.transform.position;
		tempPos = clickedFrog.transform.position.x;
	}

if (move == 2){
		tempGOJump = frogGOJump;
		frogGOJump = frogGOJumpBlue;
	}
}
if (move == 1){
    Debug.Log("Frog "+GO.name+" Leaf "+GetLeaf(GO)+" Empty Leaf "+emptyLeaffNo);
    var RockHintText : UI.Text = rockHint.GetComponentInChildren(UI.Text);

    if (parseInt(GO.name) <= 3){
        var j = GetLeaf(GO) - emptyLeaffNo;
        Debug.Log("j "+j);
        if (j > 0){
            RockHintText.text = "Can't jump back !"; 
            rockHint.SetActive(true);
        }
        if (j < 0){
            RockHintText.text = "Too long to jump !"; 
            rockHint.SetActive(true);
        }
    }
    if (parseInt(GO.name) > 3){
        var k =  emptyLeaffNo - GetLeaf(GO);
        Debug.Log("k "+k);
        if (k > 0){
            RockHintText.text = "Can't jump back !"; 
            rockHint.SetActive(true);
        }
        if (k < 0){
            RockHintText.text = "Too long to jump !"; 
            rockHint.SetActive(true);
        }
    }
    move = 0;
    }

}


// -7, -4.5, -2, 0.5, 3, 5.5, 8
function GetLeaf(GO : GameObject){

var curr = GO.transform.position.x;
//Debug.Log(curr);
if (curr == -7){return 1;}
if (curr == -4.5){return 2;}
if (curr == -2){return 3;}
if (curr == 0.5){return 4;}
if (curr == 3){return 5;}
if (curr == 5.5){return 6;}
if (curr == 8){return 7;}

}


    function reload (){
        Application.LoadLevel(Application.loadedLevel);
    
    }


