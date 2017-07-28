#pragma strict

public var SnakeText : UI.Text;
public var SnakeGO : GameObject;
public var SolCan : GameObject;
public var warning : GameObject;
public var WarningText : UI.Text;

private var startY : float;
//private var flag : int;

function Start () {

 
   // PlayerPrefs.SetInt("SnakeNo",25);

    startY = transform.position.y + 2 ;
    //Debug.Log("Snakebutt start pos y "+startY);
   // flag = 0;

}

function Update () {
    SnakeText.text = PlayerPrefs.GetInt("SnakeNo").ToString() ;
}


function SnakeButtClick(){
    if (PlayerPrefs.GetInt("SnakeNo")  > 0){ PlayerPrefs.SetInt("SnakeNo",(PlayerPrefs.GetInt("SnakeNo") -1)); Instantiate (SnakeGO, Vector3( (transform.position.x + 1), (startY), -10 ), Quaternion.identity);}
    else {buy();}

}

function buy(){
    WarningText.text = "You need to buy Snakes";
    warning.SetActive(true);
    yield WaitForSeconds(2);
    SolCan.SetActive(true);

}