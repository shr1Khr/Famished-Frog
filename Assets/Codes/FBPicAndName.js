#pragma strict
import System.IO;
import System;
import System.Text;


var Pic  : UI.Image;
var Text : UI.Text;


function Update () {

    if (PlayerPrefs.GetInt("ImageYes") == 1){loadImage();}
    if (PlayerPrefs.GetInt("ProfName") == 1){loadText(); }
	
}


function loadImage(){
    
// Load PNG Image from default location
    if (PlayerPrefs.GetInt ("ImageYes") == 1){
        var bytee : byte[];
        Debug.Log("Load Image");
        bytee = Convert.FromBase64String(PlayerPrefs.GetString("Pic"));
        //Debug.Log(PlayerPrefs.GetString("Pic"));
	    var tex : Texture2D  = new Texture2D(128, 128);
	    if (bytee == null ){Debug.Log("fart ");}
	    tex.LoadImage(bytee);
	    Pic.sprite = Sprite.Create (tex, new Rect(0,0,128,128), new Vector2());
	    PlayerPrefs.SetInt("ImageYes",2);
	    Debug.Log("load image succss");
	}
   
}

function loadText(){

    Text.text = "Hi, "+PlayerPrefs.GetString("Name");
}