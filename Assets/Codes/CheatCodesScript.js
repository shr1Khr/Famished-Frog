#pragma strict

public var inputField : InputField ;
public var inputField2 : GameObject;
public var CheatPanel : GameObject ;
public var tex : Text;

function Start () {

}

function Update () {

}

function endEdit(){
    

    if (inputField.text == "Undo" || inputField.text == "undo"){ 
        Debug.Log(inputField.text); PlayerPrefs.SetInt("UndoNo",100);
        tex.text = "Enjoy 100 Undo";
        CheatPanel.SetActive(true);
    }
    if (inputField.text == "All" || inputField.text == "all"){
        Debug.Log("2 "+inputField.text); PlayerPrefs.SetInt("UndoNo",100); PlayerPrefs.SetInt("ButterflyNumber",100);PlayerPrefs.SetInt("SnakeNo",100);
        tex.text = "Enjoy 100 snakes, 100 butterfly & 100 undo";
        CheatPanel.SetActive(true);
    }
    if (inputField.text == "Lives" || inputField.text == "lives" ){
        Debug.Log("3 "+inputField.text); PlayerPrefs.SetInt("Lives",10); 
        tex.text = "Lives reset to 10 :)";
        CheatPanel.SetActive(true);
    }

    inputField2.SetActive(false);

}

