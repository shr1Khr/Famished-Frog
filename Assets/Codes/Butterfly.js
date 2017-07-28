#pragma strict


//TouchToSinkLeaves.move == 1 // put some value so that I can hault the game, also do this later for UI panels so as to precent the sinking of leaves when game is ON

// TouchToSinkLeaves.move -> values used are 10, 11, 12, 13

private var selecCater : GameObject;
private var selecLeaf  : GameObject;

private var TargetGO : GameObject;
private var leafOfTarget : int;

private var TargetGO2: GameObject;
private var leafOfTarget2 : int;

private var TargetGO3: GameObject;
private var leafOfTarget3 : int;

private var TargetGO4: GameObject;
private var leafOfTarget4 : int;

private var TargetGO5: GameObject;
private var leafOfTarget5 : int;

private var Tarleaf : GameObject; // this is phase 2 target leaf - TO move leaf

private var Frog1: GameObject;
private var leafOfFrog1 : int;

private var Frog2: GameObject;
private var leafOfFrog2 : int;

private var Frog3: GameObject;
private var leafOfFrog3 : int;

private var phase2 : int; // which phase is going on ?
private var CatNo : int; // which caterpillar was selected
private var starty : float;
private var tar : GameObject;
private var mainControll : int;


function Start () {
    mainControll = 1;
    tar = GameObject.FindWithTag("Target");
}


function atStart(){

	Debug.Log("here in atStart");
	TouchToSinkLeaves.move = 10; // get the control of the game
	phase2 = 0;
	CatNo = 0;
	starty = tar.transform.position.y;

	TargetGO = GameObject.FindGameObjectWithTag("Target");
	if (TargetGO != null){
	var hit = Physics2D.Raycast ((TargetGO.transform.position), Vector2.zero);
		if(hit.collider != null){
		leafOfTarget = parseInt(hit.collider.gameObject.name);
		}}

	TargetGO2 = GameObject.FindGameObjectWithTag("Target2");
	if (TargetGO2 != null){
	hit = Physics2D.Raycast ((TargetGO2.transform.position), Vector2.zero);
		if(hit.collider != null){
		leafOfTarget2 = parseInt(hit.collider.gameObject.name);
		}}

	TargetGO3 = GameObject.FindGameObjectWithTag("Target3");
	if (TargetGO3 != null){
	    hit = Physics2D.Raycast ((TargetGO3.transform.position), Vector2.zero);
	    if(hit.collider != null){
	        leafOfTarget3 = parseInt(hit.collider.gameObject.name);
	        Debug.Log("yeah fine 3");
	    }}
    
	TargetGO4 = GameObject.FindGameObjectWithTag("Target4");
	if (TargetGO4 != null){
	    hit = Physics2D.Raycast ((TargetGO4.transform.position), Vector2.zero);
	    if(hit.collider != null){
	        leafOfTarget4 = parseInt(hit.collider.gameObject.name);
	        Debug.Log("yeah fine 4");
	    }}

	TargetGO5 = GameObject.FindGameObjectWithTag("Target5");
	if (TargetGO5 != null){
	    hit = Physics2D.Raycast ((TargetGO5.transform.position), Vector2.zero);
	    if(hit.collider != null){
	        leafOfTarget5 = parseInt(hit.collider.gameObject.name);
	    }}


    // find frog leaves
	Frog1 = GameObject.FindGameObjectWithTag("Frog");
	if (Frog1 != null){
	    hit = Physics2D.Raycast ((Frog1.transform.position), Vector2.zero);
	    if(hit.collider != null){
	        leafOfFrog1 = parseInt(hit.collider.gameObject.name);
	    }}

	Frog2 = GameObject.FindGameObjectWithTag("Frog2");
	if (Frog2 != null){
	    hit = Physics2D.Raycast ((Frog2.transform.position), Vector2.zero);
	    if(hit.collider != null){
	        leafOfFrog2 = parseInt(hit.collider.gameObject.name);
	    }}

	Frog3 = GameObject.FindGameObjectWithTag("Frog3");
	if (Frog3 != null){
	    hit = Physics2D.Raycast ((Frog3.transform.position), Vector2.zero);
	    if(hit.collider != null){
	        leafOfFrog3 = parseInt(hit.collider.gameObject.name);
	    }}


		var mc = GameObject.Find("Main Camera");
		var TselecCater = mc.gameObject.transform.Find("Canvas/ClickCaterpillar");
		var TselecLeaf = mc.gameObject.transform.Find("Canvas/ClickTargetLeaf");
		selecCater = TselecCater.transform.gameObject;
		selecLeaf = TselecLeaf.transform.gameObject;


	selecCater.SetActive(true);

}


function Update () {

if (mainControll == 1){
atStart();
Debug.Log("begin Batman");
mainControll = 2;
}

if (phase2 == 0){phase0func();}

if (phase2 == 1){ // now get target position
	phase2function();
}

}

function phase0func(){

    var hit : RaycastHit2D;

#if UNITY_ANDROID
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
		if (TouchToSinkLeaves.move == 10){
		    if(hit.collider.gameObject.tag == "Untagged" || hit.collider.gameObject.tag == "Rock" ){
				 if(parseInt(hit.collider.gameObject.name) == leafOfTarget){
				     // we found the stuff for target 1
				        Debug.Log("stuff for target 1");
				        selecCater.SetActive(false);
						selecLeaf.SetActive(true);
						phase2 = 1;
						CatNo = 1;
					}
				
					if (TargetGO2 != null & phase2 == 0){
						 if(parseInt(hit.collider.gameObject.name) == leafOfTarget2){
						 // we found the stuff for target 2
						 Debug.Log("stuff for target 2");
						 selecCater.SetActive(false);
						 selecLeaf.SetActive(true);
						 phase2 = 1;
						 CatNo = 2;
						}
					}
                    
					if (TargetGO3 != null & phase2 == 0){
					    if(parseInt(hit.collider.gameObject.name) == leafOfTarget3){
					        // we found the stuff for target 3
					        Debug.Log("stuff for target 3");
					        selecCater.SetActive(false);
					        selecLeaf.SetActive(true);
					        phase2 = 1;
					        CatNo = 3;
					    }
					}

					if (TargetGO4 != null & phase2 == 0){
					    if(parseInt(hit.collider.gameObject.name) == leafOfTarget4){
					        // we found the stuff for target 4
					        Debug.Log("stuff for target 4");
					        selecCater.SetActive(false);
					        selecLeaf.SetActive(true);
					        phase2 = 1;
					        CatNo = 4;
					    }
					}

					if (TargetGO5 != null & phase2 == 0){
					    if(parseInt(hit.collider.gameObject.name) == leafOfTarget5){
					        // we found the stuff for target 5
                           
					        selecCater.SetActive(false);
					        selecLeaf.SetActive(true);
					        phase2 = 1;
					        CatNo = 5;
					    }
					}

				}
			}
	    }
}

function phase2function(){  // this is 2nd phase -  here we detect the target leaf
//Debug.Log("TargetGO "+TargetGO);
yield WaitForSeconds(0.5);
var ST = 0.1;
var velo = Vector3.zero;

if (TouchToSinkLeaves.move == 10){

    var hit : RaycastHit2D;

#if UNITY_WEBGL
        if (Input.touchCount > 0 && Input.GetTouch(0).phase == TouchPhase.Began){
            hit = Physics2D.Raycast (Camera.main.ScreenToWorldPoint((Input.GetTouch (0).position)), Vector2.zero);}
#endif

#if UNITY_ANDROID
    if (Input.touchCount > 0 && Input.GetTouch(0).phase == TouchPhase.Began){
         hit = Physics2D.Raycast (Camera.main.ScreenToWorldPoint((Input.GetTouch (0).position)), Vector2.zero);}
#endif

#if UNITY_EDITOR
    if (Input.GetMouseButtonDown(0)){
        hit = Physics2D.Raycast (Camera.main.ScreenToWorldPoint((Input.mousePosition)), Vector2.zero);}
#endif

        if(hit.collider != null){
            if(hit.collider.gameObject.tag == "Untagged"){
                if((parseInt(hit.collider.gameObject.name) != leafOfTarget)&&(parseInt(hit.collider.gameObject.name) != leafOfFrog1)){
                    if (TargetGO2 != null){
                        if(parseInt(hit.collider.gameObject.name) != leafOfTarget2){
                            if (Frog2 !=  null){
                                if(parseInt(hit.collider.gameObject.name) != leafOfFrog2){
                                    if (Frog3 !=  null){
                                        if(parseInt(hit.collider.gameObject.name) != leafOfFrog3){
                                            //We found a good leaf for 2 target Scenario
                                            Tarleaf = GameObject.Find(hit.collider.gameObject.name);
                                            Debug.Log("Leaf Name 2 "+Tarleaf);
                                            TouchToSinkLeaves.move = 11;
                                        }
                                    }
                                    else { // this is else of frog3
                                        //We found a good leaf for 2 target Scenario
                                        Tarleaf = GameObject.Find(hit.collider.gameObject.name);
                                        Debug.Log("Leaf Name 2 "+Tarleaf);
                                        TouchToSinkLeaves.move = 11;
                                    }
                                }
                            }
                            else{ // this is else of frog2
                                //We found a good leaf for 2 target Scenario
                                Tarleaf = GameObject.Find(hit.collider.gameObject.name);
                                Debug.Log("Leaf Name 2 "+Tarleaf);
                                TouchToSinkLeaves.move = 11;
                            }
                        }
                    }
                    else { // this is else of TargetGO2
                        // we found a leaf for single Cat scenario
                        Tarleaf = GameObject.Find(hit.collider.gameObject.name);
                        Debug.Log("Leaf Name 1 "+Tarleaf);
                        TouchToSinkLeaves.move = 11;
                    }
                    }
                    else {
                        selecLeaf.SetActive(true);
                        Debug.Log("Did it vame here? "+TargetGO2);
                    }
                }
            }
        
    

}

if (TouchToSinkLeaves.move == 11){
	if (CatNo == 1){
	transform.position = Vector3.SmoothDamp(transform.position, Vector3(TargetGO.transform.position.x, TargetGO.transform.position.y, transform.position.z), velo, ST);
	if (transform.position.y < (TargetGO.transform.position.y + 0.2)){
		TouchToSinkLeaves.move = 12;
		}
	}
	else if (CatNo == 2){
	transform.position = Vector3.SmoothDamp(transform.position, Vector3(TargetGO2.transform.position.x, TargetGO2.transform.position.y, transform.position.z), velo, ST);
	if (transform.position.y < (TargetGO2.transform.position.y + 0.2)){
		TouchToSinkLeaves.move = 12;
		}
	}
	else if (CatNo == 3){
	transform.position = Vector3.SmoothDamp(transform.position, Vector3(TargetGO3.transform.position.x, TargetGO3.transform.position.y, transform.position.z), velo, ST);
	if (transform.position.y < (TargetGO3.transform.position.y + 0.2)){
		TouchToSinkLeaves.move = 12;
		}
	}
	else if (CatNo == 4){
	transform.position = Vector3.SmoothDamp(transform.position, Vector3(TargetGO4.transform.position.x, TargetGO4.transform.position.y, transform.position.z), velo, ST);
	if (transform.position.y < (TargetGO4.transform.position.y + 0.2)){
		TouchToSinkLeaves.move = 12;
		}
	}
	else if (CatNo == 5){
	transform.position = Vector3.SmoothDamp(transform.position, Vector3(TargetGO5.transform.position.x, TargetGO5.transform.position.y, transform.position.z), velo, ST);
	if (transform.position.y < (TargetGO5.transform.position.y + 0.2)){
		TouchToSinkLeaves.move = 12;
		}
	}

}

if (TouchToSinkLeaves.move == 12){
	if (CatNo == 1){
		
		TargetGO.transform.position = Vector3.SmoothDamp(TargetGO.transform.position, Vector3(Tarleaf.transform.position.x,Tarleaf.transform.position.y, TargetGO.transform.position.z), velo, 0.05);
		transform.position = Vector3.SmoothDamp(transform.position, Vector3(Tarleaf.transform.position.x,Tarleaf.transform.position.y, transform.position.z), velo, 0.05);
		if (Mathf.Approximately(TargetGO.transform.position.x,Tarleaf.transform.position.x )){
			TouchToSinkLeaves.move = 13;
			}
		}


	if (CatNo == 2){
		
		TargetGO2.transform.position = Vector3.SmoothDamp(TargetGO2.transform.position, Vector3(Tarleaf.transform.position.x,Tarleaf.transform.position.y, TargetGO2.transform.position.z), velo, 0.05);
		transform.position = Vector3.SmoothDamp(transform.position, Vector3(Tarleaf.transform.position.x,Tarleaf.transform.position.y, transform.position.z), velo, 0.05);
		if (Mathf.Approximately(TargetGO2.transform.position.x,Tarleaf.transform.position.x )){
			TouchToSinkLeaves.move = 13;
			}
		}

	if (CatNo == 3){
		
		TargetGO3.transform.position = Vector3.SmoothDamp(TargetGO3.transform.position, Vector3(Tarleaf.transform.position.x,Tarleaf.transform.position.y, TargetGO3.transform.position.z), velo, 0.05);
		transform.position = Vector3.SmoothDamp(transform.position, Vector3(Tarleaf.transform.position.x,Tarleaf.transform.position.y, transform.position.z), velo, 0.05);
		if (Mathf.Approximately(TargetGO3.transform.position.x,Tarleaf.transform.position.x )){
			TouchToSinkLeaves.move = 13;
			}
		}

	if (CatNo == 4){
		
		TargetGO4.transform.position = Vector3.SmoothDamp(TargetGO4.transform.position, Vector3(Tarleaf.transform.position.x,Tarleaf.transform.position.y, TargetGO4.transform.position.z), velo, 0.05);
		transform.position = Vector3.SmoothDamp(transform.position, Vector3(Tarleaf.transform.position.x,Tarleaf.transform.position.y, transform.position.z), velo, 0.05);
		if (Mathf.Approximately(TargetGO4.transform.position.x,Tarleaf.transform.position.x )){
			TouchToSinkLeaves.move = 13;
			}
		}

	if (CatNo == 5){
		
		TargetGO5.transform.position = Vector3.SmoothDamp(TargetGO5.transform.position, Vector3(Tarleaf.transform.position.x,Tarleaf.transform.position.y, TargetGO5.transform.position.z), velo, 0.05);
		transform.position = Vector3.SmoothDamp(transform.position, Vector3(Tarleaf.transform.position.x,Tarleaf.transform.position.y, transform.position.z), velo, 0.05);
		if (Mathf.Approximately(TargetGO5.transform.position.x,Tarleaf.transform.position.x )){
			TouchToSinkLeaves.move = 13;
			}
		}
	
	}

if (TouchToSinkLeaves.move == 13){
	transform.position.y = Mathf.SmoothDamp(transform.position.y, 5, velo.y, ST);
	yield WaitForSeconds(0.5);
	TouchToSinkLeaves.move = 0;
	Debug.Log("Done 1"); 
	mainControll = 1;
	//gameObject.SetActive(false);
	Destroy(this.gameObject);
}

}