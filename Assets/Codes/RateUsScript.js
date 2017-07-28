#pragma strict

function Start () {

}

function Update () {

}

public function YesRateUs (){
    var name = EventSystems.EventSystem.current.currentSelectedGameObject;
    var na = name.gameObject.transform.parent;
    Application.OpenURL("https://play.google.com/store/apps/details?id=com.shravankhare.FamishedFrog");
    na.gameObject.SetActive(false);         
            
}