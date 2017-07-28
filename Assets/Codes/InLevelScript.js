#pragma strict

private var MC : GameObject;
private var backBut : GameObject;
private var flag : int = 0;
private var TargetPos : float;
private var NextBut : GameObject;
private var fadeIn : GameObject;
public var lives : GameObject;

function Awake () {
    if (Application.loadedLevel > 1){
    
        var fadeIn : GameObject; 
        fadeIn = Instantiate(Resources.Load("FadeIn"));
               
        fadeIn.SetActive(true);

        Debug.Log(fadeIn);
    
    }


}


function Start () {
   
//Debug.Log("PP "+PlayerPrefs.GetInt(Application.loadedLevel.ToString()));
MC = GameObject.FindGameObjectWithTag("MainCamera");
backBut = GameObject.FindGameObjectWithTag("backBut");
NextBut = GameObject.FindGameObjectWithTag("NextBut");
TargetPos = MC.transform.position.x;
var CoinsGO = GameObject.FindGameObjectWithTag("CoinsManager");
if (CoinsGO == null){
	//Debug.Log("null 1");
	CoinsGO = Instantiate(Resources.Load("CoinsManager", GameObject));
	if (CoinsGO == null){Debug.Log("No Coin Manager");}
	}

}

function Update () {
    PauseGame();
    // Check();
    

if (MC.transform.position.x < 1){
if (backBut != null){
	backBut.SetActive(false);
	}
}
else {
if (backBut != null){
backBut.SetActive(true);
	}
}

if (MC.transform.position.x > 54){
if (NextBut != null){
	NextBut.SetActive(false);
	}
}
else {
if (NextBut != null){
NextBut.SetActive(true);
	}
}


if(flag == 1){
	var ST = 0.04;
	var velo = 0.0;
	MC.transform.position.x = Mathf.SmoothDamp(MC.transform.position.x, (TargetPos+1), velo, ST);
	if (((MC.transform.position.x >= 18.17)&&((MC.transform.position.x < 18.2)))||((MC.transform.position.x >= 36.34)&&((MC.transform.position.x < 36.4)))||((MC.transform.position.x >= 54.51)&&((MC.transform.position.x < 54.6)))){
		flag = 0;
		}
	}

if(flag == 2){
	 ST = 0.04;
	 velo = 0.0;
	MC.transform.position.x = Mathf.SmoothDamp(MC.transform.position.x, (TargetPos-1), velo, ST);
	if ((MC.transform.position.x <= 0)||((MC.transform.position.x <= 18.17)&&((MC.transform.position.x > 18)))||((MC.transform.position.x <= 36.34)&&((MC.transform.position.x > 36.29)))){
		flag = 0;
		}
	}
}



function next(){
	flag = 1;
	TargetPos = MC.transform.position.x + 18.17	 ;


}

function back(){
	flag = 2;
	TargetPos = MC.transform.position.x - 18.17;
}

function Exit(){

	Application.LoadLevel(1);
}

function BonusLevelExit(){
    Application.LoadLevel("BonusLevelSelect");
}



function ReloadForWinCanvas(){
    if (PlayerPrefs.GetInt("Star"+Application.loadedLevel) > 0){Application.LoadLevel(Application.loadedLevel);}
    else{Reload();}
}

function ReloadWinMenu(){ 
    PlayerPrefs.SetInt("reload"+Application.loadedLevel, PlayerPrefs.GetInt("reload"+Application.loadedLevel) + 1 );
    Application.LoadLevel(Application.loadedLevel);
}

function Reload(){
    PlayerPrefs.SetInt("reload"+Application.loadedLevel, PlayerPrefs.GetInt("reload"+Application.loadedLevel) + 1 );

    if (PlayerPrefs.GetInt("Lives") > 0 && Application.loadedLevel > 11){
        /*
        PlayerPrefs.SetInt("Lives", PlayerPrefs.GetInt("Lives") - 1);
        CoinsScript.SetEnergyRefillTimer();
        */
        //
        if (PlayerPrefs.GetInt("Lives") == 5){
            CoinsScript.SetEnergyRefillTimer();
            Debug.Log("sent from here here");
        }
        PlayerPrefs.SetInt("Lives", PlayerPrefs.GetInt("Lives") - 1);
        
        //
    }

    if (PlayerPrefs.GetInt("Lives") > 0){
        Application.LoadLevel(Application.loadedLevel);
    }
    else {
        Debug.Log("Out Of lives");
        lives.SetActive(true);
    }

}

function GoToLevelSelect(){
    PlayerPrefs.SetInt("reload"+Application.loadedLevel, PlayerPrefs.GetInt("reload"+Application.loadedLevel) + 1 );
    if (PlayerPrefs.GetInt("Lives") > 0){
        if (PlayerPrefs.GetInt("Lives") == 5){
            CoinsScript.SetEnergyRefillTimer();
            Debug.Log("sent from here here");
        }
        PlayerPrefs.SetInt("Lives", PlayerPrefs.GetInt("Lives") - 1);
    }  
        Application.LoadLevel("LSScene");
    
}




function NextLevel(){
	PlayerPrefs.SetInt("reload"+Application.loadedLevel+1,0);
	Application.LoadLevel(1);
}

function MainLevelPlayButton() {

    if (!PlayerPrefs.HasKey("FirstPlay")){Application.LoadLevel("Story");}
    else {Application.LoadLevel(1);}
}

function StoryLevel () {
    Application.LoadLevel("Story");


}


public var AS : AudioSource;

function playButtonClickAudio(){
if (PlayerPrefs.GetInt("BGMusic") == 1){
AS.Play();
	}

}


function LevelSelectBackButton(){

	Application.LoadLevel(Application.loadedLevel - 1);
}



function Quit(){

	Application.Quit();
}



function resetLevelLocks(){
	PlayerPrefs.DeleteAll();
    Application.LoadLevel(Application.loadedLevel);
}


public var yes : Boolean = false;
public var length : int;
function PauseGame(){
    if (Application.loadedLevel != 0 || Application.loadedLevel != 1 ){
        var child : Image[] = this.gameObject.GetComponentsInChildren.<Image>(false);
        length = child.Length;
        
        //----YouWon
        var tyouWon = this.gameObject.transform.Find("YouWon");
        var ywImages : Image[] = tyouWon.transform.gameObject.GetComponentsInChildren.<Image>(false);
        if (tyouWon.transform.gameObject.activeSelf){ length = length - ywImages.Length;}
        //Debug.Log(length);

        //----SettingsMenu
        tyouWon = this.gameObject.transform.Find("SettingsMenu");
        ywImages = tyouWon.transform.gameObject.GetComponentsInChildren.<Image>(false);
        if (tyouWon.transform.gameObject.activeSelf){ length = length - ywImages.Length;}
        
        //----Leaderboard
        tyouWon = this.gameObject.transform.Find("Leaderboard");
        ywImages = tyouWon.transform.gameObject.GetComponentsInChildren.<Image>(false);
        if (tyouWon.transform.gameObject.activeSelf){ length = length - ywImages.Length;}
        
        //----Fail
        tyouWon = this.gameObject.transform.Find("Fail");
        ywImages = tyouWon.transform.gameObject.GetComponentsInChildren.<Image>(false);
        if (tyouWon.transform.gameObject.activeSelf){ length = length - ywImages.Length;}
        
        //----Failx2
        tyouWon = this.gameObject.transform.Find("Failx2");
        ywImages = tyouWon.transform.gameObject.GetComponentsInChildren.<Image>(false);
        if (tyouWon.transform.gameObject.activeSelf){ length = length - ywImages.Length;}
        
        //----TipImage
        /*     tyouWon = this.gameObject.transform.Find("TipImage");
             Debug.Log("Active timeImage");
             ywImages = tyouWon.transform.gameObject.GetComponentsInChildren.<Image>(false); //Debug.Log(length+" "+child.Length+" "+ywImages.length);
             if (tyouWon.transform.gameObject.activeSelf){ length = length - ywImages.Length;}
         */
        //----LivesUp
        tyouWon = this.gameObject.transform.Find("LivesUp");
        ywImages = tyouWon.transform.gameObject.GetComponentsInChildren.<Image>(false); //Debug.Log(length+" "+child.Length+" "+ywImages.length);
        if (tyouWon.transform.gameObject.activeSelf){ length = length - ywImages.Length;}
        
        //----PaySucc
        tyouWon = this.gameObject.transform.Find("PaySucc");
        ywImages = tyouWon.transform.gameObject.GetComponentsInChildren.<Image>(false); //Debug.Log(length+" "+child.Length+" "+ywImages.length);
        if (tyouWon.transform.gameObject.activeSelf){ length = length - ywImages.Length;}

        //----Initial Tip
        tyouWon = this.gameObject.transform.Find("Initial Tip");
        ywImages = tyouWon.transform.gameObject.GetComponentsInChildren.<Image>(false); //Debug.Log(length+" "+child.Length+" "+ywImages.length);
        if (tyouWon.transform.gameObject.activeSelf){ length = length - ywImages.Length;}

        //----SolutionsMenu
        tyouWon = this.gameObject.transform.Find("SolutionsMenu");
        ywImages = tyouWon.transform.gameObject.GetComponentsInChildren.<Image>(false); //Debug.Log(length+" "+child.Length+" "+ywImages.length);
        if (tyouWon.transform.gameObject.activeSelf){ length = length - ywImages.Length;}
        
        var mushPanle  = this.gameObject.transform.Find("MushPanel(Clone)");
        if (mushPanle != null){
            length = 100;
            //Debug.Log("1 Here ? "+mushPanle.transform.gameObject);
            WaitAndThenDestroy(mushPanle.transform);
        }
        
        var giftPanel  = this.gameObject.transform.Find("GiftPanel(Clone)");
        if (giftPanel != null){
            length = 100;
            //Debug.Log("1 Here ? "+mushPanle.transform.gameObject);
            WaitAndThenDestroy(giftPanel.transform);
        }

        Debug.Log(length);

        if (length > 9){Time.timeScale  = 0;}
        else {Time.timeScale  = 1;}
        
        if(yes){
            for (var chi in child){
                Debug.Log(chi);
            }// end for
        }// end if(yes)
    }
}// function end

function WaitAndThenDestroy(mushPanle : Transform){
    
    yield WaitForSecondsRealtime (2);
    
    if (mushPanle.transform != null){
        Destroy(mushPanle.transform.gameObject);
    }
}

public var SettingsMenu : GameObject;

public function settings(){
    if (SettingsMenu.activeSelf){ SettingsMenu.SetActive(false);}
    else {SettingsMenu.SetActive(true);}
}

public function BunusLevelMenu(){
    Application.LoadLevel("BonusLevelSelect");
}

public function BonusLevelReload(){
    Application.LoadLevel(Application.loadedLevel);

}