#pragma strict

public var rockHint : GameObject;
private var RockHintText : UI.Text;
public var frogGOJumpGreen : GameObject;
public var frogGOJumpBlue : GameObject;
public var leaaf : GameObject; 
private var lleaf : GameObject[]; //actual leaf GameObjects
public var leaf : int[];
public var emptyLeaf1 : int;
//public var emptyLeaf2 : int;
private var clickedFrog : GameObject;
private var flag : int; // to prevent endless loop of frog move
public var WonCanvas : GameObject;
/*
    Logic:




*/


function Start(){
    flag = 2;
    RockHintText = rockHint.GetComponentInChildren(UI.Text);
    lleaf = new GameObject[10];
    var tlleaf = leaaf.GetComponentsInChildren(Transform);
    for(var a : int = 1; a < 10; a++){
        lleaf[a-1] = tlleaf[a].transform.gameObject;
        //Debug.Log(lleaf[a-1].gameObject.name);
    }
leaf = new int[9]; // so the leaf[a] -> a = (leaf no - 1); and corresponding value is the frog number
leaf[0] = 1;
leaf[1] = 2;
leaf[2] = 3;
leaf[3] = 4;
leaf[4] = 0; //
leaf[5] = 5; //
leaf[6] = 6;
leaf[7] = 7;
leaf[8] = 8;

}

function Update(){
    var frog =  ClickedFrog();// get the frog gameObject that has been clicked
    //Debug.Log("Frog "+frog);
    if (frog != null && flag == 1){
        if (parseInt(frog.name) < 5 ){ // Blue frog = move towards right
            var leafcurrent = GetThecurrentLeaf(frog); // Get the current leaf of frog
            GetEmptyLeaf(); // Get the empty leaf
            Debug.Log(leafcurrent+" current & empty "+emptyLeaf1);
            if (leafcurrent <= emptyLeaf1 && emptyLeaf1 < 100 ){
                if((emptyLeaf1 - leafcurrent) <= 2){
                    Debug.Log("Move current "+leafcurrent+" to "+emptyLeaf1);
                    Debug.Log("1");
                    frog.transform.position = Vector3(lleaf[emptyLeaf1-1].transform.position.x, lleaf[emptyLeaf1-1].transform.position.y, frog.transform.position.z);
                    flag = 2;
                    UpdateEmptyLeaf(emptyLeaf1, leafcurrent, frog);
                    ResetVar();
                    Check();
                }         
                else{ // to long to jump !
                    // here add that thing
                    Debug.Log("Too Long to jump !");
                    RockHintText.text = "Too Long to jump 111 !"; 
                    rockHint.SetActive(true);
                }
            }
            else{ // frog cant move back !
                Debug.Log("Frog cant jump backwards");
                RockHintText.text = "Can't jump back !"; 
                rockHint.SetActive(true);
            }
        }
        else{ // Green frog = move towards left
            leafcurrent = GetThecurrentLeaf(frog); // Get the current leaf of frog
            GetEmptyLeaf(); // Get the empty leaf
            Debug.Log(leafcurrent+" current & empty "+emptyLeaf1);
            if ( emptyLeaf1 <= leafcurrent && emptyLeaf1 < 100 ){
                if((leafcurrent - emptyLeaf1) <= 2 ){ 
                    Debug.Log("Move current "+leafcurrent+" to "+emptyLeaf1);
                    //------------------
                    Debug.Log("5");
                    frog.transform.position = Vector3(lleaf[emptyLeaf1-1].transform.position.x, lleaf[emptyLeaf1-1].transform.position.y, frog.transform.position.z);
                    flag = 2;
                    UpdateEmptyLeaf(emptyLeaf1, leafcurrent, frog);
                    ResetVar();
                    Check();
                }
                else { // Too Long to jump
                    Debug.Log("Too Long to jump !");
                    RockHintText.text = "Too Long to jump !"; 
                    rockHint.SetActive(true);
                }
            }
            else { // Frog cant jump backwards
                Debug.Log("Frog cant jump backwards");
                RockHintText.text = "Frog cant jump backwards !"; 
                rockHint.SetActive(true);
            }
        }
    }
}

function Check () {
    if (leaf[4] == 0){
        if ((leaf[0] == 5 || leaf[0] == 6 || leaf[0] == 7 || leaf[0] == 8)&&(leaf[1] == 5 || leaf[1] == 6 || leaf[1] == 7 || leaf[1] == 8)&&(leaf[2] == 5 || leaf[2] == 6 || leaf[2] == 7 || leaf[2] == 8)&&(leaf[3] == 5 || leaf[3] == 6 || leaf[3] == 7 || leaf[3] == 8)){
            if ((leaf[6] == 1 || leaf[6] == 2 || leaf[6] == 3 || leaf[6] == 4)&&(leaf[7] == 1 || leaf[7] == 2 || leaf[7] == 3 || leaf[7] == 4)&&(leaf[8] == 1 || leaf[8] == 2 || leaf[8] == 3 || leaf[8] == 4)&&(leaf[5] == 1 || leaf[5] == 2 || leaf[5] == 3 || leaf[5] == 4)){
                Debug.Log("You Win !!");
                Win();
            }
        }
    }
}

function Win () {
    if (!WonCanvas.activeSelf){
        PlayerPrefs.SetInt("Star"+Application.loadedLevel, 3);
        if (PlayerPrefs.GetInt("BGMusic") == 1){ var AS = GetComponent(AudioSource); AS.Play();}

        if (!PlayerPrefs.HasKey("Bonus 3")){
            PlayerPrefs.SetInt("Bonus 3", 1);
            PlayerPrefs.SetInt("Coins", PlayerPrefs.GetInt("Coins") + 3);
        }
        WonCanvas.SetActive(true);
    }
    
}

/*
    leaf[0] = 1;
    leaf[1] = 2;
    leaf[2] = 3;
    leaf[3] = 4;
    leaf[4] = 0;
    leaf[5] = 0;
    leaf[6] = 5;
    leaf[7] = 6;
    leaf[8] = 7;
    leaf[9] = 8;

*/


function UpdateEmptyLeaf(nowOccupiedLeaf : int, nowEmptyLeaf : int, currGO : GameObject) {
    
    Debug.Log(nowOccupiedLeaf+" nowOccupiedLeaf || nowEmptyLeaf "+nowEmptyLeaf+" || currGO "+currGO.name);
    leaf[nowEmptyLeaf -1] = 0;
    leaf[nowOccupiedLeaf -1] = parseInt(currGO.name);

    for(var a: int = 0; a < 9; a++){
        Debug.Log(" leaf number "+(a+1)+" frog ? "+leaf[a]);
    }


}

function ResetVar() {
    emptyLeaf1 = 1000;
    
}

function ClickedFrog(){ // this will give the clicked frog details

     
    var hit : RaycastHit2D;

    #if UNITY_WEBGL
        if (Input.touchCount > 0 && Input.GetTouch(0).phase == TouchPhase.Began){
            hit = Physics2D.Raycast (Camera.main.ScreenToWorldPoint((Input.GetTouch (0).position)), Vector2.zero);}
    #endif
    
    #if UNITY_ANDROID
         if (Input.touchCount > 0 && Input.GetTouch(0).phase == TouchPhase.Began){
             var hit = Physics2D.Raycast (Camera.main.ScreenToWorldPoint((Input.GetTouch (0).position)), Vector2.zero);}
    #endif

    #if UNITY_EDITOR
        if (Input.GetMouseButtonDown(0)){
            hit = Physics2D.Raycast (Camera.main.ScreenToWorldPoint((Input.mousePosition)), Vector2.zero);}
    #endif

    if(hit.collider != null){
        flag = 1;
        return hit.collider.gameObject;
    }


}

function GetThecurrentLeaf(frog : GameObject){
    Debug.Log("Frog Name "+frog.name);

    for (var a : int = 0; a < 9; a++){
        if (leaf[a] == parseInt(frog.name)){
            return (a+1);
    }
}
}

function GetEmptyLeaf(){
    for(var a : int = 0; a < 9; a++){
        if (leaf[a] == 00){
            emptyLeaf1 = a+1;
            Debug.Log("Empty Leaf function "+(a+1));
            return void;
        }
    }
}
