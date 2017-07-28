#pragma strict

//    Score = + 500 for each stars + 100 for each leaf - 5 for each seconds passed after first leaf sink

public var scoreText : UI.Text;

private var score : int = 0;

function Start () {
    score = 0;
    PlayerPrefs.SetInt("CurrScore "+Application.loadedLevel, score);

}

function Update () {
    scoreText.text = PlayerPrefs.GetInt("CurrScore "+Application.loadedLevel).ToString();
}

InvokeRepeating("Scoree", 0 , 1);
//var i : int = 0;
function Scoree () {
    if (TheLogic.win == 0){
    PlayerPrefs.SetInt("CurrScore "+Application.loadedLevel, PlayerPrefs.GetInt("CurrScore "+Application.loadedLevel)-5);
    }
}