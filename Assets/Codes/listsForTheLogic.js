#pragma strict


public class listsForTheLogic extends MonoBehaviour{

    // Declaring the class
    public class ListsOC {
        
        public var leav : GameObject[];

        public var ff : float[];
        public var gg : float[];
        public var hh : float[];
        public var parent : GameObject[];
        
    // Constructor
        public function ListsOC (i : int){
      
            leav = new GameObject[i];
            ff = new float[i];
            gg = new float[i];
            hh = new float[i];
            parent = new GameObject[i];
    
        }

        public function Add(go1 : GameObject, a :float, b:float, c :float, go2 : GameObject, i : int){
            leav[i] = go1;
            ff[i] = a;
            gg[i] = b;
            hh[i] = c;
            parent[i] = go2;              
        }


         public function Insert(go1 : GameObject, a : float, b: float, c : float, go2 : GameObject){
             var i : float = 0;
             for (var lea in leav){
                 if (lea == null){
                     leav[i] = go1;
                     ff[i] = a;
                     gg[i] = b;
                     hh[i] = c;
                     parent[i] = go2;
                     //Debug.Log("Inserted Position "+i);
                     break;
                 }
                 i++;
             }
       
         }

         public function Sort(i : String){
             var a : int = 0;
             var b : int = 0;

             if (i == "ff"){
                 for (var ffA in ff){
                     if (leav[a] != null){
                         b = 0;
                         for (var ffB in ff ){
                             if (leav[b] != null){
                                 if ( ffA < ffB ){
                                     var tGO1 = leav[b];
                                     var a1 = ff[b];
                                     var a2 = gg[b];
                                     var a3 = hh[b];
                                     var tGO2 = parent[b];

                                     leav[b] = leav[a];
                                     ff[b] = ff[a]; 
                                     gg[b] = gg[a];
                                     hh[b] = hh[a];
                                     parent[b] = parent[a];

                                     leav[a] = tGO1;
                                     ff[a] = a1;
                                     gg[a] = a2;
                                     hh[a] = a3;
                                     parent[a] = tGO2;
                                 }// inner if end
                             }
                             b++;
                         }// inner for end
                     }// if ffA != null end
                     a++;
                 }// outer for end

                 // Debug.Log("a "+a);
                
             } // Main if end    



            // Debug.Log("====================");
             for (var z = 0; z < leav.Length; z++){
                 if (leav[z] != null){
               // Debug.Log("Sorted "+leav[z].name+" "+ff[z].ToString()+" "+hh[z].ToString()+" "+gg[z].ToString());
                 }
            }
           //  Debug.Log("====================");

         }
             

public function Pop(){
        var a : int = 0;
        for (var ffA in ff){
            //Debug.Log("list "+leav[a]);
            a++;
        }
        //Debug.Log("a "+a);

        var temp = new ListsOC(1);
        temp.leav[0] = leav[0];
        temp.ff[0] = ff[0];
        temp.gg[0] = gg[0];
        temp.hh[0] = hh[0];
        temp.parent[0] = parent[0]; 
        //Debug.Log("Pop "+temp.leav[0]);
        var tempList = new ListsOC(a-1);
        var b : int = 0;
        for (b = 1 ; b < a-1 ; b++){
            tempList.leav[b-1] = leav[b];
            tempList.ff[b-1] = ff[b];
            tempList.gg[b-1] = gg[b];
            tempList.hh[b-1] = hh[b];
            tempList.parent[b-1] = parent[b];
            
        }
        //Debug.Log("b "+b);
        
        leav = new GameObject[b];
        ff = new float[b];
        gg = new float[b];
        hh = new float[b];
        parent = new GameObject[b];
        
        for (var c = 0 ; c < b ; c++){
            leav[c] = tempList.leav[c];
            ff[c] = tempList.ff[c];
            gg[c] = tempList.gg[c];
            hh[c] = tempList.hh[c];
            parent[c] = tempList.parent[c];

        }
        return temp;
    }



public function Length(){
    
         var a : int = 0;
         for (var lea in leav){
         if (lea != null){
             a++;
             //Debug.Log(ffA);
             }
         }
         return a;
     
     }


     public function Has(leafGO : GameObject){
         for (var lea in leav){
             if (lea == leafGO){
                 return true;          
             }
         }
         return false;
     }

     public function Get(currGO : GameObject){ // here I will return int = position where CurrGO is found
        var i = 0;
         for (var lea in leav){
             if (lea == currGO){
                 return i;          
             }
             i++;
         }
         return 1000;
     }

     public function Replace(s : int, curr : ListsOC , n : int){
         leav[s] = curr.leav[n];
         ff[s] = curr.ff[n];
         gg[s] = curr.gg[n];
         hh[s] = curr.hh[n];
         parent[s] = curr.parent[n];
     }
     
     public function SortNeigh(i : String){
         var a : int = 0;
         var b : int = 0;
         if (i == "ff"){
             for (var ffA in ff){
                 b = 0;
                 for (var ffB in ff ){
                     if ( ffA < ffB ){
                         var tGO1 = leav[b];
                         var a1 = ff[b];
                         var a2 = gg[b];
                         var a3 = hh[b];
                         var tGO2 = parent[b];

                         leav[b] = leav[a];
                         ff[b] = ff[a]; 
                         gg[b] = gg[a];
                         hh[b] = hh[a];
                         parent[b] = parent[a];

                         leav[a] = tGO1;
                         ff[a] = a1;
                         gg[a] = a2;
                         hh[a] = a3;
                         parent[a] = tGO2;
                     }
                     b++;
                 }
                 a++;
             }

             // Debug.Log("a "+a);
                
         } // ff end    

         for (var lea in leav){
             //Debug.Log("Sorted "+lea);
         }
     }
             

     public function PopLast(){
          // Find total length
         var ll : int;
         for (var ffA in ff){
              ll++;
         }
         
         // find last properly filled element number
         var a : int = 0;
         for (var ffA in ff){
             if (ffA != null){
             a++;
            }
         }

         // here we have the PopLast element to return
         var temp = new ListsOC(1);
         temp.leav[0] = leav[a];
         temp.ff[0] = ff[a];
         temp.gg[0] = gg[a];
         temp.hh[0] = hh[a];
         temp.parent[0] = parent[a]; 

         // Now reduce the list by 1 and remove the last proper element
         var tempList = new ListsOC(ll-1);

         var b : int = 0;
         for (b = a ; b < ll-1 ; b++){
             tempList.leav[b] = leav[b+1];
             tempList.ff[b] = ff[b+1];
             tempList.gg[b] = gg[b+1];
             tempList.hh[b] = hh[b+1];
             tempList.parent[b] = parent[b+1];
            
         }
         //Debug.Log("b "+b);
        
         leav = new GameObject[(ll-1)];
         ff = new float[(ll-1)];
         gg = new float[(ll-1)];
         hh = new float[(ll-1)];
         parent = new GameObject[(ll-1)];
        
         for (var c = 0 ; c < (ll-1) ; c++){
             leav[c] = tempList.leav[c];
             ff[c] = tempList.ff[c];
             gg[c] = tempList.gg[c];
             hh[c] = tempList.hh[c];
             parent[c] = tempList.parent[c];

         }
         return temp;
     }



        }
    }