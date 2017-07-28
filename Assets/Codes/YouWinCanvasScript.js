#pragma strict

function Start () {

    PlayerPrefs.SetInt("Level Won "+Application.loadedLevel.ToString(), Application.loadedLevel);
    SetScore();
    StarNew();

}

function SetScore () {
    if (PlayerPrefs.HasKey("Score "+Application.loadedLevel)){
        var score = PlayerPrefs.GetInt("Score "+Application.loadedLevel);
        if (score >= PlayerPrefs.GetInt("CurrScore "+Application.loadedLevel)){ 
            //Do Nothing
        }
        else {
            PlayerPrefs.SetInt("Score "+Application.loadedLevel, PlayerPrefs.GetInt("CurrScore "+Application.loadedLevel));
        }
    }
    else {
        PlayerPrefs.SetInt("Score "+Application.loadedLevel, PlayerPrefs.GetInt("CurrScore "+Application.loadedLevel));
    }

    Score.text = PlayerPrefs.GetInt("Score "+Application.loadedLevel).ToString();
}

public var StarLeft : GameObject;
public var StarMid : GameObject;
public var StarRight : GameObject;
public var nextBut : GameObject;
public var LF : GameObject;
public var Score : UI.Text;
public var CatHappy : GameObject;

//public var AS : AudioSource;

function Star(){
    var i = PlayerPrefs.GetInt("StarCurr");
    if (i > 2){
        LF.SetActive(false);
        
    }
    yield WaitForSeconds(1);
    if (i>=1){
        //AS.Play();
        StarLeft.SetActive(true);


    }

    yield WaitForSeconds(0.3);
    if (i>=2){
        //AS.Play();
        StarMid.SetActive(true);
    }

    yield WaitForSeconds(0.3);
    if (i == 3){
        //AS.Play();
        StarRight.SetActive(true);
        CatHappy.SetActive(true);
        nextBut.SetActive(true);
    }

}

function StarNew(){
    var i = PlayerPrefs.GetInt("StarCurr");
   // if (i > 2){
        LF.SetActive(false);
       
    //}
    yield WaitForSeconds(1);
    if (i>=1){
        //AS.Play();
        StarLeft.SetActive(true);
    }

    yield WaitForSeconds(0.3);
    if (i>=2){
        //AS.Play();
        StarMid.SetActive(true);
    }

    yield WaitForSeconds(0.3);
    if (i == 3){
        //AS.Play();
        StarRight.SetActive(true);
    }
    
    CatHappy.SetActive(true);
    nextBut.SetActive(true);

}


