#pragma strict
import System.Collections.Generic;
import System;

private var frogss        : GameObject;
public  var frogsss       : GameObject;        
private var targetss      : GameObject;
private var frogsLeafs    : GameObject;
private var targetLeafs   : GameObject;
private var leafs         : List.< GameObject >;
private var openList      : listsForTheLogic.ListsOC;
private var closeList     : listsForTheLogic.ListsOC;
private var neighList     : listsForTheLogic.ListsOC;
private var G1 : int[]; private var LG1 : GameObject[]; 
private var H1 : int[]; private var LH1 : GameObject[];
private var path1 : List.< GameObject >; 
private var finalPath : Array; private var hopPos1 : GameObject; private var targetChasing1 : GameObject;
private var done1 : int = 3;
private var moveFrog  : int;
private var ASYouWonOrFail : AudioSource;
private var YouWonPanel    : GameObject;
private var LevelFail      : GameObject;

private var next = 0;
private var t = 0.0;
private var timeToStop = 2;

function CheckWhereToMove(){
    //Debug.Log("Let Me Cehck "+hopPos1+" "+finalPath.length);
    if (finalPath.length > 0){
        if (hopPos1 != null  ){
            if (next == 1){
                next = 0;
                hopPos1 = finalPath.Pop();
                t = Time.time;
                // Debug.Log(hopPos1);
                if (finalPath.length == 0){
                    //  Debug.Log("Path length empty");
                    timeToStop = 1;
                }
            }
        }
        else {
            hopPos1 = finalPath.Pop();// Debug.Log("HopPos set for first time "+hopPos1);
            t = Time.time;
        }
    }
    else {
        timeToStop = 1;
    }
}


function Move(){
   
    CheckWhereToMove();

    if (next == 0){
    var ST  = 0.1;
    var velo = Vector3.zero;
         
    if (moveFrog >= 100){
        if(done1 == 0){
            
            // orientation
            if (hopPos1.transform.position.x < frogss.transform.position.x){ 
                if (frogss.transform.localScale.x < 0){ 
                    frogss.transform.localScale.x = -(frogss.transform.localScale.x);// here we converted it negative
                }
            }
            else {
                if (frogss.transform.localScale.x > 0){ 
                    frogss.transform.localScale.x = -(frogss.transform.localScale.x);// here we converted it Positive
                }
            }
            
           // frogsGO.SetActive(false);
           // frogsJMP.SetActive(true);
            // move
            frogss.gameObject.transform.position = Vector3.SmoothDamp( frogss.gameObject.transform.position, Vector3(hopPos1.gameObject.transform.position.x, hopPos1.gameObject.transform.position.y,  frogss.gameObject.transform.position.z), velo, ST);
            
            if (Time.time - t > 0.5){
                frogss.gameObject.transform.position.x = hopPos1.gameObject.transform.position.x; 
                frogss.gameObject.transform.position.y = hopPos1.gameObject.transform.position.y;
                //yield WaitForSeconds(0.5);
             //   frogsGO.SetActive(true);
             //   frogsJMP.SetActive(false);
                next = 1;
                if (timeToStop == 1){
                    done1 = 1;
                    next = 100;
                    hopPos1 = null;
                    finalPath = new Array();
                    timeToStop = 0;
                    Destroy(frogss);
                }
               // Debug.Log("next set");
            }

        }
    }
    else {done1 = 1;}
    }// end if next == 0

    // to destroy frogss when player moved already B4 letting this forgss to complete its path
    if (TouchToSinkLeaves.move != 0){ 
        if (frogss.gameObject.activeSelf){
            done1 = 1;
            next = 100;
            hopPos1 = null;
            finalPath = new Array();
            timeToStop = 0;
            Destroy(frogss);
        }
    }

}




private var frogsGO : GameObject;
private var frogsJMP : GameObject;



function Start () {
    moveFrog = -1;
    targetss = GameObject.FindGameObjectWithTag("Target");
    var actualFrog = GameObject.FindGameObjectWithTag("Frog");
    frogss = Instantiate(frogsss, Vector3(actualFrog.transform.position.x,actualFrog.transform.position.y, 3) , Quaternion.identity);
    frogss.transform.position = actualFrog.transform.position;
    frogss.SetActive(true);
    var tfrogsGO = frogss.gameObject.transform.Find("FrogGO"); frogsGO = tfrogsGO.transform.gameObject;
    var tfrogsJMP = frogss.gameObject.transform.Find("FrogJMP"); frogsJMP = tfrogsJMP.transform.gameObject;
}
           
private var flag = 0;
function Update () {
    
    if (flag == 4){ // this means the Frog(not this frog but actual frog) is moving
        if (TouchToSinkLeaves.move == 9){
//            Debug.Log("TouchToSinkLeaves.move "+TouchToSinkLeaves.move);
            flag = 5;
        }
    }

    if (flag == 5){ // this means the Frog(not this frog but actual frog) has done moving
        if (TouchToSinkLeaves.move == 0){
//            Debug.Log("TouchToSinkLeaves.move "+TouchToSinkLeaves.move);
            flag = 3;
        }
    }

    if (TouchToSinkLeaves.move == 0 && flag == 3){
        //        Debug.Log("is it here ?? ");
        flag = 0;
        var actualFrog = GameObject.FindGameObjectWithTag("Frog");
        frogss = Instantiate(frogsss, Vector3(actualFrog.transform.position.x,actualFrog.transform.position.y, 3) , Quaternion.identity);
        frogss.transform.position = actualFrog.transform.position;
        //        Debug.Log(frogss.transform.position);
        frogss.SetActive(true); 
        var tfrogsGO = frogss.gameObject.transform.Find("FrogGO"); frogsGO = tfrogsGO.transform.gameObject;
        var tfrogsJMP = frogss.gameObject.transform.Find("FrogJMP"); frogsJMP = tfrogsJMP.transform.gameObject;
       
    }

    if (TouchToSinkLeaves.move == 0 && flag == 0 && TheLogic.win == 0) {
        //Debug.Log("and here ?? ");
        flag = 2; 
        resetPaths();
        GetLeavesActive(); // get active leafs
        GetTheActiveGO(); // get frogs and targets + their leafs
        getH(); // all the targets weights in H1-H5; LH1-LH5
        getG(); // all the Frogs   weights in G1-G3; LG1-LG3
        AStarAlgo();
        done1 = 3; next = 0;
        // Debug.Log("Two "+done1+" "+done2+" "+done3+" "+TouchToSinkLeaves.move+" "+frogs.Count);
        if(frogss != null ){done1 = 0;}
        
    }
    
    //this is to destriy when win or loose
    if (TheLogic.win != 0){
        if (frogss != null){if (frogss.activeSelf){Destroy(frogss);}}
        Destroy(this.gameObject);
    }
    
   
        
    if(flag == 2){
        Move();
        if(done1 == 1){
            flag = 4; done1 = 3;
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
    G1 = new int[leafs.Count]; 
    frogsLeafs = GetLeafs(frogss); 
    LG1 = new GameObject[leafs.Count];
       
    moveFrog = 100;

    //find Targetss 
    H1 = new int[leafs.Count]; 
    targetLeafs = GetLeafs(targetss);
    LH1 = new GameObject[leafs.Count]; 
}


function getH(){
    var i = 3;
        SetGorHvalues(targetLeafs, i);
}



function getG () {
    var i = 0;
    SetGorHvalues(frogsLeafs, i);
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


// Now we return the moved GO in leafs
temp = leafs[d];
leafs[d] = leafs[0];
leafs[0] = temp;


var j : int;

if (i == 0){for ( j = 0; j < gaOb.Count; j++) { G1[j] = wtt[j]; LG1[j] = gaOb[j];}}// Debug.Log(gaOb[j].name+" F1 "+wtt[j]);}}
if (i == 3){for ( j = 0; j < gaOb.Count; j++) { H1[j] = wtt[j]; LH1[j] = gaOb[j];}}// Debug.Log(gaOb[j].name+" T1 "+wtt[j]);}}
}



    // now we need to check - if leafs[b] is in gaOb ? 1. No - then move to e; 2. Yes - check weight
    //check(gaOb, leafs[b], wtt, e, a, b);
function check(list : List.< GameObject >, curr : GameObject, wttt : List.< int >, currPos : int, pos1 : int, pos2 : int){
       var ret = new int[3]; ret[0] = 1000; ret[1] = 1000; ret[2] = 1000;
      var flag1 = 0;
    //Check if the new GO is in list
      for (var a : int = 0; a < list.Count; a++){
               if (list[a] != null){
                    if (list[a].name == curr.name){
                        flag1 = 1;
                        break;
                    }
                }
        }

    // if flag never changed = the value is not found, hence its a new GO and can be moved into the list
        if (flag1 == 0){ ret[0] = 0;  ret[1] = currPos; ret[2] = (wttt[pos1] + 1); return ret;}

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
    var frogsLeaf = frogsLeafs; // for each frog
    var b : int = 1; // to keep track of Target #
    var targetLeaf = targetLeafs;
    var notDone : Boolean = true; //Debug.Log("notDone "+notDone);
    //set Open lists
        openList = new listsForTheLogic.ListsOC(leafs.Count);
        openList.leav[0] =  frogsLeaf;
        openList.ff[0] = 0; openList.gg[0] = 0; openList.hh[0] = 0;
        openList.parent[0] = frogsLeaf;
        closeList = new listsForTheLogic.ListsOC(leafs.Count);

            
        while(notDone & (openList.Length() >= 1)){
                openList.Sort("ff");
            if (openList.Length() == 1){
                Debug.Log("Pop list length "+openList.Length()); notDone = false; }
                
            var temp = openList.Pop();
    // Debug.Log("Pop "+temp.leav[0].name+" "+targetLeaf.name);
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
    //Debug.Log(neighLeaf.leav[c]+" "+neighLeaf.ff[c]+" "+neighLeaf.gg[c]+" "+neighLeaf.hh[c]+" "+neighLeaf.parent[c]);                      
    // 3.A is this the target ?  - if yes do something :|
                        if (neighLeaf.leav[c] == targetLeaf){ // check if this is the target we need :|
                            notDone = false; //Debug.Log("notDone "+notDone);
    //do something :| 
    //Debug.Log("Here it ended 3");
                            SetPathTemp(closeList, neighLeaf, frogsLeaf, targetLeaf, a, b, 3);
                            break;
}
    // 3.B else if - this neigh in closeList? - if yes check g
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
SetFinalPathsWithAI();
}// main function end


function setmoveFrog(num : int){

if (num == 1 & moveFrog >= 100){moveFrog = moveFrog - 100; Debug.Log("F1 foked");}
Debug.Log("moveFrog "+moveFrog);
  
if (moveFrog == 0){ Debug.Log("2 win was set here ");}
}




private var track : int = 0;

function  SetPathTemp(closLis : listsForTheLogic.ListsOC, lastLeaf : listsForTheLogic.ListsOC, sourceLeaf : GameObject, targLeaf : GameObject, a : int, b : int, DebugValue : int){
   
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
    //Debug.Log(targLeaf+" "+sourceLeaf);
    var val : Boolean = true;
    var lastGO : GameObject = lastLeaf.parent[0];
    if (lastGO.name == sourceLeaf.name){val = false; }
        while(val){
            for(var i : int = 0; i < closLis.Length(); i++){
                if (closLis.leav[i] != null){
                    if (closLis.leav[i].name == lastGO.name){
                        if (closLis.parent[i].name == sourceLeaf.name){val = false; break;}
                        else{
                            path.Add(closLis.parent[i]);
                            lastGO = closLis.parent[i];
                            }
                        }
                    }   
                }
            if (lastGO.name == sourceLeaf.name){val = false;}
        }// While end        
        if (a == 1){
            if (b == 1){ path1 = new List.< GameObject >(); for (var pat in path){path1.Add(pat); }}
        }
    }
}// function end



function SetFinalPaths(s : int){
    var pathA = new List.< GameObject >();
    if (s == 1){
        if (path1 != null){for( var q in path1){pathA.Add(q);}}
    }
    // path1  --> PathA
    var ho = new Array();
    if (pathA.Count !=  0){ho.Add(pathA.Count); }
    if (ho.Count == 0){
        setmoveFrog(s); 
        Debug.Log("Frog stop setting for frog "+s);
        return void;
    }      
    var finalPat = new List.< GameObject >();
    
    for (var pat in pathA){finalPat.Add(pat);}
    
    if(s == 1){
        finalPath = new Array(); 
        for (var finalPa in finalPat){
            finalPath.Add(finalPa); 
        }
    }
}


function resetPaths(){
    path1  = new List.< GameObject >();
}

function SetFinalPathsWithAI (){
    SetFinalPaths(1); 
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

			for ( c = 0; c < a; c++){
            	tem.ff[c] = tem.ff[c] + (c/10);
//            	Debug.Log("Final Order "+c+" "+tem.leav[c].name+" "+Tdif[c].ToString()+" "+tem.ff[c]);
     		}

        //tem.SortNeigh("ff");
        return tem;
}


function getHvalue (currLeaf : GameObject, target : GameObject) {
        var a = 0; 
        switch(a){
            case 0:
            for (var b = 0; b < LH1.Length ; b++){
                if (LH1[b] == currLeaf){ return H1[b];}
            }
        return 1000;
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
    var targetLeaf = targetLeafs;
    if (targetLeaf != currTargetLeaf){
        if (targetLeaf == currLeaf){
            return false;
        }
    }
    return true;
}


function GetLeafs (GO : GameObject) { // to find the leaves of Frogss and Caterpillars
            var hit = Physics2D.Raycast (( GO.gameObject.transform.position), Vector2.zero);
            if (hit.collider != null) {
                return hit.collider.gameObject;
    }
}