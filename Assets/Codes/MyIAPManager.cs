using System;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Purchasing;
using UnityEngine.UI;
//using Facebook.Unity;

public class MyIAPManager : MonoBehaviour   //, IStoreListener
{
    /*
    private IStoreController controller;
    private IExtensionProvider extensions;



    //public Text DebugLog; public Text DebugLog1; public Text DebugLog2; public Text DebugLog3; public Text DebugLog4; 
    //public Text DebugLog;

    public GameObject loading;
    public GameObject purchCompletes;
    public GameObject purchFails;
    

    //public Text Product1;
    public Text Price1;
    //public Text Product2;
    public Text Price2;
    //public Text Product3;
    public Text Price3;
    //public Text Product4;
    public Text Price4;
   // public Text Product5;
    public Text Price5;

    private static string kProductIDConsumable = "consumable";
    private static string kProductNameGooglePlayConsumableOne = "coins10_for_0.99";
    private static string kProductNameGooglePlayConsumableTwo = "coins25_for_1.99";
    private static string kProductNameGooglePlayConsumableThr = "coins50_for_2.99";
    private static string kProductNameGooglePlayConsumableFou = "coins100_for_4.99";
    private static string kProductNameGooglePlayConsumableFiv = "coins500_for_9.99";
    private static string kProductNameGooglePlayConsumableSix = "full_version";

    public Text CurrentCoins;

    void OnEnable()
    {
        loading.SetActive(true);
        Debug.Log("Here Loaing screen initiated");
        // If we haven't set up the Unity Purchasing reference
        if (controller == null)
        {
            // Begin to configure our connection to Purchasing
            InitializePurchasing();
        }
        else { loading.SetActive(false); }


    }

    void Update() {
        CurrentCoins.text = PlayerPrefs.GetInt("Coins").ToString();
    }

    public void InitializePurchasing()
    {

        if (IsInitialized())
        {
            // ... we are done here.
           // return;
        }

        var builder = ConfigurationBuilder.Instance(StandardPurchasingModule.Instance());

        builder.AddProduct("coins10_for_0.99", ProductType.Consumable);
        builder.AddProduct("coins25_for_1.99", ProductType.Consumable);
        builder.AddProduct("coins50_for_2.99", ProductType.Consumable);
        builder.AddProduct("coins100_for_4.99", ProductType.Consumable);
        builder.AddProduct("coins500_for_9.99", ProductType.Consumable);
        builder.AddProduct("full_version", ProductType.Consumable);

        Debug.Log("Lets see how this works :| "); //DebugLog.text = "Here in InitializePurchasing";
        UnityPurchasing.Initialize(this, builder);
    }


    public void BuyConsumableProdOne() { BuyProductID("coins10_for_0.99"); }
    public void BuyConsumableProdTwo() { BuyProductID("coins25_for_1.99"); }
    public void BuyConsumableProdThr() { BuyProductID("coins50_for_2.99"); }
    public void BuyConsumableProdFou() { BuyProductID("coins100_for_4.99"); }
    public void BuyConsumableProdFiv() { BuyProductID("coins500_for_9.99"); }
    public void BuyConsumableProdSix() { BuyProductID("full_version"); }


    private bool IsInitialized()
    {
        // Only say we are initialized if both the Purchasing references are set.
        return controller != null && extensions != null;
    }




    /// Called when Unity IAP is ready to make purchases.
    public void OnInitialized(IStoreController controller, IExtensionProvider extensions)
    {
        this.controller = controller;
        this.extensions = extensions;
        Debug.Log("Here I am"); //DebugLog1.text = "Everything is now Initialized";
        checkProducts();
    }



    void checkProducts() {
        string productId1 = "coins10_for_0.99";
        Product product1 = controller.products.WithID(productId1);
        //Product1.text = product1.metadata.localizedTitle;
        Price1.text = product1.metadata.localizedPriceString;

        string productId2 = "coins25_for_1.99";
        Product product2 = controller.products.WithID(productId2);
        //Product2.text = product2.metadata.localizedTitle;
        Price2.text = product2.metadata.localizedPriceString;

        string productId3 = "coins50_for_2.99";
        Product product3 = controller.products.WithID(productId3);
        //Product3.text = product3.metadata.localizedTitle;
        Price3.text = product3.metadata.localizedPriceString;

        string productId4 = "coins100_for_4.99";
        Product product4 = controller.products.WithID(productId4);
        //Product4.text = product4.metadata.localizedTitle;
        Price4.text = product4.metadata.localizedPriceString;

        string productId5 = "coins500_for_9.99";
        Product product5 = controller.products.WithID(productId5);
        //Product5.text = product5.metadata.localizedTitle;
        Price5.text = product5.metadata.localizedPriceString;

        loading.SetActive(false);
    }


    void BuyProductID(string productId)
    {
        // If the stores throw an unexpected exception, use try..catch to protect my logic here.
        try
        {
            // If Purchasing has been initialized ...
            if (IsInitialized())
            {
                // ... look up the Product reference with the general product identifier and the Purchasing system's products collection.
                Product product = controller.products.WithID(productId);

                // If the look up found a product for this device's store and that product is ready to be sold ... 
                if (product != null && product.availableToPurchase)
                {
                    // ... buy the product. Expect a response either through ProcessPurchase or OnPurchaseFailed asynchronously.
                    Debug.Log(string.Format("Purchasing product asychronously: '{0}'", product.definition.id));
                   // Debug.Log(product.metadata.localizedTitle); DebugLog.text = product.metadata.localizedTitle;
                   // Debug.Log(product.metadata.localizedDescription); DebugLog1.text = product.metadata.localizedDescription;
                   // Debug.Log(product.metadata.localizedPriceString); DebugLog2.text = product.metadata.localizedPriceString;


                    
                    controller.InitiatePurchase(product);
                }
                // Otherwise ...
                else
                {
                    // ... report the product look-up failure situation  
                    Debug.Log("BuyProductID: FAIL. Not purchasing product, either is not found or is not available for purchase");
                    //DebugLog4.text = "Prod not found or not available";
                }
            }
            // Otherwise ...
            else
            {
                // ... report the fact Purchasing has not succeeded initializing yet. Consider waiting longer or retrying initiailization.
                Debug.Log("BuyProductID FAIL. Not initialized.");
                //DebugLog4.text = "Not initialized yet, we are in Buy Pod";
            }
        }
        // Complete the unexpected exception handling ...
        catch (Exception e)
        {
            // ... by reporting any unexpected exception for later diagnosis.
            Debug.Log("BuyProductID: FAIL. Exception during purchase. " + e);
            //DebugLog4.text = "BuyProductID: FAIL. Exception during purchase. " + e;
        }
    }


    
    /// Called when Unity IAP encounters an unrecoverable initialization error.

    /// Note that this will not be called if Internet is unavailable; Unity IAP
    /// will attempt initialization until it becomes available.
    public void OnInitializeFailed(InitializationFailureReason error)
    {
        //DebugLog2.text = error.ToString();
    }


    /// Called when a purchase completes.
    /// May be called at any time after OnInitialized().
    public PurchaseProcessingResult ProcessPurchase(PurchaseEventArgs e)
    {

        //DebugLog.text = e.purchasedProduct.definition.id;

        
        // A consumable product has been purchased by this user.
        if (String.Equals(e.purchasedProduct.definition.id, "coins10_for_0.99", StringComparison.Ordinal))
        {  //If the consumable item has been successfully purchased, add 10 coins to the player's in-game score.
            Debug.Log(string.Format("ProcessPurchase: PASS. Product: '{0}'", e.purchasedProduct.definition.id));
            PlayerPrefs.SetInt("Coins", PlayerPrefs.GetInt("Coins")+10);
            logPurchase("coins10_for_0.99", 10, "DNN");
        }

        if (String.Equals(e.purchasedProduct.definition.id, "coins25_for_1.99", StringComparison.Ordinal))
        { Debug.Log(string.Format("ProcessPurchase: PASS. Product: '{0}'", e.purchasedProduct.definition.id));
          PlayerPrefs.SetInt("Coins", PlayerPrefs.GetInt("Coins") + 25);
          logPurchase("coins25_for_1.99", 25, "DNN");
        }

        if (String.Equals(e.purchasedProduct.definition.id, "coins50_for_2.99", StringComparison.Ordinal))
        {   Debug.Log(string.Format("ProcessPurchase: PASS. Product: '{0}'", e.purchasedProduct.definition.id));
            PlayerPrefs.SetInt("Coins", PlayerPrefs.GetInt("Coins") + 50);
            logPurchase("coins50_for_2.99", 50, "DNN");
        }

        if (String.Equals(e.purchasedProduct.definition.id, "coins100_for_4.99", StringComparison.Ordinal))
        {   Debug.Log(string.Format("ProcessPurchase: PASS. Product: '{0}'", e.purchasedProduct.definition.id));
            PlayerPrefs.SetInt("Coins", PlayerPrefs.GetInt("Coins") + 100);
            logPurchase("coins100_for_4.99", 100, "DNN");
        }

        if (String.Equals(e.purchasedProduct.definition.id, "coins500_for_9.99", StringComparison.Ordinal))
        {   Debug.Log(string.Format("ProcessPurchase: PASS. Product: '{0}'", e.purchasedProduct.definition.id));
            PlayerPrefs.SetInt("Coins", PlayerPrefs.GetInt("Coins") + 500);
            logPurchase("coins500_for_9.99", 500, "DNN");
        }

        if (String.Equals(e.purchasedProduct.definition.id, "full_version", StringComparison.Ordinal))
        {
            Debug.Log(string.Format("ProcessPurchase: PASS. Product: '{0}'", e.purchasedProduct.definition.id));
            PlayerPrefs.SetInt("Paid", 1);
            logPurchase("full_version", 1000, "DNN");
        }


        purchCompletes.SetActive(true);
        return PurchaseProcessingResult.Complete;
    }


    
    //"coins10_for_0.99";
    //"coins25_for_1.99";
    //"coins50_for_2.99";
    //"coins100_for_4.99";
    //"coins500_for_9.99";
    

    /// Called when a purchase fails.
    public void OnPurchaseFailed(Product i, PurchaseFailureReason p)
    {
        //DebugLog2.text = p.ToString();
        
        
        purchFails.SetActive(true);
    }

    /*
    void logPurchase(String packageName, float priceAmount, String priceCurrency)
    {
        var iapParameters = new Dictionary<string, object>();
        iapParameters["mygame_packagename"] = packageName;
        FB.LogPurchase(
            priceAmount,
            priceCurrency,
            iapParameters
        );

    }   */
}
