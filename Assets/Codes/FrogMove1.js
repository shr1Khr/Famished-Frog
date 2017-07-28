#pragma strict

private var LeavesActiveInScene : Component[];
private var LeavesActiveInSceneInt : int[];
private var frogLeaf : int;
private var targetLeaf : int;
private var LeafAllWeights : int[];


function Start () {
	
	FrogandTargetLeaf(); // get frog and target leaf
	GetAllActiveLeaves(); // get active leaf and set Frog leaf at 0 and Target Leaf at last
	giveWeightsAs100ToAll(); // One time activity to set all weights as 100, Frog leaf wt = 0
/*	for (var p : int = 0; p < LeavesActiveInSceneInt.Length; p++ ){
		Debug.Log(LeavesActiveInSceneInt[p] + " " + LeafAllWeights[p]);
			} // inner for loop end */
}


function FrogandTargetLeaf(){ // get frog and target leaf

	var FrogLeafGOName : String;	
	var TargetLeafGOName : String;
	var hit : RaycastHit2D;

		// 2.A. Get Position of Frog an thus the Leaf on which it sits---------------------2A
	var frogGO = GameObject.FindGameObjectWithTag("Frog");
	hit = Physics2D.Raycast ((frogGO.transform.position), Vector2.zero);
		if(hit.collider != null){
		FrogLeafGOName = hit.collider.gameObject.name;
		frogLeaf = parseInt(FrogLeafGOName);
		//Debug.Log("frogLeaf "+frogLeaf);
		}

	// 2.B. Get Position of Target an thus the Leaf on which it sits---------------------2B
	var TargetGO = GameObject.FindGameObjectWithTag("Target");
	hit = Physics2D.Raycast ((TargetGO.transform.position), Vector2.zero);
		if(hit.collider != null){
		TargetLeafGOName = hit.collider.gameObject.name;
		targetLeaf = parseInt(TargetLeafGOName);
		//Debug.Log("targetLeaf "+targetLeaf);
		 } // if collider end
}

	
function GetAllActiveLeaves(){ //1. Get all Active leaves -----------------------------------------------------
	var LeavesGO = GameObject.FindGameObjectWithTag("Leaves");
	LeavesActiveInScene = LeavesGO.GetComponentsInChildren.<Collider2D>();
	LeavesActiveInSceneInt = new int[LeavesActiveInScene.Length];
	for (var q : int = 0; q < LeavesActiveInScene.Length; q++){
	LeavesActiveInSceneInt[q] = parseInt(LeavesActiveInScene[q].gameObject.name);
	}
	LeafAllWeights = new int[(LeavesActiveInScene.Length)];
	SortLeavesActiveInSceneVariable();

}

function SortLeavesActiveInSceneVariable(){ // Put FrogLeaf at 0; Put Targetleaf at last;
	for (var o : int = 0; o < LeavesActiveInScene.Length; o++){
	if (LeavesActiveInSceneInt[o] == frogLeaf)  { if (!(o == 0)){var tempvar = LeavesActiveInSceneInt[0]; LeavesActiveInSceneInt[0] = frogLeaf; LeavesActiveInSceneInt[o] = tempvar;}}
	if (LeavesActiveInSceneInt[o] == targetLeaf){ if (!(o == (LeavesActiveInSceneInt.Length -1) )){var tempvar1 = LeavesActiveInSceneInt[(LeavesActiveInSceneInt.Length-1)]; LeavesActiveInSceneInt[(LeavesActiveInSceneInt.Length-1)] = targetLeaf; LeavesActiveInSceneInt[o] = tempvar1;}}
	}
}


function giveWeightsAs100ToAll(){
for (var n : int = 0; n < LeafAllWeights.length; n++){
		LeafAllWeights[n] = 100;
	}
LeafAllWeights[0] = 1; // LeavesActiveInScene = name & LeafAllWeights = weights
}



function Update () {

	if (TouchToSinkLeaves.move == 1){ // This is trigger that its now My move :P
		TouchToSinkLeaves.move = 0;
		FrogandTargetLeaf(); 
		GetAllActiveLeaves();
		giveWeightsAs100ToAll();
		moveFrog();

	}
}



function moveFrog (){  //2. Step 2  // LeavesActiveInScene = name & LeafAllWeights = weights
var weightNumber : int = 0;
var tempContent : int[];	
	for (var s : int = 0; s < LeavesActiveInSceneInt.Length; s++ ){ //Debug.Log("S "+s+" Name "+LeavesActiveInSceneInt[s]+" Wt "+LeafAllWeights[s]);
		
		WeighTheLeaves(LeavesActiveInSceneInt[s], LeafAllWeights[s]);
		} // outer for loop end

for (var p : int = 0; p < LeavesActiveInSceneInt.Length; p++ ){
		Debug.Log(LeavesActiveInSceneInt[p] + " " + LeafAllWeights[p]);
			} // inner for loop end

}// main function end


function WeighTheLeaves(curr : int, wt : int) { // curr = name of the leaf ! eg 121

var returnValue : int[];
returnValue = new int[8];

for (var j : int = 0; j < LeavesActiveInSceneInt.Length; j++){  // iterate through all active Leaves and check on 8 criteria(-20,-1,+1,+20,-9,-10,+11,+10)
	 if((LeavesActiveInSceneInt[j] == (curr - 1 ) )||(LeavesActiveInSceneInt[j] == (curr + 1 ))||(LeavesActiveInSceneInt[j] == (curr - 10) )||(LeavesActiveInSceneInt[j] == (curr - 11))
	 ||(LeavesActiveInSceneInt[j] == (curr - 9 ))||(LeavesActiveInSceneInt[j] == (curr + 10) )||(LeavesActiveInSceneInt[j] == (curr + 11))||(LeavesActiveInSceneInt[j] == (curr + 9 ))){

	 	if (LeafAllWeights[j] > (wt+1)){ 
	 		for (var t : int= 0; t < LeavesActiveInSceneInt.Length; t++ ){
	 			if (LeafAllWeights[t] == 100){
	 				if (t<=j){
	 					//Debug.Log("Name "+LeavesActiveInSceneInt[j]+" Wt "+(wt+1));
	 					LeafAllWeights[j] = (wt+1); 

	 					 

	 }}}}}}// for loop end

for ( j = 0; j < LeavesActiveInSceneInt.Length; j++){ 
for (var k : int = 0; k < j; k++){
	if(LeafAllWeights[j]<LeafAllWeights[k]){
	 var temp2 = LeavesActiveInSceneInt[j]; var temp3 = LeafAllWeights[j];
	 LeavesActiveInSceneInt[j] = LeavesActiveInSceneInt[k]; LeafAllWeights[j] = LeafAllWeights[k];
	 					LeavesActiveInSceneInt[k] = temp2;  LeafAllWeights[k] = temp3;
	 		}
		}
	}
}























//----------------------------------------------------------------------------OLD ALGORITHM-----------------------------------------------------------
/*


private var FrogleafValue : int = 0; // to convert leaf name String into int
private	var TargetleafValue : int = 0; // to convert leaf name String into int
private var FrogInt : int;
private var TargInt : int;

function Step3Again(Fr: String , Ta : String){

 FrogInt = parseInt(Fr);
 TargInt = parseInt(Ta);
var LeafWeights : int[] = new int[LeavesActiveInScene.length];
var Leafnumbers : int[] = new int[LeavesActiveInScene.length];




}


function minus20(Fr: String , Ta : String) : int{
 FrogInt = parseInt(Fr);
 TargInt = parseInt(Ta);

if(FrogInt == TargInt -20){return 20;}
if(FrogInt == TargInt -40){return 40;}
if(FrogInt == TargInt -60){return 60;}
if(FrogInt == TargInt -80){return 80;}
if(FrogInt == TargInt -100){return 100;}
if(FrogInt == TargInt -120){return 120;}
if(FrogInt == TargInt -140){return 140;}
if(FrogInt == TargInt -160){return 160;}
}

function minus1() : int{

if(FrogInt == TargInt -1){return 1;}
if(FrogInt == TargInt -2){return 2;}
if(FrogInt == TargInt -3){return 3;}
if(FrogInt == TargInt -4){return 4;}
if(FrogInt == TargInt -5){return 5;}
if(FrogInt == TargInt -6){return 6;}
if(FrogInt == TargInt -7){return 7;}
if(FrogInt == TargInt -8){return 8;}
}






















//----------------------------------------------------------------------------------------------------------------------------------------------------------
function Step3(F: String , T : String){ // 3. Get all available nearby points and create a "for" loop---------------------

  FrogleafValue = parseInt(F); // to convert leaf name String into int
  TargetleafValue = parseInt(T); // to convert leaf name String into int
	
	if (FrogleafValue == TargetleafValue){ Debug.Log("YOU LOST @@@@@@@@@@ !!!!!!! :))))@@@@@@@@@@@@@@");}
	else{
	// single code didnt work because of sometimes -9 (for odd tens digit) & sometimes -10 (for even tens digit) appearance - hence even and odd shit
		if ((FrogleafValue/10)%2 == 0){ // even
			var EvenVal = TensDigitEven();
			for (var k : int = 0; k < 8; k++){

			if ((EvenVal[k]/10)%2 == 0){

			}
			else {

				}
			}
		}

		else { // odd
			var OddVal = TensDigitOdd();
			for (var l : int = 0; l < 8; l++){

			if ((OddVal[l]/10)%2 == 0){

			}
			else {

				}
			}
		}
	

	
	} // else part end
} // Step3 function end

function TensDigitOdd() : int[]{
if (FrogleafValue != 0){
var returnValueOdd : int[];
returnValueOdd = new int[8];

for (var j : int = 0; j < LeavesActiveInScene.length; j++){  // iterate through all active Leaves and check on 8 criteria(-20,-1,+1,+20,-9,-10,+11,+10)
		 if(parseInt(LeavesActiveInScene[j].gameObject.name) == (FrogleafValue - 20) ){returnValueOdd[0] = (FrogleafValue - 20);}
	else if(parseInt(LeavesActiveInScene[j].gameObject.name) == (FrogleafValue - 1 ) ){returnValueOdd[1] = (FrogleafValue - 1 );}
	else if(parseInt(LeavesActiveInScene[j].gameObject.name) == (FrogleafValue + 1 ) ){returnValueOdd[2] = (FrogleafValue + 1 );}
	else if(parseInt(LeavesActiveInScene[j].gameObject.name) == (FrogleafValue + 20) ){returnValueOdd[3] = (FrogleafValue + 20);}
	else if(parseInt(LeavesActiveInScene[j].gameObject.name) == (FrogleafValue - 9 ) ){returnValueOdd[4] = (FrogleafValue - 9 );}
	else if(parseInt(LeavesActiveInScene[j].gameObject.name) == (FrogleafValue - 10) ){returnValueOdd[5] = (FrogleafValue - 10);}
	else if(parseInt(LeavesActiveInScene[j].gameObject.name) == (FrogleafValue + 11) ){returnValueOdd[6] = (FrogleafValue + 11);}
	else if(parseInt(LeavesActiveInScene[j].gameObject.name) == (FrogleafValue + 10) ){returnValueOdd[7] = (FrogleafValue + 10);}
	}// for loop end
	return returnValueOdd;
  }
}

function TensDigitEven() : int[]{
if (FrogleafValue != 0){
var returnValueEven : int[];
returnValueEven = new int[8];

for (var i : int = 0; i < LeavesActiveInScene.length; i++){  // iterate through all active Leaves and check on 8 criteria(-1,+1,+20,-11,-10,+9,+10)
		 if(parseInt(LeavesActiveInScene[i].gameObject.name) == (FrogleafValue - 20) ){returnValueEven[0] = (FrogleafValue - 20); }
	else if(parseInt(LeavesActiveInScene[i].gameObject.name) == (FrogleafValue - 1 ) ){returnValueEven[1] = (FrogleafValue - 1 ); }
	else if(parseInt(LeavesActiveInScene[i].gameObject.name) == (FrogleafValue + 1 ) ){returnValueEven[2] = (FrogleafValue + 1 ); }
	else if(parseInt(LeavesActiveInScene[i].gameObject.name) == (FrogleafValue + 20) ){returnValueEven[3] = (FrogleafValue + 20); }
	else if(parseInt(LeavesActiveInScene[i].gameObject.name) == (FrogleafValue - 11) ){returnValueEven[4] = (FrogleafValue - 11); }
	else if(parseInt(LeavesActiveInScene[i].gameObject.name) == (FrogleafValue - 10) ){returnValueEven[5] = (FrogleafValue - 10); }
	else if(parseInt(LeavesActiveInScene[i].gameObject.name) == (FrogleafValue + 9 ) ){returnValueEven[6] = (FrogleafValue + 9 ); }
	else if(parseInt(LeavesActiveInScene[i].gameObject.name) == (FrogleafValue + 10) ){returnValueEven[7] = (FrogleafValue + 10); }
	}// for loop end
	return returnValueEven;
  }
}


















/*
	//7.b. To find if red Leaf --------------------------------------------------------
	for (var i : int = 0; i < LeavesActiveInScene.length; i++ ){
		var SR = LeavesActiveInScene[i].gameObject.GetComponent(SpriteRenderer);
		if (SR.sprite.name == "RedLeaf" ){
			//Debug.Log("Red Found "+LeavesActiveInScene[i].gameObject);
		}
	}
	*/

