#pragma strict

function Start () {

}

function Update () {

}

public function ActivateSpriteOfParent () {

    var i = PlayerPrefs.GetInt("ActivateLevel");
    
    var go = GameObject.FindGameObjectWithTag("LevelsPlaceHolder");
    var tChildrens = go.gameObject.GetComponentsInChildren.<Transform>(true);
    for (var b = 0; b < tChildrens.Length; b++){
        if (tChildrens[b].gameObject.name == i.ToString()){
            tChildrens[b].gameObject.SetActive(true);
            var anim : Animator = tChildrens[b].gameObject.GetComponent("Animator");
            anim.enabled = true;
            Destroy(this.gameObject);
        }
    }
}