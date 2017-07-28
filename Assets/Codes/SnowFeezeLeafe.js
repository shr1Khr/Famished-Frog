#pragma strict
import UI;


public var SnowAnim : GameObject;
public var blast : GameObject;
public var img : Sprite;

function Start () {

}

function Update () {

}

public function anim(){
    SnowAnim.SetActive(false);
    blast.SetActive(true);
}

public function freeze(){
    var hit = Physics2D.Raycast ((transform.position), Vector2.zero);
    if(hit.collider != null){
        //Debug.Log("Frozen leaf name "+hit.collider.gameObject.name);
        var leafName = hit.collider.gameObject;
        var SR = leafName.GetComponent(SpriteRenderer);
        SR.sprite = img;
        leafName.tag = "Frozen";
        Destroy(SnowAnim);
    }
}
