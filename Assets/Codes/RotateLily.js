#pragma strict

public var rotateDir : int;


private var GOName : GameObject;

function Start () {

GOName = this.gameObject;

}

function Update () {

GOName.transform.Rotate(Vector3(0,0,rotateDir)*Time.deltaTime);

}