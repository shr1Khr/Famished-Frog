#pragma strict

public var aiTips : GameObject;
public var tex : UI.Text;
private var level : int;
private var stars : int;
function Start () {
    var i = 0;
    var l : int = 0;
    for (var a : int = 2; a < 100; a++){
        if (PlayerPrefs.HasKey("Level Won "+a)){
        var j = PlayerPrefs.GetInt("Star"+a);
			i = j + i;
            continue;
        }
        break;
    }
        
        level = a-2;
        stars = i;
        Debug.Log(i+" "+(a-2));
        AITip();
    
}

function AITip () {
    Debug.Log(level+" "+stars);
    if (level == 3){
        tex.text = "Great going, you got this !";
        aiTips.gameObject.SetActive(true);
    }
    if (level == 5 ){
        tex.text = "WoW you are smart !";
        aiTips.gameObject.SetActive(true);
    }
    if (level == 7 ){
        tex.text = "Have you checked your IQ lately ? ";
        aiTips.gameObject.SetActive(true);
    }
    if (level == 8 && stars == 24){
        tex.text = "Challenging Levels lies ahead !";
        aiTips.gameObject.SetActive(true);
    }
    if (level == 9 ){
        tex.text = "Too easy ? Wait let me fix things up !";
        aiTips.gameObject.SetActive(true);
    }
    if (level == 10 ){
        tex.text = "Perfect 10, time for Test !!";
        aiTips.gameObject.SetActive(true);
    }
    if (level == 12 ){
        tex.text = "Mushrooms Unlock Bonus Levels !";
        aiTips.gameObject.SetActive(true);
    }
    if (level == 14){
        tex.text = "Dont settle for less, collect all STARS !";
        aiTips.gameObject.SetActive(true);
    }
    if (level == 16 ){
        tex.text = "Have you played bonus Levels yet ??";
        aiTips.gameObject.SetActive(true);
    }
}

