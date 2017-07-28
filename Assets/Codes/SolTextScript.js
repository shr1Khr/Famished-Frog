#pragma strict

public var SolText : UI.Text;
public var solGO : GameObject;
public var solsMenu : GameObject;
public var texx : GameObject;
public var tex : UI.Text;

function Start () {

}

function Update () {
SolText.text = PlayerPrefs.GetInt("Solution").ToString();
}


function SolButton(){
    if (PlayerPrefs.GetInt("Solution") > 0){
        if(solGO.activeSelf){
            tex.text = "Solution is already shown !";
            texx.SetActive(true);
        }
        else{
            solGO.SetActive(true);
        }
    }
    else{
        tex.text = "Please buy solutions...";
        texx.SetActive(true);
        solsMenu.SetActive(true);
    }

    

}