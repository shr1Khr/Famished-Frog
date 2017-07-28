#pragma strict



public static var move    : int;

private var RockHint      : GameObject;
private var RockHintText  : Text;

private var GOToPass      : GameObject;

private var frogGO        : GameObject;
private var frogGO2       : GameObject;
private var frogGO3       : GameObject;

private var TargetGO      : GameObject;
private var TargetGO2     : GameObject;
private var TargetGO3     : GameObject;
private var TargetGO4     : GameObject;
private var TargetGO5     : GameObject;

private var leafOfFrog    : int;
private var leafOfFrog2   : int;
private var leafOfFrog3   : int;

private var leafOfTarget  : int;
private var leafOfTarget2 : int;
private var leafOfTarget3 : int;
private var leafOfTarget4 : int;
private var leafOfTarget5 : int;


function Start () {
    move = 0;
    var MC = GameObject.Find("Main Camera");
    var tRockHint = MC.gameObject.transform.Find("Canvas/RockHint");
    RockHint = tRockHint.transform.gameObject;
    RockHintText =  RockHint.GetComponentInChildren(UI.Text);
}



function SetValues (){

    
    frogGO = GameObject.FindGameObjectWithTag("Frog");
    var hit = Physics2D.Raycast ((frogGO.transform.position), Vector2.zero);
    if(hit.collider != null){
        leafOfFrog = parseInt(hit.collider.gameObject.name);
    }

    frogGO2 = GameObject.FindGameObjectWithTag("Frog2");
    if (frogGO2 != null){
        hit = Physics2D.Raycast ((frogGO2.transform.position), Vector2.zero);
        if(hit.collider != null){
            leafOfFrog2 = parseInt(hit.collider.gameObject.name);
        }
    }
    
    frogGO3 = GameObject.FindGameObjectWithTag("Frog3");
    if (frogGO3 != null){
        hit = Physics2D.Raycast ((frogGO3.transform.position), Vector2.zero);
        if(hit.collider != null){
            leafOfFrog3 = parseInt(hit.collider.gameObject.name);
        }
    }

    //Debug.Log(leafOfFrog2+" &&&& "+leafOfFrog3);

    TargetGO = GameObject.FindGameObjectWithTag("Target");
    if (TargetGO != null){
        hit = Physics2D.Raycast ((TargetGO.transform.position), Vector2.zero);
        if(hit.collider != null){
            leafOfTarget = parseInt(hit.collider.gameObject.name);
        }      
    }

    TargetGO2 = GameObject.FindGameObjectWithTag("Target2");
    if (TargetGO2 != null){
        hit = Physics2D.Raycast ((TargetGO2.transform.position), Vector2.zero);
        if(hit.collider != null){
            leafOfTarget2 = parseInt(hit.collider.gameObject.name);
        }
    }

    TargetGO3 = GameObject.FindGameObjectWithTag("Target3");
    if (TargetGO3 != null){
        hit = Physics2D.Raycast ((TargetGO3.transform.position), Vector2.zero);
        if(hit.collider != null){
            leafOfTarget3 = parseInt(hit.collider.gameObject.name);
        }
    }

    TargetGO4 = GameObject.FindGameObjectWithTag("Target4");
    if (TargetGO4 != null){
        hit = Physics2D.Raycast ((TargetGO4.transform.position), Vector2.zero);
        if(hit.collider != null){
            leafOfTarget4 = parseInt(hit.collider.gameObject.name);
        }
    }

    TargetGO5 = GameObject.FindGameObjectWithTag("Target5");
    if (TargetGO5 != null){
        hit = Physics2D.Raycast ((TargetGO5.transform.position), Vector2.zero);
        if(hit.collider != null){
            leafOfTarget5 = parseInt(hit.collider.gameObject.name);
        }
    }
}


function Update () {
    if (Time.timeScale == 1){
        if (TheLogic.win == 0){

            var hit : RaycastHit2D;

    #if UNITY_ANDROID || UNITY_WEBGL
        if (Input.touchCount > 0 && Input.GetTouch(0).phase == TouchPhase.Began){
             hit = Physics2D.Raycast (Camera.main.ScreenToWorldPoint((Input.GetTouch (0).position)), Vector2.zero);}
    #endif

    #if UNITY_EDITOR
        if (Input.GetMouseButtonDown(0)){
          hit = Physics2D.Raycast (Camera.main.ScreenToWorldPoint((Input.mousePosition)), Vector2.zero);}
    #endif

    #if UNITY_WEBGL
        if (Input.touchCount > 0 && Input.GetTouch(0).phase == TouchPhase.Began){
             hit = Physics2D.Raycast (Camera.main.ScreenToWorldPoint((Input.GetTouch (0).position)), Vector2.zero);}
    #endif

        if(hit.collider != null){
            if (move == 0){
                if(hit.collider.gameObject.tag == "Untagged"){
                    SetValues();
                    if ((parseInt(hit.collider.gameObject.name) != leafOfFrog)&&(parseInt(hit.collider.gameObject.name) != leafOfTarget)){
                        if (TargetGO2 != null){
                            if (parseInt(hit.collider.gameObject.name) != leafOfTarget2){
                                if (TargetGO3 != null){
                                    if (parseInt(hit.collider.gameObject.name) != leafOfTarget3){
                                        if (TargetGO4 != null){
                                            if (parseInt(hit.collider.gameObject.name) != leafOfTarget4){
                                                if (TargetGO5 != null){
                                                    if (parseInt(hit.collider.gameObject.name) != leafOfTarget5){
                                                        GOToPass = hit.collider.gameObject;
                                                        move = 3;
                                                    } // end if of lt5
                                                } // end if t5 not null
                                                else{
                                                    GOToPass = hit.collider.gameObject;
                                                    move = 3;
                                                }
                                            } // end if of lt4
                                        } // end if t4 not null
                                        else{
                                            GOToPass = hit.collider.gameObject;
                                            move = 3;
                                        }
                                    } // end if of lt3
                                } // end if t3 not null
                                else{
                                    GOToPass = hit.collider.gameObject;
                                    move = 3;
                                }
                            }
                        }
                        else {
                            // Debug.Log("Is it coming Here?");
                            GOToPass = hit.collider.gameObject;
                            move = 3;
                        }
                    }
                }
                else if (hit.collider.gameObject.tag == "Rock"){RockHintText.text = "You cannot sink Rocks..."; RockHint.SetActive(true);}
                else if (hit.collider.gameObject.tag == "Frozen"){RockHintText.text = "You cannot sink Frozen Leaf..."; RockHint.SetActive(true);}
                else if (hit.collider.gameObject.tag == "StarLeaf"){RockHintText.text = "You should NOT sink STAR Leaf..."; RockHint.SetActive(true);}

            }
        }


        if (move == 3){
            if (frogGO2 != null){           
                if (parseInt(GOToPass.name) != leafOfFrog2){
                    if (frogGO3 != null){
                        if (parseInt(GOToPass.name) != leafOfFrog3){
                            move = 4; PlayerPrefs.SetInt("CurrScore "+Application.loadedLevel, PlayerPrefs.GetInt("CurrScore "+Application.loadedLevel)+100);
                            
                        }
                        else{move = 0;}
                    }
                    else{
                        move = 4; PlayerPrefs.SetInt("CurrScore "+Application.loadedLevel, PlayerPrefs.GetInt("CurrScore "+Application.loadedLevel)+100);
                    }
                }
                else{move = 0;}
            }
            else{
                move = 4; PlayerPrefs.SetInt("CurrScore "+Application.loadedLevel, PlayerPrefs.GetInt("CurrScore "+Application.loadedLevel)+100);
            }
        } // end - if move == 3


            if (move == 4){
                playButtonClickAudio();
                reduceSize(GOToPass);
            }

        }// end - if Logic.win == 0
    }
}


function reduceSize(go : GameObject){
    PlayerPrefs.SetInt("LastLeafSunkInt", parseInt(go.name)); //<-- only used in SnowDirController as of now for a bug
	go.transform.localScale -= new Vector3(0.09F, 0.09F, 0);
	if (go.transform.localScale.x <= 0.2F){
	    UndoScript.LeafGO.Push(go.name);
	    go.SetActive(false);
	    ShowPoints(go);
		move = 1;
	//	AI.ClickedLeaf(go);
		//Debug.Log("move5 "+move);
	}
}

public var AS : AudioSource;

function playButtonClickAudio(){
if (PlayerPrefs.GetInt("BGMusic") == 1){
AS.Play();
	}
}


function ShowPoints (go : GameObject) {
    var t100 = this.gameObject.transform.Find("Points100");
    if (t100 != null){
    var points100 = t100.transform.gameObject;
    points100.transform.position = go.transform.position; 
    points100.SetActive(true);
    }
else {
        Debug.Log("Attach points prefab to lilypad !");
    }
}