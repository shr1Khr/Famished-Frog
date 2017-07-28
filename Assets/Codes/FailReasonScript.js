#pragma strict

private var LevelFailTransform : Transform;

function OnEnable () {
    var MC : GameObject = GameObject.FindGameObjectWithTag("MainCamera");
     LevelFailTransform = MC.transform.Find("Canvas/Fail");
}

function Update () {

    var hit : RaycastHit2D;

    #if UNITY_WEBGL
        if (Input.touchCount > 0 && Input.GetTouch(0).phase == TouchPhase.Began){
            hit = Physics2D.Raycast (Camera.main.ScreenToWorldPoint((Input.GetTouch (0).position)), Vector2.zero);}
    #endif
    
#if UNITY_ANDROID
    if (Input.touchCount > 0 && Input.GetTouch(0).phase == TouchPhase.Began){
        var hit = Physics2D.Raycast (Camera.main.ScreenToWorldPoint((Input.GetTouch (0).position)), Vector2.zero);}
#endif

#if UNITY_EDITOR
    if (Input.GetMouseButtonDown(0)){
        hit = Physics2D.Raycast (Camera.main.ScreenToWorldPoint((Input.mousePosition)), Vector2.zero);}
#endif

    if(hit.collider != null){
        LevelFailTransform.gameObject.SetActive(true);
        this.gameObject.transform.parent.gameObject.SetActive(false);
    }
}

public function AfterAnim () {
    var MC : GameObject = GameObject.FindGameObjectWithTag("MainCamera");
    LevelFailTransform = MC.transform.Find("Canvas/Fail");
    LevelFailTransform.gameObject.SetActive(true);
    this.gameObject.transform.parent.gameObject.SetActive(false);
}