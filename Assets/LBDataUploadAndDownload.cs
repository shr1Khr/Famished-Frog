using UnityEngine;
using System.Collections;
using System.Threading;

public class LBDataUploadAndDownload : MonoBehaviour {

	#region Public data
    public float timeWaiting = 5.0f;
    public string labelInitialText = "I`m the console here!";
    #endregion
   
    #region Private data
    private string _label;
    private Thread _t1;
    private Thread _t2;
    private bool _t1Paused = false;
    private bool _t2Paused = false;
    #endregion
   
    #region Start
    void Start () {
        _label = labelInitialText;
        _t1 = new Thread(_func1);
        _t2 = new Thread(_func2);
    }
    #endregion
   
    #region Threads
    private void _func1()
    {
        if(_label == labelInitialText)
            _label = "";
        while(true)
        {
            _label += 1; Debug.Log("Function 1");
            for(int i = 0; i < timeWaiting; i ++)
                while(_t1Paused){ Debug.Log("Function 3"); }
        }
    }

      
    private void _func2()
    {
        if(_label == labelInitialText)
            _label = "";
        while(true)
        {
            _label += 2; Debug.Log("Function 2");
            for (int i = 0; i < timeWaiting; i ++)
                while(_t2Paused){ Debug.Log("Function 4"); }
        }
    }
    #endregion
   
    #region OnGUI
    void OnGUI()
    {
        //--> Label that servers as a "console"
        GUI.Label(new Rect(0,0, 500, 500), _label);
       
        //--> Button for thread 1
        if(GUI.Button(new Rect(50, 50, 100, 50), "Thread T1"))
        {
            if(!_t1.IsAlive)
                _t1.Start();
            else
                _t1Paused = !_t1Paused;
           
        }
       
        //--> Button for thread 2
        if(GUI.Button(new Rect(50, 120, 100, 50), "Thread T2"))
        {
            if(!_t2.IsAlive)
                _t2.Start();
            else
                _t2Paused = !_t2Paused;
        }
    }
    #endregion







}


