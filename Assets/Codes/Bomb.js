#pragma strict

public var Bomb : GameObject;
public var Blast : GameObject;

public var timeLength : int;

function Start () {
    func();
}

function Update () {

}


function func(){
    yield WaitForSeconds(timeLength);

    Bomb.SetActive(false);
    Blast.SetActive(true);

}

