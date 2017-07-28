#pragma strict

private var im : Image;

function Start () {
    im = this.gameObject.GetComponent(Image);
}

function Update () {
    Fade();
}


function Fade () {
    im.color.a = im.color.a + 0.04;
    yield WaitForSeconds(0.5);
    Application.LoadLevel(2);

}
