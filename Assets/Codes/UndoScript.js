#pragma strict

public var UndoText : UI.Text;
public static var LeafGO : Array; // GO
public static var Frog1 : Array; // vector3
public static var Frog2 : Array;
public static var Frog3 : Array;

public var failPanel : GameObject;

public var Store : GameObject;
public var SolCan : GameObject;
public var warning : GameObject;
public var WarningText : UI.Text;

public var XScale : float;
public var YScale : float;

private var ForgGO : GameObject;
private var ForgGO2 : GameObject;
private var ForgGO3 : GameObject;
//private var FrogJMP : GameObject;

private var GO1: GameObject;
private var GO2: GameObject;
private var GO3: GameObject;

private var FIM1: GameObject;
private var FIM2: GameObject;
private var FIM3: GameObject;

private var LV : GameObject;

private var Target : GameObject;
private var Target2 : GameObject;
private var Target3 : GameObject;
private var Target4 : GameObject;
private var Target5 : GameObject;


function Start () {
    
    
    //refresh array in the begining of each level
    LeafGO = new Array();
    Frog1 = new Array();
    Frog2 = new Array();
    Frog3 = new Array();

    ForgGO = GameObject.FindGameObjectWithTag("Frog");
    
    var TGO = ForgGO.transform.Find("GO"); GO1 = TGO.transform.gameObject; var TFIM1 = ForgGO.transform.Find("FailImage"); FIM1 = TFIM1.transform.gameObject;

    ForgGO2 = GameObject.FindGameObjectWithTag("Frog2");
    ForgGO3 = GameObject.FindGameObjectWithTag("Frog3");

    if (ForgGO2 != null){ var TGO2 = ForgGO2.transform.Find("GO"); GO2 = TGO2.transform.gameObject; var TFIM2 = ForgGO2.transform.Find("FailImage"); FIM2 = TFIM2.transform.gameObject;}
    if (ForgGO3 != null){ var TGO3 = ForgGO3.transform.Find("GO"); GO3 = TGO3.transform.gameObject; var TFIM3 = ForgGO3.transform.Find("FailImage"); FIM3 = TFIM3.transform.gameObject;}
    


    LV = GameObject.Find("LilyPads");

    var LPC = LV.transform.Find("11");
    XScale = LPC.transform.localScale.x;
    YScale = LPC.transform.localScale.y;

    Target  = GameObject.FindGameObjectWithTag("Target");
    Target2 = GameObject.FindGameObjectWithTag("Target2");
    Target3 = GameObject.FindGameObjectWithTag("Target3");
    Target4 = GameObject.FindGameObjectWithTag("Target4");
    Target5 = GameObject.FindGameObjectWithTag("Target5");


 
}

function Update () {
    UndoText.text = PlayerPrefs.GetInt("UndoNo").ToString();
    //Debug.Log("Move "+TouchToSinkLeaves.move);
   
}


function UndoButPress(){
    
    if (PlayerPrefs.GetInt("UndoNo") > 0 ){
        if (LeafGO.length != 0){
            
            PlayerPrefs.SetInt("UndoNo", PlayerPrefs.GetInt("UndoNo") - 1);

            var go1 = Frog1.Pop();
            ForgGO.transform.position = go1;
            //FrogJMP.transform.position = go1;
            
            if (ForgGO2 != null){
                var go2 = Frog2.Pop();
                ForgGO2.transform.position = go2;
                
            }

            if (ForgGO3 != null){
                var go3 = Frog3.Pop();
                ForgGO3.transform.position = go3;
               
            }
           
            var go = LeafGO.Pop();
            var Tleaff = LV.transform.Find(go);
            var leaff = Tleaff.transform.gameObject;
            leaff.transform.localScale = Vector3(XScale, YScale, 1);
            leaff.SetActive(true);
        }
    }
    
    else { buy(); }
}


function buy(){
    WarningText.text = "You need to buy UNDO !! ";
    warning.SetActive(true);
    yield WaitForSeconds(2);
    SolCan.SetActive(true);

}

function UndoLast3Moves(){

    if (PlayerPrefs.GetInt("Coins") >= 5){
        PlayerPrefs.SetInt("Coins", PlayerPrefs.GetInt("Coins") - 5);
        failPanel.SetActive(false);
        GO1.SetActive(true);
        FIM1.SetActive(false);
        Target.SetActive(true);

        if (ForgGO2 != null){GO2.SetActive(true);FIM2.SetActive(false);}
        if (ForgGO3 != null){GO3.SetActive(true);FIM3.SetActive(false);}
        if (Target2 != null){Target2.SetActive(true);}
        if (Target3 != null){Target3.SetActive(true);}
        if (Target4 != null){Target4.SetActive(true);}
        if (Target5 != null){Target5.SetActive(true);}

        //AStarForMuiltiTarget.failOrSuccess = 0; 
       // var Star = GameObject.FindGameObjectsWithTag("Star");
        //Debug.Log("Star Length"+ Star.length);
       // PlayerPrefs.SetInt("Star"+Application.loadedLevel, (3 - Star.length) );

        for (var i = 0; i < 3; i++){
           // Debug.Log("PoP1 "+Frog1.length);
            var go1 = Frog1.Pop();
           // Debug.Log("PoP2 "+go1);
            ForgGO.transform.position = go1;
            //FrogJMP.transform.position = go1;
            
            if (ForgGO2 != null){
                var go2 = Frog2.Pop();
                ForgGO2.transform.position = go2;
                
            }

            if (ForgGO3 != null){
                var go3 = Frog3.Pop();
                ForgGO3.transform.position = go3;
               
            }
           
            var go = LeafGO.Pop();
            var Tleaff = LV.transform.Find(go);
            var leaff = Tleaff.transform.gameObject;
            leaff.transform.localScale = Vector3(XScale, YScale, 1);
            leaff.SetActive(true);
            if (Frog1.Count == 0){break;}
        }
        //TouchToSinkLeaves.move == 0;
        //Debug.Log(TouchToSinkLeaves.move);
        TheLogic.win = 0;
    }
    else {
        Storefunc();
    }
}

function Storefunc(){
    WarningText.text = "You need to buy Coins !! ";
    warning.SetActive(true);
    yield WaitForSeconds(2);
    Store.SetActive(true);

}