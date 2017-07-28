#pragma strict

private var GOName : GameObject;
private var Dir : int;

function Start () {
	GOName = this.gameObject;
	Dir = GOName.transform.position.x;
	//Debug.Log(GOName.transform.localEulerAngles);
}

function Update () {
if(Dir > 0){
	GOName.transform.position.x = GOName.transform.position.x  - 0.8*Time.deltaTime; 
	if (GOName.transform.position.x < -12){
		GOName.transform.localEulerAngles = Vector3(0,0,90);
		Dir = -12;
		}
	}
if(Dir < 0){
	GOName.transform.position.x = GOName.transform.position.x  + 0.8*Time.deltaTime; 
	if (GOName.transform.position.x > 12){
		GOName.transform.localEulerAngles = Vector3(0,0,270);
		Dir = 12;
		}
	}
}