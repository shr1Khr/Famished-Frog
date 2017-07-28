#pragma strict

function Start () {
    Star();
}

function Update () {

}

public var StarLeft : GameObject;
public var StarMid : GameObject;
public var StarRight : GameObject;

function Star(){
    var i = PlayerPrefs.GetInt("StarCurr");
    if (""+Application.loadedLevelName == "BonusScene1" || Application.loadedLevelName == "BonusScene2" || Application.loadedLevelName == "BonusScene3" || Application.loadedLevelName == "BonusScene4"){ i = 3;}
    Debug.Log("i "+i+" "+ Application.loadedLevel);
    if (i > 2){
      
    }
    yield WaitForSeconds(1);
    if (i>=1){
       
        StarLeft.SetActive(true);


    }

    yield WaitForSeconds(0.3);
    if (i>=2){
        
        StarMid.SetActive(true);
    }

    yield WaitForSeconds(0.3);
    if (i == 3){
        
        StarRight.SetActive(true);
     
    }

}