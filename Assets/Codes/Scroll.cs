using UnityEngine;
using System.Collections;

public class Scroll : MonoBehaviour {

	public float speed = 0.03f;

	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
		Vector2 off = new Vector2 (0, Time.time * speed);
		GetComponent<Renderer> ().material.mainTextureOffset = off;
	}
}
