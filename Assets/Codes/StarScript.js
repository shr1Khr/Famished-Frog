#pragma strict


public var AS : AudioSource;
private var flag : int = 0;

function Start () {
    PlayerPrefs.SetInt("StarCurr", 0);
    SetTheLeafTag();
    
}

function SetTheLeafTag(){
    var hit = Physics2D.Raycast ((this.gameObject.transform.position), Vector2.zero);
    if(hit.collider != null){
        if (hit.collider.gameObject.tag == "Untagged"){
            hit.collider.gameObject.tag = "StarLeaf";
        }
    }
}


function Update () {
    //Debug.Log("flag "+this.gameObject.name+" "+flag);
var FrogGO = new GameObject[3];
 FrogGO[0] = GameObject.FindGameObjectWithTag("Frog");
 FrogGO[1] = GameObject.FindGameObjectWithTag("Frog2");
 FrogGO[2] = GameObject.FindGameObjectWithTag("Frog3");

var leafOfFrog : GameObject;
var StarGO  = this.gameObject;
var leafOfStar : GameObject;
for (var frogGO in FrogGO){
	if (frogGO != null){
	var hit = Physics2D.Raycast ((frogGO.transform.position), Vector2.zero);
	if(hit.collider != null){
	    leafOfFrog = hit.collider.gameObject;
	    //Debug.Log("LOF "+leafOfFrog);
		}

	var hit2 = Physics2D.Raycast ((StarGO.transform.position), Vector2.zero);
	//Debug.Log("hit2.collider "+ hit2.collider);
	if(hit2.collider != null){
	    leafOfStar = hit2.collider.gameObject;
	    //Debug.Log("LOS "+leafOfStar);
	}
		if (leafOfStar == leafOfFrog){if (flag == 0){flag = 1;}}

	}}

playASandDeactivate();
}


function playASandDeactivate(){
var ST = 0.1;
var velo = Vector3.zero; 
if (flag == 1){
    PlayerPrefs.SetInt("StarCurr", PlayerPrefs.GetInt("StarCurr")+1);
    PlayerPrefs.SetInt("CurrScore "+Application.loadedLevel, PlayerPrefs.GetInt("CurrScore "+Application.loadedLevel)+500);
		if (PlayerPrefs.GetInt("BGMusic") == 1){ AS.Play(); }
		var Ani = this.GetComponent(Animator);
		Ani.enabled = false;
		RemoveTheTag();
		flag = 2;
		
		}
if (flag == 2){
         var SC = GameObject.FindGameObjectWithTag("RefStar");
		transform.position = Vector3.SmoothDamp(transform.position, SC.transform.position, velo, ST);
		//Debug.Log(this.gameObject.name +" "+flag+" "+this.gameObject.transform.position.y+" "+SC.transform.position.y);
		if(this.gameObject.transform.position.y >= 2.5){
	    	    flag = 3;
		    }
		}

if (flag == 3){
		    
		    this.gameObject.SetActive(false);
		    
	}
}


function RemoveTheTag(){
    var hit = Physics2D.Raycast ((this.gameObject.transform.position), Vector2.zero);
    if(hit.collider != null){
        if (hit.collider.gameObject.tag == "StarLeaf"){
            hit.collider.gameObject.tag = "Untagged";
            var parentGO = this.gameObject.transform.parent.gameObject;
            var tPoints500 = parentGO.transform.Find("Points500");
            tPoints500.transform.position = Vector3(hit.collider.gameObject.transform.position.x, (hit.collider.gameObject.transform.position.y + 1.5), -11);
            tPoints500.transform.gameObject.SetActive(true);
        }
    }
}