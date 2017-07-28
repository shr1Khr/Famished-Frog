#pragma strict

public var Star0 ;
public var Star1 ;
public var Star2 ;


function Start () {
var curr : GameObject;
curr = this.gameObject;
var cur = curr.transform.GetComponentsInChildren(Transform);
var l = cur[1].name.ToString();
var j = parseInt(l);
j = j + 1;

var i = PlayerPrefs.GetInt("Star"+j);

if (i>=1){
Destroy(cur[5].transform.gameObject);
}
if (i>=2){
Destroy(cur[4].transform.gameObject);
}

if (i == 3){
Destroy(cur[3].transform.gameObject);
}

}