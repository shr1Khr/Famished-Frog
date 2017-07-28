#pragma strict

public var tip : GameObject;

function Start () {
    Trigger();
}

function Trigger () {
    if (!Application.isLoadingLevel && !tip.activeSelf){
        Debug.Log("0 "+Time.time);
        yield WaitForSeconds(1);
        Debug.Log("1 "+Time.time);
        tip.SetActive(true);
        Destroy(this.gameObject);
    }
}