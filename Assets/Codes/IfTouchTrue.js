#pragma strict

private var touchTrue : Boolean;

function Start () {
    touchTrue = false;
}



function Update () {
#if UNITY_ANDROID
    if (Input.touchCount > 0 && Input.GetTouch(0).phase == TouchPhase.Began){ touchTrue = true; }
#endif

#if UNITY_EDITOR
    if (Input.GetMouseButtonDown(0)){ touchTrue = true; }
#endif

if (touchTrue == true){ this.gameObject.SetActive(false);}

}