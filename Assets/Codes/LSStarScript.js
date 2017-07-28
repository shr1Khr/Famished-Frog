#pragma strict

public var star3 : GameObject;
public var star2 : GameObject;
public var star1 : GameObject;

function Start () {
    SetStar();
}

function Update () {

}

function SetStar () {

    var tChildrens = this.gameObject.GetComponentsInChildren.<Transform>(true);
    for (var a : int = 1; a < tChildrens.Length; a++) {
        if (tChildrens[a].gameObject.name != "Text" && tChildrens[a].gameObject.name != "Lock") {
            var c = parseInt(tChildrens[a].gameObject.name);
            var i = PlayerPrefs.GetInt("Star"+(c+1));
            if ( i == 0 ) { ;}
            if ( i == 1 ) { var star11 : GameObject; 
                            star11 = Instantiate(star1, Vector3(0,0,0), Quaternion.identity);
                            star11.transform.SetParent(tChildrens[a].gameObject.transform, false);}
            if ( i == 2 ) { var star22 : GameObject; 
                            star22 = Instantiate(star2, Vector3(0,0,0), Quaternion.identity);
                            star22.transform.SetParent(tChildrens[a].gameObject.transform, false);}
            if ( i == 3 ) { var star33 : GameObject; 
                            star33 = Instantiate(star3, Vector3(0,0,0), Quaternion.identity);
                            star33.transform.SetParent(tChildrens[a].gameObject.transform, false);}
        }
    }
}