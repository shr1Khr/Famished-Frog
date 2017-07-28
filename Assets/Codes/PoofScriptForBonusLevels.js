#pragma strict

private var movePosForOwlGO : GameObject;
public var poof : GameObject;

public var LPH : GameObject;  // LPH = LevelPlaceHolder gameObject :D
private var t : int;


public var myScrollRect : ScrollRect;
public var actualContentPanle : RectTransform;
private var initialPos : float; // this is reference for the scroll rect movement. it is the topmost postion as it is ! Set in function SetRectTransform

private var flag : int;


function OnEnable () {
    //Debug.Log(this.gameObject.name);
    
    if(this.gameObject.name != "Poof"){
        flag = 0;
        SetActiveLevels();
        // if (){
        var thisGO = this.gameObject.name;
        if(thisGO != "Poof"){
            var GO = getCurrActiveLevels();
            if(GO != null){
                movePosForOwlGO = GO;
                //Debug.Log("Just set Active");
                flag = 1;
                t = Time.time;
                SetRectTransform(movePosForOwlGO);
            }
            // Debug.Log("FartPoop and PoopFart "+thisGO);
        }
        //    }
    }
}

function SetActiveLevels(){
    // var go = this.gameObject.transform.parent.transform.Find("LevelsPlaceHolder");
    var tChildrens = LPH.gameObject.GetComponentsInChildren.<Transform>(true);
    for (var a : int = 1; a < tChildrens.Length; a++){
        if (tChildrens[a].gameObject.name != "Text" && tChildrens[a].gameObject.name != "Lock"){
             Debug.Log("tChildrens[a].gameObject.name "+tChildrens[a].gameObject.name);
            var c = parseInt(tChildrens[a].gameObject.name);
            var i = PlayerPrefs.GetInt("Bonus"+c);
             Debug.Log("SetActiveLevel funct "+c+" "+i);
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

function getCurrActiveLevels () {
    //var go = this.gameObject.transform.parent.transform.Find("LevelsPlaceHolder");
    var tChildrens = LPH.gameObject.GetComponentsInChildren.<Transform>(true);
    for (var a : int = 2; a < tChildrens.Length; a++){
		var i = PlayerPrefs.GetInt("Star"+a);
		if ( i == 0){ 
            var currLevelThatNeedsToBeUnlocked = a;
            break;
        }
    }

    for (var b = 0; b < tChildrens.Length; b++){
        //Debug.Log((a-1).ToString()+"  "+tChildrens[b].gameObject.name);
        if (tChildrens[b].gameObject.name == (a-1).ToString() ){
            if (!tChildrens[b].gameObject.activeSelf){
                //Debug.Log("true "+tChildrens[b].gameObject);
                return tChildrens[b].gameObject;
            }
        }
    }
    //Debug.Log("foked :|");
}

function Update () {
    //Debug.Log(actualContentPanle.anchoredPosition);
    if(flag == 1){
        lalalal();
    }
}

function lalalal(){
    yield WaitForSeconds(1);
    var ST  = 0.05;
    var velo = Vector3.zero;
    transform.position = Vector3.SmoothDamp( transform.position, Vector3(movePosForOwlGO.transform.position.x, movePosForOwlGO.transform.position.y, transform.position.z), velo, ST);
        
    // if (Mathf.Approximately(movePosForOwlGO.transform.position.x, transform.position.x ) || Mathf.Approximately(movePosForOwlGO.transform.position.y, transform.position.y )){
    if (Time.time - t > 3){ 
        flag = 2;
        poof.SetActive(true);
        PlayerPrefs.SetInt("ActivateLevel", parseInt(movePosForOwlGO.gameObject.name));
        //Debug.Log("activate ??");
        Destroy(this);
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




