#pragma strict

private var movePosForOwlGO : GameObject;
public var poof : GameObject;
public var RateUs : GameObject;
public var LPH : GameObject;
private var t : int;


public var myScrollRect : ScrollRect;
public var actualContentPanle : RectTransform;
private var initialPos : float; // this is reference for the scroll rect movement. it is the topmost postion as it is ! Set in function SetRectTransform
private var flag : int;


function OnEnable () {
    if ((Application.loadedLevel == 1 || Application.loadedLevel == 0)&&(Time.timeScale  == 0)){Time.timeScale  = 1;}
    if(this.gameObject.name != "Poof"){
        flag = 0;
        SetActiveLevelsNew();
        var thisGO = this.gameObject.name;
        if(thisGO != "Poof"){
            //var GO = getCurrActiveLevels();
            var GO = gameObjectToBeUnlocked ; 
            if(GO != null){
                movePosForOwlGO = GO;
                flag = 1;
                t = Time.time;
                SetRectTransform(movePosForOwlGO);
                if (movePosForOwlGO.name == "20"){
                    RateUs.SetActive(true);
                }
            }
        }
    }
}

/*
function SetActiveLevels(){
    var tChildrens = LPH.gameObject.GetComponentsInChildren.<Transform>(true);
    for (var a : int = 1; a < tChildrens.Length; a++){
        if (tChildrens[a].gameObject.name != "Text"){
            var c = parseInt(tChildrens[a].gameObject.name);
            var i = PlayerPrefs.GetInt("Star"+(c+1));
            if ( i == 0){
                break;
            }
        else{
            tChildrens[a].gameObject.SetActive(true);
            this.gameObject.transform.position = Vector3(tChildrens[a].gameObject.transform.position.x, tChildrens[a].gameObject.transform.position.y,this.gameObject.transform.position.z) ;
            }
        }
    }
}

*/             
private var gameObjectToBeUnlocked : GameObject;
function SetActiveLevelsNew () {
    var tChildrens = LPH.gameObject.GetComponentsInChildren.<Transform>(true);
    for (var a : int = 1; a < tChildrens.Length; a++) {
        if (tChildrens[a].gameObject.name != "Text" && tChildrens[a].gameObject.name != "Lock") {
            var c = parseInt(tChildrens[a].gameObject.name);
            var i = PlayerPrefs.GetInt("Level Won "+(c+1));
            if ( i == 0 ) {
                var currLevelThatNeedsToBeUnlocked = (c+1) ;  // put this level as the level to be unlocked
                for (var b = 0; b < tChildrens.Length; b++){
                    if (tChildrens[b].gameObject.name == (c).ToString() ){
                        if (!tChildrens[b].gameObject.activeSelf){
                            gameObjectToBeUnlocked = tChildrens[b].gameObject;
                            b = tChildrens.Length;
                        }
                    }
                }
                break;
            }
        else {
            tChildrens[a].gameObject.SetActive(true);
            this.gameObject.transform.position = Vector3(tChildrens[a].gameObject.transform.position.x, tChildrens[a].gameObject.transform.position.y,this.gameObject.transform.position.z) ;
            }
        }
    }
}

function Update () {
    if(flag == 1){
        lalalal();
    }
}

function lalalal(){
    yield WaitForSeconds(1);
    var ST  = 0.05;
    var velo = Vector3.zero;
    transform.position = Vector3.SmoothDamp( transform.position, Vector3(movePosForOwlGO.transform.position.x, movePosForOwlGO.transform.position.y, transform.position.z), velo, ST);
    if (Time.time - t > 2){ 
        flag = 2;
        poof.SetActive(true);
        PlayerPrefs.SetInt("ActivateLevel", parseInt(movePosForOwlGO.gameObject.name));
        Destroy(this);
    }
}


function getCurrActiveLevels () {
    var tChildrens = LPH.gameObject.GetComponentsInChildren.<Transform>(true);
    for (var a : int = 2; a < tChildrens.Length; a++){
		var i = PlayerPrefs.GetInt("Star"+a);
		if ( i == 0){ 
            var currLevelThatNeedsToBeUnlocked = a;
            break;
        }
    }

    for (var b = 0; b < tChildrens.Length; b++){
        if (tChildrens[b].gameObject.name == (a-1).ToString() ){
            if (!tChildrens[b].gameObject.activeSelf){
                return tChildrens[b].gameObject;
            }
        }
    }
}






function SetRectTransform (togo : GameObject) {
    // so we have owl position
    // we need to set rect transform pos
    // Debug.Log(go.RectTransform.position);
    initialPos = actualContentPanle.anchoredPosition.y;
    var tChildrens = LPH.gameObject.GetComponentsInChildren.<RectTransform>(true);
    for (var a : int = 1; a < tChildrens.Length; a++){
        if (tChildrens[a].gameObject == togo){
            //Debug.Log("Owls Position   "+tChildrens[a].anchoredPosition.y); // now finally we have Owls Position. THis needs to be the vertical-centre of the screen
            var G22 = tChildrens[a].anchoredPosition.y;
           // Debug.Log("G22 "+G22);
            var I18 = -(initialPos*2);
            //Debug.Log("I18 "+I18);
            var Step2 = (G22+(I18/2))/(I18/2);
           // Debug.Log("Step2 "+Step2);
            var finallPos = Step2/2;  // this is the position in Range(1,0) for myScrollRect to move
           // Debug.Log("Initial Position  "+myScrollRect.verticalNormalizedPosition+"  "+finallPos);
            myScrollRect.verticalNormalizedPosition = finallPos;
           // Debug.Log("Final Position  "+myScrollRect.verticalNormalizedPosition);
            return void;
        }
    }
}

