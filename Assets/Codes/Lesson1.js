#pragma strict

public var tap : GameObject;

function Start () {
    
    flag = 0;
   
}

function Update () {

    

    GetFrogLeaf();
    if (TouchToSinkLeaves.move != 0){ tap.SetActive(false);}
   

}

private var flag : int ;

function GetFrogLeaf(){
    var frog = GameObject.FindGameObjectWithTag("Frog");
    var hit = Physics2D.Raycast (( frog.gameObject.transform.position), Vector2.zero);
    if(hit.collider != null){ 
        if (parseInt(hit.collider.gameObject.name) == 73 ){
            tap.transform.position = Vector3(-2.26, -0.97, 0);
            tap.SetActive(true);
            //Debug.Log(TouchToSinkLeaves.move);
        }
        if (parseInt(hit.collider.gameObject.name) == 63 ){
            tap.transform.position = Vector3(0.37, -1.24, 0);
            tap.SetActive(true);
        }
        if (parseInt(hit.collider.gameObject.name) == 53 ){
            tap.transform.position = Vector3(2.76, -2.71, 0);
            tap.SetActive(true);
        }
        if (parseInt(hit.collider.gameObject.name) == 42 ){
            tap.transform.position = Vector3(-2.18, -2.71, 0);
            if(flag == 0){
                flag++;
            tap.SetActive(true);
            }
        }
    }
}