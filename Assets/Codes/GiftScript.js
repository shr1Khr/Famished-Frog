#pragma strict

public static var giftNo : int;
public var giftNoo : int;
public var giftQtyy : int;
public static var giftQty : int;
public var AS : AudioSource;
private var flag : int = 0;

public var GiftCanvas : GameObject;
private var GC : GameObject;

private var GiftTop : GameObject;
private var TheGift : GameObject;

function Start () {

    if (PlayerPrefs.GetInt("Gift"+Application.loadedLevel) == 1){
        Debug.Log("Destriy this gift, alread given to user");
       // Destroy(this.gameObject);
    }

//PlayerPrefs.SetInt("Gift"+Application.loadedLevel, 0);

giftNo = giftNoo;
giftQty= giftQtyy;

}

function Update () {
  
var frogGO = GameObject.FindGameObjectWithTag("Frog");
var leafOfFrog : GameObject;
var GiftGO  = gameObject;
var leafOfGift : GameObject;

	var hit = Physics2D.Raycast ((frogGO.transform.position), Vector2.zero);
		if(hit.collider != null){
		leafOfFrog = hit.collider.gameObject;
///		Debug.Log("leafOfFrog "+leafOfFrog);
		}

	var hit2 = Physics2D.Raycast ((GiftGO.transform.position), Vector2.zero);
	//Debug.Log("hit2.collider "+ hit2.collider);
	if(hit2.collider != null){
	    leafOfGift = hit2.collider.gameObject;
	}
	else { // else = if the leaf is destroyed
	    var mc = GameObject.FindGameObjectWithTag("MainCamera");
	    var tRH = mc.transform.Find("Canvas/RockHint");
	    var rhText : UI.Text = tRH.transform.gameObject.GetComponentInChildren(UI.Text);
	    rhText.text = "You sank free gift !!    :( ";
	    tRH.transform.gameObject.SetActive(true);
	    Destroy(this.gameObject);
	}

if (leafOfGift == leafOfFrog){if (flag == 0){flag = 1;}}
playASandDeactivate();
}


function playASandDeactivate(){
	if (flag == 1){
		flag = 2;
		if (PlayerPrefs.GetInt("BGMusic") == 1){ AS.Play(); }
		 PlayerPrefs.SetInt("Gift"+Application.loadedLevel, 1);
		 Debug.Log("Gift "+PlayerPrefs.GetInt("Gift"+Application.loadedLevel));
		 canvasActivate();
		
	}
}


function canvasActivate(){

    var muchPanleTransform  = GiftCanvas.transform.GetChild(0);
    var panel : GameObject = muchPanleTransform.transform.gameObject;
    var mc : GameObject = GameObject.Find("Main Camera");
    var transformCanv = mc.transform.GetChild(0);
    var canv : GameObject = transformCanv.transform.gameObject;

    var can : GameObject = Instantiate(panel, Vector3.zero,  Quaternion.identity);

    can.transform.SetParent(canv.transform, false);
    can.SetActive(true);

    //GC = Instantiate(GiftCanvas, Vector3.zero, Quaternion.identity);
    //GC.SetActive(true);
    var  TGiftTop = can.transform.Find("GftTop");
    var  TTheGift = can.transform.Find("TheGift");
    GiftTop = TGiftTop.gameObject;
    TheGift = TTheGift.gameObject;
    TheGift.SetActive(true);
    yield WaitForSeconds(3);
    //GC.SetActive(false);
    this.gameObject.SetActive(false);

}