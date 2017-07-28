#pragma strict


	public static var energyRefillTime0 : DateTime;
	public static var energyRefillTime1 : DateTime;
	public static var energyRefillTime2 : DateTime;
	public static var energyRefillTime3 : DateTime;
	public static var energyRefillTime4 : DateTime;
	public static var energyRefillTime5 : DateTime;
	public static var energyRefillTime6 : DateTime;
	public static var energyRefillTime7 : DateTime;
	public static var energyRefillTime8 : DateTime;
	public static var energyRefillTime9 : DateTime;

	public static var WaitTime : int;
	
	function Start () {
	    if (PlayerPrefs.GetInt("fail"+Application.loadedLevel) >= 2){ TipImag(); }
	    if (PlayerPrefs.GetInt("Lives") >= 5){
	    CoinsScript.energyRefillTimeGeneric = DateTime.Parse("1/1/0001 00:00:00 AM");
	    PlayerPrefs.SetString("energyRefillTimeGeneric", energyRefillTimeGeneric.ToString());
	    //Debug.Log("Start here reset");
	    }

	  //  Debug.Log("Livs "+PlayerPrefs.GetInt("Lives"));

	    var ins : GameObject[] = GameObject.FindGameObjectsWithTag("CoinsManager");
	    if(ins.Length > 1){Debug.Log("Destroyed"); Destroy(this.gameObject);}

	    WaitTime = 30;
        	     
	    if (PlayerPrefs.HasKey("Lives")){}
	    else{PlayerPrefs.SetInt("Lives",5);}

	    if (PlayerPrefs.HasKey("UndoNo")){}
	    else{PlayerPrefs.SetInt("UndoNo",2);}

	    if (PlayerPrefs.HasKey("ButterflyNumber")){}
	    else{PlayerPrefs.SetInt("ButterflyNumber",0);}

	    if (PlayerPrefs.HasKey("SnakeNo")){}
	    else{PlayerPrefs.SetInt("SnakeNo",0);}

	    if (PlayerPrefs.HasKey("Solution")){}
	    else{PlayerPrefs.SetInt("Solution",0);}

        DontDestroyOnLoad (transform.gameObject);    
            
}


function Update () {
    //Debug.Log(Time.time);
    if (PlayerPrefs.GetInt("reload"+Application.loadedLevel) == 4){ Debug.Log("Here activate soluton menu"); lemme(); }


    if ((Application.loadedLevel == 1 || Application.loadedLevel == 0)&&(Time.timeScale  == 0)){Time.timeScale  = 1;}

}

function lemme(){
    if(Application.loadedLevel > 5 ){
        yield WaitForSeconds(0.5);
        var MaC : GameObject = GameObject.Find("Main Camera");
        var SolutionGO = MaC.transform.Find("Canvas/SolutionsMenu");
        if (SolutionGO.transform.gameObject != null && PlayerPrefs.GetInt("reload"+Application.loadedLevel) != 0){
            PlayerPrefs.SetInt("reload"+Application.loadedLevel, 0);
            SolutionGO.gameObject.SetActive(true);
        }
    }
}

function TipImag(){
    if(Application.loadedLevel > 1 && Application.loadedLevel < 7 ){
        yield WaitForSeconds(2);
        var MC : GameObject = GameObject.Find("Main Camera");
        var tip = MC.transform.Find("Canvas/TipImage");
        if (tip.transform.gameObject != null){
            PlayerPrefs.SetInt("fail"+ Application.loadedLevel , 0);
            tip.gameObject.SetActive(true);
        }
    }
}


public static var energyRefillTime10 : DateTime;
public static var energyRefillTimeGeneric : DateTime;
private var  remainingCurr : TimeSpan;
public static var  countdownTimerText : String;

public static function SetEnergyRefillTimer(){
   
    if (energyRefillTimeGeneric.get_Year() == 0001){
        energyRefillTimeGeneric = DateTime.Now.AddMinutes(WaitTime);    
        PlayerPrefs.SetString("energyRefillTimeGeneric", energyRefillTimeGeneric.ToString());
        Debug.Log("THis is what I want 1 "+energyRefillTimeGeneric.ToString());
    }

}

InvokeRepeating("ShowOnScreen", 0, 1);

function ShowOnScreen () {

    /*
    if (PlayerPrefs.HasKey("energyRefillTimeGeneric")){ }
    else {
        CoinsScript.energyRefillTimeGeneric = DateTime.Parse("1/1/0001 00:00:00 AM");
        PlayerPrefs.SetString("energyRefillTimeGeneric", energyRefillTimeGeneric.ToString());
    }
    */

    CoinsScript.energyRefillTimeGeneric =  DateTime.Parse(PlayerPrefs.GetString("energyRefillTimeGeneric"));
    
    if (CoinsScript.energyRefillTimeGeneric > DateTime.Now){
        remainingCurr = CoinsScript.energyRefillTimeGeneric.Subtract(DateTime.Now);
        //Debug.Log("1 here");
    }
    else {

      //  var howMuchMore =  CoinsScript.energyRefillTimeGeneric.AddMinutes(WaitTime*2); 

        if (PlayerPrefs.GetInt("Lives") < 5){
            PlayerPrefs.SetInt("Lives", PlayerPrefs.GetInt("Lives") + 1 );
           // energyRefillTimeGeneric = DateTime.Now.AddMinutes(WaitTime);
            energyRefillTimeGeneric = energyRefillTimeGeneric.AddMinutes(WaitTime);
            PlayerPrefs.SetString("energyRefillTimeGeneric", energyRefillTimeGeneric.ToString());
            remainingCurr = CoinsScript.energyRefillTimeGeneric.Subtract(DateTime.Now);
            //Debug.Log("THis is what I want 2 "+energyRefillTimeGeneric.ToString());
        } // end if
    }


    countdownTimerText = String.Format("{0:D2}:{1:D2}", remainingCurr.Minutes, remainingCurr.Seconds);
    //Debug.Log("countdownTimerText "+countdownTimerText);
    
}











/*
public static function SetEnergyRefillTimer(){
    Debug.Log("Called From InLevelScript "+ PlayerPrefs.GetInt("Lives"));

    //A cehck needs to be here :/
    // Check();
   
    if (energyRefillTime9.get_Year() == 0001){
        energyRefillTime9 = DateTime.Now.AddMinutes(WaitTime);
        PlayerPrefs.SetString("energyRefillTime9", energyRefillTime9.ToString());
        Debug.Log("energyRefillTime9 "+energyRefillTime9);
        return;
    }

    else if (energyRefillTime8.get_Year() == 0001){
        energyRefillTime8 = DateTime.Now.AddMinutes(WaitTime);
        PlayerPrefs.SetString("energyRefillTime8", energyRefillTime8.ToString());
        Debug.Log("energyRefillTime8 "+energyRefillTime8);
        return;
    }

  else if (energyRefillTime7.get_Year() == 0001){
      energyRefillTime7 = DateTime.Now.AddMinutes(WaitTime);
        PlayerPrefs.SetString("energyRefillTime7", energyRefillTime7.ToString());
        Debug.Log("energyRefillTime7 "+energyRefillTime7);
        return;
    }

  else if (energyRefillTime6.get_Year() == 0001){
      energyRefillTime6 = DateTime.Now.AddMinutes(WaitTime);
        PlayerPrefs.SetString("energyRefillTime6", energyRefillTime6.ToString());
        Debug.Log("energyRefillTime6 "+energyRefillTime6);
        return;
    }
  else if (energyRefillTime5.get_Year() == 0001){
      energyRefillTime5 = DateTime.Now.AddMinutes(WaitTime);
        PlayerPrefs.SetString("energyRefillTime5", energyRefillTime5.ToString());
        Debug.Log("energyRefillTime5 "+energyRefillTime5);
        return;
    }

   else if (energyRefillTime4.get_Year() == 0001){
       energyRefillTime4 = DateTime.Now.AddMinutes(WaitTime);
        PlayerPrefs.SetString("energyRefillTime4", energyRefillTime4.ToString());
        Debug.Log("energyRefillTime4 "+energyRefillTime4);
        return;
    }

    else if (energyRefillTime3.get_Year() == 0001){
        energyRefillTime3 = DateTime.Now.AddMinutes(WaitTime);
        PlayerPrefs.SetString("energyRefillTime3", energyRefillTime3.ToString());
        Debug.Log("energyRefillTime3 "+energyRefillTime3);
        return;
    }

    else if (energyRefillTime2.get_Year() == 0001){
        energyRefillTime2 = DateTime.Now.AddMinutes(WaitTime);
        PlayerPrefs.SetString("energyRefillTime2", energyRefillTime2.ToString());
        Debug.Log("energyRefillTime2 "+energyRefillTime2);
    }

    else if (energyRefillTime1.get_Year() == 0001){
        energyRefillTime1 = DateTime.Now.AddMinutes(WaitTime);
        PlayerPrefs.SetString("energyRefillTime1", energyRefillTime1.ToString());
        Debug.Log("energyRefillTime1 "+energyRefillTime1);
    }

    else if (energyRefillTime0.get_Year() == 0001){
        energyRefillTime0 = DateTime.Now.AddMinutes(WaitTime);
        PlayerPrefs.SetString("energyRefillTime0", energyRefillTime0.ToString());
        Debug.Log("energyRefillTime0 "+energyRefillTime0);
    }

    PlayerPrefs.Save();

}


public static function Check(){
    Debug.Log("Lives "+ PlayerPrefs.GetInt("Lives") );
    //Get all variables
    Debug.Log("energyRefillTime0 "+PlayerPrefs.GetString("energyRefillTime9"));

    if(PlayerPrefs.GetString("energyRefillTime0") == ""){
    	energyRefillTime0 = DateTime.Parse("1/1/0001 00:00:00 AM");
    	PlayerPrefs.SetString("energyRefillTime0", energyRefillTime0.ToString());}
    else{ energyRefillTime0 = DateTime.Parse(PlayerPrefs.GetString("energyRefillTime0"));}

    if(PlayerPrefs.GetString("energyRefillTime1") == ""){
        energyRefillTime1 = DateTime.Parse("1/1/0001 00:00:00 AM");
        PlayerPrefs.SetString("energyRefillTime1", energyRefillTime1.ToString());}
    else{ energyRefillTime1 = DateTime.Parse(PlayerPrefs.GetString("energyRefillTime1"));}

    if(PlayerPrefs.GetString("energyRefillTime2") == ""){
        energyRefillTime2 = DateTime.Parse("1/1/0001 00:00:00 AM");
        PlayerPrefs.SetString("energyRefillTime2", energyRefillTime2.ToString());}
    else{ energyRefillTime2 = DateTime.Parse(PlayerPrefs.GetString("energyRefillTime2"));}

    if(PlayerPrefs.GetString("energyRefillTime3") == ""){
        energyRefillTime3 = DateTime.Parse("1/1/0001 00:00:00 AM");
        PlayerPrefs.SetString("energyRefillTime3", energyRefillTime3.ToString());}
    else{ energyRefillTime3 = DateTime.Parse(PlayerPrefs.GetString("energyRefillTime3"));}

    if(PlayerPrefs.GetString("energyRefillTime4") == ""){
        energyRefillTime4 = DateTime.Parse("1/1/0001 00:00:00 AM");
        PlayerPrefs.SetString("energyRefillTime4", energyRefillTime4.ToString());}
    else{ energyRefillTime4 = DateTime.Parse(PlayerPrefs.GetString("energyRefillTime4"));}

    if(PlayerPrefs.GetString("energyRefillTime5") == ""){
        energyRefillTime5 = DateTime.Parse("1/1/0001 00:00:00 AM");
        PlayerPrefs.SetString("energyRefillTime5", energyRefillTime5.ToString());}
    else{ energyRefillTime5 = DateTime.Parse(PlayerPrefs.GetString("energyRefillTime5"));}

    if(PlayerPrefs.GetString("energyRefillTime6") == ""){
        energyRefillTime6 = DateTime.Parse("1/1/0001 00:00:00 AM");
        PlayerPrefs.SetString("energyRefillTime6", energyRefillTime6.ToString());}
    else{ energyRefillTime6 = DateTime.Parse(PlayerPrefs.GetString("energyRefillTime6"));}

    if(PlayerPrefs.GetString("energyRefillTime7") == ""){
        energyRefillTime7 = DateTime.Parse("1/1/0001 00:00:00 AM");
        PlayerPrefs.SetString("energyRefillTime7", energyRefillTime7.ToString());}
    else{ energyRefillTime7 = DateTime.Parse(PlayerPrefs.GetString("energyRefillTime7"));}

    if(PlayerPrefs.GetString("energyRefillTime8") == ""){
        energyRefillTime8 = DateTime.Parse("1/1/0001 00:00:00 AM");
        PlayerPrefs.SetString("energyRefillTime8", energyRefillTime8.ToString());}
    else{ energyRefillTime8 = DateTime.Parse(PlayerPrefs.GetString("energyRefillTime8"));}

    if(PlayerPrefs.GetString("energyRefillTime9") == ""){
        energyRefillTime9 = DateTime.Parse("1/1/0001 00:00:00 AM");
        PlayerPrefs.SetString("energyRefillTime9", energyRefillTime9.ToString());}
    else{ energyRefillTime9 = DateTime.Parse(PlayerPrefs.GetString("energyRefillTime9"));}
    

    Debug.Log("energyRefillTime0 "+energyRefillTime0);

    // Check 
    if (energyRefillTime0 <= DateTime.Now && energyRefillTime0.get_Year() != 0001 ){
        PlayerPrefs.SetInt("Lives", PlayerPrefs.GetInt("Lives") + 1);
        energyRefillTime0 = DateTime.Parse("1/1/0001 00:00:00 AM");
        PlayerPrefs.SetString("energyRefillTime0", energyRefillTime0.ToString());
    }

    if (energyRefillTime1 <= DateTime.Now && energyRefillTime1.get_Year() != 0001 ){
        PlayerPrefs.SetInt("Lives", PlayerPrefs.GetInt("Lives") + 1);
        energyRefillTime1 = DateTime.Parse("1/1/0001 00:00:00 AM");
        PlayerPrefs.SetString("energyRefillTime1", energyRefillTime1.ToString());
    }

    if (energyRefillTime2 <= DateTime.Now && energyRefillTime2.get_Year() != 0001 ){
        PlayerPrefs.SetInt("Lives", PlayerPrefs.GetInt("Lives") + 1);
        energyRefillTime2 = DateTime.Parse("1/1/0001 00:00:00 AM");
        PlayerPrefs.SetString("energyRefillTime2", energyRefillTime2.ToString());
    }
    if (energyRefillTime3 <= DateTime.Now && energyRefillTime3.get_Year() != 0001 ){
        PlayerPrefs.SetInt("Lives", PlayerPrefs.GetInt("Lives") + 1);
        energyRefillTime3 = DateTime.Parse("1/1/0001 00:00:00 AM");
        PlayerPrefs.SetString("energyRefillTime3", energyRefillTime3.ToString());
    }
    if (energyRefillTime4 <= DateTime.Now && energyRefillTime4.get_Year() != 0001 ){
        PlayerPrefs.SetInt("Lives", PlayerPrefs.GetInt("Lives") + 1);
        energyRefillTime4 = DateTime.Parse("1/1/0001 00:00:00 AM");
        PlayerPrefs.SetString("energyRefillTime4", energyRefillTime4.ToString());
    }
    if (energyRefillTime5 <= DateTime.Now && energyRefillTime5.get_Year() != 0001 ){
        PlayerPrefs.SetInt("Lives", PlayerPrefs.GetInt("Lives") + 1);
        energyRefillTime5 = DateTime.Parse("1/1/0001 00:00:00 AM");
        PlayerPrefs.SetString("energyRefillTime5", energyRefillTime5.ToString());
    }
    if (energyRefillTime6 <= DateTime.Now && energyRefillTime6.get_Year() != 0001 ){
        PlayerPrefs.SetInt("Lives", PlayerPrefs.GetInt("Lives") + 1);
        energyRefillTime6 = DateTime.Parse("1/1/0001 00:00:00 AM");
        PlayerPrefs.SetString("energyRefillTime6", energyRefillTime6.ToString());
    }
    if (energyRefillTime7 <= DateTime.Now && energyRefillTime7.get_Year() != 0001 ){
        PlayerPrefs.SetInt("Lives", PlayerPrefs.GetInt("Lives") + 1);
        energyRefillTime7 = DateTime.Parse("1/1/0001 00:00:00 AM");
        PlayerPrefs.SetString("energyRefillTime7", energyRefillTime7.ToString());
    }
    if (energyRefillTime8 <= DateTime.Now && energyRefillTime8.get_Year() != 0001 ){
        PlayerPrefs.SetInt("Lives", PlayerPrefs.GetInt("Lives") + 1);
        energyRefillTime8 = DateTime.Parse("1/1/0001 00:00:00 AM");
        PlayerPrefs.SetString("energyRefillTime8", energyRefillTime8.ToString());
    }

    if (energyRefillTime9 <= DateTime.Now && energyRefillTime9.get_Year() != 0001 ){
        PlayerPrefs.SetInt("Lives", PlayerPrefs.GetInt("Lives") + 1);
        energyRefillTime9 = DateTime.Parse("1/1/0001 00:00:00 AM");
        PlayerPrefs.SetString("energyRefillTime9", energyRefillTime9.ToString());
    }

}


*/