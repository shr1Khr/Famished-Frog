#pragma strict


private var sad : GameObject;
private var normal : GameObject;

function Start () {
    var tSad = this.gameObject.transform.Find("SadFrog");
    sad = tSad.transform.gameObject;

    var tnormal = this.gameObject.transform.Find("GO");
    normal = tnormal.transform.gameObject;

}

function Update () {
    //Debug.Log("Win "+TheLogic.weWon);
    if (TheLogic.weWon == 2){
        sad.SetActive(true);
        normal.SetActive(false);
    }
        /*
    else if (sad.activeSelf){
        sad.SetActive(false);
        normal.SetActive(true);
    }
    */
}