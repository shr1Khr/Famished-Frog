#pragma strict


public var NoOfBomb     : int;
public var BombPrefab   : GameObject;

public var initialWaitTime : int;
public var timeLength   : int; // Wait between 2 bombs


private var frogLeaf    : GameObject;	
private var frog2Leaf   : GameObject;	
private var frog3Leaf   : GameObject;	
private var targetLeaf  : GameObject;	
private var targetLeaf2 : GameObject;	
private var targetLeaf3 : GameObject;	
private var targetLeaf4 : GameObject;	
private var targetLeaf5 : GameObject;
private var StarsLeaf : List.<GameObject>;

private var LeavesActiveInSceneGO :  Array;
private var LeavesActiveInScene   :  Collider2D[];

function Start () {
    GetBomb(); //Instantiate Bomb
}




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

    // 2.6. Get Position of Target#3 an thus the Leaf on which it sits--------------------
    var TargetGO3 = GameObject.FindGameObjectWithTag("Target3"); 
    if (TargetGO3 != null){
        hit = Physics2D.Raycast ((TargetGO3.transform.position), Vector2.zero);
        if(hit.collider != null){ targetLeaf3 = hit.collider.gameObject; }}

    // 2.7. Get Position of Target#4 an thus the Leaf on which it sits--------------------
    var TargetGO4 = GameObject.FindGameObjectWithTag("Target4"); 
    if (TargetGO4 != null){
        hit = Physics2D.Raycast ((TargetGO4.transform.position), Vector2.zero);
        if(hit.collider != null){ targetLeaf4 = hit.collider.gameObject; }}
    
    // 2.8. Get Position of Target#5 an thus the Leaf on which it sits---------------------
    var TargetGO5 = GameObject.FindGameObjectWithTag("Target5"); 
    if (TargetGO5 != null){
        hit = Physics2D.Raycast ((TargetGO5.transform.position), Vector2.zero);
        if(hit.collider != null){ targetLeaf5 = hit.collider.gameObject; }}

    // 2.8. Get Position of Stars an thus the Leaf on which thye sits---------------------
    var stars = GameObject.FindGameObjectsWithTag("Star"); 
    StarsLeaf = new List.<GameObject>();
    for (var s = 0; s < stars.Length; s++){
        if (stars[s] != null){
            hit = Physics2D.Raycast ((stars[s].transform.position), Vector2.zero);
            if(hit.collider != null){ 
                StarsLeaf.Add(hit.collider.gameObject); 
            }
        }
    }

    // 1. Get All Active leaves -----------------------------------------------------------
    GetAllActiveLeaves();
    


}


//1. Get all Active leaves with tag = "Untagged" -------------------------------------------
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

// Remove target leaf
    for (a = 0; a < LeavesActiveInSceneGO.length; a++){
        if (targetLeaf.name == LeavesActiveInScene[a].gameObject.name){
            LeavesActiveInSceneGO.RemoveAt(a);
            a = LeavesActiveInSceneGO.length + 10;
            break;
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

// Remove Frog Leaf
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

// remove Stars StarsLeaf;
Debug.Log("star length "+StarsLeaf.Count);
for(var s = 0; s < StarsLeaf.Count; s++ ){
    for (a = 0; a < LeavesActiveInSceneGO.length; a++){
        if (StarsLeaf[s].gameObject.name == LeavesActiveInScene[a].gameObject.name){
        LeavesActiveInSceneGO.RemoveAt(a);
        Debug.Log("Removed Star leaf at "+StarsLeaf[s].gameObject.name);
        a = LeavesActiveInSceneGO.length + 10;
        break;
        }
    }
}

}



function GetBomb(){

    yield WaitForSeconds(initialWaitTime);
    for (var a : int = 0; a < NoOfBomb; a++){
        findAllLeaves();   // find all leaves except - frogLeaf, targetLeaf, frozen or Rocks;
       var i = parseInt(Random.Range(0, LeavesActiveInSceneGO.length));
          //  Debug.Log("Bomb at Leaf "+ LeavesActiveInSceneGO[i]);
       for (var j = 0; j < LeavesActiveInScene.Length; j++){
          //  Debug.Log(LeavesActiveInScene[j].gameObject);
           if (LeavesActiveInScene[j].gameObject == LeavesActiveInSceneGO[i]){
           var GO = LeavesActiveInScene[j].gameObject;
          //  Debug.Log(GO);
           j = LeavesActiveInScene.Length + 10;
           break;
    }
}

Instantiate(BombPrefab, Vector3(GO.transform.position.x, GO.transform.position.y, GO.transform.position.z - 10),  Quaternion.identity);
GO.gameObject.tag = "Bomb"; 
yield WaitForSeconds(timeLength);
    }

}