#pragma strict


// TouchToSinkLeaves.move -> values used are 20
private var selecLeaf  : GameObject;

private var TargetGO : GameObject;
private var leafOfTarget : int;

private var TargetGO2: GameObject;
private var leafOfTarget2 : int;

private var Tarleaf : GameObject; // this is THE target leaf - TO move leaf

private var Frog1: GameObject;
private var leafOfFrog1 : int;

private var Frog2: GameObject;
private var leafOfFrog2 : int;

private var Frog3: GameObject;
private var leafOfFrog3 : int;

private var phase2 : int; // which phase is going on ?

private var mainControll : int;

private var YouWonPanel: GameObject;
private var ASYouWonOrFail : AudioSource;

function Start () {


    mainControll = 1;
}


function Update () {
    if (mainControll == 1){
        atStart();
        Debug.Log("begin Batman");
        mainControll = 2;
    }

    if (phase2 == 0){phase0func();} // this is to place the snake at a leaf
    if (phase2 == 1){phase1func();} // this is to do stuff when frog jumps on leaf
    if (phase2 == 2){phase2func();} //this is to show the fail or succ after delay

}

function atStart(){

    Debug.Log("here in atStart");
    TouchToSinkLeaves.move = 20; // get the control of the game
    phase2 = 0;
    
    //Get caterpillar values
    TargetGO = GameObject.FindGameObjectWithTag("Target");
    if (TargetGO != null){
        var hit = Physics2D.Raycast ((TargetGO.transform.position), Vector2.zero);
        if(hit.collider != null){
            leafOfTarget = parseInt(hit.collider.gameObject.name);
        }}

    TargetGO2 = GameObject.FindGameObjectWithTag("Target2");
    if (TargetGO2 != null){
        hit = Physics2D.Raycast ((TargetGO2.transform.position), Vector2.zero);
        if(hit.collider != null){
            leafOfTarget2 = parseInt(hit.collider.gameObject.name);
        }}


    // find frog leaves
    Frog1 = GameObject.FindGameObjectWithTag("Frog");
    if (Frog1 != null){
        hit = Physics2D.Raycast ((Frog1.transform.position), Vector2.zero);
        if(hit.collider != null){
            leafOfFrog1 = parseInt(hit.collider.gameObject.name);
        }}

    Frog2 = GameObject.FindGameObjectWithTag("Frog2");
    if (Frog2 != null){
        hit = Physics2D.Raycast ((Frog2.transform.position), Vector2.zero);
        if(hit.collider != null){
            leafOfFrog2 = parseInt(hit.collider.gameObject.name);
        }}

    Frog3 = GameObject.FindGameObjectWithTag("Frog3");
    if (Frog3 != null){
        hit = Physics2D.Raycast ((Frog3.transform.position), Vector2.zero);
        if(hit.collider != null){
            leafOfFrog3 = parseInt(hit.collider.gameObject.name);
        }}


    var mc = GameObject.Find("Main Camera");
    var TselecLeaf = mc.gameObject.transform.Find("Canvas/SnakeTL");
    selecLeaf = TselecLeaf.transform.gameObject;
    var TSnakeBut = mc.gameObject.transform.Find("Canvas/SnakeButt");
    TSnakeBut.transform.gameObject.SetActive(false);
    var TYouWonPanel =  mc.gameObject.transform.Find("Canvas/YouWon");
    YouWonPanel = TYouWonPanel.transform.gameObject;

    var ASYouWonOrFailGO = mc.transform.Find("AS WinORFail");
    ASYouWonOrFail = ASYouWonOrFailGO.GetComponent(AudioSource);

    selecLeaf.SetActive(true);

}

function phase0func(){
    var ST = 0.1;
    var velo = Vector3.zero;

    if (TouchToSinkLeaves.move == 20){

    #if UNITY_ANDROID
        if (Input.touchCount > 0 && Input.GetTouch(0).phase == TouchPhase.Began){
            var hit2 = Physics2D.Raycast (Camera.main.ScreenToWorldPoint((Input.GetTouch (0).position)), Vector2.zero);
            if(hit2.collider != null){
                if(hit2.collider.gameObject.tag == "Untagged" || hit2.collider.gameObject.tag == "Rock"){
                    if((parseInt(hit2.collider.gameObject.name) != leafOfTarget)&&(parseInt(hit2.collider.gameObject.name) != leafOfFrog1)){
                        if (TargetGO2 != null){
                            if(parseInt(hit2.collider.gameObject.name) != leafOfTarget2){
                                if (Frog2 !=  null){
                                    if(parseInt(hit2.collider.gameObject.name) != leafOfFrog2){
                                        if (Frog3 !=  null){
                                            if(parseInt(hit2.collider.gameObject.name) != leafOfFrog3){
                                                //We found a good leaf for 2 target Scenario
                                                Tarleaf = GameObject.Find(hit2.collider.gameObject.name);
                                                Debug.Log("Snake Leaf "+Tarleaf);
                                                TouchToSinkLeaves.move = 21;
                                            }
                                        }
                                        else { // this is else of frog3
                                            //We found a good leaf for 2 target Scenario
                                            Tarleaf = GameObject.Find(hit2.collider.gameObject.name);
                                            Debug.Log("Snake Leaf "+Tarleaf);
                                            TouchToSinkLeaves.move = 21;
                                        }
                                    }
                                }
                                else{ // this is else of frog2
                                    //We found a good leaf for 2 target Scenario
                                    Tarleaf = GameObject.Find(hit2.collider.gameObject.name);
                                    Debug.Log("Snake Leaf "+Tarleaf);
                                    TouchToSinkLeaves.move = 21;
                                }
                            }
                        }
                        else { // this is else of TargetGO2
                            // we found a leaf for single Cat scenario
                            Tarleaf = GameObject.Find(hit2.collider.gameObject.name);
                            Debug.Log("Snake Leaf "+Tarleaf);
                            TouchToSinkLeaves.move = 21;
                        }
                    }
                    else {
                        selecLeaf.SetActive(true);
                        Debug.Log("Snake it vame here? "+TargetGO2);
                    }
                }
            }
        }
    #endif

    #if UNITY_EDITOR
        if (Input.GetMouseButtonDown(0)){
            var hit = Physics2D.Raycast (Camera.main.ScreenToWorldPoint((Input.mousePosition)), Vector2.zero);
            if(hit.collider != null){
                if(hit.collider.gameObject.tag == "Untagged" || hit.collider.gameObject.tag == "Rock"){
                    if((parseInt(hit.collider.gameObject.name) != leafOfTarget)&&(parseInt(hit.collider.gameObject.name) != leafOfFrog1)){
                        if (TargetGO2 != null){
                            if(parseInt(hit.collider.gameObject.name) != leafOfTarget2){
                                if (Frog2 !=  null){
                                    if(parseInt(hit.collider.gameObject.name) != leafOfFrog2){
                                        if (Frog3 !=  null){
                                            if(parseInt(hit.collider.gameObject.name) != leafOfFrog3){
                                                //We found a good leaf for 2 target Scenario
                                                Tarleaf = GameObject.Find(hit.collider.gameObject.name);
                                                Debug.Log("Snake Leaf "+Tarleaf);
                                                TouchToSinkLeaves.move = 21;
                                            }
                                        }
                                        else { // this is else of frog3
                                            //We found a good leaf for 2 target Scenario
                                            Tarleaf = GameObject.Find(hit.collider.gameObject.name);
                                            Debug.Log("Snake Leaf "+Tarleaf);
                                            TouchToSinkLeaves.move = 21;
                                        }
                                    }
                                }
                                else{ // this is else of frog2
                                    //We found a good leaf for 2 target Scenario
                                    Tarleaf = GameObject.Find(hit.collider.gameObject.name);
                                    Debug.Log("Snake Leaf "+Tarleaf);
                                    TouchToSinkLeaves.move = 21;
                                }
                            }
                        }
                        else { // this is else of TargetGO2
                            // we found a leaf for single Cat scenario
                            Tarleaf = GameObject.Find(hit.collider.gameObject.name);
                            Debug.Log("Snake Leaf "+Tarleaf);
                            TouchToSinkLeaves.move = 21;
                        }
                    }
                    else {
                        selecLeaf.SetActive(true);
                        Debug.Log("Snake it vame here? "+TargetGO2);
                    }
                }
            }
        }
    
    #endif
    }

    if (TouchToSinkLeaves.move == 21){
        transform.position = Vector3.SmoothDamp(transform.position, Vector3(Tarleaf.transform.position.x, Tarleaf.transform.position.y, transform.position.z), velo, ST);
        if (transform.position.y < (Tarleaf.transform.position.y + 0.1)){
            TouchToSinkLeaves.move = 0;
            phase2 = 1;
        }
    }
}

function phase1func(){

    // find frog leaves
    Frog1 = GameObject.FindGameObjectWithTag("Frog");
    if (Frog1 != null){
      var  hit = Physics2D.Raycast ((Frog1.transform.position), Vector2.zero);
        if(hit.collider != null){
            leafOfFrog1 = parseInt(hit.collider.gameObject.name);
        }}

    Frog2 = GameObject.FindGameObjectWithTag("Frog2");
    if (Frog2 != null){
        hit = Physics2D.Raycast ((Frog2.transform.position), Vector2.zero);
        if(hit.collider != null){
            leafOfFrog2 = parseInt(hit.collider.gameObject.name);
        }}

    Frog3 = GameObject.FindGameObjectWithTag("Frog3");
    if (Frog3 != null){
        hit = Physics2D.Raycast ((Frog3.transform.position), Vector2.zero);
        if(hit.collider != null){
            leafOfFrog3 = parseInt(hit.collider.gameObject.name);
        }}

   // Debug.Log(Tarleaf+" "+leafOfFrog1);
    var c1 = transform.Find("bdy");
    var c2 = transform.Find("hd");
    var c3 = transform.Find("SnakeAteFrog"); // 

    if (leafOfFrog1 == parseInt(Tarleaf.name)){
        Debug.Log("Frog1 on Snake :P "); 
        TouchToSinkLeaves.move = 22; 
        c1.transform.gameObject.SetActive(false); 
        c2.transform.gameObject.SetActive(false);
        c3.transform.gameObject.SetActive(true); 
        Frog1.transform.gameObject.SetActive(false);
      //  if (Frog2 != null){AStarForMuiltiTarget1.failOrSuccess = 1;}
      //  else {AStarForMuiltiTarget.failOrSuccess = 1;}
        phase2 = 2;
    }
    if (leafOfFrog2 == parseInt(Tarleaf.name)){Debug.Log("Frog2 on Snake :P ");  TouchToSinkLeaves.move = 22; }
    if (leafOfFrog3 == parseInt(Tarleaf.name)){Debug.Log("Frog3 on Snake :P ");  TouchToSinkLeaves.move = 22; }
}

function phase2func(){
    phase2 = 3;
    yield WaitForSeconds(1.5);
    YouWonPanel.SetActive(true);
    if (PlayerPrefs.GetInt("BGMusic") == 1){ ASYouWonOrFail.Play();}

}