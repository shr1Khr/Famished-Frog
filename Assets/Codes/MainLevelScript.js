#pragma strict

public var panel : GameObject;
public var rotateted : GameObject;
private var rotateDir : int = 1;

function clickSettings(){

if (!panel.activeSelf){
rotateted.transform.Rotate(Vector3(0,0,rotateDir)*20);
panel.SetActive(true);
}
else {rotateted.transform.Rotate(Vector3(0,0,rotateDir)*(-20)); panel.SetActive(false);}

}

function Start () {

}

function Update () {

}