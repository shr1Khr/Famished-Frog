using UnityEngine;
using System.Collections;

public class PoofAnim : MonoBehaviour
{

    public GameObject wing1;
    public GameObject wing2;
    public GameObject wing3;
    public GameObject wing4;
    public GameObject wing5;


    void Start()
    { 
            StartCoroutine(Animm());

    }


    IEnumerator Animm()
    {       
        yield return new WaitForSeconds(0.1f);
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
        wing5.SetActive(true);

        yield return new WaitForSeconds(0.1f);
        wing5.SetActive(false);
    }



}
