#pragma strict

public var MainGO : GameObject;

function Start () {

}

function Update () {

    if (TouchToSinkLeaves.move == 31){
        //Debug.Log("move4 "+move);
        reduceSize(GOToPass);
    }

}


private var GOToPass : GameObject;

public function sinkLeaves(){
   var hit = Physics2D.Raycast ((transform.position), Vector2.zero);
    if(hit.collider != null){
        Debug.Log("Sinking leaf name "+hit.collider.gameObject.name);
        reduceSize(hit.collider.gameObject);
        GOToPass = hit.collider.gameObject;
        playButtonClickAudio();

        TouchToSinkLeaves.move = 31;
    }

}



function reduceSize(go : GameObject){
    go.transform.localScale -= new Vector3(0.09F, 0.09F, 0);
    if (go.transform.localScale.x <= 0.2F){
        UndoScript.LeafGO.Push(go.name);
        go.SetActive(false);
        TouchToSinkLeaves.move = 1;
        //TouchToSinkLeaves.move = 0;
        Destroy(MainGO);
        Debug.Log("move5 "+TouchToSinkLeaves.move);
    }
}

    public var AS : AudioSource;

    function playButtonClickAudio(){
        if (PlayerPrefs.GetInt("BGMusic") == 1){
            AS.Play();
        }
    }