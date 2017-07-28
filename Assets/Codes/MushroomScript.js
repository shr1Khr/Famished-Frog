#pragma strict


public var AS : AudioSource;
private var flag : int = 0;

public var mushCanvas : GameObject;


function Start () {
    
    if (PlayerPrefs.GetInt("Mush"+Application.loadedLevel) == 1){
        Debug.Log("Destriy this Mush, already given to user");
        Destroy(this.gameObject);
    }

    
//PlayerPrefs.SetInt("Mush"+Application.loadedLevel, 0);
    //Debug.Log("Mush "+PlayerPrefs.GetInt("Mush"+Application.loadedLevel));

}

function Update () {

var frogGO = GameObject.FindGameObjectWithTag("Frog");
var leafOfFrog : GameObject;
var MushGO  = gameObject;
var leafOfMush : GameObject;

	var hit = Physics2D.Raycast ((frogGO.transform.position), Vector2.zero);
		if(hit.collider != null){
		leafOfFrog = hit.collider.gameObject;
		}

	var hit2 = Physics2D.Raycast ((MushGO.transform.position), Vector2.zero);
		if(hit2.collider != null){
		    leafOfMush = hit2.collider.gameObject;
		}

		else { // else = if the leaf is destroyed
		    var mc = GameObject.FindGameObjectWithTag("MainCamera");
		    var tRH = mc.transform.Find("Canvas/RockHint");
		    var rhText : UI.Text = tRH.transform.gameObject.GetComponentInChildren(UI.Text);
		    rhText.text = "You Lost Mushroom !!!    :( ";
		    tRH.transform.gameObject.SetActive(true);
		    Destroy(this.gameObject);
	}

		if (leafOfMush != null){
            if (leafOfMush == leafOfFrog){
	            Debug.Log(leafOfMush+" "+leafOfFrog);
	            if (flag == 0){flag = 1;}
		}
    }

    playASandDeactivate();
}


public function playASandDeactivate(){
    
    if (flag == 1){
        Debug.Log("flag "+flag);
		flag = 2;
		if (PlayerPrefs.GetInt("BGMusic") == 1){ AS.Play(); }
		PlayerPrefs.SetInt("Mush"+Application.loadedLevel, 1);
		Debug.Log("Mush "+PlayerPrefs.GetInt("Mush"+Application.loadedLevel));
		canvasActivate();
	}
}


function canvasActivate(){ 
    var muchPanleTransform  = mushCanvas.transform.GetChild(0);
    var panel : GameObject = muchPanleTransform.transform.gameObject;
    var mc : GameObject = GameObject.Find("Main Camera");
    var transformCanv = mc.transform.GetChild(0);
    var canv : GameObject = transformCanv.transform.gameObject;

    var can : GameObject = Instantiate(panel, Vector3.zero,  Quaternion.identity);
   
    can.transform.SetParent(canv.transform, false);
    can.SetActive(true);

    //mushCanvas.SetActive(true);  // THis is now handelled from InLevelScript
    yield WaitForSeconds(0.2); 
    //Destroy(can);
    this.gameObject.SetActive(false);
}