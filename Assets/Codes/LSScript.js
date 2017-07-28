#pragma strict

public var livesUpPanel : GameObject;
public var loading : GameObject;
public var message : GameObject;
public var messagetext : UI.Text;



public function LevelSelect(){
    
    if (PlayerPrefs.GetInt("Lives") > 0 ){
        var name1 = EventSystems.EventSystem.current.currentSelectedGameObject;
        var name = parseInt(name1.name);
        Debug.Log(name);
        var i = parseInt(name1.name)+1;

        if (name == 11){ var starCount = GetStarCount(); 
            if (starCount >= 25 ){ LoadLevel(i); }//loading.SetActive(true); Application.LoadLevel(i); }
            else { messagetext.text = "Collect 25 or more starts to progress"; message.SetActive(true); }
        }


        if (name == 21){ starCount = GetStarCount(); Debug.Log(starCount);
            if (starCount >= 50 ){ LoadLevel(i); }//loading.SetActive(true); Application.LoadLevel(i); }
            else { messagetext.text = "Collect 50 or more starts to progress"; message.SetActive(true); }
        }
        
        
        if (name == 31){ starCount = GetStarCount(); 
            //if (PlayerPrefs.HasKey("Paid")){
                if (starCount >= 75 ){ LoadLevel(i); }//loading.SetActive(true); Application.LoadLevel(i); }
                else { messagetext.text = "Collect 75 or more starts to progress"; message.SetActive(true); }
           // }
           // else{
              //  messagetext.text = "Please buy full version to unlock remaining Levels"; message.SetActive(true);
           // }
    }
        

        if (name == 41){ starCount = GetStarCount(); 
            if (starCount >= 100 ){ LoadLevel(i); }//loading.SetActive(true); Application.LoadLevel(i); }
            else { messagetext.text = "Collect 100 or more starts to progress"; message.SetActive(true); }
        }
        
        
        if (name == 51){ starCount = GetStarCount(); 
            if (starCount >= 125 ){ LoadLevel(i); }//loading.SetActive(true); Application.LoadLevel(i); }
            else { messagetext.text = "Collect 125 or more starts to progress"; message.SetActive(true); }
        }
        


        if (name != 11 && name != 21 && name != 31 && name != 41 && name != 51){ Debug.Log("loading from here"); LoadLevel(i); }//loading.SetActive(true); Application.LoadLevel(i); }
        
    }
    else{
        livesUpPanel.SetActive(true);
    }
}


function GetStarCount () {
    var i : int = 0;
    for (var a : int = 2; a < 500; a++){
            var j = PlayerPrefs.GetInt("Star"+a);
                i = j + i;
    }
return i;
}


public function Back(){   LoadLevel(0); }//loading.SetActive(true); Application.LoadLevel(0);}

function BonusLevels(){
    Application.LoadLevel("BonusLevelSelect");
}

function BackButtonOfBonusLevel(){
    Application.LoadLevel("LSScene");
}


public function LevelSelectBonusLevels(){
    var Canvas = GameObject.Find("Canvas");
    var RH = Canvas.transform.Find("RockHint");
    var RockHint = RH.transform.gameObject;
    
    var name = EventSystems.EventSystem.current.currentSelectedGameObject;
    var i = parseInt(name.name);
    var mushCount = 0;
    var FinalMushCount = 0;

    for (var a = 0; a < 1100; a++){
        mushCount = mushCount + PlayerPrefs.GetInt("Mush"+a);
    }
    FinalMushCount = mushCount + PlayerPrefs.GetInt("Mush");
    Debug.Log("mushCount "+FinalMushCount);
    
    if (FinalMushCount > 2 && i == 1){    
        Debug.Log("Butt clicked "+name.name+" "+i.ToString());
        loading.SetActive(true);
        Application.LoadLevel("BonusScene1");
    }
    else if (i == 1 && FinalMushCount < 3){
        RockHint.SetActive(true);
    }
    //===============
    if (FinalMushCount > 5 && i == 2){    
        Debug.Log("Butt clicked "+name.name+" "+i.ToString());
        loading.SetActive(true);
        Application.LoadLevel("BonusScene2");
    }
    else if (i == 2 && FinalMushCount < 3){
        RockHint.SetActive(true);
    }
    //===============

    if (FinalMushCount > 8 && i == 3){    
        Debug.Log("Butt clicked "+name.name+" "+i.ToString());
        loading.SetActive(true);
        Application.LoadLevel("BonusScene3");
    }
    else if (i == 3 && FinalMushCount < 3){
        RockHint.SetActive(true);
    }
    //================
    if (FinalMushCount > 11 && i == 4){    
        Debug.Log("Butt clicked "+name.name+" "+i.ToString());
        loading.SetActive(true);
        Application.LoadLevel("BonusScene4");
    }
    else if (i == 4 && FinalMushCount < 3){
        RockHint.SetActive(true);
    }
    //================
}

function LoadLevel (i : int) {
    loading.SetActive(true);
    var panl = loading.transform.Find("Panel");
    var fs = panl.transform.gameObject.GetComponent(FadeOut);
    fs.levelToLoad = i;
    //Application.LoadLevel(i);
}


function Story () {
    
    Application.LoadLevel("Story");    
    
}