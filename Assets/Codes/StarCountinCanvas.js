#pragma strict

var tex : UI.Text;

function Start () {

}

function Update () {
tex.text = PlayerPrefs.GetInt("StarCurr").ToString();
}