#pragma strict

public var starRequired : int;

function Start () {
    var i : int = 0;
    for (var a : int = 2; a < 500; a++){
            var j = PlayerPrefs.GetInt("Star"+a);
                i = j + i;
    }
starRequired = i;
    if (starRequired == 75){
        if (PlayerPrefs.HasKey("Paid")){
            if (i >= starRequired) {
                this.gameObject.SetActive(false);
            }
        }
    }
    else {
        if (i >= starRequired) {
            this.gameObject.SetActive(false);
        }
    }
    
}
