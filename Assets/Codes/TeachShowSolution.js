#pragma strict

public var tap : GameObject;
public var solution : GameObject;
function Start () {
    PlayerPrefs.SetInt("Solution",PlayerPrefs.GetInt("Solution") + 1);
    tap.SetActive(true);
}

function Update () {
    if (solution.activeSelf){
        tap.SetActive(false);
        Destroy(this.gameObject);
    }

    var frog = GameObject.FindGameObjectWithTag("Frog");
    var hit = Physics2D.Raycast (( frog.gameObject.transform.position), Vector2.zero);
    if(hit.collider != null){ 
        if (parseInt(hit.collider.gameObject.name) != 73 ){
            tap.SetActive(false);
            Destroy(this.gameObject);
        }
    }
}