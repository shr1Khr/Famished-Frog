#pragma strict
/*

Read the Scores of freinds of current level and store locally
 In case of reset, you dont have to check DB always !

 now if the # of friends < 10, fill in some garbage values for the rest of the ranks, friends will be at top
 if # of friends => 10, sort highest.

 we have 10 names, pics, score, FBID apart from ME - All stored locally !
 Once, the level is complete, sort as per the score, and display


PlayerPrefs.GetInt("FriendsCount"); 
PlayerPrefs.GetString("NameOfFriend#" + a);
PlayerPrefs.GetString("FBIDOfFriend#" + a);
PlayerPrefs.GetString("PicOfFriend#" + a);
PlayerPrefs.GetInt("ScoreOfFriend#" + a + Level);


 REMOVED  - Make sure to save PlayerPrefs.SetInt("MyPosInLB", 3); value for animation; 

 Now assuming we have all the necessary data, we begin
 Step 1: Put all PlayerPrefs friends data to local variables - count, name, FBID, sprites, scores
 Step 2: if the length of count => 10, all ok, else, put in some garbage var to fill 10
 Step 3: Sort scores and thus all other variables

 */

private var count : int; // Count of  of freinds
private var nam : String[]; // Name of friends
private var FBID : String[]; // FBID of friends
private var sprites : Sprite[]; // Pic of friends
private var scores : int[]; // Scores of friends

private var gName : String[]; // Name of garbage
private var gSprites : Sprite[]; // Sprite of garbage

private var fName : String[]; // Final name
private var fSprites : Sprite[]; // Final Pic
private var fScore : int[]; // Final Scores


function Start () {
    var i = Application.loadedLevel;
    if (PlayerPrefs.HasKey("Default#" + i)){
        //if (false){

        LoadVariables();
        SetLeaderBoard();
        ShowOnScreen();
    }
    else {
        Debug.Log("Has to abort Leaderboard :(");
        var tYouWon = this.gameObject.transform.parent.Find("YouWon");
        tYouWon.transform.gameObject.SetActive(true);
        this.gameObject.SetActive(false);
    }
}

function ShowOnScreen() {
    //fName //fSprites //fScore
    var dName = new Text[10];
    var dScores = new Text[10];
    var dPic = new Image[10];

    var tPanel = this.gameObject.transform.Find("MainPanel/Panel");
    var Panel : GameObject = tPanel.transform.gameObject;
    
    // Name & Score - Text
    var ttext : Text[] = Panel.GetComponentsInChildren.<Text>();
    var i = 0; var j = 0;
    for (var tt in ttext) {
        if (tt.name == "Name"){
            dName[i] = tt;
            i++;
            //Debug.Log(i+" "+tt.transform.parent.name+" "+tt.name);
        }
        if (tt.name == "Score"){
            dScores[j] = tt;
            j++;
            //Debug.Log(j+" "+tt.transform.parent.name+" "+tt.name);
        }
    }
    
    // Sprites - Pics
    var tpics = Panel.GetComponentsInChildren.<Image>();
    i = 0;
    for (var pi in tpics) {
        if (pi.name == "Pic"){
            dPic[i] = pi;
            i++;
            //Debug.Log(i+" "+pi.transform.parent.name);
        }
    }

    for (var a : int = 0; a < 10; a++){
    dName[a].text = fName[a];
    dScores[a].text = fScore[a].ToString();
    dPic[a].sprite = fSprites[a];
    }

}


function SetLeaderBoard () {
    if (count >= 10){ return void; }
    var i = Application.loadedLevel;
    FillInGarbage(); // so we have gName[] & gSprites[] as the name and pics.
    
    // Default, Me, my friends - > top positions; 
    // Remaining spots, garbage

    // Friends Data - nam, FBID, scores, sprites 
    // My Data in PlayerPrefs.GetString("Name"); PlayerPrefs.SetString("Pic", encodedText); PlayerPrefs.GetInt("CurrScore "+Application.loadedLevel) / PlayerPrefs.GetInt("Score "+Application.loadedLevel)
    
    // Now we load the data in following 3 variable, then we sort these 3 variables as per fScore and show on screen :)
    fName = new String[10];
    fScore = new int[10];
    fSprites = new Sprite[10];

    // Step 1 - Load my detail at 0
    fName[0] = "Me";
    if (PlayerPrefs.HasKey("Score "+i)){ if (PlayerPrefs.GetInt("CurrScore "+i) > PlayerPrefs.GetInt("Score "+i)){ fScore[0] = PlayerPrefs.GetInt("CurrScore "+i);}
                                         else {fScore[0] = PlayerPrefs.GetInt("Score "+i); }
    }
    else { fScore[0] = PlayerPrefs.GetInt("CurrScore "+i); }
    
    if (PlayerPrefs.HasKey("Pic")){
        var bytee : byte[] = Convert.FromBase64String(PlayerPrefs.GetString("Pic"));
        var tex : Texture2D  = new Texture2D(128, 128);
        if (bytee == null ){fSprites[0] = gSprites[9]; Debug.Log("My Image Not found hence default Image");}
        tex.LoadImage(bytee);
        fSprites[0] = Sprite.Create (tex, new Rect(0,0,128,128), new Vector2()); 
        }
    else { fSprites[0] = gSprites[9];}

    // Step 2 - Load default data at 1
    fName[1] = "Gwen";
    fSprites[1] = gSprites[8];
    fScore[1] = PlayerPrefs.GetInt("Default#" + i);


    // Step 3 - Now friends data 
    var iteration : int = 1; // this is to keep track of length of final variable
    if (PlayerPrefs.HasKey("FriendsCount")){
        if (PlayerPrefs.GetInt("FriendsCount") > 0){
            var count = PlayerPrefs.GetInt("FriendsCount");
            for (var a = 0; a < count; a++ ){
                iteration++;
                if (iteration >= 10){break;}
                fName[a+2] = nam[a]; 
                fScore[a+2] = scores[a];
                fSprites[a+2] = sprites[a];
                if (fScore[a+2] == 0){iteration--;}
            }
        }
    }

    var fillTillNow = iteration;
    // Step 4 - Now fill the remaining places of 10 with garbage values
    if (iteration >= 10){}
    else{
        for (var b = 0; b < 8; b++ ){
            iteration++;
            if (iteration >= 10){break;}
            fName[iteration] = gName[b];
            fSprites[iteration] = gSprites[b];
            //fScore[iteration] = Random.Range(0, fScore[0]);
            fScore[iteration] = Random.Range(0, fScore[fillTillNow]); //Debug.Log(""+fScore[iteration]);
        }
    }

    // Step 5 - Sort Now
    for (var c = 0; c < 9; c++) {
        for (var d = 0; d < (9 - c); d++) {
            if (fScore[d] < fScore[d+1]) 
            {
                var tName = fName[d];
                fName[d] = fName[d+1];
                fName[d+1] = tName;

                var tScore = fScore[d];
                fScore[d] = fScore[d+1];
                fScore[d+1] = tScore;
                
                var tSprites = fSprites[d];
                fSprites[d] = fSprites[d+1];
                fSprites[d+1] = tSprites;
            }
        }
    }

    // Step 6 - Set Animator, Highlight & set ScrollRect Position
    var tPanel = this.gameObject.transform.Find("MainPanel/Panel");
    var Panel : GameObject = tPanel.transform.gameObject;
    var tAnim = Panel.GetComponentsInChildren.<Animator>();
    // Debug.Log(tAnim.Length);
    for (var e : int = 0; e < 10; e++) {
        if (fName[e] == "Me"){
        //Debug.Log(tAnim[e]);    
            tAnim[e].enabled = true;
            var destImage = tAnim[e].transform.gameObject.GetComponent.<Image>(); 
            var tsourceImage = this.gameObject.transform.Find("MyBack");
            var sImage = tsourceImage.transform.gameObject.GetComponent.<Image>();
            destImage.sprite = sImage.sprite;
            var scrRect : ScrollRect = this.gameObject.GetComponentInChildren.<ScrollRect>();
            if (e > 5){ scrRect.verticalNormalizedPosition = 0;}
            else { scrRect.verticalNormalizedPosition = 1;}
            break;
        }// end if fName[e] == "Me"
    }// end for var e..



}


function FillInGarbage () { // gName[]   gSprites[]
    var i = Application.loadedLevel;
    gName = new String[10]; 
    gName[0] = "Bubba"; gName[1] = "Diana"; gName[2] = "Natalie"; gName[3] = "Aesosmith"; gName[4] = "Ferret Gump"; 
    gName[5] = "Moon Moon"; gName[6] = "Derp"; gName[7] = "Derpina"; gName[8] = "Gwen"; gName[9] = "Me";

    gSprites = new Sprite[10];
    var tpic =  this.gameObject.transform.Find("Bubba");   var Im = tpic.GetComponent(Image);     gSprites[0] = Im.sprite;
    tpic =  this.gameObject.transform.Find("Diana");           Im = tpic.GetComponent(Image);     gSprites[1] = Im.sprite;
    tpic =  this.gameObject.transform.Find("Natalie");         Im = tpic.GetComponent(Image);     gSprites[2] = Im.sprite;
    tpic =  this.gameObject.transform.Find("Aesosmith");       Im = tpic.GetComponent(Image);     gSprites[3] = Im.sprite;
    tpic =  this.gameObject.transform.Find("Ferret");          Im = tpic.GetComponent(Image);     gSprites[4] = Im.sprite;
    tpic =  this.gameObject.transform.Find("Moon");            Im = tpic.GetComponent(Image);     gSprites[5] = Im.sprite;
    tpic =  this.gameObject.transform.Find("Derp");            Im = tpic.GetComponent(Image);     gSprites[6] = Im.sprite;
    tpic =  this.gameObject.transform.Find("Derpina");         Im = tpic.GetComponent(Image);     gSprites[7] = Im.sprite;
    tpic =  this.gameObject.transform.Find("Gwen");            Im = tpic.GetComponent(Image);     gSprites[8] = Im.sprite;
    tpic =  this.gameObject.transform.Find("Me");              Im = tpic.GetComponent(Image);     gSprites[9] = Im.sprite;
    


    for (var a = 0; a < 10; a++){
    PlayerPrefs.GetString("NameOfGarbage#" + a);
    PlayerPrefs.GetString("PicOfGarbage#" + a);
    PlayerPrefs.GetInt("ScoreOfGarbage#" + a + i);
    }

}

function LoadVariables() { // Friends Data - nam, FBID, scores, sprites
    nam = new String[10]; FBID= new String[10]; sprites = new Sprite[10]; scores = new int[10];
    var i = Application.loadedLevel;  
    count = PlayerPrefs.GetInt("FriendsCount"); Debug.Log("Count of Friends "+count);

    for (var a : int = 0; a < count; a++){
        if (a >= 10){ return void;}
        nam[a]  = PlayerPrefs.GetString("NameOfFriend#" + a);
        FBID[a]  = PlayerPrefs.GetString("FBIDOfFriend#" + a);
        scores[a]= PlayerPrefs.GetInt("ScoreOfFriend#" + a + i);
        
        var bytee : byte[] = Convert.FromBase64String(PlayerPrefs.GetString("PicOfFriend#" + a));
	    var tex : Texture2D  = new Texture2D(128, 128);
	    if (bytee == null ){Debug.Log("fart ");}
        tex.LoadImage(bytee);
        sprites[a] = Sprite.Create (tex, new Rect(0,0,128,128), new Vector2());
        
    }// end for
}


public function CloseButton () {
    var tYouWon = this.gameObject.transform.parent.Find("YouWon");
    tYouWon.transform.gameObject.SetActive(true);
    this.gameObject.SetActive(false);
}