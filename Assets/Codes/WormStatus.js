#pragma strict

private var locked : GameObject[];

public var locked0 : GameObject;
public var locked1 : GameObject;
public var locked2 : GameObject;
public var locked3 : GameObject;
public var locked4 : GameObject;
public var locked5 : GameObject;
public var locked6 : GameObject;
public var locked7 : GameObject;
public var locked8 : GameObject;
public var locked9 : GameObject;
public var locked10 : GameObject;
public var locked11 : GameObject;
public var locked12 : GameObject;
public var locked13 : GameObject;
public var locked14 : GameObject;

public var worm : GameObject;

function Start () {
	var b = -5;
	loadGO();


	for (var a : int = 2; a < 17; a++){
		var i = PlayerPrefs.GetInt("Star"+a);
		if ( i == 0){ a = 31; }
		else {
			var GO = locked[a/2];
			GO.SetActive(true);
			worm.transform.position.x = GO.transform.position.x;
		}
	}
}

function loadGO(){
 locked = new GameObject[15];

 locked[0] = locked0;
 locked[1] = locked1;
 locked[2] = locked2;
 locked[3] = locked3;
 locked[4] = locked4;
 locked[5] = locked5;
 locked[6] = locked6;
 locked[7] = locked7;
 locked[8] = locked8;
 locked[9] = locked9;
 locked[10] = locked10;
 locked[11] = locked11;
 locked[12] = locked12;
 locked[13] = locked13;
 locked[14] = locked14;


}