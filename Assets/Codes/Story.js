#pragma strict


public var cat1 : GameObject;
public var cat2 : GameObject; public var Wat2 : GameObject;
public var cat3 : GameObject; public var Wat3 : GameObject;
public var cat4 : GameObject;
public var cat5 : GameObject;

public var leaf1 : GameObject;
public var leaf2 : GameObject;
public var leaf3 : GameObject;
public var leaf4 : GameObject;
public var leaf5 : GameObject;

public var mainLeaf : GameObject;

public var frogs : GameObject;

public var tex : UI.Text;

public var im : UI.Image;

public var nextBut : GameObject;

private var flag : int = 0;// to make sure we deactivate cat leaf only once
private var ST  = 0.5;
private var velo = Vector3.zero;

function Start () {
    PlayerPrefs.SetInt("FirstPlay", 1);
}

function Update () {
    if (flag == 0 || flag == 1){
        DoTheJob();
    }
    
    NowStopEverything();
}

function DoTheJob () {
    yield WaitForSeconds (3);
    if (flag == 0) {
        DeactivateAnimators();
    }
    else {
        DropCaterpillars();
    }
    RotateMainLeaf();
    
    

}


function RotateMainLeaf () {
    if (flag != 2){
        Debug.Log("Rotate main Leaf");
        mainLeaf.transform.Rotate(Vector3(0,0,-1)*Time.deltaTime*20);
        tex.text = "OMG !!";
    }
}

function DeactivateAnimators () {

    flag = 1;
    var child = cat1.transform.Find("child1");  child.transform.gameObject.SetActive(false);
    child = cat1.transform.Find("child2");  child.transform.gameObject.SetActive(true);

    child = cat4.transform.Find("child1");  child.transform.gameObject.SetActive(false);
    child = cat4.transform.Find("child2");  child.transform.gameObject.SetActive(true);

    child = cat5.transform.Find("child1");  child.transform.gameObject.SetActive(false);
    child = cat5.transform.Find("child2");  child.transform.gameObject.SetActive(true);

    child = cat2.transform.Find("Head/Happy");  child.transform.gameObject.SetActive(false);
    Wat2.SetActive(true);

    child = cat3.transform.Find("Head/Happy");  child.transform.gameObject.SetActive(false);
    Wat3.SetActive(true);

   

}

function DropCaterpillars () {
    yield WaitForSeconds (1);
    if (flag == 0 || flag == 1){
        cat1.gameObject.transform.position = Vector3.SmoothDamp( cat1.gameObject.transform.position, Vector3(leaf1.gameObject.transform.position.x, leaf1.gameObject.transform.position.y,  
                                                                     cat1.gameObject.transform.position.z), velo, ST);
        cat2.gameObject.transform.position = Vector3.SmoothDamp( cat2.gameObject.transform.position, Vector3(leaf2.gameObject.transform.position.x, leaf2.gameObject.transform.position.y,  
                                                                         cat2.gameObject.transform.position.z), velo, ST);
        cat3.gameObject.transform.position = Vector3.SmoothDamp( cat3.gameObject.transform.position, Vector3(leaf3.gameObject.transform.position.x, leaf3.gameObject.transform.position.y,  
                                                                         cat3.gameObject.transform.position.z), velo, ST);
        cat4.gameObject.transform.position = Vector3.SmoothDamp( cat4.gameObject.transform.position, Vector3(leaf4.gameObject.transform.position.x, leaf4.gameObject.transform.position.y,  
                                                                         cat4.gameObject.transform.position.z), velo, ST);
        cat5.gameObject.transform.position = Vector3.SmoothDamp( cat5.gameObject.transform.position, Vector3(leaf5.gameObject.transform.position.x, leaf5.gameObject.transform.position.y,  
                                                                         cat5.gameObject.transform.position.z), velo, ST);

        this.gameObject.transform.position = Vector3.SmoothDamp( this.gameObject.transform.position , Vector3(this.gameObject.transform.position.x, -1.82,  
                                                                         this.gameObject.transform.position.z), velo, ST);    
    }
    

}

function NowStopEverything () {
    yield WaitForSeconds (7);
    flag = 2;
    mainLeaf.SetActive(false);
    tex.text = "";
    Debug.Log(tex.color); // = #ff0000ff;
    cat1.gameObject.transform.position = Vector3(-4.77, -2.49, -1);
    
    cat2.gameObject.transform.position = Vector3(-2.03, -1.1, -1);

    cat3.gameObject.transform.position = Vector3(-2.3, -5, -1);

    cat4.gameObject.transform.position = Vector3(0.38, -2.42, -1);

    cat5.gameObject.transform.position = Vector3(-2.72, -2.42, -1);

    this.gameObject.transform.position = Vector3(0,-1.82,-30);

    yield WaitForSeconds (1);
    frogs.SetActive(true);

    yield WaitForSeconds(2);
    nextBut.SetActive(true);
}

public function NextLevel () {

    var pan = this.gameObject.transform.Find("Canvas/Panel");
    pan.transform.gameObject.SetActive(true);

}