#pragma strict

public var tim : int ;

function Start () {
    if (tim == 0 ){
        tim = 2;
    }
    selfDest();
}

function Update () {
    selfDest();
}

function selfDest(){

    yield WaitForSeconds(tim);
    Destroy(this.gameObject);

}