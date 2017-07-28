#pragma strict
import UI;


public var FlyOwl : GameObject;
public var blast : GameObject;
public var img : Sprite;
private var  flag : int;


function Start () {
    flag = 0;
}

function Update () {
    if (FlyOwl.transform.position.x == this.gameObject.transform.position.x & flag != 1){Debug.Log("Anim"); anim();}
    //Debug.Log("Update "+FlyOwl.transform.position.x);
    if ( flag == 1){
        goaway();
}

}

public function anim(){
    blast.SetActive(true);
    yield WaitForSeconds(0.5);
    freeze();
}

private var ST = 0.8;
private var velo = Vector3.zero;
public function freeze(){
    if (flag != 1){
    Debug.Log("Freeze function");
    var hit = Physics2D.Raycast ((transform.position), Vector2.zero);
    if(hit.collider != null){
        var leafName = hit.collider.gameObject;
        var SR = leafName.GetComponent(SpriteRenderer);
        SR.sprite = img;
        leafName.tag = "Rock";
        flag = 1;
        //goaway();
        }
    }
}

public function goaway(){
    Debug.Log("Away go");
        this.gameObject.transform.position = Vector3.SmoothDamp(this.gameObject.transform.position, Vector3(5.75, 5.17,0),velo, ST );
        yield WaitForSeconds(2);
            Destroy(this.gameObject);
         
    

}