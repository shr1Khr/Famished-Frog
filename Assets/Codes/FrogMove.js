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
	ForgAndTargetPosition();

}

function ForgAndTargetPosition(){ // Put FrogLeaf at 0; Put Targetleaf at last;
	for (var o : int = 0; o < LeavesActiveInScene.Length; o++){
	if (LeavesActiveInSceneInt[o] == frogLeaf)  { if (!(o == 0)){var tempvar = LeavesActiveInSceneInt[0]; LeavesActiveInSceneInt[0] = frogLeaf; LeavesActiveInSceneInt[o] = tempvar;}}
	//if (LeavesActiveInSceneInt[o] == targetLeaf){ if (!(o == (LeavesActiveInSceneInt.Length -1) )){var tempvar1 = LeavesActiveInSceneInt[(LeavesActiveInSceneInt.Length-1)]; LeavesActiveInSceneInt[(LeavesActiveInSceneInt.Length-1)] = targetLeaf; LeavesActiveInSceneInt[o] = tempvar1;}}
	}
}


function giveWeightsAs100ToAll(){
for (var n : int = 0; n < LeafAllWeights.length; n++){
		LeafAllWeights[n] = 1000;
	}
LeafAllWeights[0] = 1; // LeavesActiveInScene = name & LeafAllWeights = weights
}



function Update () {

	if (TouchToSinkLeaves.move == 1){ // This is trigger that its now My move :P
		TouchToSinkLeaves.move = 0;
		FrogandTargetLeaf(); // to get new target and frog leaf
		GetAllActiveLeaves(); // al active leaves now & Put FrogLeaf at 0; Put Targetleaf at last; 
		giveWeightsAs100ToAll();// put 1000 to all; put 1 wt to frog leaf
		GiveWeightsAsPerNodes(); // weights given as per nodes
		SortWeights(); // Nodes are sorted in Acending order
		redoWeightsBasedOnNumberOfNearByNodes();// weights given as per nodes - more number of nearby nodes = lesser weight
		SortWeights();
		RemoveHigherWeightsAsPerTargetsWeight();
		SortWeights();
		print();
		MoveFinally();
	}
}



function GiveWeightsAsPerNodes (){  //2. Step 2  // LeavesActiveInScene = name & LeafAllWeights = weights
var weightNumber : int = 0;
var tempContent : int[];	
	for (var s : int = 0; s < LeavesActiveInSceneInt.Length; s++ ){ //Debug.Log("S "+s+" Name "+LeavesActiveInSceneInt[s]+" Wt "+LeafAllWeights[s]);
		WeighTheLeaves(LeavesActiveInSceneInt[s], LeafAllWeights[s]);
	} // outer for loop end
}// main function end
function WeighTheLeaves(curr : int, wt : int) { // curr = name of the leaf ! eg 121
var returnValue : int[];
returnValue = new int[8];
for (var j : int = 0; j < LeavesActiveInSceneInt.Length; j++){  // iterate through all active Leaves and check on 8 criteria(-20,-1,+1,+20,-9,-10,+11,+10)
	 if((LeavesActiveInSceneInt[j] == (curr - 1 ) )||(LeavesActiveInSceneInt[j] == (curr + 1 ))||(LeavesActiveInSceneInt[j] == (curr - 10) )||(LeavesActiveInSceneInt[j] == (curr - 11))
	 ||(LeavesActiveInSceneInt[j] == (curr - 9 ))||(LeavesActiveInSceneInt[j] == (curr + 10) )||(LeavesActiveInSceneInt[j] == (curr + 11))||(LeavesActiveInSceneInt[j] == (curr + 9 ))){
	  	if (LeafAllWeights[j] > (wt+1)){ 
	 		for (var t : int= 0; t < LeavesActiveInSceneInt.Length; t++ ){
	 			if (LeafAllWeights[t] == 1000){
	 				if (t<=j){
	 					//Debug.Log("Name "+LeavesActiveInSceneInt[j]+" Wt "+(wt+1));
	 					LeafAllWeights[j] = (wt+1); 
	}}}}}}// for loop end
}


function SortWeights(){
	for ( var j : int = 0; j < LeavesActiveInSceneInt.Length; j++){ //THis is to sort in ascending order	
for (var k : int = 0; k < j; k++){
	if(LeafAllWeights[j]<LeafAllWeights[k]){
	 var temp2 = LeavesActiveInSceneInt[j]; var temp3 = LeafAllWeights[j];
	 LeavesActiveInSceneInt[j] = LeavesActiveInSceneInt[k]; LeafAllWeights[j] = LeafAllWeights[k];
	 					LeavesActiveInSceneInt[k] = temp2;  LeafAllWeights[k] = temp3;
	 		}
	 else if (LeafAllWeights[j] == LeafAllWeights[k]){
	 //Debug.Log("J "+j+" K "+k);
	 var SR = LeavesActiveInScene[k].gameObject.GetComponent(SpriteRenderer);
	 	for (var e : int = 0; e < LeavesActiveInSceneInt.Length; e++){  // iterate through all active Leaves and check on 8 criteria(-20,-1,+1,+20,-9,-10,+11,+10)
	 if((LeavesActiveInSceneInt[e] == (LeavesActiveInSceneInt[k] - 1 ) )||(LeavesActiveInSceneInt[e] == (LeavesActiveInSceneInt[k] + 1 ))||(LeavesActiveInSceneInt[e] == (LeavesActiveInSceneInt[k] - 10) )||(LeavesActiveInSceneInt[e] == (LeavesActiveInSceneInt[k] - 11))
	 ||(LeavesActiveInSceneInt[e] == (LeavesActiveInSceneInt[k] - 9 ))||(LeavesActiveInSceneInt[e] == (LeavesActiveInSceneInt[k] + 10) )||(LeavesActiveInSceneInt[e] == (LeavesActiveInSceneInt[k] + 11))||(LeavesActiveInSceneInt[e] == (LeavesActiveInSceneInt[k] + 9 ))){
	 	if (LeavesActiveInSceneInt[e] == targetLeaf){

	 	}
	 }
		else if (SR.sprite.name == "RedLeaf" ){
			//Debug.Log("Red Found "+LeavesActiveInScene[j].gameObject);
	 		temp2 = LeavesActiveInSceneInt[k]; 						temp3 = LeafAllWeights[k];
			LeavesActiveInSceneInt[k] = LeavesActiveInSceneInt[j];  LeafAllWeights[k] = LeafAllWeights[j];
	 		LeavesActiveInSceneInt[j] = temp2;  					LeafAllWeights[j] = temp3;
	 				}
	 			}
			}
		}
	}
for ( var c : int = 0; c < LeavesActiveInSceneInt.Length; c++){ //THis is to sort in ascending order Finally !!	
	for (var d : int = 0; d < LeavesActiveInSceneInt.Length ; d++){
		if(LeafAllWeights[c]>LeafAllWeights[d]){}
		else{
	 		temp2 = LeavesActiveInSceneInt[c]; 						temp3 = LeafAllWeights[c];
	 		LeavesActiveInSceneInt[c] = LeavesActiveInSceneInt[d];  LeafAllWeights[c] = LeafAllWeights[d];
	 		LeavesActiveInSceneInt[d] = temp2;  					LeafAllWeights[d] = temp3;
	 		}
		}
	}
}

function redoWeightsBasedOnNumberOfNearByNodes(){ // LeavesActiveInSceneInt = name in int & LeafAllWeights = weights

for (var u : int = 0; u < LeavesActiveInSceneInt.Length; u++ ){
		var v : int = 0;
		//Debug.Log(LeavesActiveInSceneInt[u] + " " + LeafAllWeights[u]);
		LeafAllWeights[u] = LeafAllWeights[u]*10;

		var curr = LeavesActiveInSceneInt[u];
		for (var p : int = 0; p < LeavesActiveInSceneInt.Length; p++){
			if((LeavesActiveInSceneInt[p] == (curr - 1 ) )||(LeavesActiveInSceneInt[p] == (curr + 1 ))||(LeavesActiveInSceneInt[p] == (curr - 10) )||(LeavesActiveInSceneInt[p] == (curr - 11))
	 		||(LeavesActiveInSceneInt[p] == (curr - 9 ))||(LeavesActiveInSceneInt[p] == (curr + 10) )||(LeavesActiveInSceneInt[p] == (curr + 11))||(LeavesActiveInSceneInt[p] == (curr + 9 ))){
	 			v++;
	 			//if (LeavesActiveInSceneInt[p] == targetLeaf ){v=9;}
	 						} // if end
	 				} // Inner for loop
	//if (v>8){}
	//else {
	LeafAllWeights[u] = LeafAllWeights[u] - v;	
	//					}
	//Debug.Log(LeavesActiveInSceneInt[u] + " " + LeafAllWeights[u]);
			} // outer for loop end
}



function RemoveHigherWeightsAsPerTargetsWeight(){
for (var b : int = 0; b < LeavesActiveInSceneInt.Length; b++ ){
	if (targetLeaf == LeavesActiveInSceneInt[b]){
		for (var c : int = 0 ; c < LeavesActiveInSceneInt.Length; c++ ){
				if ((LeafAllWeights[c]/10) >= (LeafAllWeights[b]/10)&&(b != c) ){
					LeafAllWeights[c] = 1000;
				}
			}
		}
	}
}



function print(){
	for (var a : int = 0; a < LeavesActiveInSceneInt.Length; a++){
	//Debug.Log(LeavesActiveInSceneInt[a] + " " + LeafAllWeights[a]);
		}
}
	

function MoveFinally(){
var frog = GameObject.FindWithTag("Frog");
	var MovePositionForFrog = GameObject.Find(LeavesActiveInSceneInt[1].ToString());
	//frog.transform.position = MovePositionForFrog.transform.position;
ChckIFMovePositionIsActuallyCool();
}



function ChckIFMovePositionIsActuallyCool(){
var difference = frogLeaf - targetLeaf;
Debug.Log(frogLeaf+ " " + targetLeaf+" " + difference);
if (difference > 0){ //Target is to left of frog
	var temp = difference/10; temp = temp*10;
	if ((temp - difference)> 0){ 		//Frog is above target- to right

			}
	else if ((temp - difference)< 0) {  //Frog is below target - to right

		}
	else {								// frog is at same level as target - to right

		}
 	}
if (difference < 0){ //Target is right of frog
		 temp = difference/10; temp = temp*10;
	if ((temp - difference)> 0){ 		//Frog is above target - to left

			}
	else if ((temp - difference)< 0) {  //Frog is below target - to left

		}
	else {								// frog is at same level as target - to left

		}
	}
}


function getSamplePath(){



}


