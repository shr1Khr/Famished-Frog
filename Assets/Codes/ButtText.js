#pragma strict

public var ButtText : UI.Text;
public var butterflyGO : GameObject;
public var SolCan : GameObject;
public var warning : GameObject;
public var WarningText : UI.Text;

private var startY : float;
private var flag : int;
private var tar : GameObject;

function Start () {
    //PlayerPrefs.SetInt("ButterflyNumber",25);
    tar = GameObject.FindWithTag("Target");

    
    startY = tar.transform.position.y;
    //Debug.Log("Butt butt start pos y "+startY);
    flag = 0;
}

function Update () {

    ButtText.text = PlayerPrefs.GetInt("ButterflyNumber").ToString() ;

    if(flag == 1){
        //    Debug.Log("Retreat");

        //    retreat();
    }

}


function ButtButtonScript(){
    //check if already clicked
    var bu = GameObject.Find("Butterfly(Clone)");
    Debug.Log(bu);
    if (bu == null){
        if (PlayerPrefs.GetInt("ButterflyNumber")  > 0){ 
            PlayerPrefs.SetInt("ButterflyNumber",(PlayerPrefs.GetInt("ButterflyNumber") -1)); 
            Instantiate (butterflyGO, Vector3( (tar.transform.position.x + 1), (tar.transform.position.y + 3), tar.transform.position.z ), Quaternion.identity); 
            flag = 1; 
            var Ani = GetComponent(Animator); 
            Ani.enabled = false;
        }
        else {buy();}
    }
    else {
        Debug.Log("Already clciked");
    }
}

function buy(){
    WarningText.text = "You need to buy Butterflies";
    warning.SetActive(true);
    yield WaitForSeconds(2);
    SolCan.SetActive(true);

}

function retreat(){
    var ST = 0.1;
    var velo = Vector3.zero;
    transform.position.y = Mathf.SmoothDamp( transform.position.y, startY, velo.y, ST);
    if (transform.position.y < (startY - 0.05)){
        var Ani = GetComponent(Animator); Ani.enabled = true;flag = 0;
        gameObject.SetActive(false);
    }
}