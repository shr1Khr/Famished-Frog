using UnityEngine;
using System.Collections;
using System.Collections.Generic;
//using Facebook.Unity;
using UnityEngine.UI;
using System.Collections;
using System.IO;
using System.Text;
using System;
//using Facebook.MiniJSON;
using MySql.Data.MySqlClient;

public class FBAgainSingleScript : MonoBehaviour
{
    /*
    private Boolean Internet = false;
    public GameObject ShowLoginBut;
    public GameObject LoggedInMenu;
    public GameObject FBLoginCoinsPanel;
    public GameObject CoinsBannerFBLogin;
    public Text ProfName;
    public string[] friendsFBID;
    public string[] friendsName;
    // public Image ProfPic;

    void Awake()
    {
        //Debug.Log("2 Awake Fn");
        if (!FB.IsInitialized)
        {
            // Initialize the Facebook SDK
            FB.Init(InitCallback, OnHideUnity);
        }
        else {
            // Already initialized, signal an app activation App Event
            FB.ActivateApp();
            Debug.Log("ActivateApp");
        }

        //StartCoroutine(FetchMyDefaultScores());

        StartCoroutine(CheckConnectionToMasterServer()); //Debug.Log(Internet);
        
    }

    private IEnumerator CheckConnectionToMasterServer()
    {
        Ping pingMasterServer = new Ping("79.170.44.98");
        Debug.Log(pingMasterServer.ip);
        float startTime = Time.time;
        while (!pingMasterServer.isDone && Time.time < startTime + 5.0f)
        {
            yield return new WaitForSeconds(0.1f);
        }
        if (pingMasterServer.isDone)
        {
            Internet = true;
            StartCoroutine(FetchMyDefaultScores());
        }
        else {
            Internet = false;
        }
    }


    void Update()
    {
        LogInBut();

        if (CoinsBannerFBLogin.activeSelf) {
            if (PlayerPrefs.GetInt("GiveFirst10CoinsForFBLogin") == 1) { CoinsBannerFBLogin.SetActive(false); } }
    }

    private void InitCallback()
    {
        if (FB.IsInitialized)
        {
            // Signal an app activation App Event
            FB.ActivateApp();
            // Debug.Log("ActivateApp");
            // Continue with Facebook SDK
            // ...

            // show or hide login / logout buttons
            if ((FB.IsLoggedIn)&& (PlayerPrefs.GetString("Name") != ""))
            {
                LoggedInMenu.SetActive(true);
                ShowLoginBut.SetActive(false);
            }
            else {
                LoggedInMenu.SetActive(false);
                ShowLoginBut.SetActive(true);   

            }

        }
        else {
            Debug.Log("Failed to Initialize the Facebook SDK");
        }
    }

    private void OnHideUnity(bool isGameShown)  // No idea what it does, but it came with Init
    {
        if (!isGameShown)
        {
            // Pause the game - we will need to hide
            Debug.Log("7");
            Time.timeScale = 0;
        }
        else {
            // Resume the game - we're getting focus again
            Time.timeScale = 1;
            Debug.Log("8");
        }
    }

    private void LogInBut()
    {
        // show or hide login / logout buttons
        if (FB.IsLoggedIn && PlayerPrefs.GetString("Name") != "")
        {
            LoggedInMenu.SetActive(true);
            ShowLoginBut.SetActive(false);

        }
        else {
            LoggedInMenu.SetActive(false);
            ShowLoginBut.SetActive(true);
        }

    }

    public void loginFB()
    {
        // this is to log in
        FB.LogInWithReadPermissions(
        new List<string>() { "public_profile", "email", "user_friends" },
        AuthCallback);        
    }

    private void AuthCallback(ILoginResult result)
    {
        if (FB.IsLoggedIn)
        {
            StartCoroutine(GetAllUserData(FB.IsLoggedIn));
            //dealWithFBMenus(FB.IsLoggedIn);
            // AccessToken class will have session details

            var aToken = Facebook.Unity.AccessToken.CurrentAccessToken;
            // Print current access token's User ID
            //Debug.Log(aToken.UserId);
            // Print current access token's granted permissions
            foreach (string perm in aToken.Permissions)
            {
                //Debug.Log(perm); 
            }
            
        }
        else {
            Debug.Log("User cancelled login"); 
        }
    }

    IEnumerator GetAllUserData(bool isLoggedin) // this is same as dealWithFBMenus, but i'm making it run on a seprate thread
    {
        bool workDone = false;  // copied from here http://gamedev.stackexchange.com/questions/113096/how-to-not-freeze-the-main-thread-in-unity
        
        if (isLoggedin)
        {
           // Debug.Log("Fart 1");
            while (!workDone) {
                //Debug.Log("Poop 1");
                // Debug.Log("here in deal with FB menus");
                FB.API("/me?fields=first_name", HttpMethod.GET, NameFunct);
                FB.API("/me/picture?type=square&height=128&width=128", HttpMethod.GET, ProfPicFunct);
                FB.API("/me?fields=friends.limit(10).fields(first_name,id)", HttpMethod.GET, FriendsFunct);
                
                if (PlayerPrefs.GetInt("GiveFirst10CoinsForFBLogin") == 0)
                {
                    PlayerPrefs.SetInt("Coins", PlayerPrefs.GetInt("Coins") + 10);
                    PlayerPrefs.SetInt("GiveFirst10CoinsForFBLogin", 1);
                    FBLoginCoinsPanel.SetActive(true);
                }
                workDone = true;
            }
        }
        yield return null;
    }
    
    private void dealWithFBMenus(bool isLoggedin) // Not using now
    {
       // Debug.Log("isLoggedin # 1" + isLoggedin);
        if (isLoggedin) {
           // Debug.Log("here in deal with FB menus");
            FB.API("/me?fields=first_name", HttpMethod.GET, NameFunct);
            FB.API("/me/picture?type=square&height=128&width=128", HttpMethod.GET, ProfPicFunct);
            FB.API("/me?fields=friends.limit(10).fields(first_name,id)", HttpMethod.GET, FriendsFunct);

            if (PlayerPrefs.GetInt("GiveFirst10CoinsForFBLogin") == 0)
            {
                PlayerPrefs.SetInt("Coins", PlayerPrefs.GetInt("Coins") + 10);
                PlayerPrefs.SetInt("GiveFirst10CoinsForFBLogin", 1);
                FBLoginCoinsPanel.SetActive(true);
            }
        }

    }

    // THis was commented for WEBGL

    /* private void NameFunct(IGraphResult result) {
         if (result.ResultDictionary != null) {
             ProfName.text = "Hi, " + result.ResultDictionary["first_name"].ToString();
             PlayerPrefs.SetString("Name", ProfName.text);
             PlayerPrefs.SetInt("ProfName", 1);

             foreach (string key in result.ResultDictionary.Keys)
             {
                 if (key == "id") {
                     var i = result.ResultDictionary[key].ToString();
                     PlayerPrefs.SetString("FBID", i);
                 }
                 // first_name : Chris
                 // id : 12345678901234567
             }
           }
        else {
             Debug.Log(result.Error);
         }
     }

    

      private void FriendsFunct(IGraphResult result)
     {
         string jsonString = result.RawResult;
         //Debug.Log(result);
         var dict = Json.Deserialize(jsonString) as Dictionary<string, object>;
         string userName = "first_name";
         object friendsH;
         var friends = new List<object>();
         string friendName;
         if (dict.TryGetValue("friends", out friendsH))
         {
             friends = (List<object>)(((Dictionary<string, object>)friendsH)["data"]);

             friendsFBID = new string[friends.Count];
             friendsName = new string[friends.Count];

             if (friends.Count > 0)
             {
                 for (int a = 0; a < friends.Count; a++ ) {
                     var friendDict = ((Dictionary<string, object>)(friends[a]));
                     var friend = new Dictionary<string, string>();
                     friend["id"] = (string)friendDict["id"];
                     friend["first_name"] = (string)friendDict["first_name"];
                     Debug.Log(friend["first_name"] + " " + friend["id"]);
                     friendsName[a] = friend["first_name"]; friendsFBID[a] = friend["id"];
                     PlayerPrefs.SetString("NameOfFriend#" + a, friendsName[a]);
                     PlayerPrefs.SetString("FBIDOfFriend#" + a, friendsFBID[a]);
                 }
                 PlayerPrefs.SetInt("FriendsCount", friends.Count);
             }// end if frnds.Count > 0;
         }

         StartCoroutine(InsertMyPic());

     }
     

    void ProfPicFunct(IGraphResult result){
        Debug.Log("here in Pic Funct");
        if (result.Texture != null)
        {
            byte[] bytes = result.Texture.EncodeToPNG();

            // File.WriteAllBytes(Application.dataPath + "/Pic.png", bytes);

            // Trying to save in PlayerPref
            string encodedText = Convert.ToBase64String(bytes);
            PlayerPrefs.SetString("Pic", encodedText);
            //Debug.Log("Pic "+ encodedText);
            PlayerPrefs.SetInt("ImageYes", 1);
            // ProfPic.sprite = Sprite.Create(result.Texture, new Rect(0, 0, 128, 128), new Vector2());
           // MyLeaderBoard.Read();
        }

    }
    
    public void inviteFrnds()
    {
        FB.AppRequest(
        "Come play this great game!",
        null, null, null, null, null, null,
        ShareResultFuntion
        );

    }

    private void ShareResultFuntion(IAppRequestResult result) {
        
        var dict = Json.Deserialize(result.RawResult) as Dictionary<string, object>;
        //tex.text = dict.ToString();

    }

    IEnumerator InsertMyPic() { // Insert My Pic
        // 1 Name and FBID
        string flag = "false";
        // Debug.Log("My Name is "+  PlayerPrefs.GetString("Name"));
        //  Debug.Log("My FBID is " + PlayerPrefs.GetString("FBID"));
        // Debug.Log("My Pic is "+   PlayerPrefs.GetString("Pic"));
        using (MySqlConnection connection = new MySqlConnection("SERVER=sql6.freemysqlhosting.net; DATABASE=sql6126528; UID=sql6126528; PASSWORD=CmIGfGVqla;"))
        {
            using (MySqlCommand command = new MySqlCommand())
            {
                command.Connection = connection;
                MySqlDataReader Reader;
                // Upload Pic
                //----Start--------Checking if FBID is already in MyPic----------
                //----------------
                command.CommandText = "SELECT * FROM MyPic WHERE FBID = " + PlayerPrefs.GetString("FBID") + " LIMIT 1";
               
                try
                {
                    connection.Open();
                    Reader = command.ExecuteReader();
                    Debug.Log(Reader.Read().ToString());
                    flag = Reader.Read().ToString();
                }
                catch (Exception x)
                {
                    Debug.Log(x.Message);

                }
                connection.Close();
                //-----------------
                if (flag == "false")
                {
                    //----End----------Checking if FBID is already in MyPic----------
                    byte[] bytes = Convert.FromBase64String(PlayerPrefs.GetString("Pic"));
                    command.CommandText = "INSERT INTO MyPic (FBID, Pic) VALUES (?FBID, ?bytes);";
                    MySqlParameter FBIBParameter = new MySqlParameter("?FBID", MySqlDbType.Text, 20);
                    MySqlParameter bytesParameter = new MySqlParameter("?bytes", MySqlDbType.Blob, bytes.Length);
                    FBIBParameter.Value = PlayerPrefs.GetString("FBID");
                    bytesParameter.Value = bytes;
                    command.Parameters.Add(FBIBParameter);
                    command.Parameters.Add(bytesParameter);
                    connection.Open();
                    command.ExecuteNonQuery();
                }
                else {
                    //Delete first, then insert
                    //Delete
                    command.CommandText = "Delete From MyPic Where FBID = "+ PlayerPrefs.GetString("FBID");
                    
                    try
                    {
                        connection.Open();
                        command.ExecuteNonQuery();
                    }
                    catch (Exception x)
                    {
                        Debug.Log(x.Message);

                    }
                    connection.Close();

                    //Insert
                    byte[] bytes = Convert.FromBase64String(PlayerPrefs.GetString("Pic"));
                    command.CommandText = "INSERT INTO MyPic (FBID, Pic) VALUES (?FBID, ?bytes);";
                    MySqlParameter FBIBParameter = new MySqlParameter("?FBID", MySqlDbType.Text, 20);
                    MySqlParameter bytesParameter = new MySqlParameter("?bytes", MySqlDbType.Blob, bytes.Length);
                    FBIBParameter.Value = PlayerPrefs.GetString("FBID");
                    bytesParameter.Value = bytes;
                    command.Parameters.Add(FBIBParameter);
                    command.Parameters.Add(bytesParameter);
                    connection.Open();
                    command.ExecuteNonQuery();
                }
            }
        }
        StartCoroutine(InsertMyFriends());
        yield return new WaitForSeconds(1);
        // yield return new WaitForSeconds(1);
        // for (int a = 0; a < friendsFBID.Length; a++ ) {
        // Debug.Log("My Friends are "+ friendsName[a] + " and their IDs are "+ friendsFBID[a]);
        // PlayerPrefs.SetString("NameOfFriend#"+a, friendsName[a]);
        //PlayerPrefs.SetString("FBIDOfFriend#"+a, friendsFBID[a]);
        // Debug.Log("My Friends are " + PlayerPrefs.GetString("NameOfFriend#" + a) + " and their IDs are " + PlayerPrefs.GetString("FBIDOfFriend#" + a) );
        // }// For loop end
    }// check function end

    IEnumerator InsertMyFriends() {
        string flag = "false";
        
        using (MySqlConnection connection = new MySqlConnection("SERVER=sql6.freemysqlhosting.net; DATABASE=sql6126528; UID=sql6126528; PASSWORD=CmIGfGVqla;"))
        {
            for (int a = 0; a < friendsFBID.Length; a++)
            {
                using (MySqlCommand command = new MySqlCommand())
                {
                    command.Connection = connection;
                    MySqlDataReader Reader;
                    //Upload Friends
                    // Check if this friends Combination present? If Yes, skip, else add;
                    command.CommandText = "SELECT * FROM MyFriends WHERE FBID = " + PlayerPrefs.GetString("FBID") + " and MyFriendsFBID = " + PlayerPrefs.GetString("FBIDOfFriend#" + a);

                    try
                    {
                        connection.Open();
                        Reader = command.ExecuteReader();
                        Debug.Log(Reader.Read().ToString());
                        flag = Reader.Read().ToString();
                    }
                    catch (Exception x)
                    {
                        Debug.Log(x.Message);

                    }
                    connection.Close();
                    //----end check
                    if (flag == "false")
                    {
                        command.CommandText = "INSERT INTO MyFriends (FBID, MyFriendsFBID) VALUES (?FBID, ?MyFriendsFBID);";
                        MySqlParameter FBIBParameter1 = new MySqlParameter("?FBID", MySqlDbType.Text, 20);
                        MySqlParameter FrndsFBIBParameter1 = new MySqlParameter("?MyFriendsFBID", MySqlDbType.Text, 20);
                        FBIBParameter1.Value = PlayerPrefs.GetString("FBID");
                        FrndsFBIBParameter1.Value = PlayerPrefs.GetString("FBIDOfFriend#" + a);
                        Debug.Log(a);
                        command.Parameters.Add(FBIBParameter1);
                        command.Parameters.Add(FrndsFBIBParameter1);
                        connection.Open();
                        command.ExecuteNonQuery();
                        connection.Close();
                    }
                    else {
                        continue;
                    }
                }
            }
        }
        StartCoroutine(FetchFriendsPic());
        yield return new WaitForSeconds(1);
    }

    IEnumerator FetchFriendsPic() {

        using (MySqlConnection connection = new MySqlConnection("SERVER=sql6.freemysqlhosting.net; DATABASE=sql6126528; UID=sql6126528; PASSWORD=CmIGfGVqla;"))
        {
            for (int a = 0; a < PlayerPrefs.GetInt("FriendsCount"); a++)
            {
                using (MySqlCommand command = new MySqlCommand())
                {
                    command.Connection = connection;
                    command.CommandText = "SELECT Pic FROM MyPic WHERE FBID = " + PlayerPrefs.GetString("FBIDOfFriend#" + a);
                    MySqlDataReader Reader;

                    try
                    {
                        connection.Open();
                        Reader = command.ExecuteReader();
                        if (Reader.Read()) {
                            byte[] bytes = (byte[])Reader.GetValue(0);
                            string encodedText = Convert.ToBase64String(bytes);
                            PlayerPrefs.SetString("PicOfFriend#" + a, encodedText);
                        }
                    }

                    catch (Exception x)
                    {
                        Debug.Log(x.Message);
                    }
                    connection.Close();
                }
            }
        }
        StartCoroutine(FetchFriendsScores());
        yield return new WaitForSeconds(1);
    }
        
    IEnumerator FetchFriendsScores() {

        using (MySqlConnection connection = new MySqlConnection("SERVER=sql6.freemysqlhosting.net; DATABASE=sql6126528; UID=sql6126528; PASSWORD=CmIGfGVqla;"))
        {
            for (int a = 0; a < PlayerPrefs.GetInt("FriendsCount"); a++)
            {
                using (MySqlCommand command = new MySqlCommand())
                {
                    int[] levels = new int[100];
                    int[] scores = new int[100];
                    int i = 0;
                    command.Connection = connection;
                    command.CommandText = "SELECT Levels, Scores FROM  `MyScore2` WHERE FBID = " + PlayerPrefs.GetString("FBIDOfFriend#" + a) + " ORDER BY Levels ASC";
                    MySqlDataReader Reader;                 

                    try
                    {
                        connection.Open();
                        Reader = command.ExecuteReader();

                        while (Reader.Read()) {
                            //Debug.Log(Reader.GetInt32(0).ToString()+" "+ Reader.GetInt32(1).ToString());
                            levels[i] = Reader.GetInt32(0); 
                            scores[i] = Reader.GetInt32(1);
                            PlayerPrefs.SetInt("ScoreOfFriend#" + a + levels[i], scores[i]);
                            Debug.Log("Friend# "+ PlayerPrefs.GetString("FBIDOfFriend#" + a)+" a "+a+" Level "+ levels[i] + " Score " +PlayerPrefs.GetInt("ScoreOfFriend#" + a + levels[i]));
                            i++;
                        }
                    }

                    catch (Exception x)
                    {
                        Debug.Log(x.Message);
                    }
                    connection.Close();
                }
            }
        }
        StartCoroutine(FetchMyDefaultScores());
        yield return new WaitForSeconds(1);
    }

    IEnumerator FetchMyDefaultScores() {
        using (MySqlConnection connection = new MySqlConnection("SERVER=sql6.freemysqlhosting.net; DATABASE=sql6126528; UID=sql6126528; PASSWORD=CmIGfGVqla;"))
        {
            using (MySqlCommand command = new MySqlCommand())
            {
                int[] levels = new int[100];
                int[] scores = new int[100];
                int i = 0;
                command.Connection = connection;
                command.CommandText = "SELECT Levels, Scores FROM  `MyScore2` WHERE FBID = 'Default' ORDER BY Levels ASC";
                MySqlDataReader Reader;
                try
                {
                    connection.Open();
                    Reader = command.ExecuteReader();
                    while (Reader.Read())
                    {
                        levels[i] = Reader.GetInt32(0);
                        scores[i] = Reader.GetInt32(1);
                        PlayerPrefs.SetInt("Default#" + levels[i], scores[i]);
                        Debug.Log("Level " + levels[i] + " Score " + PlayerPrefs.GetInt("Default#" + levels[i]));
                        i++;
                    }
                }

                catch (Exception x)
                {
                    Debug.Log(x.Message);
                }
                connection.Close();
            }
        }
        StartCoroutine(UploadMyScore());
        yield return new WaitForSeconds(1);

    }

    IEnumerator UploadMyScore() {
        int i = 0;

        if (PlayerPrefs.HasKey("Name"))
        {
            for (int a = 0; a < 100; a++)
            {
                Debug.Log("" + PlayerPrefs.GetInt("Score " + a + 5));
                if (PlayerPrefs.HasKey("Score " + a + 5))
                {
                    i++; 
                }
            }
            Debug.Log("No. of levels played after level# 5 is " + i);


            if (i > 0)
            {
                string flag;//= "false";
                using (MySqlConnection connection = new MySqlConnection("SERVER=sql6.freemysqlhosting.net; DATABASE=sql6126528; UID=sql6126528; PASSWORD=CmIGfGVqla;"))
                {
                    for (int b = 5; b < (i + 5); b++)
                    {
                        if (PlayerPrefs.HasKey("Score " + b))
                        {
                            using (MySqlCommand command = new MySqlCommand())
                            {
                                command.Connection = connection;
                                command.CommandText = "SELECT Scores FROM MyScore2 WHERE FBID = " + PlayerPrefs.GetString("FBID") + " and Levels = " + b;
                                MySqlDataReader Reader;
                                flag = "false";

                                try
                                {
                                    connection.Open();
                                    Reader = command.ExecuteReader();
                                    Debug.Log(Reader.Read().ToString());
                                    flag = Reader.Read().ToString();
                                    // it means the value was ther, we need to check if this value is greater than or smaller than our current Score value
                                    // our current score value is in PlayerPrefs.GetInt("Score " + b);
                                    if (flag == "true")
                                    {
                                        if (Reader.GetInt32(0) < PlayerPrefs.GetInt("Score " + b))
                                        {
                                            Debug.Log("Level " + b + " Score in db " + Reader.GetInt32(0).ToString() + " " + PlayerPrefs.GetInt("Score " + b));
                                            flag = "false";
                                        }
                                    }
                                }
                                catch (Exception x)
                                {
                                    Debug.Log(x.Message);
                                }
                                connection.Close();
                                //----end check

                                if (flag == "false")// this means its not there, so we put it
                                {
                                    command.CommandText = "INSERT INTO MyScore2 (FBID, Name, Levels, Scores) VALUES (?FBID, ?Name, ?Levels, ?Scores );";
                                    MySqlParameter FBIBParameter1 = new MySqlParameter("?FBID", MySqlDbType.Text, 20);
                                    MySqlParameter NameParameter1 = new MySqlParameter("?Name", MySqlDbType.Text, 20);
                                    MySqlParameter LeveParameter1 = new MySqlParameter("?Levels", MySqlDbType.Int32);
                                    MySqlParameter ScorParameter1 = new MySqlParameter("?Scores", MySqlDbType.Int32);

                                    FBIBParameter1.Value = PlayerPrefs.GetString("FBID");
                                    NameParameter1.Value = PlayerPrefs.GetString("FBID");
                                    LeveParameter1.Value = PlayerPrefs.GetString("FBID");
                                    ScorParameter1.Value = PlayerPrefs.GetString("FBID");

                                    command.Parameters.Add(FBIBParameter1);
                                    command.Parameters.Add(NameParameter1);
                                    command.Parameters.Add(LeveParameter1);
                                    command.Parameters.Add(ScorParameter1);

                                    connection.Open();
                                    command.ExecuteNonQuery();
                                    connection.Close();
                                }
                                else
                                {
                                    continue;
                                }
                            }
                        }
                    }
                }
            }
        }

        yield return new WaitForSeconds(1);
    }

    /*
    public static void ReadPics()
    {
        string myConnectionString = "SERVER=sql6.freemysqlhosting.net;" +
                                    "DATABASE=sql6126528;" +
                                    "UID=sql6126528;" +
                                    "PASSWORD=CmIGfGVqla";
        MySqlConnection connection = new MySqlConnection(myConnectionString);

        MySqlCommand command = connection.CreateCommand();

        string s = PlayerPrefs.GetString("FBID");
        command.CommandText = "SELECT Pic FROM MyPic WHERE FBID = " + s + "";
        Debug.Log(command.CommandText);
        MySqlDataReader Reader;

        try
        {
            connection.Open();
            Reader = command.ExecuteReader();
            Debug.Log(Reader.Read().ToString() + " " + Reader.FieldCount);
            Debug.Log(Reader.GetValue(0));

            byte[] bytee = (byte[])Reader.GetValue(0);

            Texture2D tex = new Texture2D(128, 128);
            if (bytee == null) { Debug.Log("fart "); }
            tex.LoadImage(bytee);
            Picc = Sprite.Create(tex, new Rect(0, 0, 128, 128), new Vector2());
        }

        catch (Exception x)
        {
            Debug.Log(x.Message);

        }

        connection.Close();
    }
    */
}







