#pragma strict

private var GOName : GameObject;
public var MC : GameObject;
function Start () {

GOName = this.gameObject;

}

function Update () {

if (Time.time > 2){
	GOName.transform.position.y = GOName.transform.position.y - Time.deltaTime;
	if(GOName.transform.position.y <= -1.6f){
		MC.SetActive(true);
		//GOName.SetActive(false);
	}
}


}