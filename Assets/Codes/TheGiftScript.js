#pragma strict

public var undoGO : GameObject;
public var Butter : GameObject;
public var snake : GameObject;
public var sol : GameObject;

public var tex1 : UI.Text;
public var tex2 : UI.Text;
public var tex3 : UI.Text;
public var tex4 : UI.Text;

function Start () {
    GiveGift();
}

function Update () {

}



function GiveGift(){
    if (GiftScript.giftQty == 1){   tex1.text = ""; tex2.text = ""; tex3.text = ""; tex4.text = "";}
    else { tex1.text = "x " + GiftScript.giftQty; tex2.text = "x " + GiftScript.giftQty; tex3.text = "x " + GiftScript.giftQty; tex4.text = "x " + GiftScript.giftQty; } 
    if (GiftScript.giftNo == 1 || GiftScript.giftNo == 11 || GiftScript.giftNo == 111){Debug.Log("gift given is Und0");      PlayerPrefs.SetInt("UndoNo", PlayerPrefs.GetInt("UndoNo") + GiftScript.giftQty);                    undoGO.SetActive(true);}
    if (GiftScript.giftNo == 2 || GiftScript.giftNo == 11 || GiftScript.giftNo == 121){Debug.Log("gift given is ButterFly"); PlayerPrefs.SetInt("ButterflyNumber", PlayerPrefs.GetInt("ButterflyNumber") + GiftScript.giftQty);  Butter.SetActive(true);}
    if (GiftScript.giftNo == 3 || GiftScript.giftNo == 11 || GiftScript.giftNo == 121){Debug.Log("gift given is snakes");    PlayerPrefs.SetInt("SnakeNo", PlayerPrefs.GetInt("SnakeNo") + GiftScript.giftQty);                  snake.SetActive(true);}
    if (GiftScript.giftNo == 4 || GiftScript.giftNo == 11 || GiftScript.giftNo == 111){Debug.Log("gift given is Sol");       PlayerPrefs.SetInt("Solution", PlayerPrefs.GetInt("Solution") + GiftScript.giftQty);                sol.SetActive(true);}
}