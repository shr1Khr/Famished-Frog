#pragma strict
import System.Collections.Generic;

public var frogGOJump : GameObject;
public var frogGOJump2 : GameObject;
public var frogGOJump3 : GameObject;
private var frogGOChild : GameObject;

private var ASYouWonOrFail : AudioSource;
private var YouWonPanel : GameObject;
private var FailFrogGo : GameObject;
//private var LevelFail : GameObject;

private var numberOfHops : int;
private var numberOfHops1 : int;
private var numberOfHops2 : int;
private var numberOfHops3 : int;
private var numberOfHops4 : int;

private var FrogTag : String;
private var TargetTag : String;

private var LeavesActiveInScene : Component[];
private var LeavesActiveInSceneInt : int[];						private var LeavesActiveInSceneInt2 : int[];
private var frogLeaf : int;										private var frogLeaf2 : int;
private var targetLeaf : int;   								private var targetLeaf2 : int;

private var FromStartToCurrentWeight_gg : float[]; 				private var FromStartToCurrentWeight_gg2 : float[]; // okay
private var FromCurrentToEndWeight_hh : float[];				private var FromCurrentToEndWeight_hh2 : float[];
private var weight_ff : float[];								private var weight_ff2 : float[];



private var OpenNodes : int[];									private var OpenNodes2 : int[];
private var OpenNodesWeight : float[]; 							private var OpenNodesWeight2 : float[]; // It will contain f value = h + g 

private var ClosedNodes : int[]; 								private var ClosedNodes2 : int[]; // this is the path !
private var ClosedNodesWeight : float[];						private var ClosedNodesWeight2 : float[];
private var parent_Closed : int[];								private var parent_Closed2 : int[];
private var parent_Open : int[];								private var parent_Open2 : int[];

public static var reached : int = 0; // 0 = false, 1 = true; 
private var OpenListLength : int;

private var yes2Frogs : int; // 0 = false, 1 = true
private var yes2Targets : int; // 0 = false, 1 = true

private var UpdateRecievePos : Vector3;

public static var failOrSuccess : int;

private var FrogGO : GameObject[];
private var CatGO : GameObject[];
private var FL : int;
private var CL : int;

private var MovePos : Vector3[];

private var alpha : int;
private var alpha2 : int;
private var alpha3 : int;

function Start () {

var MC : GameObject = GameObject.FindGameObjectWithTag("MainCamera");
var ASYouWonOrFailGO = MC.transform.Find("AS WinORFail");
ASYouWonOrFail = ASYouWonOrFailGO.GetComponent(AudioSource);
var YouWonPanelTransform = MC.transform.Find("Canvas/YouWon");
YouWonPanel = YouWonPanelTransform.gameObject;
var LevelFailTransform = MC.transform.Find("Canvas/Fail");
FailFrogGo = LevelFailTransform.gameObject;	

Startt();
}

function Startt(){
FrogGO = new GameObject[3];
FrogGO[0] = GameObject.FindGameObjectWithTag("Frog");
FrogGO[1] = GameObject.FindGameObjectWithTag("Frog2");
FrogGO[2] = GameObject.FindGameObjectWithTag("Frog3");

CatGO = new GameObject[5];
CatGO[0] = GameObject.FindGameObjectWithTag("Target");
CatGO[1] = GameObject.FindGameObjectWithTag("Target2");
CatGO[2] = GameObject.FindGameObjectWithTag("Target3");
CatGO[3] = GameObject.FindGameObjectWithTag("Target4");
CatGO[4] = GameObject.FindGameObjectWithTag("Target5");

alpha = 0;
alpha2 = 0;
alpha3 = 0;
FL = 0;
CL = 0;
badPlace = Vector3.zero;

for (var FrogG in FrogGO ){
	if (FrogG != null){
	FL++;
	}
}

for (var CatG in CatGO ){
	if (CatG != null){
	CL++;
	}
}

failOrSuccess = 0;
numberOfHops = 0; numberOfHops1 = 0; numberOfHops2 = 0; numberOfHops3 = 0; numberOfHops4 = 0;
lastMoved = new Vector3[FL];
currMoving = new Vector3[FL];
if (FL > 1){
	yes2Frogs = 1;
		}
if (CL > 1){
	yes2Targets = 1;
		}

}

function NowMove2(){
	//var FGOT = FrogGO[1].GetComponentsInChildren(Transform);
	//var SR = FGOT[1].transform.gameObject.GetComponent(SpriteRenderer); //SetActive(false)
	//if (MovePos[1].x != 1000){
	//	var ST = 0.02;
	//	var velo = Vector3.zero;
	//	if (!(Mathf.Approximately(frogGOJump2.transform.position.x, MovePos[1].x))){
    //Debug.Log(ToMovePoss);
            UndoScript.Frog2.Push(Vector3(FrogGO[1].transform.position.x, FrogGO[1].transform.position.y, -10));
			FrogGO[1].transform.position.x = MovePos[1].x;
			FrogGO[1].transform.position.y = MovePos[1].y;
			
		//	SR.enabled = false;
		//	frogGOJump2.SetActive(true);
		//	frogGOJump2.transform.position = Vector3.SmoothDamp(frogGOJump2.transform.position, Vector3(MovePos[1].x, MovePos[1].y, FrogGO[1].transform.position.z), velo, ST);	
		//}
//	else {
	//SR.enabled = true;
//	frogGOJump2.SetActive(false);
	alpha2 = 2;
	//Debug.Log("22?");
	//		}
	//	}
}


function NowMove3(){
	//var FGOT = FrogGO[2].GetComponentsInChildren(Transform);
	//var SR = FGOT[1].transform.gameObject.GetComponent(SpriteRenderer); //SetActive(false)
	//if (MovePos[2].x != 1000){
	//	var ST = 0.02;
	//	var velo = Vector3.zero;
	//	if (!(Mathf.Approximately(frogGOJump3.transform.position.x, MovePos[2].x))){
    //Debug.Log(ToMovePoss);
            UndoScript.Frog3.Push(Vector3(FrogGO[2].transform.position.x, FrogGO[2].transform.position.y, -10));
			FrogGO[2].transform.position.x = MovePos[2].x;
			FrogGO[2].transform.position.y = MovePos[2].y;
			
	//		SR.enabled = false;
	//		frogGOJump3.SetActive(true);
	//		frogGOJump3.transform.position = Vector3.SmoothDamp(frogGOJump3.transform.position, Vector3(MovePos[2].x, MovePos[2].y, FrogGO[2].transform.position.z), velo, ST);	
	//	}
	//else {
	//SR.enabled = true;
	//frogGOJump3.SetActive(false);
	alpha3 = 2;
	//Debug.Log("333?");
	//		}
	//	}

}

function NowMove(){
	//if(alpha != 2){
	//var FGOT = FrogGO[0].GetComponentsInChildren(Transform);
	///var SR = FGOT[1].transform.gameObject.GetComponent(SpriteRenderer); //SetActive(false)
	//if (MovePos[0].x != 1000){
	//	var ST = 1;
	//	var velo = Vector3.zero;
		//frogGOJump.transform.position = FrogGO[0].transform.position;
        UndoScript.Frog1.Push(Vector3(FrogGO[0].transform.position.x, FrogGO[0].transform.position.y, -10));	
        FrogGO[0].transform.position.x = MovePos[0].x;
		FrogGO[0].transform.position.y = MovePos[0].y;
		
		//if (!(Mathf.Approximately(frogGOJump.transform.position.x, MovePos[0].x))){
		//	SR.enabled = false;
		//	frogGOJump.SetActive(true);
		//	frogGOJump.transform.position = Vector3.Lerp(frogGOJump.transform.position, Vector3(MovePos[0].x, MovePos[0].y, FrogGO[0].transform.position.z),ST);	
	//	}
	//else {
	//SR.enabled = true;
//	frogGOJump.SetActive(false);
	alpha = 2;
//	Debug.Log("JHerE?");
//			}
//		}
//	}
}


private var currFrog : GameObject;

function Update () {

if (failOrSuccess == 0){
if (TouchToSinkLeaves.move == 1){ // This is trigger that its now My move :P
Startt();
var UpdateRecievePos : Vector3[] = new Vector3[FL];
//Debug.Log(alpha+" "+alpha2+" "+alpha3);
		reached = 0;
		TouchToSinkLeaves.move = 2;
		for (var a : int = 0; a < FL; a++){
		currFrog = FrogGO[a];
		frogGOJump.transform.position.x = FrogGO[a].transform.position.x;
		frogGOJump.transform.position.y = FrogGO[a].transform.position.y;
		var FGOT = FrogGO[a].GetComponentsInChildren(Transform);
		//Debug.Log(FGOT[0]+" "+FGOT[1]+" "+FGOT[2]+" "+FGOT[3]+" "+FGOT[4]+" "+FGOT[5]+" "+FGOT[6]+" "+FGOT[]);
		frogGOChild = FGOT[1].transform.gameObject;
		//LevelFail = FGOT[8].transform.gameObject;
		redo = 0; badPlace = Vector3.zero; // these are to prevent same leaf jump and colleague past leaf jump
		UpdateRecievePos[a] = DoYourJob(FrogGO[a]);
		UpdateRecievePos[a] = check(UpdateRecievePos[a], a,FrogGO[a] ); // to prevent same leaf jump and colleague past leaf jump
		Debug.Log("To MovePos"+UpdateRecievePos[a]);
			}
			MovePos = new Vector3[UpdateRecievePos.Length]; 
			MovePos = UpdateRecievePos;
			lastMoved = MovePos;
		}
	}
if (TouchToSinkLeaves.move == 2){
//Debug.Log(alpha+" "+alpha2+" "+alpha3);
//alpha = 1; alpha2 = 1; alpha3 = 1;
	if (FrogGO[0] != null){ NowMove();
		if (FrogGO[1] != null){NowMove2();
			if (FrogGO[2] != null){NowMove3();}
			else {alpha3 = 2;}}
		else {alpha2 = 2; alpha3 = 2;}}
}

if (alpha == 2 && alpha2 == 2 && alpha3 == 2){ TouchToSinkLeaves.move = 0; alpha = 0; alpha2 = 0; alpha3 = 0; }

}


private var lastMoved : Vector3[];
private var currMoving : Vector3[];
private var redo : int = 0; // 0 -= false, 1 = true
private var badPlace : Vector3;

function check (calcPos : Vector3, FrogNo : int, FrogOG : GameObject){


currMoving[FrogNo] = calcPos;
if (lastMoved[FrogNo] != Vector3.zero){
Debug.Log("is it going in hre?");
for (var LM in lastMoved){
	if (LM == currMoving[FrogNo]){ redo = 1; badPlace = currMoving[FrogNo];}
}}

for (var a : int = 0; a < FrogNo; a++ ){
Debug.Log(" Or Here?");
	if (currMoving[a] == currMoving[FrogNo]){ redo = 1; badPlace = currMoving[FrogNo];}
}
if (redo == 1 ){
Debug.Log("bad Pos "+ badPlace+" forfrog# "+FrogNo);
	var Vec = DoYourJob(FrogOG); 
	currMoving[FrogNo] = Vec;
Debug.Log("New Pos "+Vec+" forfrog# "+FrogNo);
return Vec;
}
else{return calcPos;}
}



private var GetVal : Vector3;
function DoYourJob(FrogGOO : GameObject){
	
		FrogandTargetLeaf(FrogGOO); 			// get frog (frogLeaf) and target leaf (targetLeaf) //Get targetLeaf2
		GetAllActiveLeaves(); 			// get active leaves now; sort as per frog
		giveWeightsAs100ToAll();		// put 1000 to all; & Frog leaf at top of LeavesActiveInSceneInt
		if (yes2Targets == 1){ CalcFromCurrentToEndWeight_hh2();}
		else { CalcFromCurrentToEndWeight_hh();}
		CalcFromStartToCurrent_gg();
		CheckForGreaterThan1000Shit();
		print();
		if (yes2Targets == 1){GetVal = MainAStar2();}
		else {GetVal = MainAStar();}

		return GetVal;
	
}







// get frog (frogLeaf) and target leaf (targetLeaf)
	function FrogandTargetLeaf(FrogGOO : GameObject){ 
			var FrogLeafGOName : String;
			var TargetLeafGOName : String; 
			var hit : RaycastHit2D;
			// 2.A. Get Position of Frog an thus the Leaf on which it sits---------------------2A
			var frogGO = FrogGOO; 
			hit = Physics2D.Raycast ((frogGO.transform.position), Vector2.zero);
			if(hit.collider != null){
				FrogLeafGOName = hit.collider.gameObject.name; 
				frogLeaf = parseInt(FrogLeafGOName);} //Debug.Log("frogLeaf "+frogLeaf);}

			// 2.B. Get Position of Target an thus the Leaf on which it sits---------------------2B
			var TargetGO = GameObject.FindGameObjectWithTag("Target"); 
			if (TargetGO!= null){
			hit = Physics2D.Raycast ((TargetGO.transform.position), Vector2.zero);
			if(hit.collider != null){ 
				TargetLeafGOName = hit.collider.gameObject.name; 
				targetLeaf = parseInt(TargetLeafGOName); }//Debug.Log("targetLeaf "+targetLeaf);}
				}
			// 2.C. Get Position of Target#2 an thus the Leaf on which it sits---------------------2B
			if (yes2Targets == 1){
				var TargetGO2 = GameObject.FindGameObjectWithTag("Target2"); 
				if (TargetGO2 != null){
				hit = Physics2D.Raycast ((TargetGO2.transform.position), Vector2.zero);
			if(hit.collider != null){ 
				TargetLeafGOName = hit.collider.gameObject.name; 
				targetLeaf2 = parseInt(TargetLeafGOName); }}}//Debug.Log("targetLeaf2 "+targetLeaf2);}}}
	}

//1. Get all Active leaves
	function GetAllActiveLeaves(){ //1. Get all Active leaves -----------------------------------------------------
			var LeavesGO = GameObject.FindGameObjectWithTag("Leaves"); 
			LeavesActiveInScene = LeavesGO.GetComponentsInChildren.<Collider2D>(); 
			if (redo != 0){
				var LeavesActiveInScene1 = Fix(LeavesActiveInScene);
					LeavesActiveInScene = new Component[LeavesActiveInScene1.Length];
					LeavesActiveInScene = LeavesActiveInScene1; }// to prevent same leaf jump and colleague past leaf jump
			LeavesActiveInSceneInt = new int[LeavesActiveInScene.Length]; 
			for (var a : int = 0; a < LeavesActiveInScene.Length; a++){
			LeavesActiveInSceneInt[a] = parseInt(LeavesActiveInScene[a].gameObject.name);}
			SortAsPerNeighbours(); 
	}
	function SortAsPerNeighbours(){
			for (var b : int = 0; b < LeavesActiveInSceneInt.Length; b++){
			if (LeavesActiveInSceneInt[b] == frogLeaf){ 
				var tempvar = LeavesActiveInSceneInt[0]; 
				LeavesActiveInSceneInt[0] = frogLeaf; 
				LeavesActiveInSceneInt[b] = tempvar; 
				b = LeavesActiveInSceneInt.Length;
					}
				}

			//Here Sort as per neighbours
			var temp : int[] = new int[LeavesActiveInSceneInt.Length]; 
			temp[0] = frogLeaf;
			var i : int = 0; var j : int = 0; 
			for (var c : int = 0; c < LeavesActiveInSceneInt.Length; c++){
				var curr = temp[c]; 
				for (var a : int = 0; a < LeavesActiveInSceneInt.Length; a++){
					if ((LeavesActiveInSceneInt[a] == (curr - 1 ) )||(LeavesActiveInSceneInt[a] == (curr + 1 ))||(LeavesActiveInSceneInt[a] == (curr - 10) )||(LeavesActiveInSceneInt[a] == (curr - 11))||(LeavesActiveInSceneInt[a] == (curr - 9 ))||(LeavesActiveInSceneInt[a] == (curr + 10))||(LeavesActiveInSceneInt[a] == (curr + 11))||(LeavesActiveInSceneInt[a] == (curr + 9 ))){
	 					j = 0; 
	 					for (var d : int = 0; d < LeavesActiveInSceneInt.Length; d++){
	 						if (temp[d] == LeavesActiveInSceneInt[a]){ j = 1; d = LeavesActiveInSceneInt.Length;}}
	 						if (j!= 1){
	 							i++; 
					 			temp[i] = LeavesActiveInSceneInt[a];
		 					}}}}
				LeavesActiveInSceneInt = temp; 
				see(); 
	}

	function see(){
			for (var a : int = 0; a < 9; a++){ //Debug.Log(LeavesActiveInSceneInt[a]); 
			}
	}


	function Fix(LeavesActiveColl : Collider2D[] ){
	var pos : int= 0;
	for (var a : int = 0; a < LeavesActiveColl.Length; a++){
		if (LeavesActiveColl[a].gameObject.transform.position == badPlace){
				LeavesActiveColl[a] = LeavesActiveColl[LeavesActiveColl.Length -1];
			}
	}
	var ret = new Collider2D[LeavesActiveColl.Length - 1];
	for (var b : int = 0; b < (LeavesActiveColl.Length - 1); b++){
		ret[b] = LeavesActiveColl[b];
		}

	return ret;

	}

	function giveWeightsAs100ToAll(){
		OpenNodes = new int[LeavesActiveInScene.Length]; 
		OpenNodesWeight = new float[LeavesActiveInScene.Length]; 
		parent_Open = new int[LeavesActiveInScene.Length];
		ClosedNodes = new int[LeavesActiveInScene.Length]; 
		ClosedNodesWeight = new float[LeavesActiveInScene.Length]; 
		parent_Closed = new int[LeavesActiveInScene.Length];
		FromStartToCurrentWeight_gg = new float[LeavesActiveInSceneInt.Length]; 
		FromCurrentToEndWeight_hh = new float[LeavesActiveInSceneInt.Length];
		for (var a : int = 0; a < LeavesActiveInSceneInt.Length; a++){ 
			FromStartToCurrentWeight_gg[a] = 1000; OpenNodesWeight[a] = 1000; }
		for (var b : int = 0; b < LeavesActiveInScene.Length; b++){ 
			if (LeavesActiveInSceneInt[b] == frogLeaf){ 
				var tempvar = LeavesActiveInSceneInt[0]; 
				LeavesActiveInSceneInt[0] = frogLeaf; 
				LeavesActiveInSceneInt[b] = tempvar; 
				FromStartToCurrentWeight_gg[0] = 0; 
				OpenNodes[0] = frogLeaf; 
				OpenNodesWeight[0]= 0; 
				parent_Open[0] = frogLeaf; 
				OpenListLength = 1; } }
	}

	function GetXandYvalues(val : int) : int[]{
	var X = val/10; var Y = val - (X*10); var retVal = new int[2]; retVal[0] = X; retVal[1] = Y; return retVal;
	}

 // Calc h for all nodes
function CalcFromCurrentToEndWeight_hh(){ // FromCurrentToEndWeight_hh[] // Calc h for all nodes
		var Target = GetXandYvalues(targetLeaf);
		var TargetX = Target[0];
		var TargetY = Target[1];
	for(var a : int = 0; a < LeavesActiveInSceneInt.Length; a++){
		var curr = LeavesActiveInSceneInt[a];
		var cur = GetXandYvalues(curr);
		var curX = cur[0];
		var curY = cur[1];
		FromCurrentToEndWeight_hh[a] = Mathf.Sqrt(((TargetX-curX)*(TargetX-curX))+((TargetY-curY)*(TargetY-curY)));
		}
}

// Calc h for all nodes
function CalcFromCurrentToEndWeight_hh2(){ // FromCurrentToEndWeight_hh[] // Calc h for all nodes
		var Target = GetXandYvalues(targetLeaf); var Target2 = GetXandYvalues(targetLeaf2);
		var TargetX = Target[0];				 var TargetX2 = Target2[0];
		var TargetY = Target[1];				 var TargetY2 = Target2[1];

	for(var a : int = 0; a < LeavesActiveInSceneInt.Length; a++){
		var curr = LeavesActiveInSceneInt[a];
		var cur = GetXandYvalues(curr);
		var curX = cur[0];
		var curY = cur[1];
		FromCurrentToEndWeight_hh[a] = (Mathf.Sqrt(((TargetX-curX)*(TargetX-curX))+((TargetY-curY)*(TargetY-curY))))+(Mathf.Sqrt(((TargetX2-curX)*(TargetX2-curX))+((TargetY2-curY)*(TargetY2-curY))));
		}
}


//2. Step 2  // LeavesActiveInScene = name & LeafAllWeights = weights
	function CalcFromStartToCurrent_gg(){  //2. Step 2  // LeavesActiveInScene = name & LeafAllWeights = weights
		for (var a : int = 0; a < LeavesActiveInSceneInt.Length; a++ ){ 
			WeighTheLeaves(LeavesActiveInSceneInt[a], FromStartToCurrentWeight_gg[a]);} 
	}
		function WeighTheLeaves(curr : int, wt : int) {
			for (var a : int = 0; a < LeavesActiveInSceneInt.Length; a++){  // iterate through all active Leaves and check on 8 criteria
				if((LeavesActiveInSceneInt[a] == (curr - 1 ) )||(LeavesActiveInSceneInt[a] == (curr + 1 ))||(LeavesActiveInSceneInt[a] == (curr - 10) )||(LeavesActiveInSceneInt[a] == (curr - 11))||(LeavesActiveInSceneInt[a] == (curr - 9 ))||(LeavesActiveInSceneInt[a] == (curr + 10))||(LeavesActiveInSceneInt[a] == (curr + 11))||(LeavesActiveInSceneInt[a] == (curr + 9 ))){
	  				if (FromStartToCurrentWeight_gg[a] > (wt+1)){ 
	  					FromStartToCurrentWeight_gg[a] = (wt+1); } } }// for loop end	
		}


	function CheckForGreaterThan1000Shit(){
		var i : int = 0; 
		for (var a : int = 0; a < LeavesActiveInSceneInt.Length; a++){ 
			if ((FromStartToCurrentWeight_gg[a]+FromCurrentToEndWeight_hh[a]) > 1000){
				var temp = LeavesActiveInSceneInt[a] - 10; 
				var temp1 : int; 
				for (var b : int = 0; b < LeavesActiveInSceneInt.Length; b++){
					if (LeavesActiveInSceneInt[b] == temp ){temp1 = b;}}
		if (FromStartToCurrentWeight_gg[temp1]!= null){ 
			if (FromStartToCurrentWeight_gg[temp1] < 1000){ 
				FromStartToCurrentWeight_gg[a] = FromStartToCurrentWeight_gg[temp1]; 
				b = LeavesActiveInSceneInt.Length;} } } }
	}

	function print(){ for (var a : int = 0; a < LeavesActiveInSceneInt.Length; a++){ if ((FromStartToCurrentWeight_gg[a]+FromCurrentToEndWeight_hh[a]) > 1000){ Debug.Log(LeavesActiveInSceneInt[a] + " h "+(FromStartToCurrentWeight_gg[a]+FromCurrentToEndWeight_hh[a])); Debug.Log(ClosedNodes[a]);}}}


function MainAStar() : Vector3{
		var flag : int = 0;
		var weightOfNeigh_gg : float;
		var parent_temp : int;

while((reached == 0)&&(OpenListLength != 0)){	// 0 = false, 1 = true; 
	var lowestValInOpen = sortOpenList(); // Get the least value f node from open list;
	if (lowestValInOpen[0] == targetLeaf){
			reached = 1 ;
			Debug.Log("Post Lost Shit");
			//YouWon();
			//var vec33 = moveFrogAfterAStarAlgo();
			//return vec33;
			//reached = 1;
			break;
		 	} // if end

	else {
		// 1. remove from Open list
		removeFromOpenList(lowestValInOpen);// 1.remove the fetched value from Open List
		// 2. Move the current node to the closed list
		for (var a : int = 0; a < LeavesActiveInSceneInt.Length; a++){
			if (LeavesActiveInSceneInt[a] == lowestValInOpen[0]){ // we found the lowest in all's list; now move to closed list
				weightOfNeigh_gg = FromStartToCurrentWeight_gg[a]+1 ;
				parent_temp = lowestValInOpen[0];
				for (var b : int = 0; b < ClosedNodes.Length ; b++){
					if (ClosedNodes[b] == 0){ // so we found the next available slot
						ClosedNodes[b] = lowestValInOpen[0];
						ClosedNodesWeight[b] = lowestValInOpen[1];
						parent_Closed[b] = lowestValInOpen[2];  
						//Debug.Log(ClosedNodes[b]);
						b = LeavesActiveInSceneInt.Length;
						a = LeavesActiveInSceneInt.Length;
						}
					}
				}
			} // for end

		// 3. Get neighbours of lowestValInOpen's
		var neigh = GetNeighboursOf(lowestValInOpen[0]); // So now we have neighbours of lowest Value 
		for (var c : int = 0; c < 8; c++){ // for each neighbour
			if (neigh[c] != targetLeaf ){ // if any neigh is target leaf ?
			if (neigh[c] != 0){  //make sure no 0 value of neigh[c] is going in
				flag = 0;
				for (var g : int = 0; g < LeavesActiveInSceneInt.Length; g++){
					if (LeavesActiveInSceneInt[g] == neigh[c]){ // we find this neigh in All's list

				// A. if this neigh is in closed list?
				if (flag == 0){
					for (var d : int = 0; d < ClosedNodes.Length; d++){
						if (neigh[c] == ClosedNodes[d]){		//if this neigh is in closed list?
							flag = 1;

/*here use g next*/			if ((weightOfNeigh_gg + FromCurrentToEndWeight_hh[g] ) < ClosedNodesWeight[d]){ //Check the weights g in closed list
								ClosedNodesWeight[d] = (weightOfNeigh_gg + FromCurrentToEndWeight_hh[g] );
								parent_Closed[d] = parent_temp; // Also replace the parent !!
							}
							d = ClosedNodes.Length;
							g = LeavesActiveInSceneInt.Length;
						}
					}
				}													// end - for loop to check in closed list 

				// B. else if this neigh is in Open list?
				if (flag == 0){
					for (var e : int = 0; e < OpenNodes.Length; e++){
						if (neigh[c] == OpenNodes[e]){     //Check the weights g in Open list
							flag = 1;
/*here use g next*/			if ((weightOfNeigh_gg + FromCurrentToEndWeight_hh[g] ) < OpenNodesWeight[e]){ //Check the weights g in Open list
								OpenNodesWeight[e] = (weightOfNeigh_gg + FromCurrentToEndWeight_hh[g] );
								parent_Open[e] = parent_temp; // Also replace the parent !!
							}
							g = LeavesActiveInSceneInt.Length;
							e = OpenNodes.Length;
						}
					}
				}

				// C. else this neigh was neither in closed or open list, so add to open list
				if (flag == 0){
					for (var f : int = 0; f < OpenNodes.Length; f++){
						if (OpenNodes[f] == 0){				//So we found next available slot in Open list :/
							OpenNodes[f] = neigh[c];
							OpenNodesWeight[f] = (weightOfNeigh_gg + FromCurrentToEndWeight_hh[g] );
							parent_Open[f] = parent_temp;
							f = OpenNodes.Length;
							g = LeavesActiveInSceneInt.Length;
							OpenListLength++;
							// We need to set g value and I suppose f value in OpenList from parent!
							}
						}
				//flag = 1;
					}
			//flag = 0;
				}
			} // end - for loop to find neigh in All's List

					} // end  - make sure no 0 value of neigh[c] is going in
				}// end -if any of neigh is TargetLeaf?
	else {
		for (var l : int = 0; l < ClosedNodes.Length; l++){
			if(ClosedNodes[l] == 0){
				ClosedNodes[l] = neigh[c];
				parent_Closed[l] = ClosedNodes[l-1]; 
				l = ClosedNodes.Length;
			}
		}
		var vec3 = moveFrogAfterAStarAlgo();
		return vec3;
		reached = 1;
		break;
	}
			} // end - for each neighbour

			//Debug.Log("Here last part");
			//reached = 1;
			//break;
		} // Main else end


	} // While end
	if (OpenListLength == 0){
//		Debug.Log("OpenListLength = "+OpenListLength);
		Debug.Log("You Won !!!! !!");
		YouWonPanel.SetActive(true);
		if (PlayerPrefs.GetInt("BGMusic") == 1){  ASYouWonOrFail.Play();}
		return Vector3(1000,1000,1000);
	}
}


	function MainAStar2() : Vector3{
		var flag : int = 0;
		var weightOfNeigh_gg : float;
		var parent_temp : int;

while((reached == 0)&&(OpenListLength != 0)){	// 0 = false, 1 = true; 
	var lowestValInOpen = sortOpenList(); // Get the least value f node from open list;
	if ((lowestValInOpen[0] == targetLeaf2)||(lowestValInOpen[0] == targetLeaf)){
			reached = 1 ;
			Debug.Log("You Win 3 !!");
			YouWon();
			var vec33 = moveFrogAfterAStarAlgo();
			//Debug.Log("vec33 "+vec33);
			return vec33;
			reached = 1;
			break;
		 	} // if end

	else {	
		// 1. remove from Open list
		removeFromOpenList(lowestValInOpen);// 1.remove the fetched value from Open List
		// 2. Move the current node to the closed list
		for (var a : int = 0; a < LeavesActiveInSceneInt.Length; a++){
			if (LeavesActiveInSceneInt[a] == lowestValInOpen[0]){ // we found the lowest in all's list; now move to closed list
				weightOfNeigh_gg = FromStartToCurrentWeight_gg[a] + 1;
				parent_temp = lowestValInOpen[0];
				for (var b : int = 0; b < ClosedNodes.Length ; b++){
					if (ClosedNodes[b] == 0){ // so we found the next available slot
						ClosedNodes[b] = lowestValInOpen[0];
						ClosedNodesWeight[b] = lowestValInOpen[1];
						parent_Closed[b] = lowestValInOpen[2];  
						//Debug.Log(ClosedNodes[b]);
						b = LeavesActiveInSceneInt.Length;
						a = LeavesActiveInSceneInt.Length;
						}
					}
				}
			} // for end

		// 3. Get neighbours of lowestValInOpen's
		var neigh = GetNeighboursOf(lowestValInOpen[0]); // So now we have neighbours of lowest Value 
		for (var c : int = 0; c < 8; c++){ // for each neighbour
			if ((neigh[c] != targetLeaf2 )&&((neigh[c] != targetLeaf ))){ // if any neigh is target leaf ?
			if (neigh[c] != 0){  //make sure no 0 value of neigh[c] is going in
				flag = 0;
				for (var g : int = 0; g < LeavesActiveInSceneInt.Length; g++){
					if (LeavesActiveInSceneInt[g] == neigh[c]){ // we find this neigh in All's list

				// A. if this neigh is in closed list?
				if (flag == 0){
					for (var d : int = 0; d < ClosedNodes.Length; d++){
						if (neigh[c] == ClosedNodes[d]){		//if this neigh is in closed list?
							flag = 1;
							if ((weightOfNeigh_gg + FromCurrentToEndWeight_hh[g] ) < ClosedNodesWeight[d]){ //Check the weights g in closed list
								ClosedNodesWeight[d] = (weightOfNeigh_gg + FromCurrentToEndWeight_hh[g] );
								parent_Closed[d] = parent_temp; // Also replace the parent !!
							}
							d = ClosedNodes.Length;
							g = LeavesActiveInSceneInt.Length;
						}
					}
				}													// end - for loop to check in closed list 

				// B. else if this neigh is in Open list?
				if (flag == 0){
					for (var e : int = 0; e < OpenNodes.Length; e++){
						if (neigh[c] == OpenNodes[e]){     //Check the weights g in Open list
							flag = 1;
/*here use g next*/			if ((weightOfNeigh_gg + FromCurrentToEndWeight_hh[g] ) < OpenNodesWeight[e]){ //Check the weights g in Open list
								OpenNodesWeight[e] = (weightOfNeigh_gg + FromCurrentToEndWeight_hh[g] );
								parent_Open[e] = parent_temp; // Also replace the parent !!
							}
							g = LeavesActiveInSceneInt.Length;
							e = OpenNodes.Length;
						}
					}
				}

				// C. else this neigh was neither in closed or open list, so add to open list
				if (flag == 0){
					for (var f : int = 0; f < OpenNodes.Length; f++){
						if (OpenNodes[f] == 0){				//So we found next available slot in Open list :/
							OpenNodes[f] = neigh[c];
							OpenNodesWeight[f] = (weightOfNeigh_gg + FromCurrentToEndWeight_hh[g] );
							parent_Open[f] = parent_temp;
							f = OpenNodes.Length;
							g = LeavesActiveInSceneInt.Length;
							OpenListLength++;
							}
						}
					}
				}
			} // end - for loop to find neigh in All's List

					} // end  - make sure no 0 value of neigh[c] is going in
				}// end -if any of neigh is TargetLeaf?
	else {
		for (var l : int = 0; l < ClosedNodes.Length; l++){
			if(ClosedNodes[l] == 0){
				ClosedNodes[l] = neigh[c];
				parent_Closed[l] = ClosedNodes[l-1]; 
				l = ClosedNodes.Length;
			}
		}
		var vec3 = moveFrogAfterAStarAlgo();
		//Debug.Log("vec3 "+vec3);
		return vec3;
		reached = 1;
		break;
	}
			} // end - for each neighbour

			//Debug.Log("Here last part");
			//reached = 1;
			//break;
		} // Main else end


	} // While end
	if (OpenListLength == 0){
//		Debug.Log("OpenListLength = "+OpenListLength);
		Debug.Log("You Won !!!! !!");
		YouWonPanel.SetActive(true);
		if (PlayerPrefs.GetInt("BGMusic") == 1){  ASYouWonOrFail.Play(); }
		return Vector3(1000,1000,1000);
	}
}




//So this is gonna sort OpenList as per lowest weights and retun name, weight
	function sortOpenList(): int[]{ 
		var retVar = new int[3]; 
		for (var a : int = 0; a < (OpenNodes.Length); a++){ 
			for(var b : int = a + 1 ; b < (OpenNodes.Length); b++){
				if(OpenNodesWeight[a] > OpenNodesWeight[b]){ 
					var temp = OpenNodesWeight[b]; 
					OpenNodesWeight[b] = OpenNodesWeight[a]; 
					OpenNodesWeight[a] = temp;	
					var temp1 = OpenNodes[b]; 
					OpenNodes[b] = OpenNodes[a]; 
					OpenNodes[a] = temp1; 
					var temp3 = parent_Open[b]; 
					parent_Open[b] = parent_Open[a]; 
					parent_Open[a] = temp3;}}}
		retVar[0] = OpenNodes[0]; 
		retVar[1] = OpenNodesWeight[0]; 
		retVar[2] = parent_Open[0]; 
		return retVar;
	}


	function removeFromOpenList(curr : int[]){ 
		OpenNodes[0] = 0; 
		OpenNodesWeight[0] = 1000; 
		parent_Open[0] = 0; 
		OpenListLength = 0; 
		for (var a : int = 0; a <OpenNodes.Length; a++ ){ 
			if (OpenNodes[a] != 0 ){ 
				OpenListLength++; } } }


	function GetNeighboursOf(curr : int) : int[]{ 
		var retVar = new int[8]; var i : int = 0;
		for (var a : int = 0; a < LeavesActiveInSceneInt.Length ; a++){
		if((LeavesActiveInSceneInt[a] == (curr - 1 ) )||(LeavesActiveInSceneInt[a] == (curr + 1 ))||(LeavesActiveInSceneInt[a] == (curr - 10) )||(LeavesActiveInSceneInt[a] == (curr - 11))||(LeavesActiveInSceneInt[a] == (curr - 9 ))||(LeavesActiveInSceneInt[a] == (curr + 10))||(LeavesActiveInSceneInt[a] == (curr + 11))||(LeavesActiveInSceneInt[a] == (curr + 9 ))){
		if (i>=8){break;}
	 	retVar[i] = 
	 	LeavesActiveInSceneInt[a]; 
	 	i++; } }
	 	return retVar;
	}


	function moveFrogAfterAStarAlgo() : Vector3{
		var ToMovePos : int;
		if (yes2Targets == 1){ToMovePos = GetPath2(); }
		else {ToMovePos = GetPath();}

		var frogGO = GameObject.Find(frogLeaf.ToString()); 
		var ToMovePosGO = GameObject.Find(ToMovePos.ToString());
		//Debug.Log("Jumped Leaf "+ ToMovePosGO);
		if (ToMovePosGO != null){
			var TargetGO = GameObject.Find(targetLeaf.ToString());
			var hit = Physics2D.Raycast ((TargetGO.transform.position), Vector2.zero);
			if(hit.collider != null){
				var TargetLeafGOName = hit.collider.gameObject.name;
				if (TargetLeafGOName == ToMovePosGO.name){Debug.Log("You Lost !! :DD"); var T1 = GameObject.FindGameObjectWithTag("Target"); Lost(T1);}
			}
			if (yes2Targets == 1){
			var TargetGO2 = GameObject.Find(targetLeaf2.ToString());
			var hit2 = Physics2D.Raycast ((TargetGO2.transform.position), Vector2.zero);
			if (hit2.collider != null){
				var TargetLeafGOName2 = hit2.collider.gameObject.name;
				if (TargetLeafGOName2 == ToMovePosGO.name){Debug.Log("You Lost !! :DD"); var T2 = GameObject.FindGameObjectWithTag("Target2"); Lost(T2);}
				}
			}
			caterpillarExpressions();
		 	return ToMovePosGO.transform.position;
		}
		else{
			Debug.Log("Cant find ToMovePosGO "+ToMovePosGO);
			}
	}

//Decode parent and Closed nodes shit
	function GetPath() : int {
		numberOfHops = 0; 
		var ToMovePos : int; 
		var i : int = 0;
		for(var a : int = 0; a < ClosedNodes.Length; a++){ 
			if (ClosedNodes[a] != 0){ 
				i++; 
				//Debug.Log(parent_Closed[a]+" "+ClosedNodes[a]);
				 } }
		var match_name = targetLeaf;
		for(var b : int = (i-1); b >= 0 ; b--){
			if (ClosedNodes[b] == match_name){
				numberOfHops++;
				//Debug.Log(parent_Closed[b]);
				match_name = parent_Closed[b];
				if (match_name == frogLeaf ){
					ToMovePos = ClosedNodes[b];
					b = -20;
					//Debug.Log("ToMovePos "+ToMovePos);
				}
			}
		}
		return ToMovePos;
	}

// Get next jump leaf as per nearest of two targets
	function GetPath2() : int {
		numberOfHops = 0; 
		numberOfHops1 = 0; 
		var ToMovePos : int; 
		var ToMovePos2 : int; 

		var i : int = 0;
		for(var a : int = 0; a < ClosedNodes.Length; a++){ 
			if (ClosedNodes[a] != 0){ 
				i++; 
				//Debug.Log(parent_Closed[a]+" "+ClosedNodes[a]);
				} }

		var match_name = targetLeaf;
		for(var b : int = (i-1); b >= 0 ; b--){
			if (ClosedNodes[b] == match_name){
				numberOfHops++;
				match_name = parent_Closed[b];
				if (match_name == frogLeaf ){
					ToMovePos = ClosedNodes[b];
					b = -20;
					//Debug.Log("ToMovePos "+ToMovePos);
				}
			}
		}

			var match_name2 = targetLeaf2;
			for(var c : int = (i-1); c >= 0 ; c--){
			if (ClosedNodes[c] == match_name2){
				numberOfHops1++;
				//Debug.Log(parent_Closed[b]);
				match_name2 = parent_Closed[c];
				if (match_name2 == frogLeaf ){
					ToMovePos2 = ClosedNodes[c];
					c = -20;
					//Debug.Log("ToMovePos "+ToMovePos);
				}
			}
		} 

		if (numberOfHops1 !=0){
			if (numberOfHops1 < numberOfHops){
				//Debug.Log("ToMovePos2 "+ToMovePos2);
				return ToMovePos2;
				}
			else if(numberOfHops !=0){
					//Debug.Log("ToMovePos "+ToMovePos); 
					return ToMovePos;
					}
				 else{
				 	//Debug.Log("ToMovePos2 "+ToMovePos2); 
				 	return ToMovePos2;
				 	}
			}
		else {
			//Debug.Log("ToMovePos "+ToMovePos); 
			return ToMovePos;
			}
	}


function Lost(GO : GameObject){ fail(GO); }


function YouWon(){ 
	failOrSuccess = 1; 
	yield WaitForSeconds(1); 
	YouWonPanel.SetActive(true);
		if (PlayerPrefs.GetInt("BGMusic") == 1){ ASYouWonOrFail.Play();}
		}




function fail(GO : GameObject){



	failOrSuccess = 1; 
	PlayerPrefs.SetInt("Star"+Application.loadedLevel, 0 ); 
	var SR1 = currFrog.transform.Find("FailImage");
	SR1.gameObject.SetActive(true);
	if(GO != null){ GO.SetActive(false); }
	var SR = currFrog.transform.Find("GO");
	SR.gameObject.SetActive(false);
	Debug.Log("Failed here !!");
	yield WaitForSeconds(1); 
	FailFrogGo.SetActive(true);
	if (PlayerPrefs.GetInt("BGMusic") == 1){
	 ASYouWonOrFail.Play();
		}
	//}
	}





function caterpillarExpressions(){

var T1  = GameObject.FindGameObjectWithTag("Target");
if (T1 != null){
var C1 = T1.GetComponentsInChildren(Transform);
//Debug.Log(C1.Length+" Hops "+numberOfHops);

//Debug.Log("Hops1 "+numberOfHops+" "+C1[14]+" "+C1[15]+" "+C1[16]);

var Happy1 = C1[6].transform.gameObject.GetComponent(SpriteRenderer);
var Happy2 = C1[7].transform.gameObject.GetComponent(SpriteRenderer);
var Happy3 = C1[8].transform.gameObject.GetComponent(SpriteRenderer);

if (numberOfHops == 2 || numberOfHops == 1){Happy1.enabled = false; Happy2.enabled = false; Happy3.enabled = true;}
else if (numberOfHops == 3){Happy1.enabled = false; Happy2.enabled = true; Happy3.enabled = false;}
else{Happy1.enabled = true; Happy2.enabled = false; Happy3.enabled = false;}
}

var T2  = GameObject.FindGameObjectWithTag("Target2");
if (T2 != null){
var C2 = T2.GetComponentsInChildren(Transform);
//Debug.Log("Hops2 "+numberOfHops1+" "+C2[13]+" "+C2[14]+" "+C2[15]);

var Happy11 = C2[2].transform.gameObject.GetComponent(SpriteRenderer);
var Happy22 = C2[3].transform.gameObject.GetComponent(SpriteRenderer);
var Happy33 = C2[4].transform.gameObject.GetComponent(SpriteRenderer);

if (numberOfHops1 == 2 || numberOfHops1 == 1){Happy11.enabled = false; Happy22.enabled = false; Happy33.enabled = true;}
else if (numberOfHops1 == 3){Happy11.enabled = false; Happy22.enabled = true; Happy33.enabled = false;}
else{Happy11.enabled = true; Happy22.enabled = false; Happy33.enabled = false;}
}

//14, 15, 16 - T1
//13, 14, 15 - T2



}

