#pragma strict

public var OwlSleep  : GameObject;
public var OwlWakeUp : GameObject;
public var OwlFly    : GameObject;
//public var SnakeDead : GameObject;

/*
private var Frog1Leaf : GameObject;
private var Frog2Leaf : GameObject;
private var Frog3Leaf : GameObject;
*/

private var flag : int;
private var gotoPos : Vector3;
private var ST = 0.5;
private var velo = Vector3.zero;

public var OwlPrefab : GameObject;
public var NoOfRocks : int;
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


function Start () {
    //calcLandingLeaf();
    anim();
    flag = 0;
    gotoPos = this.gameObject.transform.position;
}



function Update () {
    if (flag == 1){
        this.gameObject.transform.position = Vector3.SmoothDamp(this.gameObject.transform.position, gotoPos,velo, ST );
    }
}

function anim(){
    
    yield WaitForSeconds(3);
    OwlSleep.SetActive(false);
    OwlWakeUp.SetActive(true);
    OwlFly.SetActive(false);
    yield WaitForSeconds(2);
    OwlSleep.SetActive(false);
    OwlWakeUp.SetActive(false);
    OwlFly.SetActive(true);
    yield WaitForSeconds(1);
    flag = 1;
    GOtoPos();
    yield WaitForSeconds(4);
    OwlSleep.SetActive(true);
    OwlWakeUp.SetActive(false);
    OwlFly.SetActive(false);
}

function GOtoPos(){

    for (var a : int = 0; a < NoOfRocks; a++){
        findAllLeaves();   // find all leaves except - frogLeaf, targetLeaf, frozen or Rocks;
        var i = parseInt(Random.Range(0, LeavesActiveInSceneGO.length));
        for (var j = 0; j < LeavesActiveInScene.Length; j++){
            if (LeavesActiveInScene[j].gameObject == LeavesActiveInSceneGO[i]){
                var GO = LeavesActiveInScene[j].gameObject;
                j = LeavesActiveInScene.Length + 10;
            }
}
Instantiate(OwlPrefab, Vector3(GO.transform.position.x, GO.transform.position.y, GO.transform.position.z - 10),  Quaternion.identity);

    }
}




function findAllLeaves(){
    var FrogLeafGOName : String; 
    var TargetLeafGOName : String; 
    var hit : RaycastHit2D; 
    
    

    // 2.1. Get Position of Frog an thus the Leaf on which it sits---------------------1
    var frogGO = GameObject.FindGameObjectWithTag("Frog"); 
    hit = Physics2D.Raycast ((frogGO.transform.position), Vector2.zero);
    if(hit.collider != null){ frogLeaf = hit.collider.gameObject; }
	
    // 2.2 Get Position of Frog2 an thus the Leaf on which it sits---------------------2
    var frogGO2 = GameObject.FindGameObjectWithTag("Frog2"); 
    if (frogGO2 != null){
        hit = Physics2D.Raycast ((frogGO2.transform.position), Vector2.zero);
        if(hit.collider != null){ frog2Leaf = hit.collider.gameObject; }}

    // 2.3 Get Position of Frog3 an thus the Leaf on which it sits---------------------3
    var frogGO3 = GameObject.FindGameObjectWithTag("Frog3"); 
    if (frogGO3 != null){
        hit = Physics2D.Raycast ((frogGO3.transform.position), Vector2.zero);
        if(hit.collider != null){ frog3Leaf = hit.collider.gameObject; }}


    // 3.1 Get Position of Target an thus the Leaf on which it sits-----------------------1
    var TargetGO = GameObject.FindGameObjectWithTag("Target"); hit = Physics2D.Raycast ((TargetGO.transform.position), Vector2.zero);
    if(hit.collider != null){ targetLeaf = hit.collider.gameObject; }
	
    // 3.2 Get Position of Target#2 an thus the Leaf on which it sits---------------------2
    var TargetGO2 = GameObject.FindGameObjectWithTag("Target2"); 
    if (TargetGO2 != null){
        hit = Physics2D.Raycast ((TargetGO2.transform.position), Vector2.zero);
        if(hit.collider != null){ targetLeaf2 = hit.collider.gameObject; }}

    // 3.3 Get Position of Target#3 an thus the Leaf on which it sits---------------------3
    var TargetGO3 = GameObject.FindGameObjectWithTag("Target3"); 
    if (TargetGO3 != null){
        hit = Physics2D.Raycast ((TargetGO3.transform.position), Vector2.zero);
        if(hit.collider != null){ targetLeaf3 = hit.collider.gameObject; }}

    // 3.4 Get Position of Target#4 an thus the Leaf on which it sits---------------------4
    var TargetGO4 = GameObject.FindGameObjectWithTag("Target4"); 
    if (TargetGO4 != null){
        hit = Physics2D.Raycast ((TargetGO4.transform.position), Vector2.zero);
        if(hit.collider != null){ targetLeaf4 = hit.collider.gameObject; }}

    // 3.5 Get Position of Target#5 an thus the Leaf on which it sits---------------------5
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
        if (LeavesActiveInScene[a].gameObject.tag == "Untagged"){
            if(frogLeaf.name != LeavesActiveInScene[a].gameObject.name){
                if (targetLeaf.name != LeavesActiveInScene[a].gameObject.name){
                    LeavesActiveInSceneGO.Push(LeavesActiveInScene[a].gameObject);
                    //Debug.Log(LeavesActiveInScene[a].gameObject.name);
                }
            }
        }
    }
Debug.Log("length of Ativ "+ LeavesActiveInScene.Length+" "+LeavesActiveInSceneGO.length);

// Remove target 1 leaf
if (targetLeaf != null){ 
    for (a = 0; a < LeavesActiveInSceneGO.length; a++){
        if (targetLeaf.name == LeavesActiveInScene[a].gameObject.name){
            LeavesActiveInSceneGO.RemoveAt(a);
            a = LeavesActiveInSceneGO.length + 10;
            break;
        }
    }
}


// Remove target 2 leaf
if (targetLeaf2 != null){ 
    for (a = 0; a < LeavesActiveInSceneGO.length; a++){
        if (targetLeaf2.name == LeavesActiveInScene[a].gameObject.name){
            LeavesActiveInSceneGO.RemoveAt(a);
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
            a = LeavesActiveInSceneGO.length + 10;
            break;
        }
    }
}

// Remove Frog 1 Leaf
if (frogLeaf != null){
    for (a = 0; a < LeavesActiveInSceneGO.length; a++){
        if (frogLeaf.name == LeavesActiveInScene[a].gameObject.name){
            LeavesActiveInSceneGO.RemoveAt(a);
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
            a = LeavesActiveInSceneGO.length + 10;
            break;
        }
    }
}

}


/*
function calcLandingLeaf(){
    

    var Frog1 = GameObject.FindWithTag("Frog");
    if (Frog1 != null){
        var hit = Physics2D.Raycast (Vector2(Frog1.transform.position.x, Frog1.transform.position.y), Vector2.zero);
        if(hit.collider != null){  
            Frog1Leaf = hit.collider.gameObject; // Debug.Log("Forg Leaf "+Frog1Leaf.name);
        }
    }

    var Frog2 = GameObject.FindWithTag("Frog2");
    if (Frog2 != null){
        hit = Physics2D.Raycast (Vector2(Frog2.transform.position.x, Frog2.transform.position.y), Vector2.zero);
        if(hit.collider != null){  
            Frog2Leaf = hit.collider.gameObject;
        }
    }

    var Frog3 = GameObject.FindWithTag("Frog3");
    if (Frog3 != null){
        hit = Physics2D.Raycast (Vector2(Frog3.transform.position.x, Frog3.transform.position.y), Vector2.zero);
        if(hit.collider != null){  
            Frog3Leaf = hit.collider.gameObject;
        }
    }

    

}
*/