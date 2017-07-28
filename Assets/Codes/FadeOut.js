#pragma strict

private var im : UI.Image ;
public var levelToLoad : int;
private var owl : GameObject;

function Start () {
    var fadeOut = this.gameObject.transform.parent.gameObject; 
    var canvas = fadeOut.gameObject.transform.parent.gameObject; Debug.Log(canvas);
    var tOwl = canvas.transform.Find("Panel/Panel/Image/Owl"); Debug.Log(tOwl);
    owl = tOwl.transform.gameObject; 
    if (owl.activeSelf){owl.SetActive(false);}


    im = this.gameObject.GetComponent(Image);   
}

function Update () {
    Fade();
}

function Fade(){
    
   
    im.color.a = im.color.a + 0.04;
    yield WaitForSeconds(0.5);
    Application.LoadLevel(levelToLoad);
}