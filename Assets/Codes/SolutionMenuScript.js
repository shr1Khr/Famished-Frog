#pragma strict

public var coinsText : UI.Text;
public var needMoreCoinds : GameObject;
public var PaySuccess : GameObject;

private var ButTrigg : int;

function Start () {
	coinsText.text = PlayerPrefs.GetInt("Coins").ToString();
	ButTrigg = 0;
}

function Update () {
	if (ButTrigg != 0){ action();}
		coinsText.text = PlayerPrefs.GetInt("Coins").ToString();
}

function action(){

    if (ButTrigg == 1){ // solution x1
        if (PlayerPrefs.GetInt("Coins") >= 10){
            PlayerPrefs.SetInt("Coins", PlayerPrefs.GetInt("Coins") - 10);
            coinsText.text = PlayerPrefs.GetInt("Coins").ToString();
            PlayerPrefs.SetInt("Solution",PlayerPrefs.GetInt("Solution") + 1 );
            PaySuccess.SetActive(true);
            ButTrigg = 0;
        }
        else {
            needMoreCoinds.SetActive(true);
            ButTrigg = 0;
        }
    }

    if (ButTrigg == 2){ //Undo x10
        if (PlayerPrefs.GetInt("Coins") >= 20){
            PlayerPrefs.SetInt("Coins", PlayerPrefs.GetInt("Coins") - 20);
            coinsText.text = PlayerPrefs.GetInt("Coins").ToString();
            PlayerPrefs.SetInt("UndoNo",PlayerPrefs.GetInt("UndoNo") + 10 );
            PaySuccess.SetActive(true);
            ButTrigg = 0;
        }
        else {
            needMoreCoinds.SetActive(true);
            ButTrigg = 0;
        }
    }


    if (ButTrigg == 3){ //Life x1
        if (PlayerPrefs.GetInt("Coins") >= 10){
            PlayerPrefs.SetInt("Coins", PlayerPrefs.GetInt("Coins") - 10);
            coinsText.text = PlayerPrefs.GetInt("Coins").ToString();
            PlayerPrefs.SetInt("Lives",PlayerPrefs.GetInt("Lives") + 1 );
            PaySuccess.SetActive(true);
            ButTrigg = 0;
        }
        else {
            needMoreCoinds.SetActive(true);
            ButTrigg = 0;
        }
    }

    if (ButTrigg == 4){ // Butterfly and snake x1
        if (PlayerPrefs.GetInt("Coins") >= 10){
            PlayerPrefs.SetInt("Coins", PlayerPrefs.GetInt("Coins") - 10);
            coinsText.text = PlayerPrefs.GetInt("Coins").ToString();
            PlayerPrefs.SetInt("SnakeNo",PlayerPrefs.GetInt("SnakeNo") + 1 );
            PlayerPrefs.SetInt("ButterflyNumber",PlayerPrefs.GetInt("ButterflyNumber") + 1 );
            PaySuccess.SetActive(true);
            ButTrigg = 0;
        }
        else {
            needMoreCoinds.SetActive(true);
            ButTrigg = 0;
        }
    }

    if (ButTrigg == 5){ // Undo x50
        if (PlayerPrefs.GetInt("Coins") >= 75){
            PlayerPrefs.SetInt("Coins", PlayerPrefs.GetInt("Coins") - 75);
            coinsText.text = PlayerPrefs.GetInt("Coins").ToString();
            PlayerPrefs.SetInt("UndoNo",PlayerPrefs.GetInt("UndoNo") + 50 );
            PaySuccess.SetActive(true);
            ButTrigg = 0;
        }
        else {
            needMoreCoinds.SetActive(true);
            ButTrigg = 0;
        }
    }

    if (ButTrigg == 6){ // lifes x10
        if (PlayerPrefs.GetInt("Coins") >= 50){
            PlayerPrefs.SetInt("Coins", PlayerPrefs.GetInt("Coins") - 50);
            coinsText.text = PlayerPrefs.GetInt("Coins").ToString();
            PlayerPrefs.SetInt("Lives",PlayerPrefs.GetInt("Lives") + 10 );
            PaySuccess.SetActive(true);
            ButTrigg = 0;
        }
        else {
            needMoreCoinds.SetActive(true);
            ButTrigg = 0;
        }
    }

    if (ButTrigg == 7){ // Solution x10
        if (PlayerPrefs.GetInt("Coins") >= 50){
            PlayerPrefs.SetInt("Coins", PlayerPrefs.GetInt("Coins") - 50);
            coinsText.text = PlayerPrefs.GetInt("Coins").ToString();
            PlayerPrefs.SetInt("Solution",PlayerPrefs.GetInt("Solution") + 10 );
            PaySuccess.SetActive(true);
            ButTrigg = 0;
        }
        else {
            needMoreCoinds.SetActive(true);
            ButTrigg = 0;
        }
    }

    if (ButTrigg == 8){ // Mush x10
        if (PlayerPrefs.GetInt("Coins") >= 20){
            PlayerPrefs.SetInt("Coins", PlayerPrefs.GetInt("Coins") - 20);
            coinsText.text = PlayerPrefs.GetInt("Coins").ToString();
            PlayerPrefs.SetInt("Mush",PlayerPrefs.GetInt("Mush") + 10 );
            PaySuccess.SetActive(true);
            ButTrigg = 0;
        }
        else {
            needMoreCoinds.SetActive(true);
            ButTrigg = 0;
        }
    }

    if (ButTrigg == 9){ // Butterfly and snake x10
        if (PlayerPrefs.GetInt("Coins") >= 50){
            PlayerPrefs.SetInt("Coins", PlayerPrefs.GetInt("Coins") - 50);
            coinsText.text = PlayerPrefs.GetInt("Coins").ToString();
            PlayerPrefs.SetInt("SnakeNo",PlayerPrefs.GetInt("SnakeNo") + 10 );
            PlayerPrefs.SetInt("ButterflyNumber",PlayerPrefs.GetInt("ButterflyNumber") + 10 );
            PaySuccess.SetActive(true);
            ButTrigg = 0;
        }
        else {
            needMoreCoinds.SetActive(true);
            ButTrigg = 0;
        }
    }

    if (ButTrigg == 10){ // Undo x100
        if (PlayerPrefs.GetInt("Coins") >= 100){
            PlayerPrefs.SetInt("Coins", PlayerPrefs.GetInt("Coins") - 100);
            coinsText.text = PlayerPrefs.GetInt("Coins").ToString();
            PlayerPrefs.SetInt("UndoNo",PlayerPrefs.GetInt("UndoNo") + 100 );
            PaySuccess.SetActive(true);
            ButTrigg = 0;
        }
        else {
            needMoreCoinds.SetActive(true);
            ButTrigg = 0;
        }
    }

    if (ButTrigg == 11){ // Undo x50 and Solutin x20
        if (PlayerPrefs.GetInt("Coins") >= 150){
            PlayerPrefs.SetInt("Coins", PlayerPrefs.GetInt("Coins") - 150);
            coinsText.text = PlayerPrefs.GetInt("Coins").ToString();
            PlayerPrefs.SetInt("UndoNo",PlayerPrefs.GetInt("UndoNo") + 50 );
            PlayerPrefs.SetInt("Solution",PlayerPrefs.GetInt("Solution") + 20 );
            PaySuccess.SetActive(true);
            ButTrigg = 0;
        }
        else {
            needMoreCoinds.SetActive(true);
            ButTrigg = 0;
        }
    }
   

    




}

// Solution
// MushPaid

function BS1 (){
    //ButTrigg = 1; 
    var name = EventSystems.EventSystem.current.currentSelectedGameObject;
    var na = name.gameObject.transform.parent;
    ButTrigg = parseInt(na.gameObject.name);
    Debug.Log("Button clicked "+na);
}
function BS3 (){ButTrigg = 2;}
function BM5 (){ButTrigg = 3;}
function BM10 (){ButTrigg = 4;}
function BM5andBS3 (){ButTrigg = 5;}