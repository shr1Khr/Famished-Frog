#pragma strict

public var tap : GameObject;
public var TipImage : GameObject;
private var flag : int ;

function Start () {
    //TipImage.SetActive(true);
    flag = 0;
    PlayerPrefs.SetInt("UndoNo", PlayerPrefs.GetInt("UndoNo") + 2);
}

function Update () {

    GetFrogLeaf();
    if (TouchToSinkLeaves.move != 0){ tap.SetActive(false);}
    //Debug.Log("flag "+flag);

}



function GetFrogLeaf(){
    var frog = GameObject.FindGameObjectWithTag("Frog");
    var hit = Physics2D.Raycast (( frog.gameObject.transform.position), Vector2.zero);
    if(hit.collider != null){ 
        if (parseInt(hit.collider.gameObject.name) == 13 && flag == 0){
            tap.transform.position = Vector3(-4.43, -1.1, 0);
            tap.SetActive(true);
            flag = 1;
        }
        if (parseInt(hit.collider.gameObject.name) == 23 && flag == 1 ){
            tap.transform.position = Vector3(-7.13, -2.83, 0);
            tap.SetActive(true);
            flag = 2;
        }
        if (parseInt(hit.collider.gameObject.name) == 33 && flag == 2){
            tap.transform.position = Vector3(-4.33, -2.83, 0);
            tap.SetActive(true);
            flag = 3;
        }
        if (parseInt(hit.collider.gameObject.name) == 43 && flag == 3){
            tap.transform.position = Vector3(-4.18, 2.5, 0);
            tap.SetActive(true);
            flag = 4;    
        }
        if (parseInt(hit.collider.gameObject.name) == 33 && flag == 4){
            tap.SetActive(false);
            tap.transform.position = Vector3(-4.18, 2.5, 0);
            yield WaitForSeconds(0.5);
            tap.SetActive(true);
            flag = 5;    
        }
        if (parseInt(hit.collider.gameObject.name) == 23 && flag == 5){
            tap.SetActive(false);
            tap.transform.position = Vector3(-1.92, -2.83, 0);
            yield WaitForSeconds(0.5);
            tap.SetActive(true);
            flag = 6;    
        }
        if (parseInt(hit.collider.gameObject.name) == 34 && flag == 6){
            var RockHintText : UI.Text = TipImage.GetComponentInChildren(UI.Text);
            RockHintText.text = "Play On !"; 
            TipImage.SetActive(true);
            flag = 7;    
        }
    }
}