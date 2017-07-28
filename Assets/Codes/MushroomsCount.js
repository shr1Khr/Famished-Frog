#pragma strict

public var tex : UI.Text;
private var mushCount : int = 0;

function CountMush () {
    mushCount = 0;
    for (var a : int = 0; a < 100; a++) {
        mushCount = mushCount + PlayerPrefs.GetInt("Mush"+a);
    }
}

InvokeRepeating("MushCountUpdate", 0, 2);

function MushCountUpdate(){
    CountMush();
    mushCount = mushCount + PlayerPrefs.GetInt("Mush");
    Debug.Log("mush count update "+ mushCount);
    tex.text = ""+mushCount;

}