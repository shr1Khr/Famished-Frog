#pragma strict

private var myLeaf : GameObject;

function Start () {
    var hit = Physics2D.Raycast (( this.gameObject.transform.position), Vector2.zero);
    if(hit.collider != null){ 
        if (hit.collider.gameObject.tag == "Untagged" ){
            if (hit.collider.gameObject.transform.parent.gameObject.name == "LilyPads"){
                Debug.Log("Fart Louder than nuke bomb :P");
                hit.collider.gameObject.tag = "EggLeaf"; 
                myLeaf = hit.collider.gameObject;
            }
        }
    }
}

function Update () {
    
}

InvokeRepeating("check", 1, 1);

function check (){
    if (TheLogic.win == 0 && TouchToSinkLeaves.move == 0){
    var frogGo = GameObject.FindGameObjectWithTag("Frog");
    var hit = Physics2D.Raycast (( frogGo.gameObject.transform.position), Vector2.zero);
    if(hit.collider != null){ 
        if (hit.collider.gameObject == myLeaf ){
            Debug.Log("Okay Frog is here :P");
            var teggBreak = this.gameObject.transform.Find("eggBreak");
            teggBreak.gameObject.SetActive(true);
            
            Destroy(this);
            }
        }
    }
}

