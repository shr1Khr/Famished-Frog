#pragma strict


public var NoOfBomb : int;
public var BombPrefab : GameObject;
public var dirShowPrefab : GameObject;
public var ST  : float;

private var Frog1Move : String;
private var Frog2Move : String;
private var Frog3Move : String;

private var frogLeaf : GameObject;	
private var frog2Leaf : GameObject;	
private var frog3Leaf : GameObject;	
private var targetLeaf : GameObject;	
private var targetLeaf2 : GameObject;	
private var targetLeaf3 : GameObject;	
private var targetLeaf4 : GameObject;	
private var targetLeaf5 : GameObject;	


private var LeavesActiveInSceneGO :  Array;
private var LeavesActiveInScene :  Collider2D[];

private var adj : Array;
private var actLeaf : Collider2D[]; 

private var FrogJMP : GameObject;
private var FrogJMP2 : GameObject;
private var FrogJMP3 : GameObject;

private var flagSet : int;


function Start () {
    
    GetBombNonRandom(); //Instantiate Snow on the leafs - mentioned on front screen
    flagSet = 0;
}


function Update () {
   /*
    if (flagSet == 0 && TouchToSinkLeaves.move == 9 ) {
        flagSet = 1;
    }

    if (flagSet == 1 && TouchToSinkLeaves.move == 0 ){
        flagSet = 0;
        CheckDir();
    }
    */
/*       dir : LeafMaths
            1+1
     8 -9        2 +11
     7 -10       3 +10
     6 -11       4 +9
            5-1
*/

    // Frog1
    if (TouchToSinkLeaves.move == 0 ){
        var frogGO = GameObject.FindGameObjectWithTag("Frog"); 
        var hit = Physics2D.Raycast ((frogGO.transform.position), Vector2.zero);
        if(hit.collider != null){ frogLeaf = hit.collider.gameObject; }
           if (frogLeaf.tag == "Frozen"){
                TouchToSinkLeaves.move = 41; 
                var adj1 = getAllAdjacentLeaves(frogLeaf);
                //var i = Random.Range(0, adj1.length);
                //CheckDir();
                //var i = GetMoveLeafNUmber (frogLeaf, adj1);
                var i = GetDir(frogLeaf, adj1);
                Debug.Log("will be slipped to "+adj1[i]);
                Frog1Move = adj1[i];
             //   toMovePos(adj2[i]);
        }
    }
     if (TouchToSinkLeaves.move == 41){to1MovePos(Frog1Move);}


    // Frog2
     if (TouchToSinkLeaves.move == 0 ){
         var frog2GO = GameObject.FindGameObjectWithTag("Frog2"); 
         if (frog2GO != null){
         hit = Physics2D.Raycast ((frog2GO.transform.position), Vector2.zero);
         if(hit.collider != null){ frog2Leaf = hit.collider.gameObject; }
         if (frog2Leaf.tag == "Frozen"){
             TouchToSinkLeaves.move = 42; 
             var adj2 = getAllAdjacentLeaves(frog2Leaf);
             //var j = Random.Range(0, adj2.length);
             //CheckDir();
             //var j = GetMoveLeafNUmber (frog2Leaf, adj2);
             var j = GetDir(frog2Leaf, adj2);
             Debug.Log("will be slipped to "+adj2[j]);
             Frog2Move = adj2[j];
             //   toMovePos(adj2[i]);
              }
         }
     }
     if (TouchToSinkLeaves.move == 42){to2MovePos(Frog2Move);}



    // Frog3
     if (TouchToSinkLeaves.move == 0){
         var frog3GO = GameObject.FindGameObjectWithTag("Frog3"); 
         if (frog3GO != null){
         hit = Physics2D.Raycast ((frog3GO.transform.position), Vector2.zero);
         if(hit.collider != null){ frog3Leaf = hit.collider.gameObject; }
         if (frog3Leaf.tag == "Frozen"){
             TouchToSinkLeaves.move = 43; 
             var adj3 = getAllAdjacentLeaves(frog3Leaf);
             //var k = Random.Range(0, adj3.length);
             //CheckDir();
             //var k = GetMoveLeafNUmber (frog3Leaf, adj3);
             var k = GetDir(frog3Leaf, adj3);
             Debug.Log("will be slipped to "+adj3[k]);
             Frog3Move = adj3[k];
             //   toMovePos(adj2[i]);
             }
         }
     }


     if (TouchToSinkLeaves.move == 43){to3MovePos(Frog3Move);}
}

function GetDir (currGO : GameObject, neigh : Array) { // we need to return the value = int, so that the frog can move to proper leaf as per the directin
                                                    // set via PlayerPrefs.GetInt("LeafDir"+Application.loadedLevel+""+this.gameObject.name);
    var val = new Array(); 
    for (var neig in neigh){
        if (neig != null){
            var curr = parseInt(currGO.name);
            var lf = parseInt(neig+"");
            if (lf == curr+1) { val.Add(1);}
            if (lf == curr+11){ val.Add(2);}
            if (lf == curr+10){ val.Add(3);}
            if (lf == curr+9) { val.Add(4);}
            if (lf == curr-1) { val.Add(5);}
            if (lf == curr-11){ val.Add(6);}
            if (lf == curr-10){ val.Add(7);}
            if (lf == curr-9) { val.Add(8);}
        }
    }

    var b = 0; var c = PlayerPrefs.GetInt("LeafDir"+Application.loadedLevel+""+currGO.gameObject.name);
    for (var a = 0; a < neigh.length; a++){
        if (neigh[a] != null){
            if (parseInt(val[b]+"") == c){
                return a;
            }
            b++;
        }
    }


}



/*
function GetMoveLeafNUmber (currGO : GameObject, neigh : Array) {
    var i : int;
    for (var a = 0; a < 9; a++){
        Debug.Log(val[a]+" "+dir[a]);
        if (parseInt(currGO.name) == val[a]){
            i = dir[a]; 
/*           dir : LeafMaths
                1+1
         8 -9        2 +11
         7 -10       3 +10
         6 -11       4 +9
                5-1
*//*
            if (i == 1){ 
                for(var b = 0; b < neigh.length; b++){
                    if (parseInt(neigh[b]+"") == (parseInt(currGO.name) + 1) ){
                        Debug.Log(b);
                        return b;
                    }
                }
            }
            
            if (i == 2){ 
                for(b = 0; b < neigh.length; b++){
                    if (parseInt(neigh[b]+"") == (parseInt(currGO.name) + 11) ){
                        Debug.Log(b);
                        return b;
                    }
                }
            }

            if (i == 3){ 
                for(b = 0; b < neigh.length; b++){
                    if (parseInt(neigh[b]+"") == (parseInt(currGO.name) + 10) ){
                        Debug.Log(b);
                        return b;
                    }
                }
            }

            if (i == 4){ 
                for(b = 0; b < neigh.length; b++){
                    if (parseInt(neigh[b]+"") == (parseInt(currGO.name) + 9) ){
                        Debug.Log(b);
                        return b;
                    }
                }
            }
            if (i == 5){ 
                for(b = 0; b < neigh.length; b++){
                    if (parseInt(neigh[b]+"") == (parseInt(currGO.name) -1) ){
                        Debug.Log(b);
                        return b;
                    }
                }
            }

            if (i == 6){ 
                for(b = 0; b < neigh.length; b++){
                    if (parseInt(neigh[b]+"") == (parseInt(currGO.name) -11) ){
                        Debug.Log(b);
                        return b;
                    }
                }
            }

            if (i == 7){ 
                for(b = 0; b < neigh.length; b++){
                    if (parseInt(neigh[b]+"") == (parseInt(currGO.name) -10) ){
                        Debug.Log(b);
                        return b;
                    }
                }
            }

            if (i == 8){ 
                for(b = 0; b < neigh.length; b++){
                    if (parseInt(neigh[b]+"") == (parseInt(currGO.name) -9) ){
                        Debug.Log(b);
                        return b;
                    }
                }
            }





        }
    }
}
*/
function GetBomb(){

    //yield WaitForSeconds(2);
    for (var a : int = 0; a < NoOfBomb; a++){
        findAllLeaves();   // find all leaves except - frogLeaf, targetLeaf, frozen or Rocks;
       var i = parseInt(Random.Range(0, LeavesActiveInSceneGO.length));
        // Debug.Log("Bomb at Leaf "+ LeavesActiveInSceneGO[i]);
       for (var j = 0; j < LeavesActiveInScene.Length; j++){
        //  Debug.Log(LeavesActiveInScene[j].gameObject);
           if (LeavesActiveInScene[j].gameObject == LeavesActiveInSceneGO[i]){
           var GO = LeavesActiveInScene[j].gameObject;
        //   Debug.Log(GO);
           j = LeavesActiveInScene.Length + 10;
           break;
    }
}

Instantiate(BombPrefab, Vector3(GO.transform.position.x, GO.transform.position.y, GO.transform.position.z - 10),  Quaternion.identity);

}

}

private var val = new int[20];
//private var dir = new int[20];

public var val1 : int;
//public var dir1 : int;
public var val2 : int;
//public var dir2 : int;
public var val3 : int;
//public var dir3 : int;
public var val4 : int;
//public var dir4 : int;
public var val5 : int;
//public var dir5 : int;
public var val6 : int;
//public var dir6 : int;
public var val7 : int;
//public var dir7 : int;
public var val8 : int;
//public var dir8 : int;
public var val9 : int;
//public var dir9 : int;
public var val10 : int;
//public var dir10 : int;
public var val11 : int;
//public var dir11 : int;
public var val12 : int;
//public var dir12 : int;
public var val13 : int;
//public var dir13 : int;
public var val14 : int;
//public var dir14 : int;
public var val15 : int;
//public var dir15 : int;
public var val16 : int;
//public var dir16 : int;
public var val17 : int;
//public var dir17 : int;
public var val18 : int;
//public var dir18 : int;
public var val19 : int;
//public var dir19 : int;
public var val20 : int;
//public var dir20 : int;

function FilVal(){
    val[0] = 0;
    val[1] = val1; val[2] = val2; val[3] = val3; val[4] = val4; val[5] = val5; val[6] = val6; val[7] = val7; val[8] = val8; val[9] = val9; val[10] = val10; 
    val[11] = val11; val[12] = val12; val[13] = val13; val[14] = val14; val[15] = val15; val[16] = val16; val[17] = val17; val[18] = val18; val[19] = val19; 
  /*  
    dir[0] = 0;
    dir[1] = dir1; dir[2] = dir2; dir[3] = dir3; dir[4] = dir4; dir[5] = dir5; dir[6] = dir6; dir[7] = dir7; dir[8] = dir8; dir[9] = dir9; dir[10] = dir10; 
    dir[11] = dir11; dir[12] = dir12; dir[13] = dir13; dir[14] = dir14; dir[15] = dir15; dir[16] = dir16; dir[17] = dir17; dir[18] = dir18; dir[19] = dir19; 
  */ 
}

function GetBombNonRandom(){
    FilVal(); // this is to add all the leaf values entered in inspector to val
    findAllLeaves(); // get all active leafs, remove frogs and target leafs
    for(var a = 0; a < val.Length; a++){
        if (val[a] != 0 ){ //&& dir[a] != 0){
            for(var b = 0; b < LeavesActiveInScene.length; b++){
                if(LeavesActiveInScene[b].gameObject.name == val[a].ToString()){
                    var GO = LeavesActiveInScene[b].gameObject;
                    Instantiate(BombPrefab, Vector3(GO.transform.position.x, GO.transform.position.y, GO.transform.position.z - 10),  Quaternion.identity);
                    SetDir(GO, a);

                }
            }
        }    
    }
}

function SetDir (GO : GameObject, a : int) { // below part to initiate dir prefab
    
    var diePrefab = Instantiate(dirShowPrefab, Vector3(GO.transform.position.x, GO.transform.position.y, GO.transform.position.z - 10),  Quaternion.identity);
 /*   dir[a] = CheckIfLeafThere(GO, dir[a]);
    if (dir[a] == 1){
        diePrefab.transform.rotation.eulerAngles  = Vector3(0,0,0);
    }  
    if (dir[a] == 2){
        diePrefab.transform.rotation.eulerAngles  = Vector3(0,0,-50); 
    }
    if (dir[a] == 3){
        diePrefab.transform.rotation.eulerAngles  = Vector3(0,0,-90);
    }
    if (dir[a] == 4){
        diePrefab.transform.rotation.eulerAngles  = Vector3(0,0,-135);
    }
    if (dir[a] == 5){
        diePrefab.transform.rotation.eulerAngles  = Vector3(0,0,180);
    }
    if (dir[a] == 6){
        diePrefab.transform.rotation.eulerAngles  = Vector3(0,0,135);
    }
    if (dir[a] == 7){
        diePrefab.transform.rotation.eulerAngles  = Vector3(0,0,90);
    }
    if (dir[a] == 8){
        diePrefab.transform.rotation.eulerAngles  = Vector3(0,0,50);
    }   */
}

/*
function CheckDir () {
    findAllLeaves();
    var ddir = GameObject.FindGameObjectsWithTag("Direction");
    for (var a = 0; a < ddir.Length; a++){
        var hit = Physics2D.Raycast (ddir[a].transform.position, Vector2.zero);
        if (hit.collider != null){ // here we have Leafs
            for (var b = 0; b < val.Length; b++) {
                if (parseInt(val[b]) == parseInt(hit.collider.gameObject.name) ) {
                    ddir[a].gameObject.name = val[b].ToString(); // we named the dir(clone) to 
                    Debug.Log(val[b]+" "+ddir[a].name+" "+dir[b]);

                    // Now check if the directed leaf still there, else change dir
                    dir[b] = CheckIfLeafThere(hit.collider.gameObject, dir[b]);
                    if (dir[b] == 1){
                        ddir[a].transform.rotation.eulerAngles  = Vector3(0,0,0);
                    }  
                    if (dir[b] == 2){
                        ddir[a].transform.rotation.eulerAngles  = Vector3(0,0,-50); 
                    }
                    if (dir[b] == 3){
                        ddir[a].transform.rotation.eulerAngles  = Vector3(0,0,-90);
                    }
                    if (dir[b] == 4){
                        ddir[a].transform.rotation.eulerAngles  = Vector3(0,0,-135);
                    }
                    if (dir[b] == 5){
                        ddir[a].transform.rotation.eulerAngles  = Vector3(0,0,180);
                    }
                    if (dir[b] == 6){
                        ddir[a].transform.rotation.eulerAngles  = Vector3(0,0,135);
                    }
                    if (dir[b] == 7){
                        ddir[a].transform.rotation.eulerAngles  = Vector3(0,0,90);
                    }
                    if (dir[b] == 8){
                        ddir[a].transform.rotation.eulerAngles  = Vector3(0,0,50);
                    }
                }
            }
        }
    }
}
*/
/*
function CheckIfLeafThere(curr : GameObject, currDir : int) {
    /*       dir : LeafMaths
                1+1
         8 -9        2 +11
         7 -10       3 +10
         6 -11       4 +9
                5-1
    */ /*
    var leafMaths = new int[9]; leafMaths[0] = 0;    leafMaths[1] = 1;     leafMaths[2] = 11;
                                leafMaths[3] = (10); leafMaths[4] = (9);   leafMaths[5] = (-1);
                                leafMaths[6] = (-11);leafMaths[7] = (-10); leafMaths[8] = (-9);
    var newDir : int;
    var iterationTab = 0;
    for (var a = 1; a < 9; a++){
        if (iterationTab >= 16) {Debug.Log("Was going into infinite loop "+curr.name); return currDir;} // to make sure it doesnt go into infinite loop
        if (a == currDir){
            for (var LeavesActiveInScen in LeavesActiveInScene){
                if (parseInt(LeavesActiveInScen.gameObject.name) == (parseInt(curr.name) + parseInt(leafMaths[currDir]))){
                    //Debug.Log("Yes that leaf does exist "+LeavesActiveInScen.gameObject.name +" "+curr.name );
                    return currDir;
                }
                }
                iterationTab++;
                a = 1;
                if (currDir == 8){
                    currDir = 1;
                }
                else {
                    currDir++;
                }
            
        }
    }
}

*/



function fail(){ // Frog & Target
    PlayerPrefs.SetInt("fail"+Application.loadedLevel,PlayerPrefs.GetInt("fail"+ Application.loadedLevel)+1);
    //PlayerPrefs.SetInt("Star"+Application.loadedLevel, 0 ); 
    
    var frogGO = GameObject.FindGameObjectWithTag("Frog");
    var frogGOChild = frogGO.gameObject.Find("GO");
    var failFrogTransform = frogGO.transform.Find("FailImage");
    var FailFrogGo = failFrogTransform.gameObject;
    var GO = GameObject.FindGameObjectWithTag("Target");
    
    var MC = GameObject.Find("Main Camera");
    var TLevelFail = MC.transform.Find("Canvas/Fail");
    var LevelFail = TLevelFail.transform.gameObject;


    yield WaitForSeconds(0.5); 
    if(TouchToSinkLeaves.move == 0){
        FailFrogGo.SetActive(true);
        GO.SetActive(false);
        frogGOChild.SetActive(false);
   
        yield WaitForSeconds(1.5); 
        LevelFail.SetActive(true);
    }

}

function fail2(){ // Frog2 & Target2
    PlayerPrefs.SetInt("fail"+Application.loadedLevel,PlayerPrefs.GetInt("fail"+ Application.loadedLevel)+1);
    //PlayerPrefs.SetInt("Star"+Application.loadedLevel, 0 ); 
    
    var frog2GO = GameObject.FindGameObjectWithTag("Frog2");
    var frog2GOChild = frog2GO.gameObject.Find("GO");
    var failFrogTransform = frog2GO.transform.Find("FailImage");
    var FailFrogGo = failFrogTransform.gameObject;
    var GO = GameObject.FindGameObjectWithTag("Target2");
    
    var MC = GameObject.Find("Main Camera");
    var TLevelFail = MC.transform.Find("Canvas/Fail");
    var LevelFail = TLevelFail.transform.gameObject;


    yield WaitForSeconds(0.5); 
    if(TouchToSinkLeaves.move == 0){
        FailFrogGo.SetActive(true);
        GO.SetActive(false);
        frog2GOChild.SetActive(false);
   
        yield WaitForSeconds(1.5); 
        LevelFail.SetActive(true);
    }

}

function fail3(){ // Frog3 & Target2
    PlayerPrefs.SetInt("fail"+Application.loadedLevel,PlayerPrefs.GetInt("fail"+ Application.loadedLevel)+1);
    //PlayerPrefs.SetInt("Star"+Application.loadedLevel, 0 ); 
    
    var frog3GO = GameObject.FindGameObjectWithTag("Frog3");
    var frog3GOChild = frog3GO.gameObject.Find("GO");
    var failFrogTransform = frog3GO.transform.Find("FailImage");
    var FailFrogGo = failFrogTransform.gameObject;
    var GO = GameObject.FindGameObjectWithTag("Target2");
    
    var MC = GameObject.Find("Main Camera");
    var TLevelFail = MC.transform.Find("Canvas/Fail");
    var LevelFail = TLevelFail.transform.gameObject;


    yield WaitForSeconds(0.5); 
    if(TouchToSinkLeaves.move == 0){
        FailFrogGo.SetActive(true);
        GO.SetActive(false);
        frog3GOChild.SetActive(false);
   
        yield WaitForSeconds(1.5); 
        LevelFail.SetActive(true);
    }

}

function fail4(){ // Frog & Target2
    PlayerPrefs.SetInt("fail"+Application.loadedLevel,PlayerPrefs.GetInt("fail"+ Application.loadedLevel)+1);
    PlayerPrefs.SetInt("Star"+Application.loadedLevel, 0 ); 
    
    var frogGO = GameObject.FindGameObjectWithTag("Frog");
    var frogGOChild = frogGO.gameObject.Find("GO");
    var failFrogTransform = frogGO.transform.Find("FailImage");
    var FailFrogGo = failFrogTransform.gameObject;
    var GO = GameObject.FindGameObjectWithTag("Target2");
    
    var MC = GameObject.Find("Main Camera");
    var TLevelFail = MC.transform.Find("Canvas/Fail");
    var LevelFail = TLevelFail.transform.gameObject;


    yield WaitForSeconds(0.5); 
    if(TouchToSinkLeaves.move == 0){
        FailFrogGo.SetActive(true);
        GO.SetActive(false);
        frogGOChild.SetActive(false);
   
        yield WaitForSeconds(1.5); 
        LevelFail.SetActive(true);
    }

}

function fail5(){ // Frog2 & Target
    PlayerPrefs.SetInt("fail"+Application.loadedLevel,PlayerPrefs.GetInt("fail"+ Application.loadedLevel)+1);
    PlayerPrefs.SetInt("Star"+Application.loadedLevel, 0 ); 
    
    var frog2GO = GameObject.FindGameObjectWithTag("Frog2");
    var frog2GOChild = frog2GO.gameObject.Find("GO");
    var failFrogTransform = frog2GO.transform.Find("FailImage");
    var FailFrogGo = failFrogTransform.gameObject;
    var GO = GameObject.FindGameObjectWithTag("Target");
    
    var MC = GameObject.Find("Main Camera");
    var TLevelFail = MC.transform.Find("Canvas/Fail");
    var LevelFail = TLevelFail.transform.gameObject;


    yield WaitForSeconds(0.5); 
    if(TouchToSinkLeaves.move == 0){
        FailFrogGo.SetActive(true);
        GO.SetActive(false);
        frog2GOChild.SetActive(false);
   
        yield WaitForSeconds(1.5); 
        LevelFail.SetActive(true);
    }

}

function fail6(){ // Frog3 & Target
    PlayerPrefs.SetInt("fail"+Application.loadedLevel,PlayerPrefs.GetInt("fail"+ Application.loadedLevel)+1);
    PlayerPrefs.SetInt("Star"+Application.loadedLevel, 0 ); 
    
    var frog3GO = GameObject.FindGameObjectWithTag("Frog3");
    var frog3GOChild = frog3GO.gameObject.Find("GO");
    var failFrogTransform = frog3GO.transform.Find("FailImage");
    var FailFrogGo = failFrogTransform.gameObject;
    var GO = GameObject.FindGameObjectWithTag("Target");
    
    var MC = GameObject.Find("Main Camera");
    var TLevelFail = MC.transform.Find("Canvas/Fail");
    var LevelFail = TLevelFail.transform.gameObject;


    yield WaitForSeconds(0.5); 
    if(TouchToSinkLeaves.move == 0){
        FailFrogGo.SetActive(true);
        GO.SetActive(false);
        frog3GOChild.SetActive(false);
   
        yield WaitForSeconds(1.5); 
        LevelFail.SetActive(true);
    }

}






function to1MovePos(GO : String){
    
    var velo = Vector3.zero;
    for (var a : int = 0; a < LeavesActiveInScene.Length; a++){
        if (LeavesActiveInScene[a].gameObject.name == GO){
           Debug.Log(GO);
           var frogGO = GameObject.FindGameObjectWithTag("Frog");
           
           frogGO.transform.position = Vector3.SmoothDamp(frogGO.transform.position, Vector3(LeavesActiveInScene[a].gameObject.transform.position.x, LeavesActiveInScene[a].gameObject.transform.position.y, frogGO.transform.position.z), velo, ST);
           var hit = Physics2D.Raycast ((frogGO.transform.position), Vector2.zero);
           if(hit.collider != null){ 
                if (hit.collider.gameObject == LeavesActiveInScene[a].gameObject ){
                    frogGO.transform.position = Vector3(LeavesActiveInScene[a].gameObject.transform.position.x, LeavesActiveInScene[a].gameObject.transform.position.y, frogGO.transform.position.z);
        //FrogJMP.transform.position = frogGO.transform.position;
                    Debug.Log("Task Done"); TouchToSinkLeaves.move = 0;check();}
}
}
}
}



function to2MovePos(GO : String){
    
    var velo = Vector3.zero;
    for (var a : int = 0; a < LeavesActiveInScene.Length; a++){
        if (LeavesActiveInScene[a].gameObject.name == GO){
           Debug.Log(GO);
           var frogGO = GameObject.FindGameObjectWithTag("Frog2");
           frogGO.transform.position = Vector3.SmoothDamp(frogGO.transform.position, Vector3(LeavesActiveInScene[a].gameObject.transform.position.x, LeavesActiveInScene[a].gameObject.transform.position.y, frogGO.transform.position.z), velo, ST);
           var hit = Physics2D.Raycast ((frogGO.transform.position), Vector2.zero);
           if(hit.collider != null){ 
                if (hit.collider.gameObject == LeavesActiveInScene[a].gameObject ){
                    frogGO.transform.position = Vector3(LeavesActiveInScene[a].gameObject.transform.position.x, LeavesActiveInScene[a].gameObject.transform.position.y, frogGO.transform.position.z);
        //FrogJMP2.transform.position = frogGO.transform.position;
           Debug.Log("Task Done"); TouchToSinkLeaves.move = 0;check();}
}
}
}
}

function to3MovePos(GO : String){
   
    var velo = Vector3.zero;
    for (var a : int = 0; a < LeavesActiveInScene.Length; a++){
        if (LeavesActiveInScene[a].gameObject.name == GO){
           Debug.Log(GO);
           var frogGO = GameObject.FindGameObjectWithTag("Frog3");
           frogGO.transform.position = Vector3.SmoothDamp(frogGO.transform.position, Vector3(LeavesActiveInScene[a].gameObject.transform.position.x, LeavesActiveInScene[a].gameObject.transform.position.y, frogGO.transform.position.z), velo, ST);
           var hit = Physics2D.Raycast ((frogGO.transform.position), Vector2.zero);
           if(hit.collider != null){ 
                if (hit.collider.gameObject == LeavesActiveInScene[a].gameObject ){
                    frogGO.transform.position = Vector3(LeavesActiveInScene[a].gameObject.transform.position.x, LeavesActiveInScene[a].gameObject.transform.position.y, frogGO.transform.position.z);
        //FrogJMP3.transform.position = frogGO.transform.position;
           Debug.Log("Task Done"); TouchToSinkLeaves.move = 0;check();}
}
}
}
}

function check(){
    findAllLeaves();
    
    if (frogLeaf.name == targetLeaf.name){fail();}
   
    if (targetLeaf2 != null){
        if (frogLeaf.name == targetLeaf2.name){fail4();}}

    
    if (frog2Leaf != null){
        if (frog2Leaf.name == targetLeaf.name){fail5();}
        if (targetLeaf2 != null){
            if (frog2Leaf.name == targetLeaf2.name){fail2();}}}

    if (frog3Leaf != null){
        if (frog3Leaf.name == targetLeaf.name){fail6();}
        if (targetLeaf2 != null){
            if (frog3Leaf.name == targetLeaf2.name){fail3();}}}

}



function getAllAdjacentLeaves(GO : GameObject){
    adj = new Array();
    var curr = parseInt(GO.name);
    var LeavesGO = GameObject.FindGameObjectWithTag("Leaves"); 
    actLeaf = LeavesGO.GetComponentsInChildren.<Collider2D>(); 
    for (var a : int = 0; a < actLeaf.Length; a++){ 
        if((parseInt(actLeaf[a].gameObject.name) == (curr - 1 ) )||
        (parseInt(actLeaf[a].gameObject.name) == (curr + 1 ))||
        (parseInt(actLeaf[a].gameObject.name) == (curr - 10))||
        (parseInt(actLeaf[a].gameObject.name) == (curr - 11))||
        (parseInt(actLeaf[a].gameObject.name) == (curr - 9 ))||
        (parseInt(actLeaf[a].gameObject.name) == (curr + 10))||
        (parseInt(actLeaf[a].gameObject.name) == (curr + 11))||
        (parseInt(actLeaf[a].gameObject.name) == (curr + 9 ))){
            adj.Push(actLeaf[a].gameObject.name);
    }
}

return adj;
}


//------------------------------------------------------------------

function findAllLeaves(){
    var FrogLeafGOName : String; 
    var TargetLeafGOName : String; 
    var hit : RaycastHit2D; 
    
    

    // 2.1. Get Position of Frog an thus the Leaf on which it sits---------------------
    var frogGO = GameObject.FindGameObjectWithTag("Frog"); 
    hit = Physics2D.Raycast ((frogGO.transform.position), Vector2.zero);
    if(hit.collider != null){ frogLeaf = hit.collider.gameObject; }
	
    // 2.2 Get Position of Frog2 an thus the Leaf on which it sits---------------------
    var frogGO2 = GameObject.FindGameObjectWithTag("Frog2"); 
    if (frogGO2 != null){
        hit = Physics2D.Raycast ((frogGO2.transform.position), Vector2.zero);
        if(hit.collider != null){ frog2Leaf = hit.collider.gameObject; }}

    // 2.3 Get Position of Frog3 an thus the Leaf on which it sits---------------------
    var frogGO3 = GameObject.FindGameObjectWithTag("Frog3"); 
    if (frogGO3 != null){
        hit = Physics2D.Raycast ((frogGO3.transform.position), Vector2.zero);
        if(hit.collider != null){ frog3Leaf = hit.collider.gameObject; }}

    // 2.4. Get Position of Target an thus the Leaf on which it sits---------------------
    var TargetGO = GameObject.FindGameObjectWithTag("Target"); 
    hit = Physics2D.Raycast ((TargetGO.transform.position), Vector2.zero);
    if(hit.collider != null){ targetLeaf = hit.collider.gameObject; }
	
    // 2.5. Get Position of Target#2 an thus the Leaf on which it sits-------------------
    var TargetGO2 = GameObject.FindGameObjectWithTag("Target2"); 
    if (TargetGO2 != null){
        hit = Physics2D.Raycast ((TargetGO2.transform.position), Vector2.zero);
        if(hit.collider != null){ targetLeaf2 = hit.collider.gameObject; }}

    // 2.6. Get Position of Target#2 an thus the Leaf on which it sits--------------------
    var TargetGO3 = GameObject.FindGameObjectWithTag("Target3"); 
    if (TargetGO3 != null){
        hit = Physics2D.Raycast ((TargetGO3.transform.position), Vector2.zero);
        if(hit.collider != null){ targetLeaf3 = hit.collider.gameObject; }}

    // 2.7. Get Position of Target#2 an thus the Leaf on which it sits--------------------
    var TargetGO4 = GameObject.FindGameObjectWithTag("Target4"); 
    if (TargetGO4 != null){
        hit = Physics2D.Raycast ((TargetGO4.transform.position), Vector2.zero);
        if(hit.collider != null){ targetLeaf4 = hit.collider.gameObject; }}
    
    // 2.8. Get Position of Target#2 an thus the Leaf on which it sits---------------------
    var TargetGO5 = GameObject.FindGameObjectWithTag("Target5"); 
    if (TargetGO5 != null){
        hit = Physics2D.Raycast ((TargetGO5.transform.position), Vector2.zero);
        if(hit.collider != null){ targetLeaf5 = hit.collider.gameObject; }}

    // 1. Get All Active leaves -------------------------------------------------------1
    GetAllActiveLeaves();
}


//1. Get all Active leaves with tag = "Untagged" -----------------------------------------------------
function GetAllActiveLeaves(){
    var LeavesGO = GameObject.FindGameObjectWithTag("Leaves"); 
    LeavesActiveInScene = LeavesGO.GetComponentsInChildren.<Collider2D>(); 
    LeavesActiveInSceneGO = new Array();
    for (var a : int = 0; a < LeavesActiveInScene.Length; a++)
    {   
        if (LeavesActiveInScene[a].gameObject.tag == "Untagged" || LeavesActiveInScene[a].gameObject.tag == "StarLeaf"){
            if(frogLeaf.name != LeavesActiveInScene[a].gameObject.name){
                if (targetLeaf.name != LeavesActiveInScene[a].gameObject.name){
        LeavesActiveInSceneGO.Push(LeavesActiveInScene[a].gameObject);
        //Debug.Log(LeavesActiveInScene[a].gameObject.name);
    }
}
}
}
//Debug.Log("length of Ativ "+ LeavesActiveInScene.Length+" "+LeavesActiveInSceneGO.length);

// Remove target leaf
for (a = 0; a < LeavesActiveInSceneGO.length; a++){
    if (targetLeaf.name == LeavesActiveInScene[a].gameObject.name){
        LeavesActiveInSceneGO.RemoveAt(a);
       // Debug.Log(" T1 ");
        a = LeavesActiveInSceneGO.length + 10;
        break;
    }
}

// Remove target 2 leaf
if (targetLeaf2 != null){ 
    for (a = 0; a < LeavesActiveInSceneGO.length; a++){
        if (targetLeaf2.name == LeavesActiveInScene[a].gameObject.name){
            LeavesActiveInSceneGO.RemoveAt(a);
            Debug.Log(" T2 ");
            a = LeavesActiveInSceneGO.length + 10;
            break;
        }
    }
}

// Remove target 3 leaf
if (targetLeaf3 != null){ 
    for (a = 0; a < LeavesActiveInSceneGO.length; a++){
        if (targetLeaf3.name == LeavesActiveInScene[a].gameObject.name){
            LeavesActiveInSceneGO.RemoveAt(a);
            Debug.Log(" T3 ");
            a = LeavesActiveInSceneGO.length + 10;
            break;
        }
    }
}

// Remove target 4 leaf
if (targetLeaf4 != null){ 
    for (a = 0; a < LeavesActiveInSceneGO.length; a++){
        if (targetLeaf4.name == LeavesActiveInScene[a].gameObject.name){
            LeavesActiveInSceneGO.RemoveAt(a);
            Debug.Log(" T4 ");
            a = LeavesActiveInSceneGO.length + 10;
            break;
        }
    }
}

// Remove target 5 leaf
if (targetLeaf5 != null){ 
    for (a = 0; a < LeavesActiveInSceneGO.length; a++){
        if (targetLeaf5.name == LeavesActiveInScene[a].gameObject.name){
            LeavesActiveInSceneGO.RemoveAt(a);
            Debug.Log(" T5 ");
            a = LeavesActiveInSceneGO.length + 10;
            break;
        }
    }
}

// Remove Frog Leaf
if (frogLeaf != null){
    for (a = 0; a < LeavesActiveInSceneGO.length; a++){
        if (frogLeaf.name == LeavesActiveInScene[a].gameObject.name){
            LeavesActiveInSceneGO.RemoveAt(a);
          //  Debug.Log(" F1 ");
            a = LeavesActiveInSceneGO.length + 10;
            break;
        }
    }
}

// Remove Frog 2 Leaf
if (frog2Leaf != null){
    for (a = 0; a < LeavesActiveInSceneGO.length; a++){
        if (frog2Leaf.name == LeavesActiveInScene[a].gameObject.name){
            LeavesActiveInSceneGO.RemoveAt(a);
            Debug.Log(" F2 ");
            a = LeavesActiveInSceneGO.length + 10;
            break;
        }
    }
}

// Remove Frog 3 Leaf
if (frog3Leaf != null){
    for (a = 0; a < LeavesActiveInSceneGO.length; a++){
        if (frog3Leaf.name == LeavesActiveInScene[a].gameObject.name){
            LeavesActiveInSceneGO.RemoveAt(a);
            Debug.Log(" F3 ");
            a = LeavesActiveInSceneGO.length + 10;
            break;
        }
    }
}

}


