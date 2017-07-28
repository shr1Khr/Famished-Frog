#pragma strict

public var tap : GameObject;
private var flag : int ;

function Start () {
    
    flag = 0;
   
}

function Update () {

    

    GetFrogLeaf();
    if (TouchToSinkLeaves.move != 0){ tap.SetActive(false);}
   

}



function GetFrogLeaf(){
if (flag == 0){
    var frog = GameObject.FindGameObjectWithTag("Frog");
    var hit = Physics2D.Raycast (( frog.gameObject.transform.position), Vector2.zero);
    if(hit.collider != null){
        if (parseInt(hit.collider.gameObject.name) == 24 ){
            tap.transform.position = Vector3(-2.22, -2.58, 0);
            tap.SetActive(true);
            //Debug.Log(TouchToSinkLeaves.move);
        }
        if (parseInt(hit.collider.gameObject.name) == 34 ){
            tap.transform.position = Vector3(0.35, -2.58, 0);
            tap.SetActive(true);
        }
        if (parseInt(hit.collider.gameObject.name) == 44 ){
            tap.transform.position = Vector3(2.78, -2.58, 0);
            tap.SetActive(true);
        }
        if (parseInt(hit.collider.gameObject.name) == 54 ){
            tap.transform.position = Vector3(5.21, -2.58, 0);
                tap.SetActive(true);
                flag = 1;// this t make sure once the last tap is set active, its not activated again
        }
    }
    }// if flag == 0
}