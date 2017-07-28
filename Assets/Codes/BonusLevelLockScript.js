#pragma strict

// ths is just the script attached to LevelPlaceHolder under canvas to remove lock sign when appropriate Mushrooms are gathered.

private var mushCount : int = 0;
public var lock1 : GameObject;
public var lock2 : GameObject;
public var lock3 : GameObject;
public var lock4 : GameObject;
public var MushText : UI.Text;

function OnEnable () {
   // PlayerPrefs.SetInt("Mush"+2, 0);
    CheckMushCount();

}

function Update () {
    MushText.text = mushCount.ToString();
}

InvokeRepeating("LocksRemove", 0, 1);


function CheckMushCount () {
    for (var a = 0; a < 1100; a++){
        mushCount = mushCount + PlayerPrefs.GetInt("Mush"+a);
        Debug.Log("<ush Count in unlock level script "+mushCount);
    }
}

function LocksRemove(){
   var  FinalMushCount = mushCount + PlayerPrefs.GetInt("Mush");
   if (FinalMushCount >= 3){
        lock1.SetActive(false);
    }
   if (FinalMushCount >= 6){
        lock2.SetActive(false);
    }
   if (FinalMushCount >= 9){
        lock3.SetActive(false);
    }
   if (FinalMushCount >= 12){
        lock4.SetActive(false);
    }
}