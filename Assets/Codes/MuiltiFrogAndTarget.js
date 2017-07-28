#pragma strict

private var FrogGO : GameObject[]; var FL : int; //FrogGO Length
private var CatGO : GameObject[]; var CL : int; // CatGO Length

private var FrogLeaf : GameObject[];
private var CatLeaf : GameObject[];

private var Leaf : GameObject[];

//private var ON : GameObject[];
//private var OW : float[];
//private var OP : GameObject[];
//private var OL : int;

//private var CN : GameObject[];
//private var CW : float[];
//private var CP : GameObject[];

private var H  : float[];
private var G : float[,];//frog#,Wt

function Start () {


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

//find the length of FL and TL
FL = 0; CL = 0;
for (var a : int = 0; a < FrogGO.Length; a++ ){
	if (FrogGO[a] != null){FL++;}
	else {a = FrogGO.Length;}
}

for (var b : int = 0; b < CatGO.Length; b++ ){
	if (CatGO[b] != null){CL++;}
	else {b = CatGO.Length;}
}

FrogLeaf = new GameObject[FL];
CatLeaf = new GameObject[CL];

}

function MoveFrog(FrogNextPos : Vector2[]){
for (var a : int = 0; a < FrogNextPos.Length; a++){
	Debug.Log("Frog# "+a+" at leaf "+FrogLeaf[a]+" Now move pos "+FrogNextPos[a]);

	}
	TouchToSinkLeaves.move = 0;
}



function Update () {
if (TouchToSinkLeaves.move == 1){ // This is trigger that its now My move :P
		TouchToSinkLeaves.move = 2;
		var FrogNextPos = DoYourJob(); //return var is a Vector2[]
	}
if (TouchToSinkLeaves.move == 2){
	MoveFrog(FrogNextPos);
	}
}


function DoYourJob(){
var FrogMovePos : Vector2[] = new Vector2[FL];
	GetLeafs(); 
	GetH();
	put1000ToG();
	GetG();
	//put FL in Open list 
	//and begin main code
	for (var a : int = 0; a < FL; a++){   //for each frog
		FrogMovePos[a] = main(FrogLeaf[a], a);
		Debug.Log(FrogMovePos[a]);
	}
	return FrogMovePos;
}

//initializing Open and Closed lists
	private var ON = new Array();	private var CN = new Array();
	private var OW = new Array();	private var CW = new Array();
	private var OP = new Array();	private var CP = new Array();

function main(CurrFrogLeaf : GameObject, F : int){
var FrogMovePos : Vector2 = Vector2(0,0);


 ON.Push(CurrFrogLeaf); OW.Push(1) ; OP.Push(CurrFrogLeaf); 

while (ON.length != 0){ //While Open List Not empty

//find the node with least wt in Open list - call it LOW, LON, LOP
var LOW : float; var LON : GameObject; var LOP : GameObject; var atPos : int;
if (ON.length == 1){LOW = OW[0]; LON = ON[0]; LOP = OP[0]; atPos = 0;}
else {
	LOW = OW[0]; LON = ON[0]; LOP = OP[0]; atPos = 0;
	for (var w : int = 0; w < CN.length; w++){ 
	var tt : float = OW[w];
		if (LOW > tt ){
			LOW = OW[w]; LON = ON[w]; LOP = OP[w]; atPos = w; // 1
		}
	}
}// else end - of if ON.Length != 0
var i : int = 0;

// 1. remove from open list
OW.RemoveAt(atPos); ON.RemoveAt(atPos); OP.RemoveAt(atPos);

// 2. Move the current node to the closed list
CW.Push(LOW); CN.Push(LON); CP.Push(LOP);
i = 0;
// 3. Get neighbours of LOW
var nei = getNeigh(LON);
LOP = LON;
for (var ne in nei){ // for each of neighbours -
	for (var c : int = 0; c < Leaf.Length; c++){
	if (Leaf[c] == ne){
	//Debug.Log("Neighbour of "+LON+" "+ne);
	LOW = LOW + 1 + H[c];
	break;
	}
	}
	LON = ne;
	i = 0;
	// 3.A - if this neigh is Target- Done
	for (i = 0; i < CL; i++){
	if (CatLeaf[i] == LON){
	for (var g : int; g < CN.length; g++){
	Debug.Log("CN "+CN[g]+" CP "+CP[g]);
	}

		var match = LOP;
		for(var e : int = (CN.length-1); e >= 0; e--){
			if (CN[e] == match){
			match = CP[e];
				for (var f : int = (CP.length - 1); f >= 0; f--){
					if (match == CP[f]){

						if (CP[f] == CurrFrogLeaf){
						var GO : GameObject = CN[e];
						FrogMovePos = Vector2(GO.transform.position.x,GO.transform.position.y);
						break;
						}
					}
					if (FrogMovePos.x != 0){break;}
				}
			}
		}
		break;}}
	if (FrogMovePos.x != 0){break;}
	i = 0;
	// 3.B is this node in Open list?
	for (var OON in ON){
	if ( OON == ne){
		var wt : float = OW[i];
		if (LOW < wt){// check wts
			OW[i] = LOW;
			OP[i] = LOP;
		}
		continue;
		}
		i++;
	}
	i = 0;
	//3.C is this node in Closed list?
	for (var CCN in CN ){
	if ( CCN == ne){ 
		wt = CW[i];
		if (LOW < wt){// check wts
			CW[i] = LOW;
			CP[i] = LOP;
		}
		continue;
		}
		i++;
	}

	//3.D else move it to Open list
	OW.Push(LOW); ON.Push(LON); OP.Push(LOP);
	if (FrogMovePos.x != 0){break;}

}// for loop end - for each of neigh
if (FrogMovePos.x != 0){break;}
}// end of While loop

return FrogMovePos;
}




function GetLeafs(){ 
	var hit : RaycastHit2D;
	//All Frogs leafs
	for (var a : int = 0; a < FL; a++){
		hit = Physics2D.Raycast ((FrogGO[a].transform.position), Vector2.zero);
		if(hit.collider != null){ 
			FrogLeaf[a] = hit.collider.gameObject;
			Debug.Log(FrogLeaf[a]);
				}
	}

	// All Cat leaf
	for (var b : int = 0; b < CL; b++){
		hit = Physics2D.Raycast ((CatGO[b].transform.position), Vector2.zero);
		if(hit.collider != null){ 
			CatLeaf[b] = hit.collider.gameObject;
			//Debug.Log(CatLeaf[b]);
			}
	}

	var LeavesGO = GameObject.FindGameObjectWithTag("Leaves"); 
	var LeafColliders = LeavesGO.GetComponentsInChildren.<Collider2D>();
	Leaf = new GameObject[LeafColliders.Length];
	//Debug.Log(LeafColliders.Length);
	for (var c : int = 0; c < LeafColliders.Length; c++){
		Leaf[c] = LeafColliders[c].gameObject;
	}
	G = new float[CL,Leaf.Length];
	}


function GetH(){ // Dis btn leaf and Cat
	// Setting H
H = new float[Leaf.Length];
var sum = new float[CL];
for(var a : int = 0; a < Leaf.Length; a++){ // for every leaf
	for (var b : int = 0; b < CL; b++){ // for every target
		var TL = GetXandYvalues(parseInt(Leaf[a].name.ToString()));
		var TT = GetXandYvalues(parseInt(CatLeaf[b].name.ToString()));
		sum[b] = Mathf.Sqrt(((TT[0]-TL[0])*(TT[0]-TL[0]))+((TT[1]-TL[1])*(TT[1]-TL[1])));
		H[a] =  H[a] + sum[b];
		}
	}
}

function GetXandYvalues(val : int) : int[]{
	var X = val/10; var Y = val - (X*10); var retVal = new int[2]; retVal[0] = X; retVal[1] = Y; return retVal;
	}


function GetG(){ // put g at top, 
for (var a : int = 0; a < FL; a++){  // for each frog

		// here we put FrogLeaf at 0
		for (var e : int = 0; e < Leaf.Length; e++){
			var tempp = Leaf[e];
			if (tempp.name == FrogLeaf[a].name){
				var tempvar = Leaf[0]; Leaf[0] = Leaf[e]; Leaf[e] = tempvar; 
				G[a,e] = 1;
				for (var aa : int = 0; aa <= a ; aa++){ // 
					var tempWt = G[aa, 0]; G[aa, 0] = G[aa, e]; G[aa, e] = tempWt;
				}
				e = Leaf.Length;
			}
		}

		//Here Sort as per neighbours
		var ttemp : int[] = new int[Leaf.Length]; ttemp[0] = parseInt(FrogLeaf[a].name.ToString());
		var i : int = 0; var j : int = 0;
		for (var f : int = 0; f < Leaf.Length; f++){
			var curre = ttemp[f]; 
				for (var g : int = 0; g < Leaf.Length; g++){
					var Tem = parseInt(Leaf[g].name.ToString());
					if ((Tem == (curre - 1 ) )||(Tem == (curre + 1 ))||(Tem == (curre - 10) )||(Tem == (curre - 11))||(Tem == (curre - 9 ))||(Tem == (curre + 10))||(Tem == (curre + 11))||(Tem == (curre + 9 ))){
	 					j = 0; 
	 					for (var h : int = 0; h < Leaf.Length; h++){ // this is cross checking if it already in ttemp[]
	 						if (ttemp[h] == Tem){
	 							j = 1; } }
	 					if (j!= 1){ i++; ttemp[i] = Tem;//Debug.Log("i "+i+" Leaf "+ttemp[i]+" a "+a );
	 					}}}

	 					}

	 	//here we transferrring back the int to GO
	 	var tempGOLeaf = new GameObject[Leaf.Length]; i = 0;
	 	for(var k : int = 0; k < Leaf.Length; k++){
	 		for(var l : int = 0; l < Leaf.Length; l++){
	 			if (ttemp[k] == parseInt(Leaf[l].name.ToString())){
	 				tempGOLeaf[i] = Leaf[l];
	 				//Debug.Log("tempGO "+ tempGOLeaf[i]+" a "+a);
	 				i++;
	 				l = Leaf.Length;
	 			}
	 		}
	 	}
			// now we have tempGOLeaf[] as the sorted LeafsGO
		for (var m : int = 0; m < Leaf.Length; m++){
			for (var n : int = 0; n < Leaf.Length; n++){
				if (tempGOLeaf[m] == Leaf[n]){
					var tteeGO = Leaf[n]; Leaf[n] = Leaf[m]; Leaf[m] = tteeGO;
					for (var bb : int = 0; bb <= a; bb++){
						var tteeWT = G[bb,n]; G[bb,n] = G[bb,m]; G[bb,m] = tteeWT;
					}
					n = Leaf.Length;
				}
			}
		}


	 	// Now finally we fucking give G
		for (var b : int = 0; b < Leaf.Length; b++ ){  // for each leaf
			var curr = parseInt(Leaf[b].name.ToString());
			for (var c : int = 0; c < Leaf.Length; c++){  // iterate through all active Leaves and check on 8 criteria
				var temp  = parseInt(Leaf[c].name.ToString());
				if((temp == (curr - 1 ) )||(temp == (curr + 1 ))||(temp == (curr - 10) )||(temp == (curr - 11))||(temp == (curr - 9 ))||(temp == (curr + 10))||(temp == (curr + 11))||(temp == (curr + 9 ))){
					if (G[a,c] > (G[a,b]+1)){
					//Debug.Log("curr "+curr+" G[a,c] "+G[a,c]+" temp "+temp+" G[a,b] "+G[a,b]);
					G[a,c] = (G[a,b]+1); 
					//Debug.Log("curr "+curr+" G[a,c] "+G[a,c]+" temp "+temp+" G[a,b] "+G[a,b]);
					} }
					}// for loop end
			//Debug.Log("a "+a+" G "+G[a, b]+" b "+b);
	  			}

for (var z : int = 0; z < Leaf.Length; z++){
		//Debug.Log("a "+a+" Leaf "+Leaf[z]+" Wt "+G[a,z]);
		}

	  		}
}


function put1000ToG(){
	for (var a : int = 0; a < FL; a++){
		for(var b : int = 0; b < Leaf.Length; b++){
			G[a,b] = 1000;
		}


	}

}

function getNeigh(GO : GameObject){
var curre = parseInt(GO.name.ToString());
var nei = new Array();
	for (var g : int = 0; g < Leaf.Length; g++){
		var Tem = parseInt(Leaf[g].name.ToString());
		if ((Tem == (curre - 1 ) )||(Tem == (curre + 1 ))||(Tem == (curre - 10) )||(Tem == (curre - 11))||(Tem == (curre - 9 ))||(Tem == (curre + 10))||(Tem == (curre + 11))||(Tem == (curre + 9 ))){
		nei.Push(Leaf[g]);
		}
	}
	return nei;
}

function findToMovePos(CatLeafGO : GameObject,LOP : GameObject){
Debug.Log(CatLeafGO);
Debug.Log(LOP);
Debug.Log(CN[0]);
Debug.Log(CP[0]);
var ret = Vector2(1.0,1.0);
return ret;
}