#pragma strict

private var lastMile       : int = 0;

public static var rhGO     : GameObject; public static var rht  : Text;
public static var leafThis : List.< int >;
public static var leafLast : List.< int >;
public static var resetNo  : int ;
public static var stepsCount : int;

function Start () {
   
    resetNo = PlayerPrefs.GetInt("reload"+Application.loadedLevel);
    leafThis = new List.< int >(); leafLast = new List.< int >();  stepsCount = 0;
    SetVariables();
}

public static var aiTime : int;

function Update () {
    if (Application.loadedLevel > 1){
    TimeToMove();//// Asking user to move after every 5 sec; Applicable for forst 10 levels
    }
}


function TimeToMove(){
    // Asking user to move after every 5 sec
    if (Application.loadedLevel < 12){
        //Debug.Log("move "+TouchToSinkLeaves.move);
        if (TouchToSinkLeaves.move != 0){
            aiTime = 0;
            if (rhGO == null){SetVariables();}
            if (rhGO.activeSelf){
                var ttt = rhGO.GetComponent(SelfDestruct);
                ttt.tim = 0;
                rhGO.SetActive(false);
            }
        }
        else {
            aiTime++;      
        }
    }

    if (aiTime > 500){
        if (TheLogic.win == 0){
            YourTurn();
            Debug.Log("aiTime "+aiTime);
            aiTime = 0;
        }
    }
}



public static function ClickedLeaf (leafGO : GameObject) {
    var leaf : int = parseInt(leafGO.name);

    if (PlayerPrefs.GetInt("reload"+Application.loadedLevel) == resetNo){ 
        leafThis.Add(leaf);
        stepsCount++;
    }
    else{ 
        if (PlayerPrefs.GetInt("reload"+Application.loadedLevel) == 0){
            resetNo = PlayerPrefs.GetInt("reload"+Application.loadedLevel);
            leafThis = new List.< int >(); leafLast = new List.< int >(); stepsCount = 0;
            leafThis.Add(leaf);
            stepsCount++;
        }
        else{
            for (var leafThi in leafThis){ leafLast.Add(leafThi); }
            leafThis = new List.< int >(); stepsCount = 0;
            leafThis.Add(leaf);
            stepsCount++;
            resetNo = PlayerPrefs.GetInt("reload"+Application.loadedLevel);
           
        }
    }

    // Above logic sets leafThis and leafLast; Below logic is action part
    // Here we are checking if last 3 steps are all same as the Last iteration's
    if (resetNo > 0){
        if (stepsCount >= 3){
            var tempStepsCount = stepsCount;
            var flag = 0;
            for (var a = 0; a < tempStepsCount; a++){
                if (leafThis[a] == leafLast[a]){
                    Debug.Log("This move is same as last !! -> "+a);
                    flag++;
                    Debug.Log("flag "+flag);
                }// end if leafThis[a] == leafLast[a]
            }
        }
    }
    // if the 3 steps are indeed same, then show Tip !
    if (flag == 3){
        if (rhGO == null){SetVariables();}
        var RockHintText : UI.Text =  rhGO.GetComponentInChildren(UI.Text);
        rht.text = "Tip : Try sinking different Leaves !";
        rhGO.SetActive(true);
    }
}

    
public static function SetVariables () {
        var MC = GameObject.FindGameObjectWithTag("MainCamera");    
        var tRockHint = MC.transform.Find("Canvas/RockHint");
        if (tRockHint != null){
            rhGO  = tRockHint.transform.gameObject;
            rht =  rhGO.GetComponentInChildren(UI.Text);
        }
        
        

}


public function YourTurn () {
    if (TheLogic.win == 0){ 
        yield WaitForSeconds(1); 
        if (TouchToSinkLeaves.move == 0){ 
            if (rhGO == null){SetVariables();}
            var ttt = rhGO.GetComponent(SelfDestruct);
            ttt.tim = 5;
            rht.text = "Your turn: Sink a Leaf"; 
            rhGO.SetActive(true);

            
        }
        else if (rhGO.activeSelf){
            ttt.tim = 0;
            rhGO.SetActive(false);
        }
    }

}