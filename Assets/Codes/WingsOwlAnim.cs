using UnityEngine;
using System.Collections;

public class WingsOwlAnim : MonoBehaviour {
    
    private int flag = 1 ;

    public GameObject wing1;
    public GameObject wing2;
    public GameObject wing3;
    public GameObject wing4;

    // Use this for initialization
    void Start () {
        
            
    }


    void Update() {

          if (flag == 1) {
        StartCoroutine(Animm());
           }



    }

    

   
    IEnumerator Animm() {
        Debug.Log(flag);
        flag = 0;
        yield return new  WaitForSeconds(0.1f);
        wing1.SetActive(false);
        wing2.SetActive(true);

        yield return new WaitForSeconds(0.1f);
        wing2.SetActive(false);
        wing3.SetActive(true);

        yield return new WaitForSeconds(0.1f);
        wing3.SetActive(false);
        wing4.SetActive(true);

        yield return new WaitForSeconds(0.1f);
        wing4.SetActive(false);
        wing1.SetActive(true);
        flag = 1;
    }

   
    
}
