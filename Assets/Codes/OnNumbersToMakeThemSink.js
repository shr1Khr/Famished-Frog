#pragma strict

public var lengthOfSteps : int;
public var GO :  Array; 
public var currGO : GameObject;
function Start () {
    PlayerPrefs.SetInt("Solution", PlayerPrefs.GetInt("Solution") - 1);
    GO = new Array();
    var TGOC = this.gameObject.GetComponentsInChildren.<Transform>(false);
    Debug.Log("NumberLength "+TGOC.Length);
    for(var a = TGOC.Length-1; a > 0; a--){
        GO.Add(TGOC[a].gameObject);
    }
    currGO = GO.Pop(); Debug.Log("currGO "+currGO);
}

function FixedUpdate () {
   
}

InvokeRepeating("Logic", 1, 1);

function Logic (){
    
    var hit2 = Physics2D.Raycast ((currGO.gameObject.transform.position), Vector2.zero);
    //Debug.Log("hit2.collider "+hit2.collider);
    if(hit2.collider != null){
    }
    else{
        Destroy(currGO);
        if(GO.Count != 0){
            currGO = GO.Pop();
            Debug.Log("currGO "+currGO);
        }
        else{
            Destroy(this.gameObject);
        }
    }


}

