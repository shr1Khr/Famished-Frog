#pragma strict

public var Lives : Text ;
public var TimeLeft : Text ; 
public var  CatImageHappy : GameObject;
public var  CatImageCry : GameObject;

private var buyBut : GameObject;
private var smallPanel : GameObject;
private var bigPanel : GameObject;
//private static var  countdownTimerText : String;

private var  remaining9 : TimeSpan ;
private var  remaining8 : TimeSpan ;
private var  remaining7 : TimeSpan ;
private var  remaining6 : TimeSpan ;
private var  remaining5 : TimeSpan ;
private var  remaining4 : TimeSpan ;
private var  remaining3 : TimeSpan ;
private var  remaining2 : TimeSpan ;
private var  remaining1 : TimeSpan ;
private var  remaining0 : TimeSpan ;
private var  remainingCurr : TimeSpan;



public function CloseButton(){
    if (PlayerPrefs.GetInt("Lives") > 0 ){
        if (Application.loadedLevel != 1){
            PlayerPrefs.SetInt("Lives", PlayerPrefs.GetInt("Lives") - 1);
            CoinsScript.SetEnergyRefillTimer();
            Application.LoadLevel(Application.loadedLevel);
        }
        else{
            Application.LoadLevel(1);
        }
    }
    else{ Application.LoadLevel(1);}
}


function OnApplicationPause(loseFocus : Boolean){
    if (loseFocus) {
        // SetAllNotifications();
        return;
    }

}


InvokeRepeating("CheckIfEnergyWaitTimeOver", 0, 1);
    
public function CheckIfEnergyWaitTimeOver() {
    if (PlayerPrefs.GetInt("Lives") == 0){ CatImageHappy.SetActive(false); CatImageCry.SetActive(true);   }
    else{CatImageHappy.SetActive(true); CatImageCry.SetActive(false);}

    if (this.gameObject.name == "BackPanel"){
        var tbuyBut = this.gameObject.transform.Find("Buy"); buyBut = tbuyBut.transform.gameObject;
        var tsmallPanel = this.gameObject.transform.Find("SmallPanel"); smallPanel = tsmallPanel.transform.gameObject;
        var tbigPanel = this.gameObject.transform.Find("LargePanel"); bigPanel = tbigPanel.transform.gameObject;
 
        if (PlayerPrefs.GetInt("Lives") >= 5){Lives.text = "Full"; TimeLeft.text = "";  buyBut.SetActive(false); bigPanel.SetActive(false); smallPanel.SetActive(true); }
        else{ Lives.text = "x "+PlayerPrefs.GetInt("Lives").ToString();  TimeLeft.text = CoinsScript.countdownTimerText; buyBut.SetActive(true); bigPanel.SetActive(true); smallPanel.SetActive(false); }
    }
    else {
        if (PlayerPrefs.GetInt("Lives") >= 5){Lives.text = "Full"; TimeLeft.text = ""; }
        else{ Lives.text = "x "+PlayerPrefs.GetInt("Lives").ToString();  TimeLeft.text = CoinsScript.countdownTimerText;}
    }
}

/*
    if(PlayerPrefs.GetInt("Lives") < 5){
    
        SetCorectFormatStrings();


    remainingCurr = new TimeSpan(00,15,00); //DateTime.Parse("1/1/0001 00:00:00 AM");
    //Debug.Log("remainingCurr "+remainingCurr+" "+CoinsScript.energyRefillTime0+" "+CoinsScript.energyRefillTime1+" "+CoinsScript.energyRefillTime2+" "+CoinsScript.energyRefillTime3+" "+CoinsScript.energyRefillTime4+" "+CoinsScript.energyRefillTime5+" "+CoinsScript.energyRefillTime6+" "+CoinsScript.energyRefillTime7+" "+CoinsScript.energyRefillTime8+" "+CoinsScript.energyRefillTime9);


  
       
    if (CoinsScript.energyRefillTime9.get_Year() != 0001 ){
        Debug.Log("9 "+CoinsScript.energyRefillTime9.ToString());
            energyRefillTime9Func();
        }

    if (CoinsScript.energyRefillTime8.get_Year() != 0001 ){
        Debug.Log("8 "+CoinsScript.energyRefillTime8.ToString());
            energyRefillTime8Func();
        }
        
        if (CoinsScript.energyRefillTime7.get_Year() != 0001 ){
            Debug.Log("7 "+CoinsScript.energyRefillTime7.ToString());
            energyRefillTime7Func();
        }

        if (CoinsScript.energyRefillTime6.get_Year() != 0001 ){
            Debug.Log("6 "+CoinsScript.energyRefillTime6.ToString());
            energyRefillTime6Func();
        }

        if (CoinsScript.energyRefillTime5.get_Year() != 0001 ){
            energyRefillTime5Func();
        }

        if (CoinsScript.energyRefillTime4.get_Year() != 0001 ){
            energyRefillTime4Func();
        }
        
        if (CoinsScript.energyRefillTime3.get_Year() != 0001 ){
            energyRefillTime3Func();
        }

        if (CoinsScript.energyRefillTime2.get_Year() != 0001 ){
            energyRefillTime2Func();
        }

        if (CoinsScript.energyRefillTime1.get_Year() != 0001 ){
            energyRefillTime1Func();
        }

        if (CoinsScript.energyRefillTime0.get_Year() != 0001 ){
            energyRefillTime0Func();
        }

       // countdownTimerText = String.Format("{0:D2}:{1:D2}", remainingCurr.Minutes, remainingCurr.Seconds);

    }
}


function  SetCorectFormatStrings(){

 if(PlayerPrefs.GetString("energyRefillTime0") == ""){
     CoinsScript.energyRefillTime0 = DateTime.Parse("1/1/0001 00:00:00 AM");
     PlayerPrefs.SetString("energyRefillTime0", CoinsScript.energyRefillTime0.ToString());}
 else{ CoinsScript.energyRefillTime0 = DateTime.Parse(PlayerPrefs.GetString("energyRefillTime0"));}

    if(PlayerPrefs.GetString("energyRefillTime1") == ""){
        CoinsScript.energyRefillTime1 = DateTime.Parse("1/1/0001 00:00:00 AM");
        PlayerPrefs.SetString("energyRefillTime1", CoinsScript.energyRefillTime1.ToString());}
    else{ CoinsScript.energyRefillTime1 = DateTime.Parse(PlayerPrefs.GetString("energyRefillTime1"));}

    if(PlayerPrefs.GetString("energyRefillTime2") == ""){
        CoinsScript.energyRefillTime2 = DateTime.Parse("1/1/0001 00:00:00 AM");
        PlayerPrefs.SetString("energyRefillTime2", CoinsScript.energyRefillTime2.ToString());}
    else{ CoinsScript.energyRefillTime2 = DateTime.Parse(PlayerPrefs.GetString("energyRefillTime2"));}

    if(PlayerPrefs.GetString("energyRefillTime3") == ""){
        CoinsScript.energyRefillTime3 = DateTime.Parse("1/1/0001 00:00:00 AM");
        PlayerPrefs.SetString("energyRefillTime3", CoinsScript.energyRefillTime3.ToString());}
    else{ CoinsScript.energyRefillTime3 = DateTime.Parse(PlayerPrefs.GetString("energyRefillTime3"));}

    if(PlayerPrefs.GetString("energyRefillTime4") == ""){
        CoinsScript.energyRefillTime4 = DateTime.Parse("1/1/0001 00:00:00 AM");
        PlayerPrefs.SetString("energyRefillTime4", CoinsScript.energyRefillTime4.ToString());}
    else{ CoinsScript.energyRefillTime4 = DateTime.Parse(PlayerPrefs.GetString("energyRefillTime4"));}

    if(PlayerPrefs.GetString("energyRefillTime5") == ""){
        CoinsScript.energyRefillTime5 = DateTime.Parse("1/1/0001 00:00:00 AM");
        PlayerPrefs.SetString("energyRefillTime5", CoinsScript.energyRefillTime5.ToString());}
    else{ CoinsScript.energyRefillTime5 = DateTime.Parse(PlayerPrefs.GetString("energyRefillTime5"));}

    if(PlayerPrefs.GetString("energyRefillTime6") == ""){
        CoinsScript.energyRefillTime6 = DateTime.Parse("1/1/0001 00:00:00 AM");
        PlayerPrefs.SetString("energyRefillTime6", CoinsScript.energyRefillTime6.ToString());}
    else{ CoinsScript.energyRefillTime6 = DateTime.Parse(PlayerPrefs.GetString("energyRefillTime6"));}

    if(PlayerPrefs.GetString("energyRefillTime7") == ""){
        CoinsScript.energyRefillTime7 = DateTime.Parse("1/1/0001 00:00:00 AM");
        PlayerPrefs.SetString("energyRefillTime7", CoinsScript.energyRefillTime7.ToString());}
    else{ CoinsScript.energyRefillTime7 = DateTime.Parse(PlayerPrefs.GetString("energyRefillTime7"));}

    if(PlayerPrefs.GetString("energyRefillTime8") == ""){
        CoinsScript.energyRefillTime8 = DateTime.Parse("1/1/0001 00:00:00 AM");
        PlayerPrefs.SetString("energyRefillTime8", CoinsScript.energyRefillTime8.ToString());}
    else{ CoinsScript.energyRefillTime8 = DateTime.Parse(PlayerPrefs.GetString("energyRefillTime8"));}

    if(PlayerPrefs.GetString("energyRefillTime9") == ""){
        CoinsScript.energyRefillTime9 = DateTime.Parse("1/1/0001 00:00:00 AM");
        PlayerPrefs.SetString("energyRefillTime9", CoinsScript.energyRefillTime9.ToString());}
    else{ CoinsScript.energyRefillTime9 = DateTime.Parse(PlayerPrefs.GetString("energyRefillTime9"));}
    
}




function energyRefillTime9Func (){
    if (CoinsScript.energyRefillTime9 > DateTime.Now){
        remaining9 = CoinsScript.energyRefillTime9.Subtract(DateTime.Now);
        if (remainingCurr > remaining9){remainingCurr = remaining9;}
        //countdownTimerText = String.Format("{0:D2}:{1:D2}", remaining.Minutes, remaining.Seconds);
        return;
    }
    else { PlayerPrefs.SetInt("Lives", PlayerPrefs.GetInt("Lives") + 1);
        CoinsScript.energyRefillTime9 = DateTime.Parse("1/1/0001 00:00:00 AM");
        PlayerPrefs.SetString("energyRefillTime9", CoinsScript.energyRefillTime9.ToString());
        remainingCurr = new TimeSpan(00,15,00);
    }
}


function energyRefillTime8Func (){
    if (CoinsScript.energyRefillTime8 > DateTime.Now){
        remaining8 = CoinsScript.energyRefillTime8.Subtract(DateTime.Now);
        if (remainingCurr > remaining8){remainingCurr = remaining8;}
        //countdownTimerText = String.Format("{0:D2}:{1:D2}", remaining.Minutes, remaining.Seconds);
        return;
    }
    else { PlayerPrefs.SetInt("Lives", PlayerPrefs.GetInt("Lives") + 1);
        CoinsScript.energyRefillTime8 = DateTime.Parse("1/1/0001 00:00:00 AM");
        PlayerPrefs.SetString("energyRefillTime8", CoinsScript.energyRefillTime8.ToString());
        remainingCurr = new TimeSpan(00,15,00);
    }
}


function energyRefillTime7Func (){
    if (CoinsScript.energyRefillTime7 > DateTime.Now){
        remaining7 = CoinsScript.energyRefillTime7.Subtract(DateTime.Now);
        if (remainingCurr > remaining7){remainingCurr = remaining7;}
        //countdownTimerText = String.Format("{0:D2}:{1:D2}", remaining.Minutes, remaining.Seconds);
        return;
    }
    else { PlayerPrefs.SetInt("Lives", PlayerPrefs.GetInt("Lives") + 1);
        CoinsScript.energyRefillTime7 = DateTime.Parse("1/1/0001 00:00:00 AM");
        PlayerPrefs.SetString("energyRefillTime7", CoinsScript.energyRefillTime7.ToString());
        remainingCurr = new TimeSpan(00,15,00);
    }
}


function energyRefillTime6Func (){
    if (CoinsScript.energyRefillTime6 > DateTime.Now){
        remaining6 = CoinsScript.energyRefillTime6.Subtract(DateTime.Now);
        if (remainingCurr > remaining6){remainingCurr = remaining6;}
        //countdownTimerText = String.Format("{0:D2}:{1:D2}", remaining.Minutes, remaining.Seconds);
        return;
    }
    else { PlayerPrefs.SetInt("Lives", PlayerPrefs.GetInt("Lives") + 1);
        CoinsScript.energyRefillTime6 = DateTime.Parse("1/1/0001 00:00:00 AM");
        PlayerPrefs.SetString("energyRefillTime6", CoinsScript.energyRefillTime6.ToString());
        remainingCurr = new TimeSpan(00,15,00);
    }
}

function energyRefillTime5Func (){
    if (CoinsScript.energyRefillTime5 > DateTime.Now){
        remaining5 = CoinsScript.energyRefillTime5.Subtract(DateTime.Now);
        if (remainingCurr > remaining5){remainingCurr = remaining5;}
        //countdownTimerText = String.Format("{0:D2}:{1:D2}", remaining.Minutes, remaining.Seconds);
        return;
    }
    else { PlayerPrefs.SetInt("Lives", PlayerPrefs.GetInt("Lives") + 1);
        CoinsScript.energyRefillTime5 = DateTime.Parse("1/1/0001 00:00:00 AM");
        PlayerPrefs.SetString("energyRefillTime5", CoinsScript.energyRefillTime5.ToString());
        remainingCurr = new TimeSpan(00,15,00);
    }
    
}

function energyRefillTime4Func (){
    if (CoinsScript.energyRefillTime4 > DateTime.Now){
        remaining4 = CoinsScript.energyRefillTime4.Subtract(DateTime.Now);
        if (remainingCurr > remaining4){remainingCurr = remaining4;}
        //countdownTimerText = String.Format("{0:D2}:{1:D2}", remaining.Minutes, remaining.Seconds);
        return;
    }
    else { PlayerPrefs.SetInt("Lives", PlayerPrefs.GetInt("Lives") + 1);
        CoinsScript.energyRefillTime4 = DateTime.Parse("1/1/0001 00:00:00 AM");
        PlayerPrefs.SetString("energyRefillTime4", CoinsScript.energyRefillTime4.ToString());
        remainingCurr = new TimeSpan(00,15,00);
    }
    
}


function energyRefillTime3Func (){
        if (CoinsScript.energyRefillTime3 > DateTime.Now){
            remaining3 = CoinsScript.energyRefillTime3.Subtract(DateTime.Now);
            if (remainingCurr > remaining3){remainingCurr = remaining3;}
            //countdownTimerText = String.Format("{0:D2}:{1:D2}", remaining.Minutes, remaining.Seconds);
            return;
        }
        else { PlayerPrefs.SetInt("Lives", PlayerPrefs.GetInt("Lives") + 1);
            CoinsScript.energyRefillTime3 = DateTime.Parse("1/1/0001 00:00:00 AM");
            PlayerPrefs.SetString("energyRefillTime3", CoinsScript.energyRefillTime3.ToString());
            remainingCurr = new TimeSpan(00,15,00);
        }
    }


    function energyRefillTime2Func (){
        if (CoinsScript.energyRefillTime2 > DateTime.Now){
            remaining2 = CoinsScript.energyRefillTime2.Subtract(DateTime.Now);
            if (remainingCurr > remaining2){remainingCurr = remaining2;}
            //countdownTimerText = String.Format("{0:D2}:{1:D2}", remaining.Minutes, remaining.Seconds);
            return;
        }
        else { PlayerPrefs.SetInt("Lives", PlayerPrefs.GetInt("Lives") + 1);
            CoinsScript.energyRefillTime2 = DateTime.Parse("1/1/0001 00:00:00 AM");
            PlayerPrefs.SetString("energyRefillTime2", CoinsScript.energyRefillTime2.ToString());
            remainingCurr =  new TimeSpan(00,15,00);
        }
    }

    function energyRefillTime1Func (){
        if (CoinsScript.energyRefillTime1 > DateTime.Now){
            remaining1 = CoinsScript.energyRefillTime1.Subtract(DateTime.Now);
            if (remainingCurr > remaining1){remainingCurr = remaining1;}
            //countdownTimerText = String.Format("{0:D2}:{1:D2}", remaining.Minutes, remaining.Seconds);
            return;
        }
        else { PlayerPrefs.SetInt("Lives", PlayerPrefs.GetInt("Lives") + 1);
            CoinsScript.energyRefillTime1 = DateTime.Parse("1/1/0001 00:00:00 AM");
            PlayerPrefs.SetString("energyRefillTime1", CoinsScript.energyRefillTime1.ToString());
            remainingCurr = new TimeSpan(00,15,00);
        }
    
    }

    function energyRefillTime0Func (){
        if (CoinsScript.energyRefillTime0 > DateTime.Now){
            remaining0 = CoinsScript.energyRefillTime0.Subtract(DateTime.Now);
            if (remainingCurr > remaining0){remainingCurr = remaining0;}
            //countdownTimerText = String.Format("{0:D2}:{1:D2}", remaining.Minutes, remaining.Seconds);
            return;
        }
        else { PlayerPrefs.SetInt("Lives", PlayerPrefs.GetInt("Lives") + 1);
            CoinsScript.energyRefillTime0 = DateTime.Parse("1/1/0001 00:00:00 AM");
            PlayerPrefs.SetString("energyRefillTime0", CoinsScript.energyRefillTime0.ToString());
            remainingCurr = new TimeSpan(00,15,00);
        }
    
    }

    */