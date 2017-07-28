#pragma strict

private var myLeaf : GameObject;
public  var frog2 : GameObject;
function Start () {
    
}

function Update () {
    if (f2 != null){
        move();
    }

}

public function EggBreak(){
    var egg = GameObject.FindGameObjectWithTag("Egg");
    var tEggWhole = egg.transform.Find("EggWhole");
    var teggBreak = egg.transform.Find("eggBreak");
    tEggWhole.gameObject.SetActive(false);
    teggBreak.gameObject.SetActive(false);

    var tBrokenEggBase = egg.transform.Find("BrokenEggBase");
    tBrokenEggBase.gameObject.SetActive(true);
}

private var f2 : GameObject;
private var movePos : GameObject;


public function ReleaseFrogs(){
    Debug.Log("Now release the forgs "+f2);
    
    
    movePos = FindNeigh();
    f2 = Instantiate(frog2, myLeaf.transform.position, Quaternion.identity);
    f2.transform.position.z = -9;
    f2.transform.localScale = Vector3(0.1,0.1,0.1);  
}

function FindNeigh(){
    
    findLeaf();
    var adj1 = getAllAdjacentLeaves(myLeaf);
    var i = Random.Range(0, adj1.length);
    return adj1[i];

}

function move(){
    var ST  = 0.2;
    var velo = Vector3.zero;

    var f1 = GameObject.FindGameObjectWithTag("Frog");
   
    f2.transform.localScale = f1.transform.localScale;
    var got2 = f2.transform.Find("GO");
    var got1 = f1.transform.Find("GO");
    got2.gameObject.transform.localScale = got1.gameObject.transform.localScale ;
    
    got2 = f2.transform.Find("FailImage");
    got1 = f1.transform.Find("FailImage");
    got2.gameObject.transform.localScale = got1.gameObject.transform.localScale ;
    
    got2 = f2.transform.Find("FrogJMP2");
    got1 = f1.transform.Find("FrogJMP");
    Debug.Log(got1);
    Debug.Log(got2);

    got2.gameObject.transform.localScale = got1.gameObject.transform.localScale ;
    
    var hopPos2 = movePos.transform.position;

    // orientation
    if (hopPos2.x < f2.transform.position.x){ 
        if (f2.transform.localScale.x < 0){ 
            f2.transform.localScale.x = -(f2.transform.localScale.x);// here we converted it negative
        }
    }
    else {
        if (f2.transform.localScale.x > 0){ 
            f2.transform.localScale.x = -(f2.transform.localScale.x);// here we converted it Positive
        }
    }
    
    // move
    f2.gameObject.transform.position = Vector3.SmoothDamp( f2.gameObject.transform.position, Vector3(hopPos2.x, hopPos2.y,  
                                                                 f2.gameObject.transform.position.z), velo, ST);
    
    

    var hit = Physics2D.Raycast (( f2.gameObject.transform.position), Vector2.zero);
    if(hit.collider != null){ 
        if (hit.collider.gameObject == movePos ){
            f2.gameObject.transform.position = Vector3(hopPos2.x, hopPos2.y,  f2.gameObject.transform.position.z);
            //f2.transform.localScale = f1.transform.localScale;
            myLeaf.tag = "Untagged";
            
            Destroy(this.gameObject.transform.parent.gameObject);
        }
    }

}


function getAllAdjacentLeaves(GO : GameObject){
    var adj = new Array();
    var curr = parseInt(GO.name);
    var LeavesGO = GameObject.FindGameObjectWithTag("Leaves"); 
    var actLeaf = LeavesGO.GetComponentsInChildren.<Collider2D>(); 
    for (var a : int = 0; a < actLeaf.Length; a++){ 
        if((parseInt(actLeaf[a].gameObject.name) == (curr - 1 ) )||
        (parseInt(actLeaf[a].gameObject.name) == (curr + 1 ))||
        (parseInt(actLeaf[a].gameObject.name) == (curr - 10))||
        (parseInt(actLeaf[a].gameObject.name) == (curr - 11))||
        (parseInt(actLeaf[a].gameObject.name) == (curr - 9 ))||
        (parseInt(actLeaf[a].gameObject.name) == (curr + 10))||
        (parseInt(actLeaf[a].gameObject.name) == (curr + 11))||
        (parseInt(actLeaf[a].gameObject.name) == (curr + 9 ))){
            adj.Push(actLeaf[a].gameObject);
    }
}

return adj;
}

function findLeaf(){
    var hit = Physics2D.Raycast (( this.gameObject.transform.parent.transform.position), Vector2.zero);
    if(hit.collider != null){ 
        if (hit.collider.gameObject.tag == "EggLeaf" ){
            myLeaf = hit.collider.gameObject;
        }
    }
}