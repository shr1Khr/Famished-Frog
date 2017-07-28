#pragma strict


private var SoundOn : int;
public var act : GameObject;
public var deac : GameObject;
public var MainCanvas : GameObject;


function Start (){

    var AS = MainCanvas.GetComponent(AudioSource);

if (!PlayerPrefs.HasKey("BGMusic")){
	PlayerPrefs.SetInt("BGMusic", 1);
	SoundOn = 1;

	AS.Play();
	}
else {
	SoundOn = PlayerPrefs.GetInt("BGMusic");
	if (SoundOn == 1)	  { deac.SetActive(false); act.SetActive(true); AS.Play(); }
	else if (SoundOn == 0){ deac.SetActive(true); act.SetActive(false); AS.Stop(); }
	else if (SoundOn == 2){ AS.Pause();  }
	else if (SoundOn == 3){ AS.UnPause();PlayerPrefs.SetInt("BGMusic", 1);}
	}

/*
if (PlayerPrefs.HasKey("NoMusic")){
	if (PlayerPrefs.GetInt("NoMusic") == 1){
		SoundOn = 0;
		PlayerPrefs.SetInt("BGMusic", 0);
		}
	else if (PlayerPrefs.GetInt("NoMusic") == 0){
		SoundOn = 1;
		PlayerPrefs.SetInt("BGMusic", 1);
		}
	}
else {PlayerPrefs.SetInt("NoMusic", 0); PlayerPrefs.SetInt("BGMusic", 1); SoundOn = 1;}
*/
}



function ButtonToggle(){

    var AS = MainCanvas.GetComponent(AudioSource);

if (SoundOn == 1){		SoundOn = 0; deac.SetActive(true);PlayerPrefs.SetInt("BGMusic",SoundOn);  act.SetActive(false);  Debug.Log("SoundOn "+SoundOn);AS.Stop();}
else if (SoundOn == 0){ SoundOn = 1; act.SetActive(true); PlayerPrefs.SetInt("BGMusic",SoundOn);  deac.SetActive(false); Debug.Log("SoundOn "+SoundOn); AS.Play();}


}