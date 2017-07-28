#pragma strict
import System.Collections.Generic;
import System;


public static var frogs   : List.< GameObject >;        
private var frogsChild    : List.< GameObject >;
private var frogsJMP      : List.< GameObject >;
public static var targets : List.< GameObject >;
private var frogsLeafs    : List.< GameObject >;
private var targetLeafs   : List.< GameObject >;
private var targetHappy   : List.< GameObject >; // Happy face
private var targetWat     : List.< GameObject >; // Wat face
private var targetSad     : List.< GameObject >; // Sad face

private var leafs         : List.< GameObject >;

private var openList      : listsForTheLogic.ListsOC;
private var closeList     : listsForTheLogic.ListsOC;
private var neighList     : listsForTheLogic.ListsOC;

// G from start
 
private var G1 : int[]; private var LG1 : GameObject[]; 
private var G2 : int[]; private var LG2 : GameObject[];
private var G3 : int[]; private var LG3 : GameObject[];


// H from Target

private var H1 : int[]; private var LH1 : GameObject[];
private var H2 : int[]; private var LH2 : GameObject[];
private var H3 : int[]; private var LH3 : GameObject[];
private var H4 : int[]; private var LH4 : GameObject[];
private var H5 : int[]; private var LH5 : GameObject[];


// F = G + H;
// get the path for each frog to each target, put least expensiv path to Final path
private var path1 : List.< GameObject >; 
private var path2 : List.< GameObject >;
private var path3 : List.< GameObject >;
private var path4 : List.< GameObject >;
private var path5 : List.< GameObject >;

private var path6 : List.< GameObject >; 
private var path7 : List.< GameObject >;
private var path8 : List.< GameObject >;
private var path9 : List.< GameObject >;
private var path10 : List.< GameObject >;

private var path11 : List.< GameObject >; 
private var path12 : List.< GameObject >;
private var path13 : List.< GameObject >;
private var path14 : List.< GameObject >;
private var path15 : List.< GameObject >;


public static var finalPathF1 : Array; private var hopPos1 : GameObject; private var targetChasing1 : GameObject;
public static var finalPathF2 : Array; private var hopPos2 : GameObject; private var targetChasing2 : GameObject;
public static var finalPathF3 : Array; private var hopPos3 : GameObject; private var targetChasing3 : GameObject;

private var done1 : int = 3;
private var done2 : int = 3;
private var done3 : int = 3;

private var moveFrog  : int;

public static var win : int ; // 0 = neutral / GamePlay; 1 = true / Player Win; 2 = false / Player loose; 3 = Pause all;

// misc variable for win and lost part
private var ASYouWonOrFail : AudioSource;
private var YouWonPanel    : GameObject;
private var LevelFail      : GameObject;



function Start () {
    moveFrog = -1;
    win = 0;
    weWon = 0;
    InitiateMiscVariables();   
}
           

function InitiateMiscVariables () {

    var MC : GameObject = GameObject.FindGameObjectWithTag("MainCamera");
    var ASYouWonOrFailGO = MC.transform.Find("AS WinORFail");
    ASYouWonOrFail = ASYouWonOrFailGO.GetComponent(AudioSource);
    if (Application.loadedLevel >= 5){
    var YouWonPanelTransform = MC.transform.Find("Canvas/Leaderboard");
    }
    else {
    YouWonPanelTransform = MC.transform.Find("Canvas/YouWon");
    }
    YouWonPanel = YouWonPanelTransform.gameObject;

    var LevelFailTransform = MC.transform.Find("Canvas/FailReason");
    LevelFail = LevelFailTransform.gameObject;

   


}

function Update () {
    //Debug.Log("One "+done1+" "+done2+" "+done3+" "+TouchToSinkLeaves.move+" "+frogs.Count);

    
        if (TouchToSinkLeaves.move == 1 & win == 0 ) {
            TouchToSinkLeaves.move = 8;
            resetPaths();
            GetLeavesActive(); // get active leafs
            GetTheActiveGO(); // get frogs and targets + their leafs
            getH(); // all the targets weights in H1-H5; LH1-LH5
            getG(); // all the Frogs   weights in G1-G3; LG1-LG3
            AStarAlgo();
            done1 = 3; done2 = 3; done3 = 3;
            if(frogs.Count > 0){done1 = 0;}
            if(frogs.Count > 1){done2 = 0;}
            if(frogs.Count > 2){done3 = 0;}
        }
        
        if (TouchToSinkLeaves.move == 8){
            TouchToSinkLeaves.move = 9;
            setUndoVal();
            SetTargetFace();
        }
        
        if(TouchToSinkLeaves.move == 9){
           
            Move();
        
            if(frogs.Count == 1 & done1 == 1 & done2 == 3 & done3 == 3){TouchToSinkLeaves.move = 0; done1 = 3;}
            if(frogs.Count == 2 & done1 == 1 & done2 == 1 & done3 == 3){TouchToSinkLeaves.move = 0; done1 = 3; done2 = 3;}
            if(frogs.Count == 3 & done1 == 1 & done2 == 1 & done3 == 1){TouchToSinkLeaves.move = 0; done1 = 3; done2 = 3; done3 = 3;}
        }
     

        if (win == 1){
            weWon = 2;
            Debug.Log(weWon);
            PlayerWin();
        }
        if (win == 2){
            weWon = 1;
            Debug.Log(weWon);
            PlayerLost();
        }

}

public static var weWon : int = 0; // if gameplay = 0; if caterpillar died = 1; if Frog dead = 2;

private var fromWin : int;

function PlayerWin(){ // if win == 1
    fromWin = 1;
  //  if (PlayerPrefs.GetInt("StarCurr") == 3){

       // Debug.Log("WIN "+win);
        win = 3;
        if (PlayerPrefs.HasKey("Star"+Application.loadedLevel)){
            if (PlayerPrefs.GetInt("StarCurr") > PlayerPrefs.GetInt("Star"+Application.loadedLevel)){
                PlayerPrefs.SetInt("Star"+Application.loadedLevel, PlayerPrefs.GetInt("StarCurr"));
            }
        }
        else{PlayerPrefs.SetInt("Star"+Application.loadedLevel, PlayerPrefs.GetInt("StarCurr"));}
        Debug.Log("APP ll "+Application.loadedLevel);
        var ThappyCat =  targets[0].transform.Find("happyCat");
        var THead = targets[0].transform.Find("Head");
        THead.transform.gameObject.SetActive(false);
        ThappyCat.transform.gameObject.SetActive(true);

        if (targets.Count > 1){
            ThappyCat =  targets[1].transform.Find("happyCat");
            THead = targets[1].transform.Find("Head");
            THead.transform.gameObject.SetActive(false);
            ThappyCat.transform.gameObject.SetActive(true);}

        if (targets.Count > 2){
            ThappyCat =  targets[2].transform.Find("happyCat");
            THead = targets[2].transform.Find("Head");
            THead.transform.gameObject.SetActive(false);
            ThappyCat.transform.gameObject.SetActive(true);}

        yield WaitForSeconds(2);
	
        YouWonPanel.SetActive(true);
        if (PlayerPrefs.GetInt("BGMusic") == 1){ ASYouWonOrFail.Play();}

//    }
//    else {  PlayerLost();  }

}

function PlayerLost(){ // if win == 2
   // Debug.Log("WIN "+win);
    win = 3;
    PlayerPrefs.SetInt("fail"+Application.loadedLevel,PlayerPrefs.GetInt("fail"+ Application.loadedLevel)+1);

    if (fromWin == 1){
        yield WaitForSeconds(0.5);

        var tex1 = LevelFail.GetComponentInChildren.<Text>();
        tex1.text = "You fail to collect 3 stars";
        LevelFail.SetActive(true);
        if (PlayerPrefs.GetInt("BGMusic") == 1){ ASYouWonOrFail.Play();}
        fromWin = 0;
    }
    else{

    yield WaitForSeconds(0.5);

    if (finalPathF1.Count == 0){  for(var a = 0; a < targetLeafs.Count; a++){ if(targetLeafs[a] == targetChasing1 ){ targets[a].SetActive(false); break;}}
                                  var Tff = frogs[0].transform.Find("FailImage"); Tff.transform.gameObject.SetActive(true); frogsChild[0].SetActive(false);}
    if (frogs.Count == 2){ if (finalPathF2.Count == 0){ for(a = 0; a < targetLeafs.Count; a++){ if(targetLeafs[a] == targetChasing2 ){ targets[a].SetActive(false); break;}}
                                                        Tff = frogs[1].transform.Find("FailImage"); Tff.transform.gameObject.SetActive(true); frogsChild[1].SetActive(false);}}
    if (frogs.Count == 3){ if (finalPathF3.Count == 0){ for(a = 0; a < targetLeafs.Count; a++){ if(targetLeafs[a] == targetChasing3 ){ targets[a].SetActive(false); break;}}
                                                        Tff = frogs[2].transform.Find("FailImage"); Tff.transform.gameObject.SetActive(true); frogsChild[2].SetActive(false);}}

    yield WaitForSeconds(1.5);


        var tex = LevelFail.GetComponentInChildren.<Text>();
        tex.text = "Caterpillar Died !";
        LevelFail.SetActive(true);
        if (PlayerPrefs.GetInt("BGMusic") == 1){ ASYouWonOrFail.Play();}
    }
    
}

function setUndoVal(){

    if (frogs.Count == 1){
        UndoScript.Frog1.Push(Vector3(frogs[0].transform.position.x, frogs[0].transform.position.y, -10));
       // Debug.Log("finalPathF1.length "+finalPathF1.length);
        
        
    }
    else if (frogs.Count == 2){
        UndoScript.Frog1.Push(Vector3(frogs[0].transform.position.x, frogs[0].transform.position.y, -10));
        UndoScript.Frog2.Push(Vector3(frogs[1].transform.position.x, frogs[1].transform.position.y, -10));
    }
    else if (frogs.Count == 3){
        UndoScript.Frog1.Push(Vector3(frogs[0].transform.position.x, frogs[0].transform.position.y, -10));
        UndoScript.Frog2.Push(Vector3(frogs[1].transform.position.x, frogs[1].transform.position.y, -10));
        UndoScript.Frog3.Push(Vector3(frogs[2].transform.position.x, frogs[2].transform.position.y, -10));
    }
}

function SetTargetFace () {
    if (targetChasing1 != null){
        for (var a : int = 0; a < targetLeafs.Count; a++){
            if (targetLeafs[a] != null){
                if (targetChasing1 == targetLeafs[a]){ 
                    //Set Target1 face
                    //Debug.Log("1");
                    if (finalPathF1.length == 2 ){ targetHappy[a].SetActive(false); targetWat[a].SetActive(true);  targetSad[a].SetActive(false); }
                    else if (finalPathF1.length == 1){                       targetHappy[a].SetActive(false); targetWat[a].SetActive(false); targetSad[a].SetActive(true);  }
                    else {                                                   targetHappy[a].SetActive(true);  targetWat[a].SetActive(false); targetSad[a].SetActive(false); }
                }
            }
        }
    }

    if (targetChasing2 != null){
        for ( a = 0; a < targetLeafs.Count; a++){
            if (targetLeafs[a] != null){
                if (targetChasing2 == targetLeafs[a]){ 
                    //Set Target2 face
                   // Debug.Log("2");
                    if (finalPathF2.length == 2 ){ targetHappy[a].SetActive(false); targetWat[a].SetActive(true);  targetSad[a].SetActive(false); }
                    else if (finalPathF2.length == 1){                       targetHappy[a].SetActive(false); targetWat[a].SetActive(false); targetSad[a].SetActive(true);  }
                    else {                                                   targetHappy[a].SetActive(true);  targetWat[a].SetActive(false); targetSad[a].SetActive(false); }
                }
            }
        }    
    }
    
    if (targetChasing3 != null){
        for ( a = 0; a < targetLeafs.Count; a++){
            if (targetLeafs[a] != null){
                if (targetChasing3 == targetLeafs[a]){ 
                    //Set Target3 face
                    if (finalPathF3.length == 2 ){ targetHappy[a].SetActive(false); targetWat[a].SetActive(true);  targetSad[a].SetActive(false); }
                    else if (finalPathF3.length == 1){                       targetHappy[a].SetActive(false); targetWat[a].SetActive(false); targetSad[a].SetActive(true);  }
                    else {                                                   targetHappy[a].SetActive(true);  targetWat[a].SetActive(false); targetSad[a].SetActive(false); }
                }
            }
        }    
    }


}

function GetLeavesActive () {
    leafs = new List.<GameObject>();
    var lf = GameObject.FindGameObjectWithTag("Leaves");
    var Clf = lf.GetComponentsInChildren.<Collider2D>();
    for (var CL in Clf){
        leafs.Add(CL.gameObject);
    }
}


function GetTheActiveGO () {
    frogs       = new List.< GameObject >();
    frogsLeafs  = new List.< GameObject >();
    frogsJMP    = new List.< GameObject >();
    frogsChild  = new List.< GameObject >();
    targetLeafs = new List.< GameObject >();
    targets     = new List.< GameObject >();
    targetHappy = new List.< GameObject >();
    targetWat   = new List.< GameObject >();
    targetSad   = new List.< GameObject >();

    // Fill frogs and its related variables & targets
    var fg  = GameObject.FindGameObjectWithTag("Frog");
    frogs.Add(fg); G1 = new int[leafs.Count]; var go = GetLeafs(fg); frogsLeafs.Add(go); LG1 = new GameObject[leafs.Count];
    var frogGOJumpT = fg.gameObject.transform.Find("FrogJMP");
    frogsJMP.Add(frogGOJumpT.gameObject);
    var GOT = fg.gameObject.transform.Find("GO");
    frogsChild.Add(GOT.gameObject);
    
    
    fg  = GameObject.FindGameObjectWithTag("Frog2");
    if (fg != null){ frogs.Add(fg); G2 = new int[leafs.Count]; go = GetLeafs(fg); frogsLeafs.Add(go); LG2 = new GameObject[leafs.Count];
        frogGOJumpT = fg.gameObject.transform.Find("FrogJMP2");
        frogsJMP.Add(frogGOJumpT.gameObject);
        GOT = fg.gameObject.transform.Find("GO");
        frogsChild.Add(GOT.gameObject);
     }
                
    fg  = GameObject.FindGameObjectWithTag("Frog3");
    if (fg != null){ frogs.Add(fg); G3 = new int[leafs.Count]; go = GetLeafs(fg); frogsLeafs.Add(go); LG3 = new GameObject[leafs.Count];
        frogGOJumpT = fg.gameObject.transform.Find("FrogJMP3");
        frogsJMP.Add(frogGOJumpT.gameObject);
        GOT = fg.gameObject.transform.Find("GO");
        frogsChild.Add(GOT.gameObject);
    }
    
    if (frogs.Count == 1){ moveFrog = 100;}
    if (frogs.Count == 2){ moveFrog = 120;}
    if (frogs.Count == 3){ moveFrog = 123;}

    //find Targets
    fg  = GameObject.FindGameObjectWithTag("Target");
    targets.Add(fg); H1 = new int[leafs.Count]; go = GetLeafs(fg); targetLeafs.Add(go); LH1 = new GameObject[leafs.Count]; //Debug.Log(go);
    var targetH1 = fg.transform.Find("Head/Happy"); targetHappy.Add(targetH1.transform.gameObject); var targetW1 = fg.transform.Find("Head/Wat");   
    targetWat.Add(targetW1.transform.gameObject);   var targetS1 = fg.transform.Find("Head/Sad");   targetSad.Add(targetS1.transform.gameObject);

    fg  = GameObject.FindGameObjectWithTag("Target2");
    if (fg != null){ targets.Add(fg); H2 = new int[leafs.Count] ; go = GetLeafs(fg); targetLeafs.Add(go); LH2 = new GameObject[leafs.Count];
        targetH1 = fg.transform.Find("Head/Happy"); targetHappy.Add(targetH1.transform.gameObject); targetW1 = fg.transform.Find("Head/Wat");   
        targetWat.Add(targetW1.transform.gameObject);   targetS1 = fg.transform.Find("Head/Sad");   targetSad.Add(targetS1.transform.gameObject);}
    
    fg  = GameObject.FindGameObjectWithTag("Target3");
    if (fg != null){ targets.Add(fg); H3 = new int[leafs.Count]; go = GetLeafs(fg); targetLeafs.Add(go); LH3 = new GameObject[leafs.Count];
        targetH1 = fg.transform.Find("Head/Happy"); targetHappy.Add(targetH1.transform.gameObject); targetW1 = fg.transform.Find("Head/Wat");   
        targetWat.Add(targetW1.transform.gameObject);   targetS1 = fg.transform.Find("Head/Sad");   targetSad.Add(targetS1.transform.gameObject);}
    
    fg  = GameObject.FindGameObjectWithTag("Target4");
    if (fg != null){ targets.Add(fg); H4 = new int[leafs.Count]; go = GetLeafs(fg); targetLeafs.Add(go); LH4 = new GameObject[leafs.Count];
        targetH1 = fg.transform.Find("Head/Happy"); targetHappy.Add(targetH1.transform.gameObject); targetW1 = fg.transform.Find("Head/Wat");   
        targetWat.Add(targetW1.transform.gameObject);   targetS1 = fg.transform.Find("Head/Sad");   targetSad.Add(targetS1.transform.gameObject);}
    
    fg  = GameObject.FindGameObjectWithTag("Target5");
    if (fg != null){ targets.Add(fg); H5 = new int[leafs.Count]; go = GetLeafs(fg); targetLeafs.Add(go); LH5 = new GameObject[leafs.Count];
        targetH1 = fg.transform.Find("Head/Happy"); targetHappy.Add(targetH1.transform.gameObject); targetW1 = fg.transform.Find("Head/Wat");   
        targetWat.Add(targetW1.transform.gameObject);   targetS1 = fg.transform.Find("Head/Sad");   targetSad.Add(targetS1.transform.gameObject);}
}


function getH(){
    var i = 3;
    for (var targetLeaf in targetLeafs){
        
        SetGorHvalues(targetLeaf, i);
        i++;
    }
}


function getG () {
    var i = 0;
    for (var frogLeaf in frogsLeafs){
        SetGorHvalues(frogLeaf, i);
        i++;
    }
} 



function SetGorHvalues (GO : GameObject, i : int) {  // fix this to improve the response time
    // GO is the gameObject wrt whcih we need to switch
   // Debug.Log("Entered GameObject "+GO+" "+i);
    var iteration : int = 0; // keep track of iterations
    var gaOb = new List.< GameObject >(); // temp leafs holder
    var wtt =  new List.< int >();        // temp weight holder

    // move the in question GO value and wt at 0
    wtt.Add(0);
    gaOb.Add(GO);
   // Debug.Log(wtt.Count+" Length of Wtt and gaOb "+gaOb.Count);
    var e = 1;                // keep track of temp variables filled length
    var val : Boolean = true; // while loop exit var

    // now we have moved the GO = current GO to 0, but for leafs, at 0, there is something else, 
    // so we need to fix it to improve response time
    // also after the switch initially, we need to switch it back
    for (var d : int = 0; d < leafs.Count; d++){
       
        if (GO.name == leafs[d].name){
            var temp = leafs[d];
            leafs[d] = leafs[0];
            leafs[0] = temp;
            break;
        }
    }

//letme sort the leavs
//while(val){
    for (var a : int = 0; a < gaOb.Count; a++){
        if (gaOb[a] != null){ // just precaution, if this is happenning then something is not right :|
            for (var b : int = 0; b < leafs.Count & e < leafs.Count; b++){
            if(leafs[b] != null){
            	if ( parseInt(leafs[b].name) == (parseInt(gaOb[a].name) - 1) || parseInt(leafs[b].name) == (parseInt(gaOb[a].name) + 1) || parseInt(leafs[b].name) == (parseInt(gaOb[a].name) - 10)|| 
                 	 parseInt(leafs[b].name) == (parseInt(gaOb[a].name) + 10)|| parseInt(leafs[b].name) == (parseInt(gaOb[a].name) - 11)|| parseInt(leafs[b].name) == (parseInt(gaOb[a].name) + 11)|| 
                 	 parseInt(leafs[b].name) == (parseInt(gaOb[a].name) - 9) || parseInt(leafs[b].name) == (parseInt(gaOb[a].name) + 9)) {
                    	var fart = check(gaOb, leafs[b], wtt, e, a, b); // now we need to check - 1. if leafs[b] is in gaOb ? No - then move to e; Yes - check weight
                        //Debug.Log("Fart values "+fart[0]+" "+fart[1]+" "+fart[2]);
                    	if (fart[0] == 0){ // this is if new GO found
                            gaOb.Add(leafs[b]);
                            wtt.Add(fart[2]);
                            e++;                            
                            if (e == leafs.Count){  val = false; break;  }
                    	} // if fart[0] = 0 end
                    	if (fart[0] == 1){ // this is if existing GO found
                            gaOb[fart[1]] = leafs[b];
                            wtt[fart[1]]  = fart[2];
                    	} // if fart[0] = 1 end        
                    	//Debug.Log("e = Length of gaOb = "+e);
                	} // 8 neigh if
                }// if end leafs[b] != null      
                else {Debug.Log("nrviunifu niu sinfviuvneufniernu inrvinriugniugu ");}
            } //inner for loop end
         } // not null if
         else {Debug.Log("null found in gaOb at "+a);}// if null found in goab
    } // outer for end
   // val = false;
   // for (var gaO in gaOb){ if (gaO == null) {val = true; }}//Debug.Log("loop :|");}}
  //  iteration++;
  //  if (iteration > 20 ) {break;}
//} // while end

// Debug.Log(wtt.Count+" &22& "+gaOb.Count);

// Now we return the moved GO in leafs
temp = leafs[d];
leafs[d] = leafs[0];
leafs[0] = temp;


///Debug.Log("----------------------------------------Iteration Source "+GO+" & "+i); 
//for(var c: int = 0; c < leafs.Count; c++){ if(gaOb[c] != null){Debug.Log("iteration "+c+" "+gaOb[c].name+" & "+wtt[c]+" & "+leafs[c].name);}}
    // Debug.Log("iteration "+iteration);
var j : int;

if (i == 0){for ( j = 0; j < gaOb.Count; j++) { G1[j] = wtt[j]; LG1[j] = gaOb[j];}}// Debug.Log(gaOb[j].name+" F1 "+wtt[j]);}}
if (i == 1){for ( j = 0; j < gaOb.Count; j++) { G2[j] = wtt[j]; LG2[j] = gaOb[j];}}// Debug.Log(gaOb[j].name+" F2 "+wtt[j]);}}
if (i == 2){for ( j = 0; j < gaOb.Count; j++) { G3[j] = wtt[j]; LG3[j] = gaOb[j];}}// Debug.Log(gaOb[j].name+" F3 "+wtt[j]);}}
if (i == 3){for ( j = 0; j < gaOb.Count; j++) { H1[j] = wtt[j]; LH1[j] = gaOb[j];}}// Debug.Log(gaOb[j].name+" T1 "+wtt[j]);}}
if (i == 4){for ( j = 0; j < gaOb.Count; j++) { H2[j] = wtt[j]; LH2[j] = gaOb[j];}}// Debug.Log(gaOb[j].name+" T2 "+wtt[j]);}}
if (i == 5){for ( j = 0; j < gaOb.Count; j++) { H3[j] = wtt[j]; LH3[j] = gaOb[j];}}// Debug.Log(gaOb[j].name+" T3 "+wtt[j]);}}
if (i == 6){for ( j = 0; j < gaOb.Count; j++) { H4[j] = wtt[j]; LH4[j] = gaOb[j];}}// Debug.Log(gaOb[j].name+" T4 "+wtt[j]);}}
if (i == 7){for ( j = 0; j < gaOb.Count; j++) { H5[j] = wtt[j]; LH5[j] = gaOb[j];}}// Debug.Log(gaOb[j].name+" T5 "+wtt[j]);}}

}



    // now we need to check - if leafs[b] is in gaOb ? 1. No - then move to e; 2. Yes - check weight
    //check(gaOb, leafs[b], wtt, e, a, b);
function check(list : List.< GameObject >, curr : GameObject, wttt : List.< int >, currPos : int, pos1 : int, pos2 : int){
      
      var ret = new int[3]; ret[0] = 1000; ret[1] = 1000; ret[2] = 1000;
      var flag = 0;
    //Check if the new GO is in list
      for (var a : int = 0; a < list.Count; a++){
               if (list[a] != null){
                    if (list[a].name == curr.name){
                        flag = 1;
                        break;
                    }
                }
        }

    // if flag never changed = the value is not found, hence its a new GO and can be moved into the list
        if (flag == 0){ ret[0] = 0;  ret[1] = currPos; ret[2] = (wttt[pos1] + 1); return ret;}

    // if the code came to this point so - else - since the flag changed, therefore we check the weight;
        if ( wttt[a] > (wttt[pos1] + 1) ){ // will be true if we found a lower weight down the line
             ret[0] = 1;  ret[1] = a; ret[2] = (wttt[pos1] + 1) ; return ret;
        }
        else{ // the weight of newly found GO was greater than the wt of same GO already in the list, so return ret[0] = 1000 and ret[1] = garbage;
            ret[0] = 1000;  ret[1] = 1000; ret[2] = 1000; return ret;
        }

}


function AStarAlgo(){

    var a : int = 1; // to keep track of frog #
    for (var frogsLeaf in frogsLeafs){ // for each frog
        var b : int = 1; // to keep track of Target #
                
        for (var targetLeaf in targetLeafs){
            var notDone : Boolean = true; //Debug.Log("notDone "+notDone);
            //set Open lists
            openList = new listsForTheLogic.ListsOC(leafs.Count);
            openList.leav[0] =  frogsLeaf;
            openList.ff[0] = 0; openList.gg[0] = 0; openList.hh[0] = 0;
            openList.parent[0] = frogsLeaf;
            closeList = new listsForTheLogic.ListsOC(leafs.Count);

            
            while(notDone & (openList.Length() >= 1)){
	                openList.Sort("ff");
                                
                var temp = openList.Pop();
 //               Debug.Log("Pop "+temp.leav[0].name+" "+targetLeaf.name);
                if (temp.leav[0] != null){
                    if (temp.leav[0] == targetLeaf){ // check if this is the target we need :|
                        notDone = false; //Debug.Log("notDone "+notDone);
                       // Debug.Log("Here it ended 1"); // this thing not gonna happen as we put Leafs in Open list only after checking its not a Target
                        //do something :| 
                        break;
                        }// if end temp.leav[0] == targetLeaf
                    else{
                        notDone = CheckForAnyTarget(temp.leav[0], targetLeaf); // check if the current leaf is any of the target apart from the one we looping :|
                        //Debug.Log("CheckForAnyTarget "+notDone);
                        if (notDone == false){
                            //do something :|
                            //Debug.Log("Here it ended 2");
                            SetPathTemp(closeList, temp, frogsLeaf, targetLeaf, a, b, 2);
                            break;
                         }
                        
                        // 1. remove from Open list - we already did that - temp
                        // 2. Move the current node to the closed list
                        closeList.Insert(temp.leav[0], temp.ff[0], temp.gg[0], temp.hh[0], temp.parent[0]); //Debug.Log(temp.leav[0].name+" "+temp.ff[0]);
                        // 3. Get neighbours of temp - For each neigh 
                        var neighLeaf = GetNigh(temp, targetLeaf); //(here, we will sort the neigh as per the nearness to the target in question)
                    
                        for ( var c = 0; c < neighLeaf.Length(); c++){
                         //   Debug.Log(neighLeaf.leav[c]+" "+neighLeaf.ff[c]+" "+neighLeaf.gg[c]+" "+neighLeaf.hh[c]+" "+neighLeaf.parent[c]);                      
                            // 3.A is this the target ?  - if yes do something :|
                            if (neighLeaf.leav[c] == targetLeaf){ // check if this is the target we need :|
                                notDone = false; //Debug.Log("notDone "+notDone);
                                //do something :| 
                                //Debug.Log("Here it ended 3");
                                SetPathTemp(closeList, neighLeaf, frogsLeaf, targetLeaf, a, b, 3);
                                break;
                            }
                            // 3.B else if - this neigh in closeList? - if yes check ff
                            else if(closeList.Has(neighLeaf.leav[c])){
                                var va = closeList.Get(neighLeaf.leav[c]);
                                if (closeList.ff[va] > neighLeaf.ff[c]){ // if the value in closeList > currently valuated neighbour  
                                    closeList.Replace(va, neighLeaf, c);
                                    //continue;
                                }
                            }
                        
                            // 3.C else if - this neigh in openList? - if yes
                            else if(openList.Has(neighLeaf.leav[c])){
                                var val = openList.Get(neighLeaf.leav[c]);
                                if (openList.ff[val] > neighLeaf.ff[c]){ // if the value in openList > currently valuated neighbour  
                                    openList.Replace(val, neighLeaf, c);
                                    //continue;
                                }
                            }
                            // 3.D else - move to open list
                            else{
                                openList.Insert(neighLeaf.leav[c], neighLeaf.ff[c], neighLeaf.gg[c], neighLeaf.hh[c], neighLeaf.parent[c]);
                                }
                            }// for loop containg C end
                        }// main else end
                        // notDone = false; Debug.Log("notDone "+notDone);
                    }// if end = poped value from openList is not null
                    else {Debug.Log("null value poped for "+frogsLeaf+" & "+targetLeaf); notDone = false; setmoveFrog(a);} // this is the place for WIn !!
                }// while loop end
                if (openList.Length() == 0){ /*win = 1; */Debug.Log("1 win was set here "+win); break;}


                b++; // iterate the counter for Target#
            }// for target loop end
      //  SetFinalPaths(a);
        a++; // iterate the counter for Frog#
    }// for frog loop end

    SetFinalPathsWithAI();
}// main function end


function setmoveFrog(num : int){
Debug.Log("moveFrog "+moveFrog);
    if (num == 1 & moveFrog >= 100){moveFrog = moveFrog - 100; Debug.Log("F1 foked "+moveFrog);}
    if (num == 2 & (moveFrog == 020 || moveFrog == 120 || moveFrog == 023 || moveFrog == 123)){ moveFrog = moveFrog - 20;  Debug.Log("F2 foked "+moveFrog);}
    if (num == 3 & (moveFrog == 003 || moveFrog == 103 || moveFrog == 023 || moveFrog == 123)){ moveFrog = moveFrog - 3;  Debug.Log("F3 foked "+moveFrog);}
Debug.Log("moveFrog "+moveFrog);
  //  Debug.Log("======================================moveFrog "+moveFrog);
    if (moveFrog == 0){win = 1; Debug.Log("2 win was set here "+win);}
    }


function Move(){
   // if (Application.loadedLevel <= 7) { 
   //     yield WaitForSeconds(1);
   //     }


    var ST  = 0.1;
    var velo = Vector3.zero;
         
if (moveFrog >= 100){
    if(done1 == 0){
        // F1
        // orientation
       // Debug.Log(hopPos1.transform.position.x+" sign "+frogs[0].transform.position.x);

        if (hopPos1.transform.position.x < frogs[0].transform.position.x){ 
        	if (frogs[0].transform.localScale.x < 0){ 
        		frogs[0].transform.localScale.x = -(frogs[0].transform.localScale.x);// here we converted it negative
               // Debug.Log("Fart");
        	}
        }
        else {
        	if (frogs[0].transform.localScale.x > 0){ 
        		frogs[0].transform.localScale.x = -(frogs[0].transform.localScale.x);// here we converted it Positive
               // Debug.Log("Poop");
        	}
        }
    
        // move
        frogs[0].gameObject.transform.position = Vector3.SmoothDamp( frogs[0].gameObject.transform.position, Vector3(hopPos1.gameObject.transform.position.x, hopPos1.gameObject.transform.position.y,  
                                                                     frogs[0].gameObject.transform.position.z), velo, ST);
        frogsChild[0].SetActive(false);
        frogsJMP[0].SetActive(true);

        var hit = Physics2D.Raycast (( frogs[0].gameObject.transform.position), Vector2.zero);
        if(hit.collider != null){
            if (hit.collider.gameObject == hopPos1.gameObject ){
                
                frogs[0].gameObject.transform.position = Vector3(hopPos1.gameObject.transform.position.x, hopPos1.gameObject.transform.position.y,  frogs[0].gameObject.transform.position.z);
                frogsChild[0].SetActive(true);
                frogsJMP[0].SetActive(false);
                done1 = 1;
            }
        }
    }
}
else {done1 = 1;}
//Debug.Log(frogs.Count+" "+done2);
        if (moveFrog == 020 || moveFrog == 120 || moveFrog == 023 || moveFrog == 123){
            if(done2 == 0){
            // F2
            // orientation
          if (hopPos2.transform.position.x < frogs[1].transform.position.x){ 
        	if (frogs[1].transform.localScale.x < 0){ 
        		frogs[1].transform.localScale.x = -(frogs[1].transform.localScale.x);// here we converted it negative
        	}
        }
        else {
        	if (frogs[1].transform.localScale.x > 0){ 
        		frogs[1].transform.localScale.x = -(frogs[1].transform.localScale.x);// here we converted it Positive
        	}
        }
    
            // move
                frogs[1].gameObject.transform.position = Vector3.SmoothDamp( frogs[1].gameObject.transform.position, Vector3(hopPos2.gameObject.transform.position.x, hopPos2.gameObject.transform.position.y,  
                                                                             frogs[1].gameObject.transform.position.z), velo, ST);
            frogsChild[1].SetActive(false);
            frogsJMP[1].SetActive(true);

            hit = Physics2D.Raycast (( frogs[1].gameObject.transform.position), Vector2.zero);
            if(hit.collider != null){ 
                if (hit.collider.gameObject == hopPos2.gameObject ){
                    frogs[1].gameObject.transform.position = Vector3(hopPos2.gameObject.transform.position.x, hopPos2.gameObject.transform.position.y,  frogs[1].gameObject.transform.position.z);
                    frogsChild[1].SetActive(true);
                    frogsJMP[1].SetActive(false);
                    done2 = 1;
                    
                
            }
        }
    }
}        
        
    else  if (frogs.Count >= 2){ done2 = 1;}

        if (moveFrog == 003 || moveFrog == 103 || moveFrog == 023 || moveFrog == 123){
            if(done3 == 0){
            // F3
            // orientation
            if (hopPos3.transform.position.x < frogs[2].transform.position.x){ 
        	    if (frogs[2].transform.localScale.x < 0){ 
        		    frogs[2].transform.localScale.x = -(frogs[2].transform.localScale.x);// here we converted it negative
        	    }
            }
            else {
        	    if (frogs[2].transform.localScale.x > 0){ 
        		    frogs[2].transform.localScale.x = -(frogs[2].transform.localScale.x);// here we converted it Positive
        	    }
            }
    
            // move
                frogs[2].gameObject.transform.position = Vector3.SmoothDamp( frogs[2].gameObject.transform.position, Vector3(hopPos3.gameObject.transform.position.x, hopPos3.gameObject.transform.position.y,  
                                                                             frogs[2].gameObject.transform.position.z), velo, ST);
            frogsChild[2].SetActive(false);
            frogsJMP[2].SetActive(true);

            hit = Physics2D.Raycast (( frogs[2].gameObject.transform.position), Vector2.zero);
            if(hit.collider != null){ 
                if (hit.collider.gameObject == hopPos3.gameObject ){
                    frogs[2].gameObject.transform.position = Vector3(hopPos3.gameObject.transform.position.x, hopPos3.gameObject.transform.position.y,  frogs[2].gameObject.transform.position.z);
                    frogsChild[2].SetActive(true);
                    frogsJMP[2].SetActive(false);
                    done3 = 1;
                
            }
        }
    }      
}        
else if (frogs.Count > 2){done3 = 1;}        

}




private var track : int = 0;

function  SetPathTemp(closLis : listsForTheLogic.ListsOC, lastLeaf : listsForTheLogic.ListsOC, sourceLeaf : GameObject, targLeaf : GameObject, a : int, b : int, DebugValue : int){
    // Debug.Log("hahaha "+DebugValue);
    var path = new List.< GameObject >();
        
    if (DebugValue == 2){
        //Debug.Log("closLis "+lastLeaf.leav[0].name+" & "+lastLeaf.parent[0].name+" & "+targLeaf.name);
        path.Add(lastLeaf.leav[0]);
        path.Add(lastLeaf.parent[0]);
    }
    else {
        //Debug.Log("closLis "+targLeaf.name+" & "+lastLeaf.parent[0].name+" & "+targLeaf.name);
        path.Add(targLeaf);
        if(lastLeaf.parent[0] != sourceLeaf){
        path.Add(lastLeaf.parent[0]); //Debug.Log("here?");}
    }
    }
//        Debug.Log(targLeaf+" "+sourceLeaf);

    var val : Boolean = true;
    var lastGO : GameObject = lastLeaf.parent[0];
    if (lastGO.name == sourceLeaf.name){val = false; }
    var iteration = 0;
    while(val){
    //	iteration++;
        for(var i : int = 0; i < closLis.Length(); i++){
             if (closLis.leav[i] != null){
                if (closLis.leav[i].name == lastGO.name){
                    if (closLis.parent[i].name == sourceLeaf.name){val = false; break;}
    else{
                        path.Add(closLis.parent[i]);
                        lastGO = closLis.parent[i];
        //Debug.Log("closLis "+closLis.leav[i].name+" & "+closLis.parent[i].name);
    			}
    		}
    	}   
    }
        if (lastGO.name == sourceLeaf.name){val = false;}
      //  if (iteration > 3){ val = false;}
    }// While end
                
    
        // Debug.Log("------------------------------------------------------------------------------------------");
    if (a == 1){
        if (b == 1){ path1 = new List.< GameObject >(); for (var pat in path){path1.Add(pat); }}//Debug.Log(pat);}}
        if (b == 2){ path2 = new List.< GameObject >();     for (pat in path){path2.Add(pat); }}//Debug.Log(pat);}}
        if (b == 3){ path3 = new List.< GameObject >();     for (pat in path){path3.Add(pat); }}//Debug.Log(pat);}}
        if (b == 4){ path4 = new List.< GameObject >();     for (pat in path){path4.Add(pat); }}//Debug.Log(pat);}}
        if (b == 5){ path5 = new List.< GameObject >();     for (pat in path){path5.Add(pat); }}//Debug.Log(pat);}}
    }

    if (a == 2){
        if (b == 1){ path6 = new List.< GameObject >();  for (pat in path){path6.Add(pat); }}//Debug.Log(pat);}}
        if (b == 2){ path7 = new List.< GameObject >();  for (pat in path){path7.Add(pat); }}//Debug.Log(pat);}}
        if (b == 3){ path8 = new List.< GameObject >();  for (pat in path){path8.Add(pat); }}//Debug.Log(pat);}}
        if (b == 4){ path9 = new List.< GameObject >();  for (pat in path){path9.Add(pat); }}//Debug.Log(pat);}}
        if (b == 5){ path10 = new List.< GameObject >(); for (pat in path){path10.Add(pat); }}//Debug.Log(pat);}}
    }

    if (a == 3){
        if (b == 1){ path11 = new List.< GameObject >(); for (pat in path){path11.Add(pat); }}//Debug.Log(pat);}}
        if (b == 2){ path12 = new List.< GameObject >(); for (pat in path){path12.Add(pat); }}//Debug.Log(pat);}}
        if (b == 3){ path13 = new List.< GameObject >(); for (pat in path){path13.Add(pat); }}//Debug.Log(pat);}}
        if (b == 4){ path14 = new List.< GameObject >(); for (pat in path){path14.Add(pat); }}//Debug.Log(pat);}}
        if (b == 5){ path15 = new List.< GameObject >(); for (pat in path){path15.Add(pat); }}//Debug.Log(pat);}}
    }
        // Debug.Log("------------------------------------------------------------------------------------------");
    
}// function end




function SetFinalPaths(s : int){
// Before setting the final path, we need to remove the empty paths as well - eg in case of muiltiple targets, if path1 of Target1 goes out, we need to fix it, otherwise we get empty path
 if (s == 1){
        if (path1.Count == 0){ if (path2.Count > 0){ for( var r1 in path2){path1.Add(r1);} path2  = new List.< GameObject >(); }}
        if (path2.Count == 0){ if (path3.Count > 0){ for( var r2 in path3){path2.Add(r2);} path3  = new List.< GameObject >(); }}
        if (path3.Count == 0){ if (path4.Count > 0){ for( var r3 in path4){path3.Add(r3);} path4  = new List.< GameObject >(); }}
        if (path4.Count == 0){ if (path5.Count > 0){ for( var r4 in path5){path4.Add(r4);} path5  = new List.< GameObject >(); }}
}

if (s == 2){
        if (path6.Count == 0){ if (path7.Count > 0){ for(var r5 in path7) { path6.Add(r5);} path7   = new List.< GameObject >(); }}
        if (path7.Count == 0){ if (path8.Count > 0){  for(var r6 in path8) {path7.Add(r6);}  path8   = new List.< GameObject >(); }}
        if (path8.Count == 0){ if (path9.Count > 0){  for(var r7 in path9) {path8.Add(r7);}  path9   = new List.< GameObject >(); }}
        if (path9.Count == 0){ if (path10.Count > 0){ for(var r8 in path10){path9.Add(r8);}  path10  = new List.< GameObject >(); }} 
}

if (s == 3){
        if (path11.Count == 0){ if (path12.Count > 0){  for(var r9 in path12){path11.Add(r9);}  path12   = new List.< GameObject >(); }}
        if (path12.Count == 0){ if (path13.Count > 0){  for(var r10 in path13){path12.Add(r10);}  path13   = new List.< GameObject >(); }}
        if (path13.Count == 0){ if (path14.Count > 0){  for(var r11 in path14){path13.Add(r11);}  path14   = new List.< GameObject >(); }}
        if (path14.Count == 0){ if (path15.Count > 0){  for(var r12 in path15){path14.Add(r12);}  path15   = new List.< GameObject >(); }}
}

// Here we set the Final Paths
        var pathA = new List.< GameObject >();
        var pathB = new List.< GameObject >();  
        var pathC = new List.< GameObject >();
        var pathD = new List.< GameObject >();
        var pathE = new List.< GameObject >();

    if (s == 1){
        if (path1 != null){for( var q in path1){pathA.Add(q);}}
        if (path2 != null){for(     q in path2){pathB.Add(q);}}
        if (path3 != null){for(     q in path3){pathC.Add(q);}}
        if (path4 != null){for(     q in path4){pathD.Add(q);}}
        if (path5 != null){for(     q in path5){pathE.Add(q);}}    
    }
    
    if (s == 2){    
        if (path6 != null){  for(q in path6) {pathA.Add(q);}}
        if (path7 != null){  for(q in path7) {pathB.Add(q);}}
        if (path8 != null){  for(q in path8) {pathC.Add(q);}}
        if (path9 != null){  for(q in path9) {pathD.Add(q);}}
        if (path10 != null){ for(q in path10){pathE.Add(q);}}    
    }
    
    if (s == 3){    
        if (path11 != null){  for(q in path11){pathA.Add(q);}}
        if (path12 != null){  for(q in path12){pathB.Add(q);}}
        if (path13 != null){  for(q in path13){pathC.Add(q);}}
        if (path14 != null){  for(q in path14){pathD.Add(q);}}
        if (path15 != null){  for(q in path15){pathE.Add(q);}}    
    }


            var ho = new Array();
            if (pathA.Count !=  0){ho.Add(pathA.Count); }
            if (pathB.Count !=  0){ho.Add(pathB.Count); }
            if (pathC.Count !=  0){ho.Add(pathC.Count); }
            if (pathD.Count !=  0){ho.Add(pathD.Count); }
            if (pathE.Count !=  0){ho.Add(pathE.Count); }
            
            
            //Debug.Log("ho value "+ho.Count);
            if (ho.Count == 0){
                setmoveFrog(s); Debug.Log("Frog stop setting for frog "+s);
                return void;
            }           
            
            var finalPath = new List.< GameObject >();
               
            ho.Sort();
            
            if (ho[0] == pathA.Count){for (var pat in pathA){finalPath.Add(pat);}}
            else if (ho[0] == pathB.Count){for(pat in pathB){finalPath.Add(pat);}}
            else if (ho[0] == pathC.Count){for(pat in pathC){finalPath.Add(pat);}}
            else if (ho[0] == pathD.Count){for(pat in pathD){finalPath.Add(pat);}}
            else if (ho[0] == pathE.Count){for(pat in pathE){finalPath.Add(pat);}}

            //Debug.Log("FC "+finalPath.Count);

         if(s == 1){finalPathF1 = new Array(); for (var finalPat in finalPath){finalPathF1.Add(finalPat); }  hopPos1 = finalPathF1.Pop(); if (finalPathF1.Count != 0){targetChasing1 =  finalPathF1[0];}else { if (win == 0){win = 2;Debug.Log("3 win was set here "+win);}}}
        //Debug.Log("hopPos1 "+hopPos1); Debug.Log("--------------------------------------------");}
    else if(s == 2){finalPathF2 = new Array(); for (var finalPat in finalPath){finalPathF2.Add(finalPat); }  hopPos2 = finalPathF2.Pop(); if (finalPathF2.Count != 0){targetChasing2 =  finalPathF2[0];}else {if (win == 0){win = 2;}}}
        //Debug.Log("hopPos2 "+hopPos2); Debug.Log("--------------------------------------------");}
    else if(s == 3){finalPathF3 = new Array(); for (var finalPat in finalPath){finalPathF3.Add(finalPat); }  hopPos3 = finalPathF3.Pop(); if (finalPathF3.Count != 0){targetChasing3 =  finalPathF3[0];}else {if (win == 0){win = 2;}}}
        //Debug.Log("hopPos3 "+hopPos3); Debug.Log("--------------------------------------------");}

        // Now we reset the Paths
        

    }

 function resetPaths(){
        path1  = new List.< GameObject >();
        path2  = new List.< GameObject >();
        path3  = new List.< GameObject >();
        path4  = new List.< GameObject >();
        path5  = new List.< GameObject >();
        path6  = new List.< GameObject >();
        path7  = new List.< GameObject >();
        path8  = new List.< GameObject >();
        path9  = new List.< GameObject >();
        path10 = new List.< GameObject >();
        path11 = new List.< GameObject >();
        path12 = new List.< GameObject >();
        path13 = new List.< GameObject >();
        path14 = new List.< GameObject >();
        path15 = new List.< GameObject >();
    }

function SetFinalPathsWithAI (){
    var hopRef = new Array(); var hopVal = new Array();

         if (frogs.Count == 1){ SetFinalPaths(1); }//Debug.Log(targetChasing1.name+" "+finalPathF1.Count);}


    else if (frogs.Count == 2){
    Debug.Log("Two Frogs");
            SetFinalPaths(1);
            SetFinalPaths(2);
            if(targetChasing1 == targetChasing2){
                //Debug.Log("Target same for F1 and F2");
                if(finalPathF1.Count > finalPathF2.Count){
                  //  Debug.Log("Need to re-shuffle fp1 "+finalPathF1.Count+" & "+finalPathF2.Count);
                     if (targets.Count > 1){
                        if (win == 0){
                            RemovePath(1); Debug.Log("removed path for frog 1");
                            SetFinalPaths(1);
                        }
                    }
                }
                else {
                    //Debug.Log("fp2 is either same or bigger "+finalPathF1.Count+" & "+finalPathF2.Count);
                    if (targets.Count > 1){
                        if (win == 0){
                            RemovePath(2); Debug.Log("removed path for frog 2");
                            SetFinalPaths(2);
    				}
    			}
    		}
    	} // end - if(targetChasing1 == targetChasing2)
    } // end - if (frogs.Count == 2)


    else if (frogs.Count == 3){
        SetFinalPaths(1);
        SetFinalPaths(2);
        SetFinalPaths(3);
        Debug.Log("#1 "+targetChasing1.name+" "+targetChasing2.name+" "+targetChasing3.name);


        // Targt1 vs Target2
         if(targetChasing1 == targetChasing2){
            Debug.Log("3 Target same for F1 and F2");
                if(finalPathF1.Count > finalPathF2.Count){
                    Debug.Log("3 Need to re-shuffle fp1 "+finalPathF1.Count+" & "+finalPathF2.Count);
                     if (targets.Count > 1){
                        if (win == 0){
                            RemovePath(1);
                            SetFinalPaths(1);
    			}
    		}
    	}
    else {
                    Debug.Log("fp2 is either same or bigger "+finalPathF1.Count+" & "+finalPathF2.Count);
                    if (targets.Count > 1){
                        if (win == 0){
                            RemovePath(2);
                            SetFinalPaths(2);
    					}
    				}
    			}
    		}

        // Targt1 vs Target3
         if (targetChasing1 == targetChasing3){
            Debug.Log("Target same for F1 and F3");
            if(finalPathF1.Count > finalPathF3.Count){
                Debug.Log("Need to re-shuffle fp1 "+finalPathF1.Count+" & "+finalPathF3.Count);
                if (targets.Count > 2){
                    if (win == 0){
                        RemovePath(1);
                        SetFinalPaths(1);
                    }
                }
            }
            else {
                Debug.Log("fp2 is either same or bigger "+finalPathF1.Count+" & "+finalPathF3.Count);
                if (targets.Count > 2){
                    if (win == 0){
                        RemovePath(3);
                        SetFinalPaths(3);
                    }
                }
            }   
        }

        // Targt2 vs Target3
         if (targetChasing2 == targetChasing3){
            Debug.Log("3 Target same for F2 and F3");
            if(finalPathF2.Count > finalPathF3.Count){
                Debug.Log("Need to re-shuffle fp2 "+finalPathF2.Count+" & "+finalPathF3.Count);
                if (targets.Count > 2){
                    if (win == 0){
                        RemovePath(2);
                        SetFinalPaths(2);
                    }
                }
            }
            else {
                Debug.Log("3 fp3 is either same or bigger "+finalPathF2.Count+" & "+finalPathF3.Count);
                if (targets.Count > 1){
                    if (win == 0){
                        RemovePath(3);
                        SetFinalPaths(3);
                    }
                }
            }           
        }

        // Targt1 vs Target2    
    if(targetChasing1 == targetChasing2){
            Debug.Log("3 Target same for F1 and F2");
                if(finalPathF1.Count > finalPathF2.Count){
                    Debug.Log("3 Need to re-shuffle fp1 "+finalPathF1.Count+" & "+finalPathF2.Count);
                     if (targets.Count > 1){
                        if (win == 0){
                            RemovePath(1);
                            SetFinalPaths(1);
                        }
                    }
                }
                else {
                    Debug.Log("fp2 is either same or bigger "+finalPathF1.Count+" & "+finalPathF2.Count);
                    if (targets.Count > 1){
                        if (win == 0){
                            RemovePath(2);
                            SetFinalPaths(2);
                        }
                    }
                }
            }
        Debug.Log("#2 "+targetChasing1.name+" "+targetChasing2.name+" "+targetChasing3.name);
        } // end - if (frogs.Count == 3)
    

    }


    function RemovePath(f : int){ // now we remove the path that was picked last
    
        if (f == 1){
            if (targetChasing1 == path1[0]){  // if path was path1
                if (path2 != null){
                    path1 =  new List.< GameObject >();
                    for (var pa in path2){path1.Add(pa);}
                    path2 =  new List.< GameObject >();
                    if (path3 != null){
                        for (pa in path3){path2.Add(pa);}
                        path3 =  new List.< GameObject >();
                        if (path4 != null){
                            for (pa in path4){path3.Add(pa);}
                            path4 =  new List.< GameObject >();
                            if (path5 != null){
                                for (pa in path5){path4.Add(pa);}
                                path5 =  new List.< GameObject >();
    }
    }
    }
    }
    }

    else if (targetChasing1 == path2[0]){ // if path was path2
                path2 =  new List.< GameObject >();
                if (path3 != null){
                    for (pa in path3){path2.Add(pa);}
                    path3 =  new List.< GameObject >();
                    if (path4 != null){
                        for (pa in path4){path3.Add(pa);}
                        path4 =  new List.< GameObject >();
                        if (path5 != null){
                            for (pa in path5){path4.Add(pa);}
                            path5 =  new List.< GameObject >();
    }
    }
    }
    }

    else if (targetChasing1 == path3[0]){ // if path was path3
                path3 =  new List.< GameObject >();
                if (path4 != null){
                    for (pa in path4){path3.Add(pa);}
                    path4 =  new List.< GameObject >();
                    if (path5 != null){
                        for (pa in path5){path4.Add(pa);}
                        path5 =  new List.< GameObject >();
    }
    }
    }
            
    else if (targetChasing1 == path4[0]){ // if path was path4
                path4 =  new List.< GameObject >();
                if (path5 != null){
                    for (pa in path5){path4.Add(pa);}
                    path5 =  new List.< GameObject >();
    }
    }
            
    else if (targetChasing1 == path5[0]){ // if path was path5
                path5 =  new List.< GameObject >();
    }

    }


    else if (f == 2){
            if (targetChasing2 == path6[0]){  // if path was path1
                if (path7 != null){
                    path6 =  new List.< GameObject >();
                    for (pa in path7){path6.Add(pa);}
                    path7 =  new List.< GameObject >();
                    if (path8 != null){
                        for (pa in path8){path7.Add(pa);}
                        path8 =  new List.< GameObject >();
                        if (path9 != null){
                            for (pa in path9){path8.Add(pa);}
                            path9 =  new List.< GameObject >();
                            if (path10 != null){
                                for (pa in path10){path9.Add(pa);}
                                path10 =  new List.< GameObject >();
    }      
    }
    }
    }
    }

    else if (targetChasing2 == path7[0]){ // if path was path2
                path7 =  new List.< GameObject >();
                if (path8 != null){
                    for (pa in path8){path7.Add(pa);}
                    path8 =  new List.< GameObject >();
                    if (path9 != null){
                        for (pa in path9){path8.Add(pa);}
                        path9 =  new List.< GameObject >();
                        if (path10 != null){
                            for (pa in path10){path9.Add(pa);}
                            path10 =  new List.< GameObject >();
    }
    }
    }
    }

    else if (targetChasing2 == path8[0]){ // if path was path3
                path8 =  new List.< GameObject >();
                if (path9 != null){
                    for (pa in path9){path8.Add(pa);}
                    path9 =  new List.< GameObject >();
                    if (path10 != null){
                        for (pa in path10){path9.Add(pa);}
                        path10 =  new List.< GameObject >();
    }
    }
    }
            
    else if (targetChasing2 == path9[0]){ // if path was path4
                path9 =  new List.< GameObject >();
                if (path10 != null){
                    for (pa in path10){path9.Add(pa);}
                    path10 =  new List.< GameObject >();
    }
    }
            
    else if (targetChasing2 == path10[0]){ // if path was path5
                path10 =  new List.< GameObject >();
    }

    }


    else if (f == 3){
            if (targetChasing3 == path11[0]){  // if path was path1
                if (path12 != null){
                    path11 =  new List.< GameObject >();
                    for (pa in path12){path11.Add(pa);}
                    path12 =  new List.< GameObject >();
                    if (path13 != null){
                        for (pa in path13){path12.Add(pa);}
                        path13 =  new List.< GameObject >();
                        if (path14 != null){
                            for (pa in path14){path13.Add(pa);}
                            path14 =  new List.< GameObject >();
                            if (path15 != null){
                                for (pa in path15){path14.Add(pa);}
                                path15 =  new List.< GameObject >();
    }
    }
    }
    }
    }

    else if (targetChasing3 == path12[0]){ // if path was path2
                path12 =  new List.< GameObject >();
                if (path13 != null){
                    for (pa in path13){path12.Add(pa);}
                    path13 =  new List.< GameObject >();
                    if (path14 != null){
                        for (pa in path14){path13.Add(pa);}
                        path14 =  new List.< GameObject >();
                        if (path15 != null){
                            for (pa in path15){path14.Add(pa);}
                            path15 =  new List.< GameObject >();
    }
    }
    }
    }

    else if (targetChasing3 == path13[0]){ // if path was path3
                path13 =  new List.< GameObject >();
                if (path14 != null){
                    for (pa in path14){path13.Add(pa);}
                    path14 =  new List.< GameObject >();
                    if (path15 != null){
                        for (pa in path15){path14.Add(pa);}
                        path15 =  new List.< GameObject >();
    }
    }
    }
            
    else if (targetChasing3 == path14[0]){ // if path was path4
                path14 =  new List.< GameObject >();
                if (path15 != null){
                    for (pa in path15){path14.Add(pa);}
                    path15 =  new List.< GameObject >();
    }
    }
            
    else if (targetChasing3 == path15[0]){ // if path was path5
                path15 =  new List.< GameObject >();
    }

    }


    }

 
        //----------------Supporting functions-------------------------------------------------------------------------------------------------------------------------------

function GetNigh( currList : listsForTheLogic.ListsOC, targ : GameObject){
        // Debug.Log("Find Neigh "+currList.leav[0].name+" "+targ.name);
            var neig   : List.< GameObject >; neig = new List.<GameObject>();
            var curr = parseInt(currList.leav[0].name);
            for (var leaf in leafs){
                var lf = parseInt(leaf.name);
                if (lf == (curr - 1) || lf == (curr - 10) || lf == (curr - 11) || lf == (curr - 9) ||
                    lf == (curr + 1) || lf == (curr + 10) || lf == (curr + 11) || lf == (curr + 9)){
                    neig.Add(leaf);
                }
            }
            // till this point we have neighbours of currList.leav[0] in neigh

            // now measure the number of neighbours in neigh
            var a : int =  0;
            for (var nei in neig){
            //Debug.Log("neig "+nei);
                a++;
            }

            // now we filling the return variable tem
            var tem = new listsForTheLogic.ListsOC(a);
            for(var b = 0; b < a; b++){
                tem.leav[b] = neig[b];
                tem.gg[b] = currList.gg[0] + 1;
                tem.hh[b] = getHvalue(tem.leav[b], targ);
                tem.ff[b] = tem.gg[b] + tem.hh[b]; 
                tem.parent[b] = currList.leav[0];
                //currList.leav[0];
            }
        
            // now sort neigh as per the proximity to target
            // first we fill Tdif as per the tem   
            var Tdif = new float[a];
            var Tint = GetXandYvalues((parseInt(targ.name)));

            for (var c = 0.0; c < a; c++){
                var Sint = GetXandYvalues(parseInt(tem.leav[c].name));
                Tdif[c] = (Mathf.Sqrt(((Tint[0]-Sint[0])*(Tint[0]-Sint[0]))+((Tint[1]-Sint[1])*(Tint[1]-Sint[1]))));
                 //Debug.Log("diff "+c+" "+tem.leav[c].name+" "+Tdif[c].ToString());       
            }
           // Debug.Log("-------------------------------");
            //Now sort Tdif and thus tem
            for (var d = 0; d < a; d++){
                for (var e = 0; e < a; e++){
                    if (Tdif[d] < Tdif[e]){
                        var dif = Tdif[e];
                        var go  = tem.leav[e];
                        var Tf  = tem.ff[e];
                        var Tg  = tem.gg[e]; 
                        var Th  = tem.hh[e];


                 
                        Tdif[e]     = Tdif[d];
                        tem.leav[e] = tem.leav[d];
                        tem.ff[e]   = tem.ff[d]; 
                        tem.gg[e]   = tem.gg[d];   
                        tem.hh[e]   = tem.hh[d]; 


                        Tdif[d]     = dif;
                        tem.leav[d] = go;
                        tem.ff[d]   = Tf; 
                        tem.gg[d]   = Tg;   
                        tem.hh[d]   = Th; 
                    }
                }
            }

        // tem.SortNeigh("ff");
            for ( c = 0; c < a; c++){
            	tem.ff[c] = tem.ff[c] + (c/10);
            	//Debug.Log("Final Order "+c+" "+tem.leav[c].name+" "+Tdif[c].ToString()+" "+tem.ff[c]);
     		}
           // Debug.Log("Final Order "+tem.leav[0].name);

           // Debug.Log("-------------------------------");
           // tem.SortNeigh("ff");
            return tem;
}


function getHvalue (currLeaf : GameObject, target : GameObject) {
        //Debug.Log("getHvalue ");
              for (var a = 0; a < targetLeafs.Count; a++){
                  if (targetLeafs[a].name == target.name){
        // Debug.Log("aaaaaaaaaaaaaaaaaaa "+a+" "+currLeaf);
                    switch(a){
                        case 0:
                            for (var b = 0; b < LH1.Length ; b++){
                                if (LH1[b] == currLeaf){ return H1[b];}}
                                return 1000;
                        case 1:
                            for ( b = 0; b < LH2.Length; b++){
                                if (LH2[b] == currLeaf){ return H2[b];}}
                                return 1000;
                        case 2:
                            for ( b = 0; b < LH3.Length; b++){
                                if (LH3[b] == currLeaf){ return H3[b];}}
                                return 1000;
                        case 3:
                            for ( b = 0; b < LH4.Length; b++){
                                if (LH4[b] == currLeaf){ return H4[b];}}
                                return 1000;
                        case 4:
                            for ( b = 0; b < LH5.Length; b++){
                                if (LH5[b] == currLeaf){ return H5[b];}}
                                return 1000;
    }
            a = targetLeafs.Count;
    }
    }
    }





function GetXandYvalues(val : int) {
                var X = val/10; 
                var Y = val - (X*10); 
                var retVal = new int[2]; 
                retVal[0] = X; 
                retVal[1] = Y; 
                return retVal;
    }


function CheckForAnyTarget(currLeaf : GameObject , currTargetLeaf : GameObject){
        //Debug.Log("passed "+currLeaf.name+" "+currTargetLeaf.name);
            for (var targetLeaf in targetLeafs){
                if (targetLeaf != currTargetLeaf){
                    if (targetLeaf == currLeaf){
        //Debug.Log("Found "+targetLeaf+" "+currLeaf); 
                        return false;
    }
    }
    }
    return true;
    }










function GetLeafs (GO : GameObject) { // to find the leaves of Frogs and Caterpillars
                var hit = Physics2D.Raycast (( GO.gameObject.transform.position), Vector2.zero);
                if (hit.collider != null) {
                    return hit.collider.gameObject;
    }
    }




        /*        
        
        000 = no one move
        
        003 = only 3 move
        020 = only 2 move
        100 = only 1 move
        
        023 = 2,3 move
        120 = 1,2 move
        103 = 1,3 move
        
        123 = all move
        
        */