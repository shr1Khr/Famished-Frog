#pragma strict

function Start () {

}

function Update () {
    if (PlayerPrefs.HasKey("Paid")){
        this.gameObject.SetActive(false);
    
    }
}