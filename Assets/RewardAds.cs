using UnityEngine;
//using UnityEngine.Advertisements;
using UnityEngine.UI;


public class RewardAds : MonoBehaviour { }
    /*
    public GameObject adsButton;
    public GameObject message;
    public Text tex;

    void Update () {
        if (!adsButton.activeSelf) {
            if (Advertisement.IsReady("rewardedVideo")) {
                adsButton.SetActive(true);
            }
        }

        if (!Advertisement.IsReady("rewardedVideo")) {
            if (adsButton.activeSelf){
                adsButton.SetActive(false);
            }
        }
    }

    public void ShowRewardedAd()
    {
        Debug.Log("Advertisement.IsReady " + Advertisement.IsReady("rewardedVideo"));
        if (Advertisement.IsReady("rewardedVideo"))
        {
            var options = new ShowOptions { resultCallback = HandleShowResult };
            Advertisement.Show("rewardedVideo", options);
        }
    }

    private void HandleShowResult(ShowResult result)
    {
        switch (result)
        {
            case ShowResult.Finished:
                Debug.Log("The ad was successfully shown.");
                //
                // YOUR CODE TO REWARD THE GAMER
                // Give coins etc.
                PlayerPrefs.SetInt("Coins", PlayerPrefs.GetInt("Coins")+2);
                tex.text = "2 Coins added, YEY !!";
                message.SetActive(true);
                break;
            case ShowResult.Skipped:
                Debug.Log("The ad was skipped before reaching the end.");
                tex.text = "Watch full as to earn coins";
                message.SetActive(true);
                break;
            case ShowResult.Failed:
                Debug.LogError("The ad failed to be shown.");
                tex.text = "Sorry, The ads failed to be shown";
                message.SetActive(true);
                break;
        }
    }
}
*/