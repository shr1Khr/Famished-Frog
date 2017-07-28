#pragma strict


private var parent : GameObject;

function Start () {
    parent = gameObject.transform.parent.gameObject;
    if (parent.transform.localScale.x < 0 || (Application.loadedLevel > 15)){
        Destroy(this.gameObject);
    }
}

function Update () {
    
        
}