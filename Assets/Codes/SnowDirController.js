#pragma strict

private var activeLeaves : GameObject[];
private var thisGameObject : GameObject;
private var neigh : GameObject[];
private var flagSet : int;

function Start () {
    
    flagSet = 0;
    GetAllLeaf(); 
    GetThisLeafNumber();

    for (var a = 0; a < activeLeaves.length; a++) {
        PlayerPrefs.DeleteKey("LeafDir"+Application.loadedLevel+""+activeLeaves[a].gameObject.name);
    }
}

// bug = remove the directional thingy when leaf it was suppose to land was sunk
InvokeRepeating ("CheckForBelowLeaf", 0, 5);

function CheckForBelowLeaf(){
    Debug.Log("Checing for direction thingy");
    var hit = Physics2D.Raycast ((this.gameObject.transform.position), Vector2.zero);
    if(hit.collider != null){ } // if found something then it is good, else the directional thingy wil be destroyed
    else{
        Destroy(this.gameObject);
    }

}


function Update () {
    // this part is t make sure once we sink a leaf, the dir if any pointing to that part is corrected
    
    if (flagSet == 0 && TouchToSinkLeaves.move == 9 ) {
        flagSet = 1;
    }

    if (flagSet == 1 && TouchToSinkLeaves.move == 0 ){
        flagSet = 0;
        CheckDir();
    }
    
}

function CheckDir () { // this function is trigered when the last leaf sunk is actually the "current" direction of some Dir

    Debug.Log("Is it ever here??");
    // so we have the last sunken leaf in  PlayerPrefs.SetInt("LastLeafSunkInt", parseInt(go.name)); <-- from TOuchTOsinkLeaf Script
    //we find the current active leaf, and then the neighbours of sunken leaf, all with tag - Frozen
    // then we check for these frozen leaf if the direction with the sunken leaf, if yes, we change it, else chekc next neighbour

    //Above logic was olf logic, 
    //new Logic: SInce, this check will,be done by all the scripts on each of the dir gameobject, we just need to check if the direction of 
    // current gameObject is pointing to the sunken leaf-  this will be more efficient

    var lastSunkenLeaf : int = PlayerPrefs.GetInt("LastLeafSunkInt"); 

    var myLeafDir : int ;
    

    var hit = Physics2D.Raycast ((this.gameObject.transform.position), Vector2.zero);
    if(hit.collider != null){ 
        Debug.Log("Current Frozen leaf "+hit.collider.gameObject.name+" & its Direction "+PlayerPrefs.GetInt("LeafDir"+Application.loadedLevel+""+this.gameObject.name));
        myLeafDir = PlayerPrefs.GetInt("LeafDir"+Application.loadedLevel+""+this.gameObject.name);
    }

    if (myLeafDir == 1){
        if (lastSunkenLeaf == (parseInt(this.gameObject.name) + 1) ){ // upper leaf was sunk
            Debug.Log("upper leaf was sunk");
            RotateNow ();
        }
    }
    else if (myLeafDir == 2){
        if (lastSunkenLeaf == (parseInt(this.gameObject.name) + 11) ){ // upper-right leaf was sunk
            Debug.Log("upper-right leaf was sunk");
            RotateNow ();
        }
    }
    else if (myLeafDir == 3){
        if (lastSunkenLeaf == (parseInt(this.gameObject.name) + 10) ){ // side-right leaf was sunk
            Debug.Log("side-right leaf was sunk");
            RotateNow ();
        }
    }
    else if (myLeafDir == 4){
        if (lastSunkenLeaf == (parseInt(this.gameObject.name) + 9) ){ // bottom-right leaf was sunk
            Debug.Log("bottom-right leaf was sunk");
            RotateNow ();
        }
    }
    else if (myLeafDir == 5){
        if (lastSunkenLeaf == (parseInt(this.gameObject.name) - 1) ){ // bottom leaf was sunk
            Debug.Log("bottom leaf was sunk");
            RotateNow ();
        }
    }
    else if (myLeafDir == 6){
        if (lastSunkenLeaf == (parseInt(this.gameObject.name) - 11) ){ // bottom-left leaf was sunk
            Debug.Log("bottom-left leaf was sunk");
            RotateNow ();
        }
    }
    else if (myLeafDir == 7){
        if (lastSunkenLeaf == (parseInt(this.gameObject.name) - 10) ){ // side-left leaf was sunk
            Debug.Log("side-left leaf was sunk");
            RotateNow ();
        }
    }
    else if (myLeafDir == 8){
        if (lastSunkenLeaf == (parseInt(this.gameObject.name) - 9) ){ // upper-left leaf was sunk
            Debug.Log("upper-left leaf was sunk");
            RotateNow ();
        }
    }

}

InvokeRepeating("RotateNow", 0, 5);

function RotateNow () { // set a this object dependent variable and rotate this dir by one

    GetAllLeaf(); // we get all the active leafs
    GetThisLeafNumber(); // we get this leaf number and its neighbours

    if (PlayerPrefs.HasKey("LeafDir"+Application.loadedLevel+""+this.gameObject.name)){
        Debug.Log("Has Key"+Application.loadedLevel+""+this.gameObject.name);
        SetDir(0);
    }
    else {
        Debug.Log("No Key"+Application.loadedLevel+""+this.gameObject.name);
        SetDir(1);
    }

}

function SetDir ( i : int) { // check which neigh are present and set the dir
    var val = new Array(); 
    for (var neig in neigh){
        if (neig != null){
            Debug.Log(thisGameObject.name+" "+neig.gameObject.name);
            var curr = parseInt(thisGameObject.name);
            var lf = parseInt(neig.name);
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
    // Now we know what all are present among [1-8]
    // enable the following part to know what is present, but the the val and neigh (except null) are in sync - as shown below
    /*
    var b = 0; // val.length;
    for (var a : int = 0; a < neigh.Length; a++){
        if (neigh[a] != null){
            Debug.Log(thisGameObject.name+" "+a+" "+neigh[a].name+" "+val[b]+" "+b);
            b++;
        }
    }
    */
    
    // Now we need to rotate as per the input value i
    var setFlag : Boolean = false;

    if (i == 1) {
        for (var d = 1; (d < 9) && (setFlag == false); d++){
            for (var c = 0; (c < val.Count) && (setFlag == false); c++) {
                if (parseInt(val[c]+"") == d){
                    PlayerPrefs.SetInt("LeafDir"+Application.loadedLevel+""+this.gameObject.name, parseInt(val[c]+""));
                    SetRotation();
                    Debug.Log("Set val here 1 "+parseInt(val[c]+"")+" "+this.gameObject.name);
                    setFlag = true;
                    break;
                }
            } // for end var c = 0; c < val.Count; c++
        } // for end setFlag == false
    } // end if i == 1
    else {
        for ( d = 1; (d < 9) && (setFlag == false); d++){
            for ( c = 0; (c < val.Count) && (setFlag == false); c++) {
                var e = PlayerPrefs.GetInt("LeafDir"+Application.loadedLevel+""+this.gameObject.name);
                var f = d+e;
                if (f > 8){ f = f-8;}
                if (parseInt(val[c]+"") == f){
                    PlayerPrefs.SetInt("LeafDir"+Application.loadedLevel+""+this.gameObject.name, parseInt(val[c]+""));
                    SetRotation();
                    Debug.Log("Set val here 2 "+parseInt(val[c]+"")+" "+this.gameObject.name);
                    setFlag = true;
                    break;
                }
            } // for end var c = 0; c < val.Count; c++
        } // for end setFlag == false
    }
}


function SetRotation(){

    this.gameObject.transform.rotation.eulerAngles = Vector3(0,0,-(PlayerPrefs.GetInt("LeafDir"+Application.loadedLevel+""+this.gameObject.name) - 1)*45);
}


function GetAllLeaf () { // get all active leafs
    var LeavesGO = GameObject.FindGameObjectWithTag("Leaves"); 
    var cLeavesActiveInScene = LeavesGO.GetComponentsInChildren.<Collider2D>(); 
    var i : int = 0;
    for (var a : int = 0; a < cLeavesActiveInScene.Length; a++){
        if (cLeavesActiveInScene[a].gameObject.tag == "Untagged" || cLeavesActiveInScene[a].gameObject.tag == "Rock" || cLeavesActiveInScene[a].gameObject.tag == "Frozen" || 
        cLeavesActiveInScene[a].gameObject.tag == "StarLeaf"){
            i++;
        }
    }
    
    activeLeaves = new GameObject[i];
    var b = 0;
    for ( a = 0; a < cLeavesActiveInScene.Length; a++){
        if (cLeavesActiveInScene[a].gameObject.tag == "Untagged" || cLeavesActiveInScene[a].gameObject.tag == "Rock" || cLeavesActiveInScene[a].gameObject.tag == "Frozen" || 
        cLeavesActiveInScene[a].gameObject.tag == "StarLeaf"){
            activeLeaves[b] = cLeavesActiveInScene[a].gameObject;
            b++;
        }
    }
}

function GetThisLeafNumber () { // get this leaf and its neighbours
    var hit = Physics2D.Raycast ((this.gameObject.transform.position), Vector2.zero);
    if(hit.collider != null){ 
      //  if (hit.collider.gameObject.tag == "Frozen"){
            thisGameObject = hit.collider.gameObject;
            this.gameObject.name = hit.collider.gameObject.name; 
            //Debug.Log("this GO name 1 "+thisGameObject.gameObject.name);
       // }
    }
   // Debug.Log("this GO name 2 "+hit.collider.gameObject.tag);
    var curr = parseInt(thisGameObject.gameObject.name);
    
    var i = 0;
    for (var a = 0; a < activeLeaves.length; a++) {
        var lf = parseInt(activeLeaves[a].gameObject.name);
        if (lf == (curr - 1) || lf == (curr - 10) || lf == (curr - 11) || lf == (curr - 9) ||
            lf == (curr + 1) || lf == (curr + 10) || lf == (curr + 11) || lf == (curr + 9)){
            i++;
        }
    } 

    neigh = new GameObject[8]; 
    var b = 0;
    for ( a = 0; a < activeLeaves.length; a++) {
        lf = parseInt(activeLeaves[a].gameObject.name);
        if (lf == (curr - 1) || lf == (curr - 10) || lf == (curr - 11) || lf == (curr - 9) ||
            lf == (curr + 1) || lf == (curr + 10) || lf == (curr + 11) || lf == (curr + 9)){
            neigh[b] = activeLeaves[a].gameObject;
            b++;
        }
    }

}

