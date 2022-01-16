/*****
SCOREMINTER
NFT marketplace for musical scores ...
Release under MIT License by Xunorus, 2022
http://xunorus.com
*****/

  /*********************************************************************************************
  .) sweetalert2
  **********************************************************************************************/  
const Toast = Swal.mixin({
    toast: true,
    position: "top-right",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: toast => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    }
  });
  
  const fixedToast = swal.mixin({
    toast: true,
    position: "top-right",
    showConfirmButton: false,
    showConfirmButton: true
  });

  const fixedToastLoader = swal.mixin({
    toast: true,
    position: "top-right",
    showConfirmButton: false,
    showConfirmButton: false
  });


var sweet_loader = '<div class="sweet_loader"><svg viewBox="0 0 140 140" ><g class="outline"><path d="m 70 28 a 1 1 0 0 0 0 84 a 1 1 0 0 0 0 -84" stroke="rgba(0,0,0,0.1)" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"></path></g><g class="circle"><path d="m 70 28 a 1 1 0 0 0 0 84 a 1 1 0 0 0 0 -84" stroke="#71BBFF" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-dashoffset="200" stroke-dasharray="300"></path></g></svg></div>';

    
  
  /*********************************************************************************************
  .) acorddion show more accordion
  **********************************************************************************************/  
//   $(".toggle_btn").click(function(){
//     $(this).toggleClass("active");
//    $(".wrapper ul").toggleClass("active");
   
//    if($(".toggle_btn").hasClass("active")){
//      $(".toggle_text").text("Show Less");
//    }
//    else{
//      $(".toggle_text").text("Show More");
//    }
//  });



  // const toggleShowMore = document.querySelector('.toggle_btn');
  // const showmore = document.querySelectorAll('.wrapper ul');
  
  // toggleShowMore.addEventListener('click', () => {
  //   console.log('clicked show more!');
  // });
  
  /*********************************************************************************************
  .) anim counter
  **********************************************************************************************/  
  // const counter = document.querySelector(".counter");
  // let count = 0;
  // setInterval(() => {
  //  if(count == 92) {
  //   clearInterval(count);
  //  }else {
  //   count+=1;
  //   counter.textContent = count + "%";
  //  }
  // }, 42);

  
  
  /*********************************************************************************************
  .) MORALIS (for loggin and other quickfixes)
  **********************************************************************************************/
  
  // 0. Check moralis
  const serverUrl = "https://4awmj3mczjmy.usemoralis.com:2053/server";
  const appId = "MGGUY01w6PMlQRQeXarH98KWo9PDLHUNI3eH5ZOx";
  const init = async () => {
    await Moralis.start({ serverUrl, appId });
    Moralis.initPlugins();
    console.log(Moralis.Plugins);

    const covalent = Moralis.Plugins.covalent;
    const result = await covalent.getChains();
    console.log('CHAINS: ',result.data);

    const transfers = await Moralis.Plugins.covalent.getErc20TokenTransfersForAddress({
        chainId:  1,
        // address: '0x1c87FDF8844cbEe5DC7f0F1681C44bF3c99A0e3d',//musicshares
        address: '0x1BCeFD84D0327060bF76074dE4534d05C7684334',// xunorus
        tokenAddress: '0x6b175474e89094c44da98b954eedeac495271d0f',
        quoteCurrency: 'EUR' 
        
      });
    
    console.log('TRANSFERS: ',transfers.data);
const nfts = await Moralis.Plugins.covalent.getNftTokenIdForContract({
  chainId: 1 ,
  contractAddress: '0xf1CCd9b401cb1b37eEd0fEC58752b0E07bd9A1D7',// cryptomurals
  // pageNumber?: number ,
  // pageSize?: number 
});  
console.log('NFTs: ',nfts.data);


  };
  
  init();
  
/*********************************************************************************************
.) LOG stuff
**********************************************************************************************/
async function walletConnect() {
  console.log('wallet connect!');
  try{
    const user = await Moralis.authenticate({ provider: "walletconnect" });
    const web3 = await Moralis.enableWeb3({ provider:   "walletconnect" });

  } catch (error) {
    console.log('error:', error)
  }

  let userAddress = user.get('ethAddress');

  var x = userAddress;
  var shortAddr = x.substring(0, 8) + "...";
  document.getElementById("logg").innerHTML = "<p class='loged btn-grad-inv'>" + shortAddr + ` <i class='logout ' aria-hidden='true' onclick='event.stopPropagation();logOut()'><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-logout" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
  <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2"></path>
  <path d="M7 12h14l-3 -3m0 6l3 -3"></path>
</svg></i> </p>`;

}


//  LOGIN
async function login() {
    console.log('login tryied');
    let user = Moralis.User.current();
    if (!user) {
      try {
      
        let user = await Moralis.authenticate({
          signingMessage: "Welcome to ScoreMinter!"
        })
        let userAddress = user.get('ethAddress');
        currentAddress = userAddress;//global var for drafts functionality
        currentUser = user.id;
    
        web3 = await Moralis.enableWeb3();
        checkNetwork();

        var x = userAddress;
        var shortAddr = x.substring(0, 6) + "..."+x.substring(38, 42);
        document.getElementById("logg").innerHTML = "<p class='loged btn-grad-inv'>" + shortAddr + ` <i class='logout ' aria-hidden='true' onclick='event.stopPropagation();logOut()'><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-logout" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2"></path>
        <path d="M7 12h14l-3 -3m0 6l3 -3"></path>
     </svg></i> </p>`;
        console.log('User address: ', userAddress);
  
      } catch (error) {
        console.log(error)
      }
    } else {
      console.log('user is already here...');
      // Moralis.enableWeb3(); //if user has a sesion authenticate is not called so metamaks is not initiated, here we fix this
      web3 = await Moralis.enableWeb3(); //if user has a sesion authenticate is not called so metamaks is not initiated, here we fix this
      checkNetwork();
      
      let userAddress = user.get('ethAddress');
      currentAddress = userAddress;//global var for drafts functionality
      currentUser = user.id;

      var x = userAddress;
      // var shortAddr = x.substring(0, 8) + "...";
      var shortAddr = x.substring(0, 6) + "..."+x.substring(38, 42);

      document.getElementById("logg").innerHTML = "<p class='loged btn-grad-inv'>" + shortAddr + ` <i class='logout fa fa-sign-out' aria-hidden='true' onclick='event.stopPropagation();logOut()'><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-logout" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2"></path>
      <path d="M7 12h14l-3 -3m0 6l3 -3"></path>
   </svg></i> </p>`;
    }
  }
  
  // LOGOUT
  async function logOut() {
    await Moralis.User.logOut();
    document.getElementById("logg").innerHTML = `<button  class="btn-grad"  data-translate="connect"  onclick="login();">Connect</button>`;
  
    console.log("logged out");
  }
  



/*********************************************************************************************
 .) INITIALIZE DAPP
**********************************************************************************************/


async function initializeApp() {
    console.log("iniciar has benn triggered");
  
    // INICIA USUARIO
    if (typeof web3 !== "undefined") {
      console.log("1- web3 is enabled");
  
      document.getElementById("logg").innerHTML = `<button id="login" onclick="login();" class="btn-grad">CONNECT</button>`
  
      let user = Moralis.User.current();
      if (!user) {
        console.log(' user is not logged but we do nothing ;) ');
  
      } else {
        console.log('user is already here...');
        
        
      web3 = await Moralis.enableWeb3(); //if user has a sesion authenticate is not called so metamaks is not initiated, here we fix this
        
        // GET NETWORK
          checkNetwork();
        
          let userAddress = user.get('ethAddress');
          currentAddress = userAddress;//global var for drafts functionality
          currentUser = user.id;
          getSavedDrafts(currentAddress);

        var x = userAddress;
        // var shortAddr = x.substring(0, 8) + "...";
        var shortAddr = x.substring(0, 6) + "..."+x.substring(38, 42);

        document.getElementById("logg").innerHTML = "<p class='loged btn-grad-inv'>" + shortAddr + ` <i class='logout ' aria-hidden='true' onclick='event.stopPropagation();logOut()'><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-logout" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2"></path>
        <path d="M7 12h14l-3 -3m0 6l3 -3"></path>
     </svg></i> </p>`;
  


        // document.getElementById("logg").innerHTML = "<p class='loged btn-grad-inv'>" + userAddress + " <i class='logout fa fa-sign-out' aria-hidden='true' onclick='event.stopPropagation();logOut()'></i> </p>";
  
      }
  
  
  
  
    } else {
      console.log("web3 is not found");
      // noWeb3();
      
      document.getElementById("logg").innerHTML = `<button id="login" onclick="walletConnect();" class="btn-grad">wallet?</button>`

      renderInventory('hola');//fake content
      iniciar();// starts demo.js para fake content
      

      Swal.fire({
        title: "web3 is not found",
        icon: "info",
        html: 'A web3 enabled browser is needed to use ScoreMinter',
        showCloseButton: true,
        focusConfirm: false,
        confirmButtonText: '<i class="fa fa-thumbs-up"></i> OK',
        confirmButtonAriaLabel: "Thumbs up, great!"
      });
    }
  }
  
  
  initializeApp();






/*********************************************************************************************
 .) TRANSITIONS
**********************************************************************************************/
// var boxes =   $(".first-box, .second-box, .third-box ,  .fourth-box, .fifth-box ");
var boxes =   $(".user-box");

  $(function () {
    $(".logo, .uno").on("click", function (e) {
     $(".main-container").removeClass("show");
     $(".main-container").scrollTop(0);

     boxes.css("display","none"),     
     $(".first-box").css("display","flex");
    //  $(".second-box").css("display","none");
     
     $(".sidebar-link").removeClass("is-active");
     $(".sidebar-link:first").addClass("is-active");
     
    });
    

    $(" .dos").on("click", function (e) {
     $(".main-container").scrollTop(0);
        boxes.css("display","none"),     
       $(".second-box").css("display","flex");
    });
    

    $(" .tres").on("click", function (e) {
      $(".main-container").scrollTop(0);
         boxes.css("display","none"),     
        $(".third-box").css("display","flex");
     });

     $(" .cuatro").on("click", function (e) {
      $(".main-container").scrollTop(0);
         boxes.css("display","none"),     
        $(".fourth-box").css("display","flex");
     });


     $(" .cinco").on("click", function (e) {
      $(".main-container").scrollTop(0);
         boxes.css("display","none"),     
        $(".fifth-box").css("display","flex");
     });


  });

  

    $(function () {
      $(".sidebar-link").click(function () {
       $(".sidebar-link").removeClass("is-active");
       $(this).addClass("is-active");
      });
     });





/*********************************************************************************************
.) DARKMODE
**********************************************************************************************/
    //  const toggleButton = document.querySelector('.dark-light');
     const toggleButton = document.querySelector('.darklight');
const colors = document.querySelectorAll('.color');

colors.forEach(color => {
  color.addEventListener('click', (e) => {
    colors.forEach(c => c.classList.remove('selected'));
    const theme = color.getAttribute('data-color');
    document.body.setAttribute('data-theme', theme);
    color.classList.add('selected');
  });
});

toggleButton.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');

  if(document.body.classList.contains('my-class-name')){
    //do something
  console.log('HASCLASS dark mode!');

    
  };

  toggleStoredItem("uimode", 'dark');
  console.log('togled dark mode!');
  // toggleButton.classList.toggle('active');
  // document.documentElement.classList.toggle('dark');

});




/*********************************************************************************************
.) STORAGE FUNCTIONS
**********************************************************************************************/
toggleStoredItem =  (item, value) => {
  // function toggleStoredItem(item, value) {
    if (localStorage.getItem(item)){
      localStorage.removeItem(item);
      console.log('Item removed: ',item)
    } else {
      localStorage.setItem(item, value);
      console.log('Item set: ',item)

    }
  }



/*********************************************************************************************
.) DOM LOADED
**********************************************************************************************/

  document.addEventListener('DOMContentLoaded', function () {
    var modeSwitch = document.querySelector('.mode-switch');
  
    let savedUImode = localStorage.getItem("uimode");
    if (savedUImode) {
      console.log("savedUImode en localstorage: " + savedUImode);
  document.body.classList.toggle('dark-mode');

      // document.documentElement.classList.toggle('dark');
      // modeSwitch.classList.toggle('active');
  
    } else {
      console.log("NO hay savedUImode GUARDADO, muestra default UI mode: light ");
      // globalUImode = "light";
    }
});
  




/*********************************************************************************************
.) LANGUAJE
**********************************************************************************************/
var userLang = navigator.language || navigator.userLanguage;
var lang = navigator.language || navigator.userLanguage; //no ?s necessary
console.log("The browser 's LANGUAJE is: " + lang);

const langs = document.querySelectorAll("[lang]");
const langen = document.querySelectorAll('[lang="en"]');
const langfr = document.querySelectorAll('[lang="fr"]');
const langes = document.querySelectorAll('[lang="es"]');
var dictionary = {
  en: {
    accountDue: "account due",
    renewYourAccount: "Please renew your account to continue using our services",
    back:'back',
    nft_name: "Title",
    name:'name',
    enterDescription:'Description',
    addTrack: 'add track',
    addArtist: 'add artist',
    pricePerItem: 'price',
    mint: 'mint',
    startCreatingSM:"Start creating with ScoreMinter!",
    connect:"CONNECT",
    whatIsSM:'ScoreMinter - is a decentralized autonomous organization to create, sell and distribute music scores as NFTs',
    enterYourTitle: "Enter your title",
    youCanChangeItLater: "(you can change it later)",
    areYourSure: "Are you sure?",
    youWontBeAbleToReverThis: "You won't be able to revert this!",
    yesDeleteIt: "Yes, delete it",
    addScore: "Add music score",
    addParts: "Add parts",
    create:"Create",
    createscoredraft:"Create a score draft"



  },
  fr: {
    accountDue: "compte dû",
    renewYourAccount: "Veuillez renouveler votre compte pour continuer à utiliser nos services",
    back:'retour',
    nft_name: "Titre",
    name:'Nom',
    enterDescription: "Description",
    addTrack: "ajouter une piste",
    addArtist:"ajouter un artist",
    pricePerItem: "Prix",
    mint: 'mint',
    startCreatingSM:"Commencez à créer avec ScoreMinter !",
    connect:"RELIER",
    whatIsSM:'ScoreMinter - est une organisation autonome décentralisée pour créer, vendre et distribuer des partitions musicales sous forme de NFT',
    enterYourTitle: "Entrez votre titre",
    youCanChangeItLater: "(vous pouvez le changer plus tard)",
    areYourSure: "Êtes-vous sûr?",
    youWontBeAbleToReverThis: "Vous ne pourrez pas revenir en arrière !",
    yesDeleteIt: "Oui, supprimez-le",
    addScore: "Ajouter partition musicale",
    addParts: "Ajouter des partitions",
    create:"Créer",
    createscoredraft:"Créer un brouillon de partition"





  },
  es: {
    accountDue: "Vencimiento de cuenta",
    renewYourAccount: "Renueve su cuenta para seguir usando nuestros servicios",
    back:'volver',
    nft_name: "titulo",
    name:'Nombre',
    enterDescription:'Descripcion',
    addTrack: 'agregar track',
    addArtist: 'agregar artista',
    pricePerItem: 'precio',
    mint: 'mintear',
    startCreatingSM:"¡Empiece a crear con ScoreMinter!",
    connect:"CONECTAR",
    whatIsSM:'ScoreMinter: es una organización autónoma descentralizada para crear, vender y distribuir partituras musicales como NFT.',
    enterYourTitle: "Ingresa el título",
    youCanChangeItLater: "(puedes cambiarlo más tarde)",
    areYourSure: "Estas a punto de eliminar este borrador",
    youWontBeAbleToReverThis: "¡No podrás revertir esto!",
    yesDeleteIt: "Si, bórralo",
    addScore: "Agregar partitura",
    addParts: "Agregar partes",
    create:"Crear",
    createscoredraft:"Crear un borrador de partitura"

  }
};


function set_lang(dictionary) {

  document.querySelectorAll("[data-translate]").forEach(function(element) {
    if (element.nodeName === "INPUT" || element.nodeName === "TEXTAREA") {
      // element.placeholder = dictionary[element.dataset.translate];
      console.log('setlang found a Textarea');
    } else {
      element.innerHTML = dictionary[element.dataset.translate];
      console.log('setlant didnt found a Textarea');  

    }
  });

  // para estructura [lang]
  // document.querySelectorAll("[lang]").forEach(function(element) {
    // element.innerHTML = dictionary[element.dataset.translate];
    // consol.log('traducido', element.dataset.translate);
  // });
}

function selectText(lang) {
  switch (lang) {
    case "en":
      // langs.forEach(element => (element.style.display = "none"));
      // langen.forEach(element => (element.style.display = "block"));
      set_lang(dictionary.en);
      globalLang = "en";
      break;
    case "fr":
      // langs.forEach(element => (element.style.display = "none"));
      // langfr.forEach(element => (element.style.display = "block"));
      set_lang(dictionary.fr);
      globalLang = "fr";
      break;
    case "es":
      // langs.forEach(element => (element.style.display = "none"));
      // langes.forEach(element => (element.style.display = "block"));
      set_lang(dictionary.es);
      globalLang = "es";
      break;
    default:
      // langs.forEach(element => (element.style.display = "none"));
      // langen.forEach(element => (element.style.display = "block"));
      set_lang(dictionary.en);
      globalLang = "en";
  }
}

let savedLang = localStorage.getItem("lang");
if (savedLang) {
  let element = document.querySelector(`option[value='${savedLang}']`);
  element.selected = true;
  selectText(savedLang);
  console.log("lenguaje en localstorage: LANG " + savedLang);
} else {
  console.log("NO hay LANG GUARDADO, muestra default lang: en ");
  langs.forEach(element => (element.style.display = "none"));
  langen.forEach(element => (element.style.display = "block"));
  // set_lang(dictionary.en);
  globalLang = "en";
}

// Swap languages when menu changes
let langswitch = document.getElementById("langswitch");
langswitch.onchange = function() {
  var lang = this.value;
  localStorage.setItem("lang", lang);
  selectText(lang);
};




/*********************************************************************************************
.) DRAFT FUNCTIONS
**********************************************************************************************/
// createScoreDraft
createDraft = async ( title, desc, img, score, user, userAddress ) => {
  
  resetDraftform();// 0-reset the ui (just in case...)

  // 1. display the alert to set the title!
  const { value: titlex } = await Swal.fire({
    title: dictionary[globalLang]["enterYourTitle"],
    input: "text",
    inputLabel: dictionary[globalLang]["youCanChangeItLater"],
    inputPlaceholder: dictionary[globalLang]["enterYourTitle"],
      imageUrl: 'img/undraw_content_team_3epn.svg',
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: 'Custom image',
    
  });

  if (titlex) {
    console.log(titlex);

    // prepare UI
    $(".main-container").scrollTop(0);
    boxes.css("display","none"),     
   $(".scoreDraft-box").css("display","flex");

   setTimeout(() => {
      textCreateItemName.value = titlex;
    }, 300);

    const Drafts = Moralis.Object.extend("Drafts");
    const draft = new Drafts();
    draft.set("title", titlex);
    draft.set("description", desc);
    draft.set("image", img);
    draft.set("score", score);
    draft.set("draftedByAddr", currentAddress); //link address to this draft
    draft.set("draftedByUserId", currentUser); // link user id to this draft
    // draft.set("collabAddr", collabAddr); //address of collab artist (artistB)
    // draft.set("collabBool", collabBool); //true means yes pay him, false means no.
    await draft.save().then(
      draft => {
        
        Toast.fire(
          " ",
          " Your draft " + titlex + "  was saved successfully.",
          "success"
        );
      },
      error => {
        alert("Failed to create new object, with error code: " + error.message);
        Toast.fire({
          icon: "error",
          title: "Error: " + error.message
        });
      }
    );
    currentDraft = draft; //create global variable
    globalObjectId = draft.id;
    console.log('draft created:',draft);

    return draft;
  }
};



updateDraft = async (draft, key, value, length) => {
  if (key === "title") {
    console.log("title", value, " was set");
    draft.set("title", value);
    setTimeout(() => {
      // document.getElementById("loginfo").innerHTML = "";
      getSavedDrafts(currentAddress);
    }, 1000);
  }
  if (key === "desc") {
    draft.set("description", value);
    console.log("desc", value, " was set");
  }
  if (key === "image") {
    draft.set("image", value);
    console.log("img", value, " was set");
  }
  if (key === "score") {
    draft.set("score", value);
    console.log("score", value, " was set");
  }
  if (key === "price") {
    draft.set("price", value);
    console.log("price", value, " was set");
  }
  // if (key === "collabAddr") {
  //   draft.set("collabAddr", value);
  //   console.log("collabAddr", value, " was set");
  // }

  // if (key === "collabBool") {
  //   draft.set("collabBool", value);
  //   console.log("collabBool", value, " was set");
  // }

  // if (key === "giftDesc") {
  //   draft.set("giftDesc", value);
  //   console.log("giftDesc", value, " was set");
  // }

  // if (key === "giftBool") {
  //   draft.set("giftBool", value);
  //   console.log("giftBool", value, " was set");
  // }

  await draft.save().then(
    draft => {
      // ACA reparar el problema de multiples logs (uno por cada track) al actualizar 1 track
      console.log("Updated: " + draft.id);
      Toast.fire(
        " ",
        " Your draft " + draft.id + "  was saved successfully.",
        "success"
      );
    },
    error => {
      alert("Failed to create new object, with error code: " + error.message);
    }
  );
};

destroyDraft = async objectId => {
  Swal.fire({
    title: dictionary[globalLang]["areYourSure"],
    text: dictionary[globalLang]["youWontBeAbleToReverThis"],
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: dictionary[globalLang]["yesDeleteIt"]
    // confirmButtonText: "Yes, delete it!"
  }).then(result => {
    if (result.isConfirmed) {
      console.log(this);
      const Drafts = Moralis.Object.extend("Drafts");
      const query = new Moralis.Query(Drafts);
      query.get(objectId).then(
        draft => {
          draft.destroy().then(
            () => {
              document.getElementById("drafts").innerHTML = "";
              setTimeout(() => {
                getSavedDrafts(currentAddress);
              }, 1000);

              console.log("object succesfully destroyed");
              Swal.fire({
                title: "destroyed!",
                icon: "success",
                html: 'Your draft was successfuly destroyed.'
              });

            },
            error => {
              alert(
                "Failed to create new object, with error code: " + error.message
              );
            }
          );
        },
        error => {}
      );
    }
  });
};

deleteItemInDraft = async (draft, key) => {
  draft.unset(key);
  draft.save();
};

saveNFTDraft = async draft => {
  await draft.save().then(
    draft => {
      saveDraft.disabled = true; //desactiva el boton hasta el proximo cambio para guardar
      Toast.fire(" ", " Your draft was saved successfully.", "success");
    },
    error => {
      console.log(
        "Failed to create new object, with error code: " + error.message
      );
    }
  );
};



// when user click on draft icon
restoreDraft = async objectId => {

   // prepare UI
   resetDraftform();
   $(".main-container").scrollTop(0);
   boxes.css("display","none"),     
  $(".scoreDraft-box").css("display","flex");
  
  const Drafts = Moralis.Object.extend("Drafts");
  const query = new Moralis.Query(Drafts);
  query.get(objectId).then(
    draft => {

      // RECONSTRUYE NFT DRAFT
      globalObjectId = objectId;
      currentDraft = draft; //create global variable
      let updatedAt = draft.updatedAt;
      let acl = draft.getACL();
      let title = draft.get("title");
      let description = draft.get("description");
      let image = draft.get("image");
      let price = draft.get("price");
      let score = draft.get("score");
      // let collabAddr = draft.get("collabAddr");
      // let collabBool = draft.get("collabBool");
      // let giftDesc = draft.get("giftDesc");
      // let giftBool = draft.get("giftBool");

      console.log( "#338: objectID: ", globalObjectId, " last Updated on:", updatedAt, "\n", "ACL", acl, "\n", title, "\n", description, "\n", price, "\n", image, "\n", score );
      textCreateItemName.value = title;
      descriptionTextarea.value = description;
      txtCreatItemDescription.dataset.replicatedValue = description;
      nftDistroImg.src = image;

      if (image === undefined) {
console.log('image UNDEFINED');
nftDistroImg.src = '512x720.svg';
      }
   

      // PRICE
      if (price === undefined) {
        console.log("UPS...undefined Price");
        // return draft
      } else {
        NFTMintPrice.value = price[0];
        currencySelect.value = price[1];
        priceConversor(price[0], price[1]);
      }

      // SCORE
      if (score === undefined) {
        console.log("UPS, undefined score");
        return draft;
      } else {
    rebuildScoreInUI(score); //create los tracks en la UI
    addScoreBtn.innerHTML=`<i class="fa-solid fa-check"></i>`;
    addScoreBtn.disabled = true; //activa el boton de minting
      }

      // });

      return draft;
    },
    error => {}
  );
};


getSavedDrafts = async userAddress => {
  console.log("... getin saved drafts... ");
  drafts.innerHTML ='';//clears the UI
  const Drafts = Moralis.Object.extend("Drafts");
  const query = new Moralis.Query(Drafts);
  query.equalTo("draftedByAddr", userAddress); // muestra el draft al usuario si su address esta en esta tabla: "draftedByAddr"
  const draft = query.find();
  const results = await query.find();
  if (results.length == 0) {
    console.log("Nothing created yet?!... Go and create something!");
    
    // add bannerScoreMinter
    document.getElementById("drafts").innerHTML = bannerScoreMinter;

  } else { //if result is not ZERO

    results.forEach(function(elem, idx) {
      let objectId = JSON.stringify(elem.id);
      // document.getElementById("loginfo").innerHTML +=
      document.getElementById("drafts").innerHTML +=
      "<div class='project-box-wrapper' onclick='restoreDraft(" + objectId + ")'><div class='project-box' >   <div class='project-box-content-header'><p class='box-content-header'>"+ elem.get("title") + "</p><p class='box-content-subheader'>"+ elem.id+ "</p></div> <div class='project-box-footer'>  <button onclick='event.stopPropagation();destroyDraft(" + objectId + ")'class='fa fa-trash trash'></button> </div> </div></div>";        


      console.log(idx + 1, elem.get("title"), elem.id);
    });
  }
  return draft;
};




/*********************************************************************************************
.) RENDER FUNCTIONS
**********************************************************************************************/
function renderInventory(NFTs){
  const parent = document.getElementById("inventory");
  const insideContent = document.getElementById("overlay");
  for (let i=0; i < NFTs.length; i++){

  const nft = NFTs[i];
  let htmlString =`
    <div class="itemCard">
    <img class="box__img" src="testimgs/spscore.jpg" alt="Some image"/>
    <h1>TITLE</h1>
    <h2>Artist</h2>
  </div>
  `

 

  let col = document.createElement("a");
  col.className = "grid__item";
  col.href = "#preview-"+`${nft.token_id}`;
  col.id = `${nft.token_id}`;//truco poner el nftId en el id del item (a tag)
  col.innerHTML = htmlString;
  parent.appendChild(col);

// OVERLAY
  let htmlStringOverlay =`
  <div class="itemCardOverlay">
    <img class="box__img box__img--original" src="testimgs/spscore.jpg" alt="Some image"/>
    </div>
    <div  class="overlay__content">
 
      <div class="base-container">
        <h2 class="fragment-title">Score Details</h2>
        <hr class="line">
        <div class="contenedor">
              <div class="fragment">
                <div class="fragment-left">Date Pressed</div>
                <div class="fragment-right">January 10, 2022</div>
              </div>

              <div class="fragment">
                <div class="fragment-left">Format</div>
                <div class="fragment-right">.pdf</div>
              </div>

              <div class="fragment">
                <div class="fragment-left">Number of Owners: </div>
                <div class="fragment-right">12</div>
              </div>

              <div class="fragment">
                <div class="fragment-left">Amount: </div>
                <div class="fragment-right">122</div>
              </div>
        </div>
    </div>


    <div>
<input type="checkbox" class="read-more-state" id="post-1">
  <p class="read-more-wrap">
  Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
  <span class="read-more-target">
    Libero fuga facilis vel consectetur quos sapiente deleniti eveniet dolores tempore eos deserunt officia quis ab? Excepturi vero tempore minus beatae voluptatem!
  </span>
</p>
<label for="post-1" class="read-more-trigger"></label> 
</div>


 

<div class="css-11yng0d">
<div class="css-uq1pv2">
    <div class="css-17dn726">
      <div class="css-srfghl">Reserve price</div>
      <div class="css-1amv5te">2 ETH</div>
    </div>
</div>

<div class="css-oelb99">
<div class="css-vurnku">
<div class="css-17iuz34">
<div class="css-ykwscm">

<div class="css-s0d50b">Creator share</div>
<span class="css-1iub3os">
<img src="/img/tooltip.svg" data-tip="true" data-for="creator-share-tip" width="15" height="15" class="css-1fjq9wd" currentitem="false" title="Artists set a creator share before they press a record. The creator share is a percentage that goes back to the artist every time their record is resold.">

</span>
</div>

<div class="css-mqozvt">10%</div>

</div>
<hr class="css-1gs2o4l">
</div>
<div class="css-vurnku">
<div class="css-17iuz34">
<div class="css-ykwscm">
<div class="css-s0d50b">Current owner</div>
</div>
<div class="css-mqozvt">
<a class="css-bxnau2">@xunorus</a>
</div>
</div>
</div>
</div>
<div class="css-17dn726">
  <button class="css-11mr83m">
    <div class="css-w3icib">Place bid</div>
  </button>
</div>
</div>



    </div>
    `

 

  let overlay = document.createElement("div");
  overlay.className = "overlay__item";
  overlay.id="preview-"+`${nft.token_id}`;
  overlay.innerHTML = htmlStringOverlay;
  insideContent.appendChild(overlay);
  }
}



/*********************************************************************************************
.) NETWORK FUNCTIONS
**********************************************************************************************/
// CHECK NETWORK
checkNetwork = () => {
  web3.eth.getChainId().then(networkId => {
    console.log("network", networkId);
    if (networkId != 80001) {
      console.log("CHANGE YOUR NETWORK TO MUMBAI or RINKEBY");

      fixedToast.fire({
        icon: "warning",
        confirmButtonText:"YES",
        title: "Wrong network: " + "Use Mumbai testnet. Do you want to change it?" // title: dictionary[globalLang]["urlCopied"]
      }).then((result) => {
        if (result.isConfirmed) {
          console.log('CONFIRMED: we are changing or adding mumabi matic');
          switchNetworkMumbai();
        }
    })

    }
  });
};

// ADD MUMBAI TO METAMASK
const switchNetworkMumbai = async () => {
  try {
    await web3.currentProvider.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x13881" }],
    });
  } catch (error) {
    if (error.code === 4902) {
      try {
        await web3.currentProvider.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: "0x13881",
              chainName: "Mumbai",
              rpcUrls: ["https://rpc-mumbai.matic.today"],
              nativeCurrency: {
                name: "Matic",
                symbol: "Matic",
                decimals: 18,
              },
              blockExplorerUrls: ["https://explorer-mumbai.maticvigil.com"],
            },
          ],
        });
      } catch (error) {
        alert(error.message);
      }
    }
  }
}




/*********************************************************************************************
.) MINT TRANSFER AND BURN FUNCTIONS
**********************************************************************************************/


   ///////////////////////////////////
   // SUBMIT MINT
   //////////////////////////////////

   async function submit() {
    console.log('submit clicked');

    let user = Moralis.User.current();
    if (!user) {
      Swal.fire('Connect!', 'you have to connect your wallet to perform this action!', 'info');
      console.log('User address: ', userAddress)
    }


    if (nftName.value.length == 0) {
      alert("Please this NFT a name");
      return;
    } else if (nftDesc.value.length == 0) {
      alert("Please enter a description");
      return;
    } else if (nftimg.files.length == 0) {
      alert("Please upload an image for this NFT");
      return;
    } else if (vidLink.value.length == 0) {
      alert("Please enter a video link");
      return;
    } else if (geoInfo.value.length == 0) {
      alert("Please geo coordinates like: [83258258297137, 2.3616745019412626]");
      return;
    } else if (qrlink.value.length == 0) {
      alert("Please enter the qr link for this experience");
      return;
    }


    //get image data
    // const input = document.querySelector('#nftimg');
    let data = nftimg.files[0];

    // upload image to ipfs
    // https://docs.nftport.xyz/docs/nftport/b3A6MjE0MDYzNzY-upload-a-file-to-ipfs
    const imageFile = new Moralis.File(data.name, data);
    await imageFile.saveIPFS();
    console.log('ipfs: ',imageFile.ipfs(),'hash: ', imageFile.hash());

    let imageHash = imageFile.hash();
   //  let imageLink = "ipfs://" + imageHash;
    let imageLink = "https://ipfs.io/ipfs/" + imageHash;
    
   //  let imageLinknftport = "/ipfs/" + imageHash;

    // SHOW OPERATION DETAILS;
    document.querySelector('#success_message').innerHTML += `File uploaded to IPFS:<i class="fa fa-check" aria-hidden="true"></i><br> ${imageLink} .<br> <a target="_blank" href="${imageLink}">view FILE</a><br><br>`;
    document.querySelector('#success_message').style.display = 'block';

    // CONTINUE TO UPLOAD METADATA
    let metadata = {
      name: nftName.value,
      description: nftDesc.value,
      image: imageLink,
      video: vidLink.value,
      geoInfo: geoInfo.value,
      qrLink: qrlink.value
    };

    console.log('metadata: ', metadata);


    // UPLOAD METADATA TO IPFS
    const jsonFile = new Moralis.File('metadata.json', {
      base64: btoa(JSON.stringify(metadata))
    });
    await jsonFile.saveIPFS();
    let metadataHash = jsonFile.hash();
   //  let metadataLink = "ipfs://" + metadataHash;
    let metadataLink = "https://ipfs.io/ipfs/" +  metadataHash;
    
    // let metadataLinknftport = "/ipfs/" + metadataHash;
    console.log(metadataHash);

    // SHOW OPERATION DETAILS;
    document.querySelector('#success_message').innerHTML += `Metadata uploaded to IPFS:<i class="fa fa-check" aria-hidden="true"></i><br> ${metadataLink} .<br> <a target="_blank" href="${metadataLink}">view METADATA</a>`;

    /*********************************************************************************************
     .) //CUSTOMIZABLE MINTING NFT with NFTPORT
     // https://nftport.stoplight.io/docs/nftport/b3A6MjE2NjM5MDI-customizable-minting
    **********************************************************************************************/

    
   const CHAIN = "polygon";

    const settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://api.nftport.xyz/v0/mints/customizable",
      "method": "POST",
      "headers": {
        "Content-Type": "",
        "Authorization": `${NFTPORT_KEY}`
      },
      "processData": false,
      "data": `{\n  \"chain\": \"${CHAIN}\",\n  \"contract_address\": \"${TOKEN_CONTRACT_ADDRESS}\",\n  \"metadata_uri\": \"${metadataLink}/\",\n  \"mint_to_address\": \"${TO_ADDRESS}\"\n}`
    };

    $.ajax(settings).done(function (response) {
      console.log(response);

        // SHOW OPERATION DETAILS;
    document.querySelector('#success_message').innerHTML += `<br><br>NFT created<i class="fa fa-check" aria-hidden="true"></i><br> <a target="_blank" href="${response.transaction_external_url}">check transaction</a>`;
    document.querySelector('#success_message').innerHTML += `<br>NFT owner${TO_ADDRESS}`;

    });

  }

  document.getElementById('submit_mint').onclick = submit;

//////////////////////////
// TRANSFER
function initTransferModal() {
  transferModal.style.display = "block";
  console.log('showing transfer modal');
  const urlParams = new URLSearchParams(window.location.search);
    const nftId = urlParams.get("nftId");
    console.log('nftId:', nftId);
    document.getElementById("transferToken_id_input").value = nftId;//populate input
}

async function transfer(){
  let tokenId = parseInt( document.getElementById("transferToken_id_input").value);
  let amount =  parseInt(document.getElementById("transferAmount_input").value);
  let address = document.getElementById("transferAddress_input").value;

  const options = {
  type: "erc1155",
  receiver: address,
  contractAddress: TOKEN_CONTRACT_ADDRESS,
  tokenId: tokenId,
  amount: amount,
  awaitReceipt: false // should be switched to false
}
  
  let tx = await Moralis.transfer(options);
  console.log(tx);
tx.on("transactionHash", (hash) => { 'transactionHash: ',hash })
  .on("receipt", (receipt) => { console.log('receipt: ',receipt) })
  .on("confirmation", (confirmationNumber, receipt) => { 'confirmation:', confirmationNumber, receipt })
  .on("error", (error) => { 'error: ', error });


}

// document.getElementById('transfer').onclick = transfer;

//////////////////////////
// BURN
function initBurnerModal() {
  burnerModal.style.display = "block";
  console.log('showing burner modal');
  const urlParams = new URLSearchParams(window.location.search);
    const nftId = urlParams.get("nftId");
    console.log('nftId:', nftId);
    document.getElementById("burnerToken_id_input").value = nftId;//populate input
    document.getElementById("burnerAddress_input").value = accounts[0];//populate address

}

// burn(address account, uint256 id, uint256 value)
async function burn(){
  let tokenId = parseInt( document.getElementById("burnerToken_id_input").value);
  let address = document.getElementById("burnerAddress_input").value;
  let amount =  parseInt(document.getElementById("burnerAmount_input").value);
  //define contract
  const accounts = await web3.eth.getAccounts();
  const contract = new web3.eth.Contract(contractAbi,TOKEN_CONTRACT_ADDRESS );
  contract.methods.burn(address, tokenId,amount).send({from: accounts[0], value: 0})
  .on('receipt', function(receipt){
    Swal.fire(
      'Good job!',
      'Item burned!',
      'success'
    )
  })
}

// document.getElementById('burn').onclick = burn;








// .................................
// UI FUNCTIONS

resetDraftform = () => {
  // setTimeout(() => {
    textCreateItemName.value = "";
    descriptionTextarea.value = "";
    nftDistroImg.src ='512x720.svg';
    NFTMintPrice.value = "";

    txtCreatItemDescription.value = "";
    txtCreatItemDescription.placeholder = "";
    textCreateItemName.placeholder = "";
    globalObjectId = "";
    currentDraft = "";
    currencyConversor.innerHTML="";
    myScore.innerHTML="";
    addScoreBtn.disabled = false;
    scoreid.value = "";
  selectText(savedLang);
    // addScoreBtn.innerHTML = dictionary[addScoreBtn.dataset.translate]; 
    // document.getElementById("myTracks").innerHTML = "";
    // mintsList.innerHTML = "";
    // document.getElementById("currencyConversor").innerHTML ="";

  // }, 600);
}


backToScoreDrafts = () => {
  $(".main-container").scrollTop(0);
  boxes.css("display","none"),     
 $(".second-box").css("display","flex");

//  reset formulary
resetDraftform();
 
  
};

uploadImg = async img => {
  const nftFile = new Moralis.File("nftFile.png", img);
  await nftFile.saveIPFS(); // upload to ipfs
  const nftFilePath = nftFile.ipfs();
  updateDraft(currentDraft, "image", nftFilePath);
  console.log("image uploaded to ipfs: ", nftFilePath);
};




/*********************************************************************************************
.) GET PRICES FUNCTIONS
**********************************************************************************************/

priceConversor = (mintingPrice, currency) => {
  fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${currency}&vs_currencies=usd`).then(response => {
    return response.json();
  })
    .then(data => {
      let currencyValue = data[currency].usd;
      console.log('currencyValue: ',currencyValue);
      console.log('mintingPrice: ',mintingPrice);
      let result = mintingPrice * currencyValue;
      console.log('result: ', result);
        let msg = "(aprox " + "$" + result + " USD)";
        currencyConversor.innerHTML = msg;
      },
      error => {
        console.log(error.message);
      }
    );

};


// price change
NFTMintPrice.onchange = function(event) {
  const mintingPrice = NFTMintPrice.value; //get price
  const currency = currencySelect.value; // get currency (ETH,MATIC,USD)
  console.log(mintingPrice, currency);
  priceConversor(mintingPrice, currency); // Has to do this from MUMBAI
  updateDraft(currentDraft, "price", [mintingPrice, currency]);
};

currencySelect.onchange = function(event) {
  const mintingPrice = NFTMintPrice.value; //get price
  const currency = currencySelect.value; // get currency (ETH,MATIC,USD)
  // mintprice = mintingPrice == 0 ?
  console.log(mintingPrice, currency);
  priceConversor(mintingPrice, currency); // Has to do this from MUMBAI
  // let curr = currency == 0 ? " ETH" : " MATIC"
  updateDraft(currentDraft, "price", [mintingPrice, currency]);
};



// .................................
// UPDATE single  DRAFT values 
// .................................
// ADD TITLE,  if title input has changed, then show save draft button
textCreateItemName.onchange = function() {
  const title = textCreateItemName.value;
  updateDraft(currentDraft, "title", title);
};

// ADD DESC, if description input has changed, then show save draft button
descriptionTextarea.onchange = function() {
  const desc = descriptionTextarea.value;
  updateDraft(currentDraft, "desc", desc);
};


// ADD IMG, if an image is loaded, then show save draft button
fileCreateItemFile.oninput = function() {
  console.log("img changed");

  fixedToastLoader.fire({
    html: 'Uploading image...',
    onRender: function() {
      $('.swal2-content').prepend(sweet_loader);
    }
});

  if (fileCreateItemFile.files.length == 1) {
    nftDistroImg.src = window.URL.createObjectURL(this.files[0]);
    uploadImg(this.files[0]); // upload to ipfs
    console.log('MINT is available!')
    submit_mint.disabled = false; //activa el boton de minting
  }
};


// ADD SCORE
addScoreBtn.onclick = function() {
  console.log('addScoreBtn clicked');
  document.getElementById('scoreid').click();
};

scoreid.onchange = function(event) {
  
  if (this.files[0] === undefined) {
    console.log('scoreid IS NOT DEFINED');
  addScoreBtn.classList.remove("loading");

  }
  
  if (scoreid.files.length == 1) {
    console.log('scoreid length equal 1',this.files[0]);
  addScore();
  }

}

addScore = async draft => { 
  console.log('addScore started');

  // changes state of button
  addScoreBtn.innerHTML=`<i class="fa-solid fa-sync fa-spin"></i>`;
  addScoreBtn.disabled = true; //activa el boton de minting
  fixedToastLoader.fire({
    html: 'Uploading score...',
    onRender: function() {
      $('.swal2-content').prepend(sweet_loader);
    }
});
  //
  // UPLOAD SCORE TO IPFS
  const nftScoreFile = new Moralis.File("scoreid.pdf", scoreid.files[0]);
  await nftScoreFile.saveIPFS(); // save in IFPS
  const nftScoreFilePath = nftScoreFile.ipfs(); //get ${ipfsHash}
  const nftScoreFilHash = nftScoreFile.hash(); //get ${ipfsHash}
  console.log( "track saved to IPFS. URL: ", nftScoreFilePath, " title:", "score" );
  addScoreBtn.classList.add("success");// actualiza boton
addScoreBtn.innerHTML=`<i class="fa-solid fa-check"></i>`;

  setTimeout(() => {
    // addScoreBtn.classList.remove("loading");
    addScoreBtn.classList.remove("success");
  }, 1300);

    rebuildScoreInUI(nftScoreFilePath); //create los tracks en la UI
    updateDraft(currentDraft, "score", nftScoreFilePath);
    

  };

  // preMintCheck();
  preMintCheck = () => {
//  if (collabBool == true) {
//         NFTSplitCheckbox.children[0].classList.add("activated");
//       }

// textCreateItemName.onchange = function() {
// };

// descriptionTextarea.onchange = function() {
//   const desc = descriptionTextarea.value;
//   updateDraft(currentDraft, "desc", desc);
// };

// fileCreateItemFile.oninput = function() {
//   console.log("img changed");

//   if (fileCreateItemFile.files.length == 1) {
//     nftDistroImg.src = window.URL.createObjectURL(this.files[0]);
//     uploadImg(this.files[0]); // upload to ipfs
//     mint.disabled = false; //activa el boton de minting
//   }
// };

    var price = draft.get("price");
    if (price === !undefined) {
      console.log("PRICE is set!")
    }
    if (fileCreateItemFile.files.length == 1) {
      console.log("IMG is set!")
    }
    submit_mint.disabled = false; //activa el boton de minting

  }


  rebuildScoreInUI = (nftScoreFilePath) => {
      let scoreUIBuilder =`<div class="project-box-wrapper" onclick="event.stopPropagation();viewScore('${nftScoreFilePath}')"><div class="project-box">   <div class="project-box-content-header"><p class="box-content-header">SCORE</p><p class="box-content-subheader">${nftScoreFilePath}</p></div> <div class="project-box-footer">  <button onclick="event.stopPropagation();deleteItemInDraft(&quot;9MEeHKH4uzM3CYA0Fnuhz6ti&quot;)" class="fa fa-trash trash"></button> </div> </div></div>`;
      document.getElementById("myScore").innerHTML = scoreUIBuilder;

}

function viewScore(pdf){
  window.open(pdf);
  return false;
}


/*********************************************************************************************
 .) NFTPORT 
**********************************************************************************************/
////////////////////////////////////////
// retriebe all nfts per contract
const NFTPORT_KEY = '29acf337-4c53-4b4b-a800-99fbf4a448d4';
const CHAIN = "polygon";

const TOKEN_CONTRACT_ADDRESS = "0x38a6857ea5ECc690797910F4786678D82C6558F3"; // creado con nftport owner yo con wallet scoreMinter(0x250317D3C001c68018ff333e75Bbdd9699fcE78E)

const parent = document.getElementById("inventory");
const insideContent = document.getElementById("overlay");

// RETRIEVE NFTs
const settings = {
  "async": true,
  "crossDomain": true,
  "url": `https://api.nftport.xyz/v0/nfts/${TOKEN_CONTRACT_ADDRESS}?chain=${CHAIN}`,
  "method": "GET",
  "headers": {
    "Content-Type": "application/json",
    "Authorization": `${NFTPORT_KEY}`
  }
};

$.ajax(settings).done(function (response) {
  console.log('TOTAL NFTs: ', response.nfts.length);
  console.log('nft info:', response);

  // LOOP EACH NFT
  for (var i = 0; i < response.nfts.length; i++) {
    let token = response.nfts[i].token_id,
      caddr = response.nfts[i].contract_address,
      chain = response.nfts[i].chain;



    // API call: retriebe NFT's metadata 
    const settings = {
      "async": true,
      "crossDomain": true,
      "url": `https://api.nftport.xyz/v0/nfts/${caddr}/${token}?chain=${chain}&refresh_metadata=true`, // refreshing_metadata
      "method": "GET",
      "headers": {
        "Content-Type": "application/json",
        "Authorization": `${NFTPORT_KEY}`
      }
    };

    $.ajax(settings).done(function (x) {
      console.log('x: ', x)
      let name = x.nft.metadata.name;
      let artist = x.nft.metadata.artist;
      let description = x.nft.metadata.description;
      let image = x.nft.metadata.image;
      // let image = x.nft.cached_file_url; // cached file, recommended byNiladri | Data Scientist@NFTPort
      let token = x.nft.token_id;
      let contract = x.nft.contract_address;
      let chain = x.nft.chain;
      
      // MAINSCREEN ( NFT as displayed on main screen)
      let htmlString =`
    <div class="itemCard">
    <img class="box__img" src="${image}" alt="Some image"/>
    <h1>${name}</h1>
    <h2>${artist}</h2>
  </div>
  `
  
  
      let col = document.createElement("a");
      col.className = "grid__item";
      col.href = "#preview-" + `${token}`;
      col.id = `${token}`; //truco poner el nftId en el id del item (a tag)
      col.innerHTML = htmlString;
      parent.appendChild(col);

      // OVERLAY (screen showed when click on NFT)
      let htmlStringOverlay = ` 
      <div class="box">
        <div class="box__shadow"></div>
        <img class="box__img box__img--original" src="${image}" alt="Some image"/> 
        <h4 class="box__text box__text--bottom"><span class="box__text-inner box__text-inner--rotated1">id:${token}</span></h4> 
      </div> 
      <div  class="overlay__content"> 
        <h3 class="box__title box__title--straight box__title--bottom"><span class="box__title-inner">${name}</span></h3>
        <p class="box__content">${description} <br><br>
          <a target="_blank" href=" https://maps.google.com/?q=${x.nft.metadata.geoInfo}">GeoInfo</a><br><br>
          <a target="_blank" href="${x.nft.metadata.video}">Video</a><br><br>
          <a target="_blank" href="${x.nft.metadata.qrLink}">Experience</a><br><br>
        </p>
     <p id='${token}' > </p> 
     </div> 
    <div class="wrapper" onclick="event.stopPropagation();initBuy();"> <a class="cta" href="#"> 
    <span>BID</span> 
    <span> <svg width="66px" height="43px" viewBox="0 0 66 43" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g id="arrow" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <path class="one" d="M40.1543933,3.89485454 L43.9763149,0.139296592 C44.1708311,-0.0518420739 44.4826329,-0.0518571125 44.6771675,0.139262789 L65.6916134,20.7848311 C66.0855801,21.1718824 66.0911863,21.8050225 65.704135,22.1989893 C65.7000188,22.2031791 65.6958657,22.2073326 65.6916762,22.2114492 L44.677098,42.8607841 C44.4825957,43.0519059 44.1708242,43.0519358 43.9762853,42.8608513 L40.1545186,39.1069479 C39.9575152,38.9134427 39.9546793,38.5968729 40.1481845,38.3998695 C40.1502893,38.3977268 40.1524132,38.395603 40.1545562,38.3934985 L56.9937789,21.8567812 C57.1908028,21.6632968 57.193672,21.3467273 57.0001876,21.1497035 C56.9980647,21.1475418 56.9959223,21.1453995 56.9937605,21.1432767 L40.1545208,4.60825197 C39.9574869,4.41477773 39.9546013,4.09820839 40.1480756,3.90117456 C40.1501626,3.89904911 40.1522686,3.89694235 40.1543933,3.89485454 Z" fill="#FFFFFF"></path> <path class="two" d="M20.1543933,3.89485454 L23.9763149,0.139296592 C24.1708311,-0.0518420739 24.4826329,-0.0518571125 24.6771675,0.139262789 L45.6916134,20.7848311 C46.0855801,21.1718824 46.0911863,21.8050225 45.704135,22.1989893 C45.7000188,22.2031791 45.6958657,22.2073326 45.6916762,22.2114492 L24.677098,42.8607841 C24.4825957,43.0519059 24.1708242,43.0519358 23.9762853,42.8608513 L20.1545186,39.1069479 C19.9575152,38.9134427 19.9546793,38.5968729 20.1481845,38.3998695 C20.1502893,38.3977268 20.1524132,38.395603 20.1545562,38.3934985 L36.9937789,21.8567812 C37.1908028,21.6632968 37.193672,21.3467273 37.0001876,21.1497035 C36.9980647,21.1475418 36.9959223,21.1453995 36.9937605,21.1432767 L20.1545208,4.60825197 C19.9574869,4.41477773 19.9546013,4.09820839 20.1480756,3.90117456 C20.1501626,3.89904911 20.1522686,3.89694235 20.1543933,3.89485454 Z" fill="#FFFFFF"></path> <path class="three" d="M0.154393339,3.89485454 L3.97631488,0.139296592 C4.17083111,-0.0518420739 4.48263286,-0.0518571125 4.67716753,0.139262789 L25.6916134,20.7848311 C26.0855801,21.1718824 26.0911863,21.8050225 25.704135,22.1989893 C25.7000188,22.2031791 25.6958657,22.2073326 25.6916762,22.2114492 L4.67709797,42.8607841 C4.48259567,43.0519059 4.17082418,43.0519358 3.97628526,42.8608513 L0.154518591,39.1069479 C-0.0424848215,38.9134427 -0.0453206733,38.5968729 0.148184538,38.3998695 C0.150289256,38.3977268 0.152413239,38.395603 0.154556228,38.3934985 L16.9937789,21.8567812 C17.1908028,21.6632968 17.193672,21.3467273 17.0001876,21.1497035 C16.9980647,21.1475418 16.9959223,21.1453995 16.9937605,21.1432767 L0.15452076,4.60825197 C-0.0425130651,4.41477773 -0.0453986756,4.09820839 0.148075568,3.90117456 C0.150162624,3.89904911 0.152268631,3.89694235 0.154393339,3.89485454 Z" fill="#FFFFFF"></path> </g> </svg> </span> </a> 
    <div class='actions'> 
    <button  onclick="event.stopPropagation();initUpdaterModal();"  ><span>Update</span> </button> 
    <button  onclick="event.stopPropagation();initTransferModal();" > <span>Transfer</span>  </button> 
    <button  onclick="event.stopPropagation();initBurnerModal();" > <span>Burn</span>  </button> </div> </div> `
      let overlay = document.createElement("div");
      overlay.className = "overlay__item";
      overlay.id = "preview-" + `${token}`;
      overlay.innerHTML = htmlStringOverlay;
      insideContent.appendChild(overlay);
      // console.log('parece que cargo todo');
      iniciar(); // starts demo.js
    });

    // GET OWNER (hack)
    console.log('tokenid', token);
    getOwner(token, token);


  }
});




let bannerScoreMinter = `  <div class="bg-orange-200 mb-10 p-6 rounded-lg shadow">

<div class="md:flex">
  <div class="md:w-1/2">
    <h2 class="text-xl md:text-2xl font-bold text-gray-800 mb-2 leading-tight"
      data-translate="startCreatingSM">Start creating with ScoreMinter!</h2>

    <p class="text-gray-700 mb-4" data-translate="whatIsSM">ScoreMinter - is a decentralized autonomous
      organization to mint, sell and distribute music scores.</p>


    <button
      class="shadow inline-flex items-center bg-blue-500 hover:bg-blue-600 focus:outline-none focus:shadow-outline text-white font-semibold py-2 px-4 rounded-lg"
      onclick="createDraft()" title="Add New Project"  >
      <svg xmlns="http://www.w3.org/2000/svg" class="mr-2 w-5 h-5" viewBox="0 0 24 24" stroke-width="2"
        stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <rect x="0" y="0" width="24" height="24" stroke="none"></rect>
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
      </svg>
      <span data-translate='create'> Create </span>
   
    </button>
  </div>
  <div class="md:w-1/2">

    <svg class="w-64 h-48 object-cover mx-auto" id="f61e7f2c-3df8-44b9-b514-d2b672d0e0d5" data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1100.99998 666.0509">
      <title>compose music</title>
      <circle cx="985.58" cy="371.09" r="21.63" fill="#6c63ff" opacity="0.1" />
      <circle cx="1062.95" cy="274.65" r="36.25" fill="#6c63ff" opacity="0.1" />
      <circle cx="455.32" cy="27.78" r="21.63" fill="#6c63ff" opacity="0.1" />
      <circle cx="703.43" cy="52.64" r="21.63" fill="#6c63ff" opacity="0.1" />
      <circle cx="36.25" cy="326.22" r="36.25" fill="#6c63ff" opacity="0.1" />
      <path
        d="M658.51,206.77c-64.72-2.41-126.36-24.85-185.22-49.41S356.12,105.61,293,92.6c-40.63-8.37-87.09-9.56-119.83,13.84C141.62,129,131.44,167.83,126,203.89c-4.12,27.14-6.54,55.7,4.74,81.1,7.83,17.64,21.74,32.46,31.36,49.35,33.47,58.78,9.81,131.27-26.46,188.66-17,26.92-36.74,52.6-49.87,81.26S66.54,665.76,78,695c11.38,29,38.51,50.74,67.9,66,59.69,31.09,130,40,198.61,45,151.82,11.16,304.46,6.33,456.69,1.49,56.33-1.79,112.92-3.61,168.34-13,30.78-5.2,62.55-13.45,84.89-33.36,28.37-25.27,35.4-68.07,16.39-99.76-31.88-53.16-120-66.37-142.31-123.42-12.26-31.4.33-66.38,18.16-95.5,38.23-62.48,102.33-117.29,105.7-188.71,2.32-49-28.49-98.16-76.13-121.37-49.94-24.33-119.18-21.27-156,19C782.32,193,715.65,208.91,658.51,206.77Z"
        transform="translate(-50.4 -87.11)" fill="#6c63ff" opacity="0.1" />
      <path
        d="M872.34,482.75a5.91,5.91,0,0,0,1.33,3.46,19.66,19.66,0,0,0,5.32,4.52v5.42s16,13.37,19.29,18.42c3.17,4.82,6.41,9.73,10.92,13.32a9.85,9.85,0,0,0,4.07,2.16l.27,0a4.23,4.23,0,0,1-1.56,1,3.7,3.7,0,0,0,4.36,3.13,7.29,7.29,0,0,0,2.16-1.08l6.34-4.1a18.16,18.16,0,0,0,2.95-2.21c1.18-1.19,2-2.68,3.16-3.9,2-2.08,4.84-3.32,6.23-5.82.87-1.56,1-3.41,1.56-5.12.35-1.12.86-2.18,1.2-3.3a11.93,11.93,0,0,0,.41-2.06c.22.19.45.38.69.56.49-.32,1.43.52,1.21,1.06s-.75.93-.93,1.49c-.4,1.28,1.18,2.23,1.84,3.4s.32,2.67.39,4,.68,2.93.87,4.42c.46,3.48-1.26,7.15,0,10.44a3.29,3.29,0,0,0-3.25,2.53,9.58,9.58,0,0,0,.13,4.45,6.12,6.12,0,0,0-3,5.59,1.37,1.37,0,0,1-.14,1,1.42,1.42,0,0,1-.57.33,5.64,5.64,0,0,0-3.48,5.24,2.6,2.6,0,0,1-.1,1.11,2.63,2.63,0,0,1-.82.84,6.52,6.52,0,0,0-2.43,5.1,3.7,3.7,0,0,0,1.72,3.34l.07,0a18,18,0,0,0-6,11.39,46.76,46.76,0,0,0,.78,11.79l.36,0c0,.11,0,.18,0,.17s0,.08,0,.12a5.25,5.25,0,0,0,.57,1.7,24.36,24.36,0,0,1,2.15,8.76,7.76,7.76,0,0,0,.3,2.21,11.14,11.14,0,0,0,1.13,1.94c1.33,2.17,1.64,4.79,2.09,7.3a57.72,57.72,0,0,0,2.55,9.57c1.53,4.24,3.59,8.58,2.89,13a13,13,0,0,0-.4,3.21,9.39,9.39,0,0,0,1.26,3.37c.51,1,1,2.06,1.4,3.12a2.52,2.52,0,0,0,.62,1.69c.12.33.22.67.32,1s.17.53.25.8a10.32,10.32,0,0,1,.31,1.36l-.06,1.05,0,1a2.49,2.49,0,0,1-.48.89,3.58,3.58,0,0,1-.26.29l-.24.27a1.8,1.8,0,0,0-.27.39h0a1.87,1.87,0,0,0-.08,1.15c0,.15.06.3.1.45.25,1.08.52,2.16.79,3.23.08.33.17.65.25,1,.22.84.44,1.69.67,2.53l0,.11.15.56.57,2.06c.12.41.24.81.35,1.22l.44,1.49q.51,1.74,1.05,3.48c3.57,11.78,7.4,23.49,9.76,35.57a3.83,3.83,0,0,0,1.43,2.14,8.24,8.24,0,0,0,2.49,1.34c.23,1.77.8,3.93.87,5,.22,3.49.38,7.21-.89,10.39a.84.84,0,0,0-.76.24,31,31,0,0,0-2.29,2.43l-4.69,5a7.75,7.75,0,0,0-1.06,1.29,4.51,4.51,0,0,0-.45,3.69,5,5,0,0,0,2.41,2.86,4,4,0,0,1,.76.43,4.51,4.51,0,0,0,.47.4,1.82,1.82,0,0,0,1,.19,35.71,35.71,0,0,0,7.87-1.34,6.31,6.31,0,0,0,3.25-1.53,6.08,6.08,0,0,0,1.11-2.16l.94-2.6a29.61,29.61,0,0,0,1.43-4.85,10,10,0,0,0-.25-5,1,1,0,0,0-.24.41c.23-1.45.45-2.91.68-4.37.07-.43.13-.87.19-1.32.3,3.89-.27,7.81-.09,11.71a13.65,13.65,0,0,0-.39,2.19c.26,3.58,1.75,7.49,4.64,9.62a4.75,4.75,0,0,0,1.59.83,5.62,5.62,0,0,0,1.64,0,20.9,20.9,0,0,0,6.24-1.18,7.67,7.67,0,0,0,4.49-4.26,10,10,0,0,0,.45-3.08,11.83,11.83,0,0,0-.29-3.25,24.79,24.79,0,0,0-1.64-3.79,36.17,36.17,0,0,1-1.86-5.58l-.87-3.17c-.24-.9-.49-1.8-.8-2.68a4.49,4.49,0,0,0-1.11-2.11c-.36-.28-.6-.3-.76-.14,0-.12,0-.23,0-.34a35.86,35.86,0,0,0,.23-3.71c-.24-2-1.83-3.63-2.86-5.41a10.56,10.56,0,0,1-1.14-2.86c-.06-.22-.1-.43-.14-.66a2.33,2.33,0,0,1,.57-.37l1.78,1c-1.57-11.8-.74-24.17-5.32-35.15-2-4.78-5.85-9.76-5.42-14.91a4.2,4.2,0,0,1,.47-6.7c.77-.42,1.72-.62,2.25-1.33a3.63,3.63,0,0,0,.51-1.29,204.58,204.58,0,0,1,9.88-29.65c.89-2.11,1.81-4.2,2.74-6.29l3.1-7.05,3.78-8.58c1.28-2.89,2.57-6.19,1.36-9.1-.48-1.15-1.33-2.24-1.21-3.47a21.78,21.78,0,0,1,.74-2.29,5.7,5.7,0,0,0-.19-2.49c-.25-1.08-.53-2.16-.82-3.23a18,18,0,0,1,2.41.46c.48-.81-.29-1.75-.76-2.57a8.69,8.69,0,0,1-.87-3.57l-1-10.09a17.9,17.9,0,0,1-.08-4.2c.2-1.48.77-2.89,1.06-4.37.55-2.83,0-5.75.18-8.64a38.74,38.74,0,0,1,1.32-7.52c.09-.37.17-.73.26-1.1a6,6,0,0,0,1.45.25h.49l.15,0,.4,0,.2,0a4,4,0,0,0,.55-.14l.12,0a6,6,0,0,0,.59-.23c-.24-.51-.46-1-.67-1.54-.09-.21-.17-.42-.25-.63s-.23-.59-.33-.89-.2-.55-.29-.82-.15-.46-.22-.69-.19-.63-.28-1-.18-.66-.27-1L996,516a8.77,8.77,0,0,0,1.65,1.13c2,3.45,3.81,7,5.48,10.58a3.36,3.36,0,0,0,.51-1.29,6.19,6.19,0,0,0,.71.91,10.6,10.6,0,0,0,2.33,1.71,6,6,0,0,0,2.76,1,5.15,5.15,0,0,0,3.53-1.53c2.91-2.55,4.36-6.34,5.71-10a75.29,75.29,0,0,0,4.3-14.73c.82-5.43.47-11.07,2-16.34-1.39-2.76-2.27-5.81-3.83-8.48a37.92,37.92,0,0,1-2.64-4.95,17.1,17.1,0,0,1-.47-11.44,1.57,1.57,0,0,0-1.83.1,3.83,3.83,0,0,0-1.1,1.6,14.19,14.19,0,0,0-1.09,6.72,2.68,2.68,0,0,1-.19,1.64,2.06,2.06,0,0,1-1.78.75,15.34,15.34,0,0,1-4.12-.75,38.28,38.28,0,0,0-11.48-1.12,9.11,9.11,0,0,0-1-1l-.43-.35-.44-.34-.22-.18a5,5,0,0,1-.42-.37,2.77,2.77,0,0,1-1-1.75,2.25,2.25,0,0,1,0-.26,1.94,1.94,0,0,1,0-.24,3.38,3.38,0,0,1,.23-.7,4.71,4.71,0,0,1,.22-.45l.11-.23c0-.07.07-.15.11-.22a6.59,6.59,0,0,0,.32-.84,6.13,6.13,0,0,0,.21-.87,6.54,6.54,0,0,0,.09-.89c0-.3,0-.6,0-.9s0-.3,0-.45a9.09,9.09,0,0,0-.37-1.78,9.87,9.87,0,0,0-.48-1.28,14.16,14.16,0,0,0-.85-1.58,24.18,24.18,0,0,0-2.14-2.91l-.59-.69-.6-.68a23.75,23.75,0,0,1-1.74-2.13,8.28,8.28,0,0,1-1-1.78c-.08-.21-.15-.42-.21-.64a6.51,6.51,0,0,1-.18-1.24c0-.13,0-.27,0-.41a15.44,15.44,0,0,1,.08-1.67c.08-.78.19-1.57.3-2.37.07-.53.15-1.06.22-1.59,0-.26.06-.53.1-.79.06-.53.12-1.06.16-1.59a15.24,15.24,0,0,0-.26-4.63,8.77,8.77,0,0,0-.47-1.48,9.39,9.39,0,0,0-1-1.8,13,13,0,0,0-5.56-4.33,25.6,25.6,0,0,0-5.09-1.63c-.7-.15-1.39-.28-2.08-.39-10.4-1.67-21.44,1.49-28,10-3.42,4.42-6.33,9.38-7.57,14.83s-.68,11.49,2.39,16.17c1.29,2,3,3.68,4.13,5.74.94,1.68,1.5,3.57,2.51,5.21a12.3,12.3,0,0,0,5.55,4.67l-.44.4a13.48,13.48,0,0,0-3.11.06c-1.06.18-2.09.59-3.16.72-1.32.17-2.67-.09-4,.08-2.46.32-4.48,2-6.35,3.65-2.19,1.91-4.54,4.14-4.71,7v.08l-1.47,2a7.89,7.89,0,0,0-.92,1.45c-.59,1.39-.26,3-.58,4.48a9.58,9.58,0,0,1-1.16,2.67,60.07,60.07,0,0,1-5,7.46,12.64,12.64,0,0,1-3.11,3.08,5.6,5.6,0,0,1-3.24.92,20.77,20.77,0,0,1-4.74-3.17,30.57,30.57,0,0,1-4.19-5.21c-2.38-3.43,5,6.83,2.62,3.39L886.58,474.2a29,29,0,0,1-.84-5.06c0-.65-.27-1.51-.93-1.53a1.13,1.13,0,0,0-.75.36,4.34,4.34,0,0,0-1.39,3.7,5.13,5.13,0,0,0-3.27.58,1.87,1.87,0,0,0-.41,2.66v.27a1.42,1.42,0,0,0-.75,1.5,5.08,5.08,0,0,0-3.51.17c-1.05.59-1.45,2.32-.43,3A3.07,3.07,0,0,0,872.34,482.75Zm133.68,5.1a16.52,16.52,0,0,0,1.87.48,29.85,29.85,0,0,1,5.8,2,3.18,3.18,0,0,1,1.51,1.13,3.36,3.36,0,0,1-.18,2.84l-2.64,7.13c-.42,1.12-.83,2.24-1.35,3.31-.2.43-.43.86-.66,1.28q-.12-.36-.24-.69a58.51,58.51,0,0,1-1.9-6.64c-.44-1.94-.81-3.9-1.12-5.86A28.64,28.64,0,0,0,1006,487.85Zm-2.76-5.59.2.14a2.25,2.25,0,0,1,.69.48,1.07,1.07,0,0,1,0,1Zm-4.77-6.87,3.16.46a4.15,4.15,0,0,1,2.13.73,1.43,1.43,0,0,1,.29,2,4.76,4.76,0,0,1-.7.47,2,2,0,0,0-.75,2.07,22.41,22.41,0,0,0-1.81-2.81,13.9,13.9,0,0,0-2.11-2.16C998.63,475.9,998.57,475.64,998.49,475.39ZM968.12,702.72a11.28,11.28,0,0,0,1.17,0,11.23,11.23,0,0,0-.19,2.84Z"
        transform="translate(-50.4 -87.11)" fill="url(#ad33f4e3-bf33-4b8e-8318-953234af509e-1956)" />
      <path
        d="M972.32,426.22c5.49.88,11.59,3,13.69,8.14,1.58,3.89.36,8.26,0,12.44a9.44,9.44,0,0,0,.12,3.31,11.61,11.61,0,0,0,2.9,4.55,24.24,24.24,0,0,1,4.18,5.85,8.52,8.52,0,0,1,.28,7,5.09,5.09,0,0,0-.69,1.84c-.07,1.43,1.42,2.33,2.52,3.24,4.12,3.41,3.94,9.62,4,15a75.72,75.72,0,0,0,7.16,31.64,9.67,9.67,0,0,1-10.82-1.41,36.43,36.43,0,0,0,2.46,7.08c-3.49,1.69-7.69-1.09-9.43-4.54s-2-7.48-3.2-11.14S982,502.33,981,498.64a10.17,10.17,0,0,0-1.25-3.54,9,9,0,0,0-2.2-1.87,21.4,21.4,0,0,1-7.75-10.52c-4.27,1-8.62,1.89-13,1.5s-8.79-2.37-11.08-6.09c-1-1.64-1.57-3.53-2.51-5.21-1.15-2.06-2.85-3.75-4.14-5.73-3.06-4.68-3.62-10.69-2.38-16.15s4.14-10.39,7.57-14.81C950.89,427.71,961.93,424.55,972.32,426.22Z"
        transform="translate(-50.4 -87.11)" fill="#3a3768" />
      <path
        d="M972.32,426.22c5.49.88,11.59,3,13.69,8.14,1.58,3.89.36,8.26,0,12.44a9.44,9.44,0,0,0,.12,3.31,11.61,11.61,0,0,0,2.9,4.55,24.24,24.24,0,0,1,4.18,5.85,8.52,8.52,0,0,1,.28,7,5.09,5.09,0,0,0-.69,1.84c-.07,1.43,1.42,2.33,2.52,3.24,4.12,3.41,3.94,9.62,4,15a75.72,75.72,0,0,0,7.16,31.64,9.67,9.67,0,0,1-10.82-1.41,36.43,36.43,0,0,0,2.46,7.08c-3.49,1.69-7.69-1.09-9.43-4.54s-2-7.48-3.2-11.14S982,502.33,981,498.64a10.17,10.17,0,0,0-1.25-3.54,9,9,0,0,0-2.2-1.87,21.4,21.4,0,0,1-7.75-10.52c-4.27,1-8.62,1.89-13,1.5s-8.79-2.37-11.08-6.09c-1-1.64-1.57-3.53-2.51-5.21-1.15-2.06-2.85-3.75-4.14-5.73-3.06-4.68-3.62-10.69-2.38-16.15s4.14-10.39,7.57-14.81C950.89,427.71,961.93,424.55,972.32,426.22Z"
        transform="translate(-50.4 -87.11)" fill="#3f3d56" />
      <path
        d="M1006.94,494.79c.31,2,.68,3.92,1.13,5.87a56.16,56.16,0,0,0,1.89,6.62,6.36,6.36,0,0,1,.59,3,5.61,5.61,0,0,1-.73,1.82c-2.51,4.45-5.89,8.75-6.18,13.85-.07,1.27,0,2.64-.68,3.69q-2.91-6.24-6.41-12.18c-2.44-4.14-5.15-8.32-5.85-13.08a24.8,24.8,0,0,1,.08-6.72,14.63,14.63,0,0,1,2.42-7.07c1.65-2.16,6.2-5.43,9.14-4.76C1005.79,486.67,1006.5,492,1006.94,494.79Z"
        transform="translate(-50.4 -87.11)" fill="#f86d70" />
      <path
        d="M918.57,518.78c-3.28-1.34-6.62-2.75-9.23-5.16a30.11,30.11,0,0,1-4.19-5.2l-7.71-11.14c-1.83-2.65-3.71-5.43-4.1-8.62a28.37,28.37,0,0,1-7.71-17.5c0-.66-.26-1.51-.92-1.53a1.16,1.16,0,0,0-.76.36,4.35,4.35,0,0,0-1.38,3.7,5.13,5.13,0,0,0-3.27.57c-.92.66-1.16,2.29-.17,2.84a1.41,1.41,0,0,0-1,1.59,5,5,0,0,0-3.51.17c-1,.59-1.45,2.31-.43,3a3,3,0,0,0-2,2.93,5.88,5.88,0,0,0,1.33,3.45c3,4,8.2,5.58,11.63,9.16a26.56,26.56,0,0,1,3,4l9.95,15.14c3.16,4.81,6.41,9.71,10.92,13.29a9.88,9.88,0,0,0,4.06,2.16,4.49,4.49,0,0,0,4.27-1.18c1-1.13,1.15-2.76,1.25-4.26C918.84,524,918.4,521.35,918.57,518.78Z"
        transform="translate(-50.4 -87.11)" fill="#a1616a" />
      <path
        d="M951.88,729a8.65,8.65,0,0,0-1.06,1.29,4.51,4.51,0,0,0-.45,3.69,5,5,0,0,0,2.41,2.85,4.71,4.71,0,0,1,.76.44,4.51,4.51,0,0,0,.47.4,1.82,1.82,0,0,0,1,.19,36.41,36.41,0,0,0,7.87-1.34,6.31,6.31,0,0,0,3.25-1.53,6.47,6.47,0,0,0,1.11-2.15l.93-2.6a30.54,30.54,0,0,0,1.44-4.84,10.08,10.08,0,0,0-.26-5,1.63,1.63,0,0,0-.35,1,11.07,11.07,0,0,1-2,4.85,4.94,4.94,0,0,1-.78,1,5.09,5.09,0,0,1-2.34,1,28.76,28.76,0,0,1-5,.64,1.56,1.56,0,0,1-.68-.08,1.19,1.19,0,0,1-.57-.71,3,3,0,0,1,0-2c.45-1.26,1.69-2.09,2.29-3.3.44-.89-.17-1.87-1.08-1.12a27.74,27.74,0,0,0-2.29,2.43Z"
        transform="translate(-50.4 -87.11)" fill="#3f3d56" />
      <path
        d="M960.5,711c.27,4.19.45,8.71-1.84,12.22-.82,1.27-1.93,2.33-2.87,3.52a4.13,4.13,0,0,0-1,2.12c-.14,1.53,1.3,2.85,2.82,3.13a9.33,9.33,0,0,0,4.53-.65,10.91,10.91,0,0,0,3.85-1.81c2-1.69,2.52-4.5,2.92-7.08l.93-6a18.91,18.91,0,0,0,.34-4.37,19.46,19.46,0,0,0-1.17-4.71l-1.54-4.5a2.12,2.12,0,0,0-.68-1.12,2,2,0,0,0-1.17-.21c-1.47.07-5.18.61-5.89,2.16C959.08,705.1,960.4,709.42,960.5,711Z"
        transform="translate(-50.4 -87.11)" fill="#ee8e9e" />
      <path
        d="M960.5,711c.27,4.19.45,8.71-1.84,12.22-.82,1.27-1.93,2.33-2.87,3.52a4.13,4.13,0,0,0-1,2.12c-.14,1.53,1.3,2.85,2.82,3.13a9.33,9.33,0,0,0,4.53-.65,10.91,10.91,0,0,0,3.85-1.81c2-1.69,2.52-4.5,2.92-7.08l.93-6a18.91,18.91,0,0,0,.34-4.37,19.46,19.46,0,0,0-1.17-4.71l-1.54-4.5a2.12,2.12,0,0,0-.68-1.12,2,2,0,0,0-1.17-.21c-1.47.07-5.18.61-5.89,2.16C959.08,705.1,960.4,709.42,960.5,711Z"
        transform="translate(-50.4 -87.11)" opacity="0.05" />
      <path
        d="M927.55,586.85a.37.37,0,0,0,0,.11,5,5,0,0,0,.56,1.7,24.58,24.58,0,0,1,2.16,8.75,7.41,7.41,0,0,0,.29,2.21,11.81,11.81,0,0,0,1.13,1.94c1.33,2.17,1.64,4.78,2.09,7.29a57.61,57.61,0,0,0,2.55,9.56c1.53,4.23,3.59,8.57,2.89,13a13,13,0,0,0-.4,3.2,9.24,9.24,0,0,0,1.25,3.37c.52,1,1,2.06,1.41,3.12s.85,2.31,1.19,3.48c.41,1.44.69,3.14-.26,4.29a4.88,4.88,0,0,0-.77.94,2.5,2.5,0,0,0,0,1.62q.81,3.42,1.74,6.83c.48,1.78,1,3.55,1.51,5.32,3.86,12.94,8.22,25.75,10.81,39,.37,1.91,2.81,3.28,4.71,3.69a6.14,6.14,0,0,0,5.41-1.45,3.32,3.32,0,0,0,.38-.37c2-2.14,2.27-5.42,2.13-8.38-.67-13.64-7.54-26.12-10.81-39.38a75.84,75.84,0,0,1-2.12-14.61c-.77-16.47-1.07-33.87,3.58-49.68,1-3.29,2.11-7,.37-10-1.1-1.86-3.13-3-5.14-3.76a33.1,33.1,0,0,0-25.69.66,8,8,0,0,0,0,1,10.13,10.13,0,0,1-.52,4.54A5.57,5.57,0,0,0,927.55,586.85Z"
        transform="translate(-50.4 -87.11)" fill="#3f3d56" />
      <path
        d="M983.92,715.24l.87,3.17a35.43,35.43,0,0,0,1.85,5.58,24.31,24.31,0,0,1,1.65,3.78,12.22,12.22,0,0,1,.28,3.25,9.93,9.93,0,0,1-.45,3.07,7.67,7.67,0,0,1-4.49,4.26,21.21,21.21,0,0,1-6.23,1.17,5,5,0,0,1-1.64,0,4.57,4.57,0,0,1-1.59-.83c-2.89-2.12-4.38-6-4.64-9.61a11.82,11.82,0,0,1,.49-2.45c.22-.3,2.41.93,1.47,2-1.38,1.53,2.67.74,4.73.61a19,19,0,0,0,2.68-.44l3.33-.71c1.09-.24,2.35-.61,2.73-1.66s-.46-2.29-1.11-3.3c-1.75-2.69-2.19-6-2.6-9.17-.08-.63-.86-4.68.75-3.42a4.5,4.5,0,0,1,1.12,2.11C983.43,713.45,983.67,714.34,983.92,715.24Z"
        transform="translate(-50.4 -87.11)" fill="#3f3d56" />
      <path
        d="M942.42,648.88c1-1.15.67-2.85.26-4.28-.16-.54-.32-1.07-.5-1.6l13.09-4.42c0,1.17.1,2.34.15,3.51a76.05,76.05,0,0,0,2.12,14.62c3.27,13.25,10.14,25.73,10.81,39.36.15,3.14-.18,6.65-2.5,8.77a6.19,6.19,0,0,1-5.42,1.44c-1.89-.41-4.34-1.78-4.71-3.69-2.59-13.25-7-26.06-10.81-39q-1.8-6-3.25-12.16a2.54,2.54,0,0,1,0-1.61A4.88,4.88,0,0,1,942.42,648.88Z"
        transform="translate(-50.4 -87.11)" opacity="0.05" />
      <path
        d="M978.6,700.87c1,1.78,2.61,3.36,2.85,5.4a30.92,30.92,0,0,1-.23,3.71,11.64,11.64,0,0,0,.55,3q1.9,6.9,4.4,13.62a3.73,3.73,0,0,1,.35,1.85,3.26,3.26,0,0,1-2.17,2.16c-3.11,1.33-6.63,1.24-10,1.1a5.23,5.23,0,0,1-2.82-.66c-1.21-.83-1.51-2.47-1.59-3.93-.23-4.25.49-8.52,0-12.75-.16-1.54-.49-3.06-.73-4.58a13.43,13.43,0,0,1,.2-6.4,14.65,14.65,0,0,1,2.39-4,12.52,12.52,0,0,1,3.33-3.32c.4-.24,1.53-1,1.93-.51.21.23.12.85.15,1.14a11.37,11.37,0,0,0,.23,1.32A10.85,10.85,0,0,0,978.6,700.87Z"
        transform="translate(-50.4 -87.11)" fill="#ee8e9e" />
      <path
        d="M953.43,592.16a3.62,3.62,0,0,1,.25,3c-.44,1.81-1.16,3.54-1.75,5.31a73.87,73.87,0,0,0-2.26,9.65c-.55,2.95-1.71,6.23-1.23,9.2a65.55,65.55,0,0,0-7,21.81c-.27,1.95,4.07,4.48,4,6.45-.16,3.92-3.29,4.23-1,7.36.11.16-.87,3.66-.74,3.81.94,1.13,2.13,2,3.14,3.09a23.63,23.63,0,0,1,3.31,4.85c6,10.78,14.59,23,11.93,35a2.14,2.14,0,0,0,1.14,2.16,5.89,5.89,0,0,0,2.52.58l.42,0c2-2.14,2.27-5.42,2.13-8.38-.67-13.64-7.54-26.12-10.81-39.38a75.84,75.84,0,0,1-2.12-14.61c-.77-16.47-1.07-33.87,3.58-49.68,1-3.29,2.11-7,.37-10-1.1-1.86-3.13-3-5.14-3.76a33.1,33.1,0,0,0-25.69.66,8,8,0,0,0,0,1,10.13,10.13,0,0,1-.52,4.54,5.57,5.57,0,0,0-.51,2s-.24-2.65-.24-2.61c5.35.77,10.93,4.26,16.28,5a37.18,37.18,0,0,1,8.16,1.8A3.54,3.54,0,0,1,953.43,592.16Z"
        transform="translate(-50.4 -87.11)" opacity="0.05" />
      <path
        d="M990.45,563c.72,2.29,1.36,4.6,1.9,6.93a5.66,5.66,0,0,1,.19,2.48,21.78,21.78,0,0,0-.74,2.29c-.12,1.23.73,2.31,1.21,3.46,1.21,2.92-.08,6.21-1.35,9.1l-3.79,8.57-3.1,7c-.92,2.09-1.84,4.18-2.73,6.29a204.49,204.49,0,0,0-9.88,29.61,3.63,3.63,0,0,1-.51,1.29c-.53.7-1.48.9-2.25,1.33a4.19,4.19,0,0,0-.46,6.69c-.44,5.15,3.42,10.12,5.41,14.89,4.57,11,3.74,23.32,5.32,35.1l-1.78-1c-1.71.78-1.65,3.2-2.56,4.83-1.38,2.46-4.75,2.81-7.56,2.62a5.9,5.9,0,0,1-2.53-.58,2.13,2.13,0,0,1-1.13-2.16c2.65-12-6-24.25-11.94-35a23.3,23.3,0,0,0-3.31-4.84c-1-1.07-2.19-2-3.14-3.1-2.63-3.16-3-7.62-2.79-11.73a65.72,65.72,0,0,1,7.47-27.7c-.47-3,.69-6.25,1.24-9.2a72.26,72.26,0,0,1,2.25-9.65c.59-1.77,1.31-3.5,1.75-5.31a3.62,3.62,0,0,0-.24-3,3.52,3.52,0,0,0-1.69-1.09,37.63,37.63,0,0,0-8.16-1.8l-18.38-2.64c-.59-3.78-1.19-8-.78-11.78a18.11,18.11,0,0,1,13-15.16,2.73,2.73,0,0,1,2.39.15A95.83,95.83,0,0,1,990.45,563Z"
        transform="translate(-50.4 -87.11)" fill="#3f3d56" />
      <path
        d="M973.75,463.61a9,9,0,0,0,.8,5.26,8.22,8.22,0,0,0,2.09,2.31,15.49,15.49,0,0,0,6.06,3c1.3.33,2.76.55,3.62,1.59,1.29,1.56.43,3.91-.67,5.61-1.9,3-4.55,5.65-7.94,6.57-2.71.74-5.61.29-8.38.77-2,.35-3.9,1.18-5.88,1.65a17.35,17.35,0,0,1-16-4.45c2.94-2.26,6-4.67,7.53-8.06a11.46,11.46,0,0,0,.57-7.7c-.71-2.51-2.3-5-1.8-7.52s3-4.32,5.51-5.19a35.34,35.34,0,0,1,6.93-1.4c1.29-.18,9.52-2,10-1.1.29.51-1.42,3.51-1.63,4.17A16.05,16.05,0,0,0,973.75,463.61Z"
        transform="translate(-50.4 -87.11)" fill="#a1616a" />
      <path
        d="M973.75,463.61a9,9,0,0,0,.8,5.26,8.22,8.22,0,0,0,2.09,2.31,15.49,15.49,0,0,0,6.06,3c1.3.33,2.76.55,3.62,1.59,1.29,1.56.43,3.91-.67,5.61-1.9,3-4.55,5.65-7.94,6.57-2.71.74-5.61.29-8.38.77-2,.35-3.9,1.18-5.88,1.65a17.35,17.35,0,0,1-16-4.45c2.94-2.26,6-4.67,7.53-8.06a11.46,11.46,0,0,0,.57-7.7c-.71-2.51-2.3-5-1.8-7.52s3-4.32,5.51-5.19a35.34,35.34,0,0,1,6.93-1.4c1.29-.18,9.52-2,10-1.1.29.51-1.42,3.51-1.63,4.17A16.05,16.05,0,0,0,973.75,463.61Z"
        transform="translate(-50.4 -87.11)" opacity="0.05" />
      <circle cx="913" cy="365.81" r="16.69" fill="#a1616a" />
      <path
        d="M972.21,480.51l-11.31,1.9a42.37,42.37,0,0,1-8.46.85,24.2,24.2,0,0,0-4.66,0c-1.07.18-2.09.59-3.17.72-1.32.17-2.66-.08-4,.09-2.46.31-4.48,2-6.35,3.64-2.19,1.9-4.54,4.13-4.7,7a2,2,0,0,0,.13,1,2.93,2.93,0,0,0,.84.88c2.08,1.7,3.25,4.25,4.73,6.5a25.11,25.11,0,0,0,5.62,6.06c.5-.32,1.44.52,1.22,1.06s-.75.93-.93,1.49c-.4,1.28,1.18,2.22,1.83,3.4s.33,2.66.4,4,.67,2.93.87,4.43c.45,3.47-1.26,7.13,0,10.42a3.27,3.27,0,0,0-3.25,2.53,9.55,9.55,0,0,0,.13,4.44,6.11,6.11,0,0,0-3,5.58,1,1,0,0,1-.72,1.33,5.63,5.63,0,0,0-3.47,5.23,2.57,2.57,0,0,1-.1,1.11,2.44,2.44,0,0,1-.82.84,6.52,6.52,0,0,0-2.43,5.1,3.74,3.74,0,0,0,1.72,3.34,31.12,31.12,0,0,0,7.6,2.26,68.3,68.3,0,0,0,7.36,1.3,66,66,0,0,0,6.89.21l15.14-.06c4.25,0,8.51,0,12.76-.32,4-.26,8-.76,11.85.28.48-.81-.29-1.75-.76-2.57a8.61,8.61,0,0,1-.87-3.56l-.95-10.09a17.73,17.73,0,0,1-.08-4.18c.21-1.49.77-2.9,1.06-4.37.55-2.83,0-5.75.18-8.63a38.51,38.51,0,0,1,1.32-7.51l3-12.35a47.67,47.67,0,0,1,1.48-6.19q3.45-8.9,7.25-17.64a1.82,1.82,0,0,0-.13-1.56l-2.5-4.49a28.66,28.66,0,0,0-2.29-3.65,14.45,14.45,0,0,0-8.45-5.19,14.94,14.94,0,0,0-9.82,1.46c-1.17.62-2.25,1.39-3.44,2C976.92,479.6,974.47,480.66,972.21,480.51Z"
        transform="translate(-50.4 -87.11)" fill="#f86d70" />
      <path
        d="M932.05,491.5l-3.94,5.26a6.7,6.7,0,0,0-.92,1.45c-.6,1.38-.27,3-.59,4.46a9.3,9.3,0,0,1-1.15,2.67,61.58,61.58,0,0,1-5,7.46,13.37,13.37,0,0,1-3.11,3.08,5.16,5.16,0,0,1-4.2.74,2.63,2.63,0,0,1,1.38,1.25,15.26,15.26,0,0,1,1,9.76,10,10,0,0,1-1.1,3.2,4.8,4.8,0,0,1-2.51,2.17,3.7,3.7,0,0,0,4.36,3.13,7.29,7.29,0,0,0,2.16-1.08l6.33-4.1a16.82,16.82,0,0,0,2.95-2.21c1.18-1.18,2-2.67,3.16-3.89,2-2.07,4.84-3.31,6.23-5.81.87-1.56,1-3.41,1.55-5.12.35-1.11.87-2.17,1.2-3.29a14.7,14.7,0,0,0-1.3-10.54C936.92,496.84,934.39,494.26,932.05,491.5Z"
        transform="translate(-50.4 -87.11)" fill="#f86d70" />
      <path
        d="M946.91,443.41a21.88,21.88,0,0,1,5.87-6.11c3.11-2.33,6.7-4.26,10.59-4.48a11.26,11.26,0,0,1,4.76.78c.08-4.72,1.25-7.85,4.19-7.38,5.49.88,11.59,3,13.69,8.14,1.58,3.89.36,8.26,0,12.44a9.44,9.44,0,0,0,.12,3.31,11.61,11.61,0,0,0,2.9,4.55,24.24,24.24,0,0,1,4.18,5.85,8.52,8.52,0,0,1,.28,7,5.09,5.09,0,0,0-.69,1.84c-.07,1.43,1.42,2.33,2.52,3.24,4.12,3.41,3.94,9.62,4,15a75.72,75.72,0,0,0,7.16,31.64,9.67,9.67,0,0,1-10.82-1.41,36.43,36.43,0,0,0,2.46,7.08c-3.49,1.69-7.69-1.09-9.43-4.54s-2-7.48-3.2-11.14S982,502.33,981,498.64a10.17,10.17,0,0,0-1.25-3.54,9,9,0,0,0-2.2-1.87c-3.59-2.58,1.7-22.12.3-26.31-2.09.45-5.93-9.63-8.12-19.88a10.35,10.35,0,0,1-4.75.48,5.72,5.72,0,0,0-1.7-.12,4.52,4.52,0,0,0-1.48.6,36.51,36.51,0,0,1-5.05,2.6c-3.62,1.35-7.61,1.17-11.46,1A11.36,11.36,0,0,1,946.91,443.41Z"
        transform="translate(-50.4 -87.11)" fill="#3a3768" />
      <path
        d="M946.91,443.41a21.88,21.88,0,0,1,5.87-6.11c3.11-2.33,6.7-4.26,10.59-4.48a11.26,11.26,0,0,1,4.76.78c.08-4.72,1.25-7.85,4.19-7.38,5.49.88,11.59,3,13.69,8.14,1.58,3.89.36,8.26,0,12.44a9.44,9.44,0,0,0,.12,3.31,11.61,11.61,0,0,0,2.9,4.55,24.24,24.24,0,0,1,4.18,5.85,8.52,8.52,0,0,1,.28,7,5.09,5.09,0,0,0-.69,1.84c-.07,1.43,1.42,2.33,2.52,3.24,4.12,3.41,3.94,9.62,4,15a75.72,75.72,0,0,0,7.16,31.64,9.67,9.67,0,0,1-10.82-1.41,36.43,36.43,0,0,0,2.46,7.08c-3.49,1.69-7.69-1.09-9.43-4.54s-2-7.48-3.2-11.14S982,502.33,981,498.64a10.17,10.17,0,0,0-1.25-3.54,9,9,0,0,0-2.2-1.87c-3.59-2.58,1.7-22.12.3-26.31-2.09.45-5.93-9.63-8.12-19.88a10.35,10.35,0,0,1-4.75.48,5.72,5.72,0,0,0-1.7-.12,4.52,4.52,0,0,0-1.48.6,36.51,36.51,0,0,1-5.05,2.6c-3.62,1.35-7.61,1.17-11.46,1A11.36,11.36,0,0,1,946.91,443.41Z"
        transform="translate(-50.4 -87.11)" fill="#3f3d56" />
      <g opacity="0.1">
        <path
          d="M1004.44,519.2a75.88,75.88,0,0,1-7.16-31.64c0-5.35.15-11.56-4-15-1.1-.91-2.59-1.81-2.53-3.24a5.11,5.11,0,0,1,.7-1.84,8.56,8.56,0,0,0-.28-7,24.24,24.24,0,0,0-4.18-5.85,11.63,11.63,0,0,1-2.91-4.55,9.94,9.94,0,0,1-.12-3.31c.41-4.18,1.64-8.55,0-12.44-2-5-7.81-7.12-13.16-8.05a3,3,0,0,1,1.44-.09c5.49.88,11.59,3,13.69,8.14,1.58,3.89.36,8.26,0,12.44a9.44,9.44,0,0,0,.12,3.31,11.61,11.61,0,0,0,2.9,4.55,24.24,24.24,0,0,1,4.18,5.85,8.52,8.52,0,0,1,.28,7,5.09,5.09,0,0,0-.69,1.84c-.07,1.43,1.42,2.33,2.52,3.24,4.12,3.41,3.94,9.62,4,15a75.72,75.72,0,0,0,7.16,31.64,9.35,9.35,0,0,1-5.3,1A9.05,9.05,0,0,0,1004.44,519.2Z"
          transform="translate(-50.4 -87.11)" />
        <path
          d="M996.09,524.87a35.78,35.78,0,0,1-2.46-7.08,9.13,9.13,0,0,0,2.37,1.57,37.2,37.2,0,0,0,2,5.51,5.24,5.24,0,0,1-3.23.41A5.08,5.08,0,0,0,996.09,524.87Z"
          transform="translate(-50.4 -87.11)" />
        <path
          d="M966.17,433.6a11.52,11.52,0,0,0-3.18-.75l.38,0a11.18,11.18,0,0,1,2.82.21C966.18,433.22,966.17,433.4,966.17,433.6Z"
          transform="translate(-50.4 -87.11)" />
        <path
          d="M954.81,450.6a36.62,36.62,0,0,0,5.06-2.6,4.44,4.44,0,0,1,1.48-.6,5.46,5.46,0,0,1,1.56.09,6.26,6.26,0,0,0-1.08.51,36.51,36.51,0,0,1-5.05,2.6,22.78,22.78,0,0,1-8.47,1.1A20.07,20.07,0,0,0,954.81,450.6Z"
          transform="translate(-50.4 -87.11)" />
        <path d="M967.8,447l.09.45a9.8,9.8,0,0,1-2.48.07A11,11,0,0,0,967.8,447Z"
          transform="translate(-50.4 -87.11)" />
      </g>
      <path
        d="M1002.54,524.43a6.1,6.1,0,0,0,1.64,4.88,10.87,10.87,0,0,0,2.32,1.71,6.3,6.3,0,0,0,2.76,1,5.21,5.21,0,0,0,3.53-1.54c2.91-2.55,4.36-6.33,5.7-9.95a74.65,74.65,0,0,0,4.31-14.71c.82-5.43.47-11.06,2-16.33-1.38-2.76-2.26-5.8-3.83-8.46a39.86,39.86,0,0,1-2.64-4.95,17.1,17.1,0,0,1-.47-11.42,1.54,1.54,0,0,0-1.82.09,3.83,3.83,0,0,0-1.1,1.6,14.17,14.17,0,0,0-1.09,6.71,2.67,2.67,0,0,1-.19,1.64,2.06,2.06,0,0,1-1.78.75,15.8,15.8,0,0,1-4.12-.74,38.19,38.19,0,0,0-12.69-1.05,6,6,0,0,0-2.48.6,2.3,2.3,0,0,0-1.27,2.07l10.14,1.49a4.19,4.19,0,0,1,2.14.73,1.45,1.45,0,0,1,.29,2,4,4,0,0,1-.7.46,2.09,2.09,0,0,0,.08,3.34,2.14,2.14,0,0,1,.69.48c.42.56-.13,1.29-.31,2a2.48,2.48,0,0,0,1.22,2.53,8.92,8.92,0,0,0,2.83.95,29.82,29.82,0,0,1,5.8,2,3.18,3.18,0,0,1,1.51,1.13,3.39,3.39,0,0,1-.18,2.84l-2.64,7.12c-.42,1.12-.83,2.23-1.35,3.31-.67,1.39-1.5,2.7-2.19,4.09a40.83,40.83,0,0,0-1.65,4C1005.65,518.41,1003,520.58,1002.54,524.43Z"
        transform="translate(-50.4 -87.11)" fill="#a1616a" />
      <path
        d="M565.83,249.17V584.58a111.1,111.1,0,0,0-34.63-5.34c-49.87,0-90.37,35.29-90.37,85.16s40.5,84.77,90.37,84.77,90.62-36.72,90.62-90V426.25h263V584.58a111.05,111.05,0,0,0-34.63-5.34c-49.87,0-90.37,35.29-90.37,85.16s40.5,84.77,90.37,84.77,90.62-36.72,90.62-90v-410Zm319,125h-263v-69h263Z"
        transform="translate(-50.4 -87.11)" fill="#6c63ff" />
      <path d="M299.83,212.17v225.1a85.15,85.15,0,1,0,42.6,73.6V297.47h85.4v-85.3Z"
        transform="translate(-50.4 -87.11)" fill="#6c63ff" />
      <path
        d="M277,739.73a54.34,54.34,0,0,0-15.65-5.54,71.57,71.57,0,0,0,11.71-2.63c10.17-3.22,15.3-7.54,11.45-9.65s-15.22-1.22-25.39,2a39.2,39.2,0,0,0-9.75,4.33c-1.05-2.23-3.91-4.82-8.37-7.27-9-5-21.18-7.47-27.12-5.59s-3.43,7.42,5.61,12.39a54.13,54.13,0,0,0,14,5.21,82.33,82.33,0,0,0-9.65,1.71c-11.07,2.66-17.47,6.67-14.3,9s14.73,2,25.8-.64a48.22,48.22,0,0,0,11.6-4.1c.91,2.3,3.82,5,8.52,7.61,9,5,21.18,7.47,27.12,5.59S286,744.69,277,739.73Z"
        transform="translate(-50.4 -87.11)" fill="#6c63ff" />
      <path
        d="M340.71,666.65a26.5,26.5,0,0,0-7.59-2.69,35.72,35.72,0,0,0,5.68-1.27c4.94-1.57,7.43-3.66,5.56-4.69s-7.39-.59-12.33,1a19.68,19.68,0,0,0-4.73,2.1c-.51-1.08-1.9-2.34-4.06-3.53-4.39-2.41-10.29-3.62-13.17-2.71s-1.66,3.61,2.72,6a26.21,26.21,0,0,0,6.82,2.52,41,41,0,0,0-4.69.84c-5.37,1.28-8.48,3.23-6.94,4.35s7.15,1,12.52-.31a23.78,23.78,0,0,0,5.64-2c.44,1.11,1.85,2.44,4.13,3.69,4.39,2.41,10.28,3.63,13.17,2.72S345.1,669.06,340.71,666.65Z"
        transform="translate(-50.4 -87.11)" fill="#6c63ff" />
      <path
        d="M169.32,592.56a16.63,16.63,0,0,0-4.78-1.68,20.82,20.82,0,0,0,3.58-.8c3.09-1,4.65-2.29,3.48-2.93s-4.62-.37-7.71.61a12.28,12.28,0,0,0-3,1.31,5.85,5.85,0,0,0-2.54-2.2c-2.74-1.51-6.43-2.27-8.24-1.7s-1,2.25,1.71,3.76a16.29,16.29,0,0,0,4.27,1.58,24.63,24.63,0,0,0-2.94.53c-3.36.8-5.31,2-4.35,2.72s4.48.61,7.84-.19a14.94,14.94,0,0,0,3.53-1.25,5.57,5.57,0,0,0,2.58,2.31c2.75,1.51,6.44,2.27,8.24,1.7S172.06,594.07,169.32,592.56Z"
        transform="translate(-50.4 -87.11)" fill="#6c63ff" />
      <path
        d="M414.83,212.17v71.3h-85.4v213.4a85.27,85.27,0,0,1-138.19,66.89,85.28,85.28,0,0,0,152.19-52.89V297.47h85.4v-85.3Z"
        transform="translate(-50.4 -87.11)" opacity="0.1" />
      <path
        d="M173.87,230.69l.29,2.18,9.45,1.34s.77-.58,2-1.37c2.24-1.47,6-3.66,9.2-4.28,4.95-1,20.69-8.05,15.62-8.51s-4.55.59-4.55.59-5.59-5.49-11.36-.47c-4.38,3.81-14,7.91-18.39,9.66C174.73,230.38,173.87,230.69,173.87,230.69Z"
        transform="translate(-50.4 -87.11)" fill="#efb7b9" />
      <path
        d="M211.62,205.63a16,16,0,0,1,4.53-1.16,5.51,5.51,0,0,1,4.31,1.44c.61.63,1,1.44,1.6,2.08,2.88,3.08,8.47.78,11.94,3.17,2.13,1.48,2.79,4.27,3.55,6.76s2.14,5.22,4.68,5.75a13.88,13.88,0,0,0,3.69-.14,3.63,3.63,0,0,1,3.32,1.22c1.18,1.79-.45,4.78,1.26,6.06,1.53,1.13,4.3-.45,5.37,1.12a2.34,2.34,0,0,1-.37,2.6,18.07,18.07,0,0,0-1.74,2.18,3.3,3.3,0,0,0,3.25,4.82c1.08-.11,2.23-.72,3.17-.19a2.24,2.24,0,0,1,1,1.77A4.65,4.65,0,0,1,257,248c-1.84.12-3.53-.88-5.17-1.72s-3.57-1.55-5.27-.85a8.14,8.14,0,0,0-2.12,1.49,23.21,23.21,0,0,1-6.52,3.86c-2.08.82-4.5,1.31-6.5.29-2.25-1.15-3.41-3.95-5.79-4.8s-5.1.74-7.38,2.09-5.33,2.48-7.39.82c-2.22-1.79-1.54-5.38-2.89-7.89a7.75,7.75,0,0,0-2.17-2.39c-1.52-1.17-3.25-2.05-4.78-3.2a8,8,0,0,1-3.26-4.58c-.45-2.27.63-4.54,1.86-6.5s2.66-3.88,3.06-6.15c.3-1.7,0-3.47.39-5.15a6.35,6.35,0,0,1,4.12-4.35c1.12-.38,1.32-.28,1.89-1.27A4,4,0,0,1,211.62,205.63Z"
        transform="translate(-50.4 -87.11)" fill="#3f3d56" />
      <g opacity="0.1">
        <path d="M249.51,225.44a8.51,8.51,0,0,1,.18,3A8.11,8.11,0,0,1,249.51,225.44Z"
          transform="translate(-50.4 -87.11)" />
        <path
          d="M253.79,236.89a3.27,3.27,0,0,0-.34,1.1,3.38,3.38,0,0,1,.12-2.8,17.79,17.79,0,0,1,1.74-2.17,3.69,3.69,0,0,0,.5-1l.08.09a2.34,2.34,0,0,1-.36,2.59A17.88,17.88,0,0,0,253.79,236.89Z"
          transform="translate(-50.4 -87.11)" />
        <path
          d="M200.82,234.21c1.53,1.16,3.25,2,4.77,3.21a7.62,7.62,0,0,1,2.17,2.39c1.35,2.51.67,6.1,2.89,7.89,2.06,1.66,5.12.54,7.4-.82s4.88-3,7.37-2.09,3.54,3.65,5.8,4.8c2,1,4.41.52,6.5-.29a23.3,23.3,0,0,0,6.51-3.86,8.6,8.6,0,0,1,2.12-1.5c1.71-.69,3.64,0,5.28.86s3.33,1.84,5.16,1.72a4.7,4.7,0,0,0,4.15-4.11,3,3,0,0,1,.22.88,4.64,4.64,0,0,1-4.15,4.92c-1.83.12-3.53-.88-5.16-1.71s-3.57-1.55-5.28-.86a8.83,8.83,0,0,0-2.12,1.49,23.33,23.33,0,0,1-6.51,3.87c-2.08.81-4.51,1.3-6.5.29-2.26-1.15-3.41-3.95-5.8-4.8s-5.1.73-7.37,2.09-5.34,2.48-7.4.81c-2.22-1.79-1.54-5.37-2.89-7.89a7.7,7.7,0,0,0-2.17-2.38c-1.51-1.17-3.24-2.05-4.77-3.21a8,8,0,0,1-3.27-4.58,5.41,5.41,0,0,1-.1-1.2A8.36,8.36,0,0,0,200.82,234.21Z"
          transform="translate(-50.4 -87.11)" />
      </g>
      <path d="M204.87,286.15l-3.43.73s3.38,5.56,8.59,1.91S204.87,286.15,204.87,286.15Z"
        transform="translate(-50.4 -87.11)" fill="#4c4981" />
      <path d="M204.87,286.15l-3.43.73s3.38,5.56,8.59,1.91S204.87,286.15,204.87,286.15Z"
        transform="translate(-50.4 -87.11)" opacity="0.1" />
      <path
        d="M279.32,337.9s4.76,2.46,9.19,5.31c3.18,2,6.19,4.27,7.17,5.94,2.36,4,13.83,8.34,13.83,8.34l11.38,8.66c2.68.89,5.29,4.15,6.36,5.61.32.44.51.72.51.72l4.56-.59,2.4-3.12s.61-6.88-4.13-6.8a6.52,6.52,0,0,1-2.67-.69c-5.1-2.25-12.23-9.35-12.23-9.35s-12.12-15.14-15.75-15.64a6,6,0,0,1-1.14-.29c-3.69-1.29-9-6.05-9-6.05Z"
        transform="translate(-50.4 -87.11)" fill="#efb7b9" />
      <path
        d="M232.31,381.67c1.21,7.27,6.72,21.17,8.49,24.07,2.2,3.59,3.35,10.78,3.35,10.78l.65,5a5.8,5.8,0,0,0,.72,1.94,10.57,10.57,0,0,0,.64,1l9.13-2.81s-.53-2.1-1.33-4.51-2-5.44-3.14-6.56c-2.23-2.19-2.56-9.92-2.56-9.92s-1.86-14.86-2.43-16.73a25.8,25.8,0,0,1-1-5.48c-.09-1-.15-2.14-.16-3.43a70.09,70.09,0,0,0-1.44-11l-10.65,1.93-.28,11.91A7.94,7.94,0,0,0,232.31,381.67Z"
        transform="translate(-50.4 -87.11)" fill="#efb7b9" />
      <path
        d="M327.25,371.76c.32.44.51.72.51.72l4.56-.59,2.4-3.12s.61-6.88-4.13-6.8a6.52,6.52,0,0,1-2.67-.69c-.39,2.06,1.92,3.77,1.92,3.77s1,.7.73,3.93C330.42,371.18,328.47,371.65,327.25,371.76Z"
        transform="translate(-50.4 -87.11)" opacity="0.1" />
      <path
        d="M326.75,372.18c.3,1.11,3.18,2.74,5.18,3.76,1,.5,1.75.85,1.9.93.46.23,2.88-2.46,3.21-4.63s6.1-8.92,6.1-8.92a24.2,24.2,0,0,0,2.14-8.45c.22-2.95-1-3.19-2.45-2.52a9.69,9.69,0,0,0-2.74,2.15,7.32,7.32,0,0,1-3.55,1.84,17.37,17.37,0,0,0-5.11,2.18c-1.4.9-2.76,2-3,3-.53,2.13,1.89,3.93,1.89,3.93s1,.7.73,3.93S326.72,372.08,326.75,372.18Z"
        transform="translate(-50.4 -87.11)" fill="#444053" />
      <path
        d="M331.93,375.94c1,.5,1.75.85,1.9.93.46.23,2.88-2.46,3.21-4.63s6.1-8.92,6.1-8.92a24.2,24.2,0,0,0,2.14-8.45c.22-2.95-1-3.19-2.45-2.52-.24,2.34-.83,6.89-2,9.26C339.37,364.43,333.52,373.49,331.93,375.94Z"
        transform="translate(-50.4 -87.11)" opacity="0.1" />
      <path
        d="M245.61,423.28l-.09.17a10.57,10.57,0,0,0,.64,1l9.13-2.81s-.53-2.1-1.33-4.51c-3.61-1-8.79,5.31-8.79,5.31Z"
        transform="translate(-50.4 -87.11)" opacity="0.1" />
      <path
        d="M245,430.08s7.62,2.67,11,2.26c2.61-.31,2.72-1.52,2.54-4-.06-.8-.14-1.72-.19-2.78-.17-4.4-1.94-5.29-1.94-5.29-2.9-7.6-11.25,2.6-11.25,2.6l.43.84a9.2,9.2,0,0,0-.85,4.15A12.12,12.12,0,0,0,245,430.08Z"
        transform="translate(-50.4 -87.11)" fill="#444053" />
      <path
        d="M245,430.08s7.62,2.67,11,2.26c2.61-.31,2.72-1.52,2.54-4a8.07,8.07,0,0,1-6.21,1.78,24.43,24.43,0,0,1-7.59-2.26A12.12,12.12,0,0,0,245,430.08Z"
        transform="translate(-50.4 -87.11)" opacity="0.1" />
      <path
        d="M207.23,245.26l3,13,.61,2.68,5.51.7,5.68.72,6.18-2.24s1.72-5.88.3-10.29a6.52,6.52,0,0,0-2.86-3.77,6.35,6.35,0,0,1-1.19-.92,5.22,5.22,0,0,1-1-1.43,5.91,5.91,0,0,1-.53-2.07c-.31-3.51,1.91-7.35,1.91-7.35s-13.1-4.47-12.08-1.58c.67,1.87-1.18,5.13-2.56,7.19-.75,1.11-1.36,1.88-1.36,1.88Z"
        transform="translate(-50.4 -87.11)" fill="#efb7b9" />
      <circle cx="168.65" cy="141.76" r="11.38" opacity="0.1" />
      <circle cx="168.6" cy="141.34" r="11.38" fill="#efb7b9" />
      <path
        d="M208.05,288.52c.54,2.51,3,6.46,3,6.46l15.89,3.9L238.29,287l0-.08c-.35-1.11-4.68-15.12-1.55-18.57,3.28-3.59,2-13.72,2-13.72s-5.67-6.52-6.82-8.1-8.51-2.82-8.51-2.82c.37.5.71,1,1,1.43a14,14,0,0,1,1.81,3.84,5.74,5.74,0,0,1-.15,4.17,4.58,4.58,0,0,0-.39,1.07c-1.24,5.43-6.9,4.67-9.15,4.13-.58-.14-.94-.26-.94-.26l-5.41.17-3.4.11s1.55,26.78,1.18,28.91A3.42,3.42,0,0,0,208.05,288.52Z"
        transform="translate(-50.4 -87.11)" fill="#f86d70" />
      <path
        d="M206.87,259.75l9.85-1.29-.18,0c-.58-.14-.93-.26-.93-.26l-5.42.17-3.39.11S206.82,258.92,206.87,259.75Z"
        transform="translate(-50.4 -87.11)" fill="#925978" />
      <polygon points="167.52 209.58 171.79 210.62 178.52 209.74 180.27 207.91 167.52 209.58"
        fill="#925978" />
      <polygon points="174.63 211.32 176.56 211.79 177.35 210.96 174.63 211.32" fill="#925978" />
      <path
        d="M208.05,288.52c2.54.26,4.88.39,4.88.39l13.09-.49,0-13.67a19.39,19.39,0,0,0-5.28-3.48c-2.28-.79-5-3.21-4.46-9.59,0-.37.06-.75.11-1.14a14.68,14.68,0,0,0,.12-2.15,11.5,11.5,0,0,0-3.63-8.42,1.73,1.73,0,0,0-.19-.17l-2.13-9.92a2.12,2.12,0,0,0-.43.06c-.75,1.11-1.36,1.88-1.36,1.88l-1.57,3.44,3,13-3.4.11s1.55,26.78,1.18,28.91A3.42,3.42,0,0,0,208.05,288.52Z"
        transform="translate(-50.4 -87.11)" opacity="0.1" />
      <path
        d="M212.5,289l13.09-.48,0-13.68a19.51,19.51,0,0,0-5.27-3.48c-2.41-.84-5.28-3.48-4.35-10.73A11.87,11.87,0,0,0,212.49,250l-.2-.17-2.13-9.92a4.61,4.61,0,0,0-3.37,1.93A8.45,8.45,0,0,1,206,243a2,2,0,0,1-2.63.78c-1.38-.61-7.32-3.12-8.65-.66s-1.58,17.11-1.58,17.11a11.19,11.19,0,0,1,3.85,6.33c.91,4.19,2.43,4.29,2.43,4.29l1.64,12s1.49,2.61.38,4.05"
        transform="translate(-50.4 -87.11)" fill="#444053" />
      <path d="M206,243l2.23,6.68,4.26.37-.2-.17-2.13-9.92a4.61,4.61,0,0,0-3.37,1.93A8.45,8.45,0,0,1,206,243Z"
        transform="translate(-50.4 -87.11)" fill="#444053" />
      <path
        d="M173.87,230.69l.29,2.18,9.45,1.34s.77-.58,2-1.37c-1-.23-5.7-1.25-8.16-2-.91-.28-1.51-.52-1.53-.68s.06-.19.21-.31C174.73,230.38,173.87,230.69,173.87,230.69Z"
        transform="translate(-50.4 -87.11)" opacity="0.1" />
      <path
        d="M162.79,244.8s10.71,8.13,17.35,9.44c0,0,9.34,2.76,13,6l4-15.42-2.45-1.69s-2.93,1.81-5.45,1.21-5.31-1-5.31-1a41.06,41.06,0,0,0-6.79-1.86c-1.8-.15-1.07-2.49.73-3.73a3.91,3.91,0,0,1,.75-.42,2.32,2.32,0,0,0,3,.68,6.85,6.85,0,0,0,1.76-1.64h0a22.83,22.83,0,0,0,2-3s-5.59-1.2-8.37-2.06c-.91-.28-1.51-.52-1.53-.68-.08-.64,5-2.66,5-2.66s-4.34-2.1-6.1-.57c0,0,1.14.85.22,1.69s-12,9.37-12,9.37S157.13,241.15,162.79,244.8Z"
        transform="translate(-50.4 -87.11)" fill="#444053" />
      <path
        d="M172,236.91l5.93.85a3.91,3.91,0,0,1,.75-.42,2.32,2.32,0,0,0,3,.68,6.85,6.85,0,0,0,1.76-1.64h0a23.44,23.44,0,0,0,1.62-2.53s-5.59-1.2-8.37-2.06Z"
        transform="translate(-50.4 -87.11)" opacity="0.1" />
      <path d="M172.34,236.43l6.31.91a2.32,2.32,0,0,0,3,.68c1.81-1,3.76-4.66,3.76-4.66s-5.59-1.2-8.37-2.06Z"
        transform="translate(-50.4 -87.11)" fill="#444053" />
      <path
        d="M289.83,330l-10.51,7.95s4.76,2.46,9.19,5.31c3.87-2.62,7.52-5,10.29-7.21C295.11,334.71,289.83,330,289.83,330Z"
        transform="translate(-50.4 -87.11)" opacity="0.1" />
      <path
        d="M232.31,381.67a35.61,35.61,0,0,0,7.7-1.84s1.94-.42,4.82-1.38c-.09-1-.15-2.14-.16-3.43a70.09,70.09,0,0,0-1.44-11l-10.65,1.93-.28,11.91A7.94,7.94,0,0,0,232.31,381.67Z"
        transform="translate(-50.4 -87.11)" opacity="0.1" />
      <path
        d="M213.33,333.35c2.14,3.17,8,16.65,8,16.65a57.34,57.34,0,0,0,4.46,6.87c2.33,2.93,3.94,9.52,5.71,14.79s-.52,4.28-.27,7,10.26-.8,10.26-.8,20.45-4.5,26.7-17,31.21-23.82,36.26-30.85-1.43-4.13-1.18-7.94-2.63-7-2.63-7-9.42-2.66-10.95-4.51-9.05-6.48-9.05-6.48-7.09-3.07-8-4.14-9.31-4.39-11.88-5-5.09-4.3-5.09-4.3-1.59.21-3.94-2.07-12.21-4.24-12.21-4.24C222.69,296.73,211.06,295,211.06,295l-.27,2.34C201.84,309,211.19,330.18,213.33,333.35Z"
        transform="translate(-50.4 -87.11)" fill="#444053" />
      <path d="M210.79,297.32s14.55,4.79,28.74-12.93C222.69,296.73,211.06,295,211.06,295Z"
        transform="translate(-50.4 -87.11)" opacity="0.1" />
      <path d="M235.83,305.59s19.54,28.21,20.75,29.24S236.86,305.24,235.83,305.59Z"
        transform="translate(-50.4 -87.11)" opacity="0.1" />
      <path d="M226.8,303.43s13.53,21,13.26,23.84C240.06,327.27,227,307.08,226.8,303.43Z"
        transform="translate(-50.4 -87.11)" opacity="0.1" />
      <path d="M218.92,309.2s2.5,11.75-1.26,18.41Z" transform="translate(-50.4 -87.11)" opacity="0.1" />
      <path d="M213.72,309.88s-.16,10.17-1.3,12.26Z" transform="translate(-50.4 -87.11)" opacity="0.1" />
      <polygon points="196.46 213.7 214.43 220.74 207.85 221.6 196.46 213.7" opacity="0.1" />
      <path
        d="M211.48,222.14c.9.6,1.65,1.55,2.72,1.69a4.28,4.28,0,0,0,2.21-.54c1.79-.78,3.81-1.38,5.67-.77,2.64.87,4.09,3.91,6.72,4.81a4.79,4.79,0,0,0,2.52.14,4.88,4.88,0,0,0,1.42-.58,4.57,4.57,0,0,0,2-2.84,5.88,5.88,0,0,0-2-5.54,12.27,12.27,0,0,0-5.59-2.54c-5.28-1.17-10.77-.78-16.16-.37a2.35,2.35,0,0,0-1.26.33c-.82.61-2.22,3.68-1.93,4.72C208.2,222,211.33,221,211.48,222.14Z"
        transform="translate(-50.4 -87.11)" opacity="0.1" />
      <path
        d="M211.43,221.72c.9.59,1.64,1.55,2.72,1.69a4.23,4.23,0,0,0,2.2-.55c1.79-.78,3.82-1.38,5.67-.77,2.64.88,4.09,3.92,6.72,4.81a4.7,4.7,0,0,0,2.52.14,4.6,4.6,0,0,0,1.42-.57,4.68,4.68,0,0,0,2.06-2.84,5.91,5.91,0,0,0-2.05-5.55,12.31,12.31,0,0,0-5.59-2.53c-5.28-1.18-10.76-.78-16.16-.38a2.38,2.38,0,0,0-1.26.34c-.81.6-2.22,3.68-1.93,4.72C208.15,221.62,211.28,220.56,211.43,221.72Z"
        transform="translate(-50.4 -87.11)" fill="#3f3d56" />
      <path
        d="M281,230.09l1.72,6.95,2.23-1.35,12.12-7.31s9.18-.34,9.89-7.72-10.2-.07-10.78.49-1.9,1.55-1.9,1.55L283,229Z"
        transform="translate(-50.4 -87.11)" fill="#efb7b9" />
      <path d="M281,230.09l1.72,6.95,2.23-1.35c-.49-3.14-1.26-6-2-6.7Z" transform="translate(-50.4 -87.11)"
        opacity="0.1" />
      <path
        d="M221.18,275.53l2.47,14.5L238.27,287c-.35-1.11-4.68-15.12-1.55-18.57,3.28-3.59,2-13.72,2-13.72s-5.67-6.52-6.82-8.1-8.51-2.82-8.51-2.82a5.91,5.91,0,0,1-.53-2.07,8.32,8.32,0,0,0-.56,1.55c0,2.64,1.07,4.46,3.9,5.79.25.12.51.23.79.34.44.18.93.35,1.45.51l.24.07c4.71,1.4,5.73,4.22,5.73,4.22a10.79,10.79,0,0,1,2.14,7.6C236.09,266.25,221.18,275.53,221.18,275.53Z"
        transform="translate(-50.4 -87.11)" opacity="0.1" />
      <path
        d="M222,275.42l2.47,14.49L241,286.47s-.5-5.47-1.65-7.69-.92-10.89-.92-10.89c7-7.54,3.32-13.67,3.32-13.67s20.57-3.34,20.92-4,7.21-4.32,7.21-4.32,7.45-1.91,8.46-3a9,9,0,0,1,1.22-1.11,3.21,3.21,0,0,1,.4-.26l.55,4.75h.25A6.77,6.77,0,0,0,284,245c1.7-1.3-.45-15.55-2.1-16.05a1.9,1.9,0,0,0-.95,0,10.74,10.74,0,0,0-3.55,1.92l-.29.23-.1.09s-9.31,3.65-11.17,5.33-16.34,3.81-16.34,3.81-6.49,1.54-7.33.61-10.75-2.45-11.58-1-3.13,1.19-3.13,1.19c-1.63-1.88-2.76-1.15-3.45-.07a7.55,7.55,0,0,0-.88,2.09c0,2.88,1.27,4.77,4.69,6.13.52.2,1.08.4,1.69.58,4.72,1.4,5.73,4.22,5.73,4.22a10.77,10.77,0,0,1,2.15,7.6C236.94,266.14,222,275.42,222,275.42Z"
        transform="translate(-50.4 -87.11)" fill="#444053" />
      <path
        d="M281,229a1.54,1.54,0,0,1,.53.06c1.65.5,3.79,14.76,2.09,16.06a6.7,6.7,0,0,1-2.89,1.25h-.25l-.55-4.75a3.21,3.21,0,0,0-.4.26l0-.2a12.34,12.34,0,0,0-2.35-10.55Z"
        transform="translate(-50.4 -87.11)" opacity="0.1" />
      <path
        d="M279.92,241.6l.55,4.75A6.65,6.65,0,0,0,284,245c1.7-1.3-.45-15.55-2.1-16.05-1.3-.4-3.59,1.22-4.5,1.91A12.36,12.36,0,0,1,279.92,241.6Z"
        transform="translate(-50.4 -87.11)" fill="#444053" />
      <path
        d="M227.86,249.25l2.37-2.22-6.18-6a7.55,7.55,0,0,0-.88,2.09C223.19,246,224.44,247.89,227.86,249.25Z"
        transform="translate(-50.4 -87.11)" fill="#444053" />
      <path
        d="M211.32,220.87c.9.59,1.64,1.55,2.72,1.69a4.23,4.23,0,0,0,2.2-.55c1.79-.78,3.82-1.38,5.67-.77,2.64.88,4.09,3.92,6.72,4.81a4.7,4.7,0,0,0,2.52.14,4.57,4.57,0,0,0,3.48-3.41,4.55,4.55,0,0,0,.11-1.27,4.74,4.74,0,0,1,0,2.12,4.64,4.64,0,0,1-2.06,2.84,4.5,4.5,0,0,1-1.42.57,4.66,4.66,0,0,1-2.51-.14c-2.64-.89-4.09-3.93-6.73-4.81-1.85-.61-3.88,0-5.67.77a4.23,4.23,0,0,1-2.2.55c-1.07-.14-1.82-1.1-2.72-1.69-.15-1.16-3.28-.1-3.67-1.49a1.66,1.66,0,0,1,0-.64C208.38,220.66,211.17,219.78,211.32,220.87Z"
        transform="translate(-50.4 -87.11)" opacity="0.1" />
      <path d="M221,253.6s-1.31,3.68.36,4.92c0,0-1.83-4.87-2.89-4.76" transform="translate(-50.4 -87.11)"
        opacity="0.1" />
      <path d="M302.45,217.76s-8.45,7.31-2.34,8.49S302.45,217.76,302.45,217.76Z"
        transform="translate(-50.4 -87.11)" fill="#efb7b9" />
      <g opacity="0.1">
        <path
          d="M871.84,420.25h-263V653.19c0,53.26-40.75,90-90.62,90a100.13,100.13,0,0,1-34.82-6.11,97.54,97.54,0,0,0,47.82,12.11c49.87,0,90.62-36.72,90.62-90V426.25h250Z"
          transform="translate(-50.4 -87.11)" />
        <polygon
          points="558.42 281.05 571.42 281.05 571.42 218.04 821.44 218.04 821.44 212.04 558.42 212.04 558.42 281.05" />
        <path
          d="M927.83,249.17v404c0,53.26-40.75,90-90.62,90a100.13,100.13,0,0,1-34.82-6.11,97.54,97.54,0,0,0,47.82,12.11c49.87,0,90.62-36.72,90.62-90v-410Z"
          transform="translate(-50.4 -87.11)" />
      </g>
      <path
        d="M630.23,157c6.45,13.33,17,28.49,28.93,22.7S680,149.35,673.55,136s-21.39-19.42-33.35-13.63S623.77,143.69,630.23,157Z"
        transform="translate(-50.4 -87.11)" fill="#6c63ff" />
      <path
        d="M655.76,188.14s2.33-.39,1.44-2.31a3.57,3.57,0,0,0-.28-.49,6.17,6.17,0,0,1-.89-2.48,9,9,0,0,1,.11-3.09l-6.35-.42s2.47,2.1,2.18,3.2a.63.63,0,0,1-.29.38,1,1,0,0,1-.42.18l-.48.14c-1.67.59-1,1.43-1,1.43C650,187.42,655.76,188.14,655.76,188.14Z"
        transform="translate(-50.4 -87.11)" fill="#6c63ff" />
      <path
        d="M651.68,182.93l4.48.62a5.58,5.58,0,0,1-.13-.69c-1.14-.05-2.93-.2-4.06-.31A.63.63,0,0,1,651.68,182.93Z"
        transform="translate(-50.4 -87.11)" fill="#444053" />
      <path
        d="M655.76,188.14s2.33-.39,1.44-2.31a7.2,7.2,0,0,1-2.75.11,6.09,6.09,0,0,1-3.67-2.69c-1.67.59-1,1.43-1,1.43C650,187.42,655.76,188.14,655.76,188.14Z"
        transform="translate(-50.4 -87.11)" fill="#6c63ff" />
      <path
        d="M655.76,188.14s2.33-.39,1.44-2.31a7.2,7.2,0,0,1-2.75.11,6.09,6.09,0,0,1-3.67-2.69c-1.67.59-1,1.43-1,1.43C650,187.42,655.76,188.14,655.76,188.14Z"
        transform="translate(-50.4 -87.11)" opacity="0.1" />
      <path
        d="M652.37,123.77s7.1-.86,9.11,3.87a5.71,5.71,0,0,0-2.55.15,3.62,3.62,0,0,1-1.66.32A9.52,9.52,0,0,0,652.37,123.77Z"
        transform="translate(-50.4 -87.11)" fill="#fff" opacity="0.1" />
      <path
        d="M660,220.15a2.51,2.51,0,0,0,.4-.4,5.41,5.41,0,0,1,1.52-1.2,5.33,5.33,0,0,1,.63-.32,9.27,9.27,0,0,1,2-.6,8,8,0,0,1,1-.11l-.9-4.3v-.06l-.39-1.87a13.58,13.58,0,0,1-.9,1.57c-.46.7-1,1.37-1.6,1.38a.71.71,0,0,1-.45-.17,1.36,1.36,0,0,1-.28-.36c-.1-.16-.18-.3-.27-.43-1-1.44-1.63-.54-1.63-.54-1.14.41-1.61,1.77-1.78,3.14,0,.2,0,.4-.06.59a15.71,15.71,0,0,0,.1,2.91S658.42,221.53,660,220.15Z"
        transform="translate(-50.4 -87.11)" fill="#6c63ff" />
      <path
        d="M662,218.55a5.33,5.33,0,0,1,.63-.32c-.22-.93-.49-2.33-.68-3.43,0-.08,0-.15,0-.23s0-.23-.06-.33a.71.71,0,0,1-.45-.17l.1.67,0,.27Z"
        transform="translate(-50.4 -87.11)" fill="#444053" />
      <path
        d="M660,220.15a7.21,7.21,0,0,1-.84-2.62,5.68,5.68,0,0,1,.19-1.66c.05-.16.09-.32.15-.47a4.87,4.87,0,0,1,1.26-2.12c-1-1.44-1.63-.54-1.63-.54-1.14.41-1.61,1.77-1.78,3.14,0,.2,0,.4-.06.59a15.71,15.71,0,0,0,.1,2.91S658.42,221.53,660,220.15Z"
        transform="translate(-50.4 -87.11)" fill="#6c63ff" />
      <path
        d="M660,220.15a7.21,7.21,0,0,1-.84-2.62,5.68,5.68,0,0,1,.19-1.66c.05-.16.09-.32.15-.47a4.87,4.87,0,0,1,1.26-2.12c-1-1.44-1.63-.54-1.63-.54-1.14.41-1.61,1.77-1.78,3.14,0,.2,0,.4-.06.59a15.71,15.71,0,0,0,.1,2.91S658.42,221.53,660,220.15Z"
        transform="translate(-50.4 -87.11)" opacity="0.1" />
      <path
        d="M616.75,179c5.4,3.47,11.63,6.83,17.55,8.61,4.55,1.38,8.91,1.82,12.56.66a11.51,11.51,0,0,0,4.26-2.46,12.15,12.15,0,0,0,2.15-2.56c4.23-6.61,4.15-18.23.8-28.29-2.34-7-6.22-13.2-11.33-16.48-12.46-8-28.38-5.4-35.56,5.79S604.29,171,616.75,179Z"
        transform="translate(-50.4 -87.11)" fill="#6c63ff" />
      <path
        d="M616.75,179c5.4,3.47,11.63,6.83,17.55,8.61,4.55,1.38,8.91,1.82,12.56.66a11.51,11.51,0,0,0,4.26-2.46,12.15,12.15,0,0,0,2.15-2.56c4.23-6.61,4.15-18.23.8-28.29-2.34-7-6.22-13.2-11.33-16.48-12.46-8-28.38-5.4-35.56,5.79S604.29,171,616.75,179Z"
        transform="translate(-50.4 -87.11)" opacity="0.1" />
      <path
        d="M647.91,192.41c1.59,2.22,6.86-.16,6.86-.16s1.79-1.54,0-2.71a4.27,4.27,0,0,0-.49-.28,5.58,5.58,0,0,1-1.59-1.13c-.16-.16-.32-.33-.47-.51a9.36,9.36,0,0,1-1.12-1.77,7.42,7.42,0,0,1-.39-.93l-5.64,3a12.79,12.79,0,0,1,1.77.43c.81.26,1.61.64,1.76,1.16a.63.63,0,0,1,0,.48,1.19,1.19,0,0,1-.27.37,4.94,4.94,0,0,0-.33.37C646.86,192.06,647.91,192.41,647.91,192.41Z"
        transform="translate(-50.4 -87.11)" fill="#6c63ff" />
      <path
        d="M648.58,190l4.13-1.82c-.16-.16-.32-.33-.47-.51-1,.54-2.59,1.35-3.62,1.85A.63.63,0,0,1,648.58,190Z"
        transform="translate(-50.4 -87.11)" fill="#444053" />
      <path
        d="M647.91,192.41c1.59,2.22,6.86-.16,6.86-.16s1.79-1.54,0-2.71a6.91,6.91,0,0,1-2.29,1.52,6.09,6.09,0,0,1-4.52-.37C646.86,192.06,647.91,192.41,647.91,192.41Z"
        transform="translate(-50.4 -87.11)" fill="#6c63ff" />
      <path
        d="M647.91,192.41c1.59,2.22,6.86-.16,6.86-.16s1.79-1.54,0-2.71a6.91,6.91,0,0,1-2.29,1.52,6.09,6.09,0,0,1-4.52-.37C646.86,192.06,647.91,192.41,647.91,192.41Z"
        transform="translate(-50.4 -87.11)" opacity="0.1" />
      <path
        d="M618.28,139.12s5.61-4.43,9.79-1.45a5.76,5.76,0,0,0-2.09,1.46,3.63,3.63,0,0,1-1.26,1.14A9.53,9.53,0,0,0,618.28,139.12Z"
        transform="translate(-50.4 -87.11)" fill="#fff" opacity="0.1" />
      <g opacity="0.1">
        <path
          d="M678.56,185.77l-1.3-6.23a12,12,0,0,1-.9,1.57,11.26,11.26,0,0,0,1.2,4.78A7,7,0,0,1,678.56,185.77Z"
          transform="translate(-50.4 -87.11)" />
        <path
          d="M673,188.41a3,3,0,0,0,.4-.4,5.59,5.59,0,0,1,1.52-1.21,5.33,5.33,0,0,1,.63-.32,8.57,8.57,0,0,1,2-.59,7,7,0,0,1,1-.12l-1.3-6.23a12,12,0,0,1-.9,1.57c-.46.7-1.05,1.38-1.6,1.39a.73.73,0,0,1-.44-.18A1.23,1.23,0,0,1,674,182c-.09-.16-.18-.3-.26-.43-1-1.44-1.64-.53-1.64-.53-2.57.93-1.74,6.64-1.74,6.64S671.39,189.78,673,188.41Z"
          transform="translate(-50.4 -87.11)" />
        <path d="M674.92,186.8a5.33,5.33,0,0,1,.63-.32c-.26-1.09-.58-2.86-.79-4a.73.73,0,0,1-.44-.18Z"
          transform="translate(-50.4 -87.11)" />
        <path
          d="M673,188.41a7.33,7.33,0,0,1-.84-2.63,6.14,6.14,0,0,1,1.61-4.25c-1-1.44-1.64-.53-1.64-.53-2.57.93-1.74,6.64-1.74,6.64S671.39,189.78,673,188.41Z"
          transform="translate(-50.4 -87.11)" />
        <path
          d="M673,188.41a7.33,7.33,0,0,1-.84-2.63,6.14,6.14,0,0,1,1.61-4.25c-1-1.44-1.64-.53-1.64-.53-2.57.93-1.74,6.64-1.74,6.64S671.39,189.78,673,188.41Z"
          transform="translate(-50.4 -87.11)" opacity="0.1" />
      </g>
      <path
        d="M672.18,187.17a2.51,2.51,0,0,0,.4-.4,5.59,5.59,0,0,1,1.52-1.2,5.33,5.33,0,0,1,.63-.32,8.57,8.57,0,0,1,2-.59,7,7,0,0,1,1-.12l-1.3-6.23a12.74,12.74,0,0,1-.9,1.57c-.46.7-1,1.38-1.6,1.38a.66.66,0,0,1-.44-.17,1.38,1.38,0,0,1-.29-.36c-.09-.16-.18-.3-.26-.43-1-1.44-1.64-.54-1.64-.54-2.57.94-1.74,6.65-1.74,6.65S670.57,188.55,672.18,187.17Z"
        transform="translate(-50.4 -87.11)" fill="#6c63ff" />
      <path d="M674.1,185.57a5.33,5.33,0,0,1,.63-.32c-.26-1.09-.58-2.86-.79-4a.66.66,0,0,1-.44-.17Z"
        transform="translate(-50.4 -87.11)" fill="#444053" />
      <path
        d="M672.18,187.17a7.21,7.21,0,0,1-.84-2.62A6.14,6.14,0,0,1,673,180.3c-1-1.44-1.64-.54-1.64-.54-2.57.94-1.74,6.65-1.74,6.65S670.57,188.55,672.18,187.17Z"
        transform="translate(-50.4 -87.11)" fill="#6c63ff" />
      <path
        d="M672.18,187.17a7.21,7.21,0,0,1-.84-2.62A6.14,6.14,0,0,1,673,180.3c-1-1.44-1.64-.54-1.64-.54-2.57.94-1.74,6.65-1.74,6.65S670.57,188.55,672.18,187.17Z"
        transform="translate(-50.4 -87.11)" opacity="0.1" />
      <g opacity="0.1">
        <path d="M667,169a11.41,11.41,0,0,0,4.62,1.71,8.39,8.39,0,0,1,.46-.9l-5.88-2.44A12,12,0,0,1,667,169Z"
          transform="translate(-50.4 -87.11)" />
        <path
          d="M669,177.63s2.33.39,2.11-1.72a3.24,3.24,0,0,0-.11-.56,5.53,5.53,0,0,1-.14-1.93,5.36,5.36,0,0,1,.1-.7,9.63,9.63,0,0,1,1.1-2.89l-5.88-2.44A12,12,0,0,1,667,169c.32.78.54,1.65.24,2.1a.69.69,0,0,1-.4.27,1.06,1.06,0,0,1-.45,0l-.51,0c-1.76,0-1.36,1-1.36,1C663.79,175.1,669,177.63,669,177.63Z"
          transform="translate(-50.4 -87.11)" />
        <path
          d="M666.8,171.39l4,2a5.36,5.36,0,0,1,.1-.7c-1.06-.41-2.7-1.14-3.74-1.6A.69.69,0,0,1,666.8,171.39Z"
          transform="translate(-50.4 -87.11)" />
        <path
          d="M669,177.63s2.33.39,2.11-1.72a7.2,7.2,0,0,1-2.64-.78,6.16,6.16,0,0,1-2.61-3.73c-1.76,0-1.36,1-1.36,1C663.79,175.1,669,177.63,669,177.63Z"
          transform="translate(-50.4 -87.11)" />
        <path
          d="M669,177.63s2.33.39,2.11-1.72a7.2,7.2,0,0,1-2.64-.78,6.16,6.16,0,0,1-2.61-3.73c-1.76,0-1.36,1-1.36,1C663.79,175.1,669,177.63,669,177.63Z"
          transform="translate(-50.4 -87.11)" opacity="0.1" />
      </g>
      <path
        d="M668.57,177s2.33.39,2.11-1.71a3.07,3.07,0,0,0-.11-.56,5.59,5.59,0,0,1-.14-1.94,5.21,5.21,0,0,1,.1-.69,8.17,8.17,0,0,1,.64-2,8.39,8.39,0,0,1,.46-.9l-5.88-2.45a12,12,0,0,1,.8,1.63c.32.79.54,1.65.24,2.11a.72.72,0,0,1-.4.26,1.23,1.23,0,0,1-.45,0l-.51,0c-1.76,0-1.36,1-1.36,1C663.38,174.48,668.57,177,668.57,177Z"
        transform="translate(-50.4 -87.11)" fill="#6c63ff" />
      <path
        d="M666.39,170.77l4,2a5.21,5.21,0,0,1,.1-.69c-1.06-.41-2.7-1.14-3.74-1.6A.72.72,0,0,1,666.39,170.77Z"
        transform="translate(-50.4 -87.11)" fill="#444053" />
      <path
        d="M668.57,177s2.33.39,2.11-1.71a7.44,7.44,0,0,1-2.64-.79,6.14,6.14,0,0,1-2.61-3.72c-1.76,0-1.36,1-1.36,1C663.38,174.48,668.57,177,668.57,177Z"
        transform="translate(-50.4 -87.11)" fill="#6c63ff" />
      <path
        d="M668.57,177s2.33.39,2.11-1.71a7.44,7.44,0,0,1-2.64-.79,6.14,6.14,0,0,1-2.61-3.72c-1.76,0-1.36,1-1.36,1C663.38,174.48,668.57,177,668.57,177Z"
        transform="translate(-50.4 -87.11)" opacity="0.1" />
      <path
        d="M645.49,204.39a12.41,12.41,0,0,1,.91-1.56c.48-.7,1.07-1.37,1.61-1.37a.63.63,0,0,1,.45.18,1.3,1.3,0,0,1,.28.35c.09.17.18.31.26.44,1,1.46,1.64.55,1.64.55,2.58-.9,1.8-6.63,1.8-6.63s-1-2.15-2.6-.79a3.68,3.68,0,0,0-.41.39,6.39,6.39,0,0,1-2.16,1.51,9,9,0,0,1-2,.57,6.36,6.36,0,0,1-1,.11Z"
        transform="translate(-50.4 -87.11)" fill="#6c63ff" />
      <path
        d="M648,201.46a.63.63,0,0,1,.45.18l-.56-4.49a5.25,5.25,0,0,1-.63.31C647.52,198.56,647.82,200.33,648,201.46Z"
        transform="translate(-50.4 -87.11)" fill="#444053" />
      <path
        d="M649,202.43c1,1.46,1.64.55,1.64.55,2.58-.9,1.8-6.63,1.8-6.63s-1-2.15-2.6-.79a7,7,0,0,1,.8,2.63A6.06,6.06,0,0,1,649,202.43Z"
        transform="translate(-50.4 -87.11)" fill="#6c63ff" />
      <path
        d="M649,202.43c1,1.46,1.64.55,1.64.55,2.58-.9,1.8-6.63,1.8-6.63s-1-2.15-2.6-.79a7,7,0,0,1,.8,2.63A6.06,6.06,0,0,1,649,202.43Z"
        transform="translate(-50.4 -87.11)" opacity="0.1" />
      <path
        d="M643.36,212.81a19.55,19.55,0,0,0,3-10c.48-.7,1.07-1.37,1.61-1.37a.63.63,0,0,1,.45.18,1.3,1.3,0,0,1,.28.35c.09.17.18.31.26.44,1,1.46,1.64.55,1.64.55,2.58-.9,1.8-6.63,1.8-6.63s-1-2.15-2.6-.79a3.68,3.68,0,0,0-.41.39,6.39,6.39,0,0,1-2.16,1.51,9,9,0,0,1-2,.57,13.44,13.44,0,0,0-1.85-2.78,22.81,22.81,0,0,0-8.9-5.87C635.88,198.23,638.49,207.57,643.36,212.81Z"
        transform="translate(-50.4 -87.11)" opacity="0.1" />
      <path
        d="M657.39,215.88a17.36,17.36,0,0,0,2.15-.48,18.83,18.83,0,0,0,1.91-.66l.41-.17c.53-.23,1.07-.48,1.61-.76s.81-.42,1.22-.65c7.61-4.39,15-13.22,18.3-22.18a29.11,29.11,0,0,0,1.79-7.62,20.49,20.49,0,0,0-.06-4.15A29.29,29.29,0,0,0,681,168c-.22-.37-.43-.72-.66-1.06-5-7.72-13.41-12.38-22.35-11.44,1.94,5.61,4.7,10.39,8.59,12.88.32.79.54,1.65.24,2.11a.72.72,0,0,1-.4.26,1.23,1.23,0,0,1-.45,0l-.51,0c-1.76,0-1.36,1-1.36,1-.69,2.65,4.5,5.18,4.5,5.18s2.33.39,2.11-1.71a3.07,3.07,0,0,0-.11-.56,5.59,5.59,0,0,1-.14-1.94,5.21,5.21,0,0,1,.1-.69,8.17,8.17,0,0,1,.64-2,12.85,12.85,0,0,0,3.34,0,17.74,17.74,0,0,0,4.56-1.24c-.21.33-.4.66-.58,1a19.62,19.62,0,0,0-3,10c-.46.7-1,1.38-1.6,1.38a.66.66,0,0,1-.44-.17,1.38,1.38,0,0,1-.29-.36c-.09-.16-.18-.3-.26-.43-1-1.44-1.64-.54-1.64-.54-2.57.94-1.74,6.65-1.74,6.65s1,2.14,2.61.76a2.51,2.51,0,0,0,.4-.4,5.59,5.59,0,0,1,1.52-1.2,5.33,5.33,0,0,1,.63-.32,8.57,8.57,0,0,1,2-.59,12.74,12.74,0,0,0,1.87,2.77l.4.43-.14.13a79,79,0,0,0-8.87,9.44c-.81,1-1.59,2.1-2.28,3.18q-.74,1.13-1.38,2.25a19.67,19.67,0,0,0-2.94,10c-.46.7-1,1.37-1.6,1.38a.71.71,0,0,1-.45-.17,1.36,1.36,0,0,1-.28-.36c-.1-.16-.18-.3-.27-.43-1-1.44-1.63-.54-1.63-.54C658,213.15,657.56,214.51,657.39,215.88Z"
        transform="translate(-50.4 -87.11)" opacity="0.1" />
      <g opacity="0.1">
        <path
          d="M668.78,165.86a3.6,3.6,0,0,0,1.68.23,5.83,5.83,0,0,1,2.46.68c-.38-5.12-7.38-6.6-7.38-6.6A9.5,9.5,0,0,1,668.78,165.86Z"
          transform="translate(-50.4 -87.11)" />
        <path
          d="M633.86,184.5c.13,1,.27,2.09.44,3.15,4.55,1.38,8.91,1.82,12.56.66.81.26,1.61.64,1.76,1.16a.63.63,0,0,1,0,.48,1.19,1.19,0,0,1-.27.37,4.94,4.94,0,0,0-.33.37c-1.12,1.37-.07,1.72-.07,1.72,1.59,2.22,6.86-.16,6.86-.16s1.79-1.54,0-2.71a4.27,4.27,0,0,0-.49-.28,5.58,5.58,0,0,1-1.59-1.13c-.16-.16-.32-.33-.47-.51a9.36,9.36,0,0,1-1.12-1.77,12.15,12.15,0,0,0,2.15-2.56c4.23-6.61,4.15-18.23.8-28.29C641.09,156.84,632.07,170,633.86,184.5Z"
          transform="translate(-50.4 -87.11)" />
        <path
          d="M646,213.57a11.4,11.4,0,0,0,4.61,1.73,7.28,7.28,0,0,1,.47-.9L645.18,212A13.86,13.86,0,0,1,646,213.57Z"
          transform="translate(-50.4 -87.11)" />
        <path
          d="M648,222.19s2.34.4,2.11-1.71a3,3,0,0,0-.1-.56,5.61,5.61,0,0,1-.14-1.94,5,5,0,0,1,.09-.69,9,9,0,0,1,.64-2,7.28,7.28,0,0,1,.47-.9L645.18,212a13.86,13.86,0,0,1,.8,1.62c.31.79.53,1.66.23,2.11a.66.66,0,0,1-.39.27,1.32,1.32,0,0,1-.46,0,4.53,4.53,0,0,0-.5,0c-1.77,0-1.37,1-1.37,1C642.81,219.67,648,222.19,648,222.19Z"
          transform="translate(-50.4 -87.11)" />
        <path d="M645.82,216l4,2q0-.36.09-.69c-1.05-.41-2.7-1.14-3.74-1.6A.67.67,0,0,1,645.82,216Z"
          transform="translate(-50.4 -87.11)" />
        <path
          d="M648,222.19s2.33.39,2.11-1.72a7.1,7.1,0,0,1-2.64-.78,6.1,6.1,0,0,1-2.61-3.72c-1.77,0-1.37,1-1.37,1C642.8,219.67,648,222.19,648,222.19Z"
          transform="translate(-50.4 -87.11)" />
        <path
          d="M648,222.19s2.33.39,2.11-1.72a7.1,7.1,0,0,1-2.64-.78,6.1,6.1,0,0,1-2.61-3.72c-1.77,0-1.37,1-1.37,1C642.8,219.67,648,222.19,648,222.19Z"
          transform="translate(-50.4 -87.11)" opacity="0.1" />
        <path
          d="M668.78,165.86a3.6,3.6,0,0,0,1.68.23,5.83,5.83,0,0,1,2.46.68c-.38-5.12-7.38-6.6-7.38-6.6A9.5,9.5,0,0,1,668.78,165.86Z"
          transform="translate(-50.4 -87.11)" opacity="0.1" />
      </g>
      <path
        d="M635.3,185.32c1.81,14.7,6.88,32.44,20.07,30.81s29.52-22,27.71-36.71-14-25.28-27.18-23.65S633.48,170.63,635.3,185.32Z"
        transform="translate(-50.4 -87.11)" fill="#6c63ff" />
      <path
        d="M649.43,223s2.33.4,2.11-1.71a4.44,4.44,0,0,0-.1-.56,5.37,5.37,0,0,1-.15-1.94c0-.23.06-.47.1-.69a9,9,0,0,1,1.11-2.89l-5.88-2.45s1.66,2.79,1,3.74a.69.69,0,0,1-.4.27,1.54,1.54,0,0,1-.45,0l-.5,0c-1.77,0-1.37,1-1.37,1C644.24,220.49,649.43,223,649.43,223Z"
        transform="translate(-50.4 -87.11)" fill="#6c63ff" />
      <path d="M647.25,216.78l4,2c0-.23.06-.47.1-.69-1.06-.41-2.7-1.14-3.74-1.6A.69.69,0,0,1,647.25,216.78Z"
        transform="translate(-50.4 -87.11)" fill="#444053" />
      <path
        d="M649.43,223s2.33.4,2.11-1.71a7,7,0,0,1-2.64-.79,6.06,6.06,0,0,1-2.6-3.72c-1.77,0-1.37,1-1.37,1C644.24,220.49,649.43,223,649.43,223Z"
        transform="translate(-50.4 -87.11)" fill="#6c63ff" />
      <path
        d="M649.43,223s2.33.4,2.11-1.71a7,7,0,0,1-2.64-.79,6.06,6.06,0,0,1-2.6-3.72c-1.77,0-1.37,1-1.37,1C644.24,220.49,649.43,223,649.43,223Z"
        transform="translate(-50.4 -87.11)" opacity="0.1" />
      <path
        d="M667,161s7,1.48,7.38,6.6a5.74,5.74,0,0,0-2.47-.67,3.64,3.64,0,0,1-1.67-.24A9.57,9.57,0,0,0,667,161Z"
        transform="translate(-50.4 -87.11)" fill="#fff" opacity="0.1" />
      <path
        d="M649.79,218.1a4.26,4.26,0,0,1,3.79,5.24c-.88,2.95-4.5,3.88-6.86,5.85s-3.49,5.12-3.78,8.19a20.08,20.08,0,0,0,5.77,15.88c2.12,2.09,4.68,3.69,6.77,5.81a34.58,34.58,0,0,1,5.85,8.92,20.88,20.88,0,0,1,2.59,7.5c.35,4.21-1.77,8.24-4.3,11.62s-5.56,6.44-7.52,10.18a21.39,21.39,0,0,0-1.23,16.77,2.17,2.17,0,0,0,.71,1.12.79.79,0,0,0,1.16-.25"
        transform="translate(-50.4 -87.11)" fill="none" stroke="#444053" stroke-miterlimit="10" />
      <path
        d="M662.08,217.36a2,2,0,0,1,.09,2.54,3.09,3.09,0,0,1-2.44,1.13c-1.13,0-2.39-.35-3.32.31a2.87,2.87,0,0,0-1,2.17,11.07,11.07,0,0,1-.25,2.45,4.88,4.88,0,0,1-1.08,1.76,5.41,5.41,0,0,1-2,1.46c-1.67.65-3.6.06-5.31.6-2.25.71-3.46,3.14-4.14,5.4a15.55,15.55,0,0,0-.49,8.38,29,29,0,0,0,2.27,5.14,11.63,11.63,0,0,1,1.48,5.36,4.92,4.92,0,0,1-2.82,4.5"
        transform="translate(-50.4 -87.11)" fill="none" stroke="#444053" stroke-miterlimit="10" />
      <path
        d="M659.26,281.91c-2.69,3.58-3.71,9.3-8.11,10.17-2.27.45-4.52-.72-6.55-1.84-4.73-2.64-9.6-5.3-15-6.17s-11.36.38-14.9,4.49c-2.41,2.82-3.4,6.6-5.52,9.64a19.78,19.78,0,0,1-11.2,7.36,45.83,45.83,0,0,1-13.58,1.16c-1.69-.05-3.53-.18-4.79-1.3a11.66,11.66,0,0,1-2-3.05c-2.17-3.64-6.46-5.64-10.69-5.91s-8.41,1-12.32,2.61c-2,.82-4,1.76-6.14,1.55-3-.3-5.21-2.72-7.06-5.05a100,100,0,0,1-12.13-19.74"
        transform="translate(-50.4 -87.11)" fill="none" stroke="#444053" stroke-miterlimit="10" />
      <path
        d="M497.91,603.42c1.07-3.89,1.77-7.31,1.77-7.31a15.3,15.3,0,0,1,2-7.41l.05-1.07h0l.3-7.89a26.56,26.56,0,0,0-1.83-4.21c-1.33-2.53.45-11.57.45-11.57s5.76-12.61,4.79-20.78,12.2-35.68,12.2-35.68a35.38,35.38,0,0,0-.83-8,6.81,6.81,0,0,1-.09-1.68v-.14c.39-5.35,5-15.24,5-15.24l.17-19.16s-2.27-11.4,2.73-26.39c1.74-5.23,2.89-9.42,3.64-12.66.09-.37.17-.72.24-1.06-9-1.74-15.92-3.16-15.92-3.16s6.11-21.83,9.82-25.55,7-15.74,7-15.74,2.45-15.49-.37-20.15S526.13,346,526.13,346s-6.64-5.22-7.41-7.46-2-7.25-1.9-9.87,1-4.93.81-6.31,2.25-6.54,1.2-9.06a7,7,0,0,1-.36-2.41s0,0,0-.07a0,0,0,0,0,0,0,33.5,33.5,0,0,1,.85-6.44,18.24,18.24,0,0,1,6.9-3.35l.17-.59.44-1.53c.24-.15.47-.27.69-.38l0-.56.15-2.24-.88-5.07c-1.76-8.82,10-9.68,10-9.68a6.14,6.14,0,0,1,3.42-2.77c2.38-.74-.12,13.17-1.25,14-.85.64-3.57,4.93-4.88,7h0l-.22.35a4.89,4.89,0,0,1,.52.58l-.56,3-.09.46a12.63,12.63,0,0,1,1.74,3.25s-2.23,2.26-1.9,4.9a15.46,15.46,0,0,1-.94,6c.13-.13,1.7-1.7,3.18-1.25s5.63,1.87,5.63,1.87,3.11.68,2.8,1.35,2,3.8,2,3.8L555,316c.09-.24.19-.47.27-.72a19.67,19.67,0,0,0,.87-3.46,19.17,19.17,0,0,1-2.66-1,5.78,5.78,0,0,1-2.27-1.58,9,9,0,0,1-1.21-3.68c-.58-2.48-1.92-4.71-2.86-7.08a22.69,22.69,0,0,1-1.2-12.57,8.26,8.26,0,0,1,1.44-3.61c1.44-1.84,4-2.51,5.83-3.94s3.13-3.7,5.28-4.75c1.95-.95,4.28-.74,6.41-.3a34.3,34.3,0,0,1,11.76,4.79c1.2.77,2.51,1.67,3.93,1.46a5.29,5.29,0,0,0,3-2l0-.11.09-.11a14.85,14.85,0,0,1,1.07,6.35c0,.33,0,.67-.08,1l0,.35a1.43,1.43,0,0,0,0,.29h0a1.73,1.73,0,0,0,0,.45,3.23,3.23,0,0,0,.74,1.17,6,6,0,0,1,.65,1c0-.12-.06-.23-.1-.35a5,5,0,0,1,.77,2.69,2.68,2.68,0,0,1-.7,1.87,8.69,8.69,0,0,1-1.42,1.05,16,16,0,0,1-8.32,16.39c-.1.23-.21.47-.31.71a20.11,20.11,0,0,0-1.88,9.12c0,.22,0,.44.08.67a4.39,4.39,0,0,1,.28.36h0s13.88.67,17.27-2.17,8,7.56,8,7.56,4.95,1.15,6,.23,6.84.12,6.84.12a12.53,12.53,0,0,1,8.8-2.83,25.71,25.71,0,0,1,6.51-3.3h0l.16,0h0a7.19,7.19,0,0,1,3.14-.28s7.05-5.38,9.16-8.33,12-13.84,12.08-13.88l.05-.55.17-1.63a6.09,6.09,0,0,0,.85.11c.06-.16.13-.35.22-.56a29.77,29.77,0,0,1,2.19-4.55s.08-2.07-.51-2.61.57-8.09.57-8.09,6.7-14.15,11.81-3.2c0,0,10.15,7.36,1.09,15.12,0,0-3.55,1.55-4.1,2.87-.36.86-1.64,3.25-2.49,4.83-.15.26-.28.5-.39.71l.1.09-.18,1.34-.08.52c1.62,1,2.7,2,2.4,2.67a15.36,15.36,0,0,0-1.14,3.68s-12.68,14.68-14.5,21.1c0,0-33.19,18-43.91,19l1.48,9.71s.34,5.81.12,7.87.84,11.49.84,11.49,1.32,13.84,2.81,15.83.89,10.24.89,10.24a69.1,69.1,0,0,0,1.69,11.79c1.36,5.3,0,11.73,0,11.73s4.93,12.61-7.69,3.7c0,0-6.35-.64-13.66-1.17,0,.24,0,.49,0,.74,0,.94,0,2-.08,3-.17,7.11-.51,16.9-1.11,24.29-1.08,13.06-6.06,38.8-6.06,38.8l-.5,13a16.94,16.94,0,0,1,.23,3.73,24.16,24.16,0,0,1-4,12.89L578,534.66s-2.56,5.62-2.74,9a4.28,4.28,0,0,0,.07.83,6.08,6.08,0,0,1,.06,1.34c0,3.94-2.75,13.28-2.75,13.28s-.51,9.5-2,10c-1.23.43,1.42,5.54,2.21,7a2.61,2.61,0,0,0,.06-.27l.17.3a6.73,6.73,0,0,1,.35,2.42,3.46,3.46,0,0,1-1.71,3.28c-2.77,1.54-4.27,2.87-2,3.5.87.25,1.8.34,2.49.63,0-.11.09-.22.13-.32a1.52,1.52,0,0,1,.87,1.71,7,7,0,0,1-1,3.19,34.14,34.14,0,0,1-4.12,6.87l-1.09-.16a5.33,5.33,0,0,0,.59,1.2,4.63,4.63,0,0,0,1.55,1.49,5,5,0,0,0,1.92.74,5.49,5.49,0,0,1,4,2.12c1.34,1.88,2.14,4.42-.75,6.51l-10.31,3.12s-17.6,1.6-16.52-2.29,1.78-7.31,1.78-7.31A15.54,15.54,0,0,1,551,596a7.2,7.2,0,0,1,.66-1l-.62-.1s-.94-8.72-2.59-10.44c-.38-.4-.46-.7-.35-.92-.16-.48.29-.74.87-.87,0,.11.08.23.11.34a9.1,9.1,0,0,1,1.71-.12s.75-4.52-1-6.25a1.75,1.75,0,0,1-.31-1.36,7.42,7.42,0,0,1,.27-1.85l.06.11c1.09-4.09,4.49-10.52,4.49-10.52s.31-4.13-.77-5.82,1-22.45,1-22.45,0-10.07,1.42-14.71-1.18-10.25-1.18-10.25l0-.3a.22.22,0,0,0,0-.07l.23-1.58,0,.1c.39-2.65,1.12-7.45,1.6-9.67.69-3.14.57-18.32.57-18.32l-2.32-6.58-5,11L544.47,499s-2.52,3.05-2.7,6.23c0,.15,0,.31,0,.47a8.26,8.26,0,0,1,0,1,8.84,8.84,0,0,1-1.68,5.25s-1.55,7-3.61,8.69-2.19,5.15-2.19,5.15-2.82,10.1-4,11.85c-1,1.47-1.23,5.62-1.27,6.89h0c0,.24,0,.37,0,.37s-.48,3.63-.58,6.7c0,.37,0,.74,0,1.09,0,0,0-.06,0-.08a11.11,11.11,0,0,0,.2,2.49s0,.09,0,.14l0-.51a25.88,25.88,0,0,1,.49,6.38c-.08,3.66-.8,8-3.12,10.44-4,4.26-6.41,3.62-6.41,3.62s1.64,5.58,3.87,6.77a1,1,0,0,1,.24.16c0-.1,0-.21.07-.32a2.69,2.69,0,0,1,.59,2.08c.07,2.43-1.61,6.31-3.14,8.06a4.51,4.51,0,0,1-2,1.05l.35.24c.28.16.53.29.77.4a3.66,3.66,0,0,0,1.15.34,5.43,5.43,0,0,1,4,2.12c1.35,1.88,2.15,4.42-.74,6.51l-10.32,3.12S496.83,607.31,497.91,603.42Z"
        transform="translate(-50.4 -87.11)" fill="url(#af5f6ae9-e1dc-4eac-800c-2506307954c8-1957)" />
      <path
        d="M564.52,612.5l10-3.13c2.8-2.1,2-4.63.73-6.52a5.22,5.22,0,0,0-3.82-2.11,4.73,4.73,0,0,1-1.86-.74,4.45,4.45,0,0,1-1.5-1.49,7.27,7.27,0,0,1-1-3.85s-10.7-3.58-13.78-.53a8.15,8.15,0,0,0-1.38,1.87,16,16,0,0,0-1.65,6.92s-.68,3.41-1.72,7.31S564.52,612.5,564.52,612.5Z"
        transform="translate(-50.4 -87.11)" fill="#2d293d" />
      <path
        d="M516.49,605.79l10-3.13c2.8-2.1,2-4.63.73-6.51a5.18,5.18,0,0,0-3.83-2.11,3.91,3.91,0,0,1-1.11-.35,5,5,0,0,1-.74-.4C518.83,591.67,519,588,519,588s-10.69-3.58-13.77-.53a7.9,7.9,0,0,0-1.09,1.37,15.63,15.63,0,0,0-1.94,7.42s-.69,3.42-1.73,7.31S516.49,605.79,516.49,605.79Z"
        transform="translate(-50.4 -87.11)" fill="#2d293d" />
      <path
        d="M553.29,594.13a8.15,8.15,0,0,0-1.38,1.87h0l16.14,2.5a7.27,7.27,0,0,1-1-3.85S556.37,591.08,553.29,594.13Z"
        transform="translate(-50.4 -87.11)" opacity="0.1" />
      <path
        d="M504.18,588.79l-.12,3c2.36,4.26,14.59,3.82,18.21,1.87a5,5,0,0,1-.74-.4C518.83,591.67,519,588,519,588s-10.69-3.58-13.77-.53A7.9,7.9,0,0,0,504.18,588.79Z"
        transform="translate(-50.4 -87.11)" opacity="0.1" />
      <path
        d="M502.75,575.63a26.62,26.62,0,0,1,1.77,4.21l-.42,10.88c2.58,4.65,17,3.69,19,1.28s4.34-8.8,2.18-10-3.74-6.77-3.74-6.77,2.32.64,6.21-3.62,3.16-14.09,2.56-16.46.4-10.19.4-10.19.07-5.52,1.24-7.26,3.91-11.86,3.91-11.86.13-3.44,2.13-5.16,3.5-8.69,3.5-8.69a9,9,0,0,0,1.61-5.87c-.28-3.46,2.62-7.07,2.62-7.07l5.25-14.7,4.84-11L558,480s.1,15.18-.57,18.33-1.82,11.52-1.82,11.52,2.54,5.61,1.12,10.25-1.39,14.7-1.39,14.7-2,20.76-1,22.45.74,5.82.74,5.82-6.12,11.91-4.39,13.63,1,6.25,1,6.25-3.85-.15-2.26,1.57S552,594.91,552,594.91l16.58,2.57a34.8,34.8,0,0,0,4-6.88c2.4-5-.23-4.57-2.43-5.2s-.74-2,1.94-3.51,1.31-5.33,1.31-5.33-3.74-6.91-2.34-7.41,1.91-10,1.91-10,3.18-11.19,2.61-14.25,2.6-10.25,2.6-10.25l1.3-8.64a23.85,23.85,0,0,0,3.66-16.27l.52-13.36s4.85-25.75,5.91-38.82c.67-8.36,1-19.81,1.17-26.95.09-4,.12-6.66.12-6.66l-59.27-8.49a48.54,48.54,0,0,1-1.42,8.8c-.73,3.25-1.85,7.44-3.54,12.67-4.86,15-2.67,26.39-2.67,26.39l-.19,19.16s-5.73,12.61-4.8,17.06a36.37,36.37,0,0,1,.8,8s-12.79,27.51-11.86,35.68-4.66,20.79-4.66,20.79S501.47,573.1,502.75,575.63Z"
        transform="translate(-50.4 -87.11)" fill="#3f3d56" />
      <path d="M539.54,505.18l-18-3.11S531.38,512.93,539.54,505.18Z" transform="translate(-50.4 -87.11)"
        opacity="0.05" />
      <path d="M524.82,484.47s-.87,6.38,3,8.94C527.78,493.41,520.8,492,524.82,484.47Z"
        transform="translate(-50.4 -87.11)" opacity="0.1" />
      <path d="M526.71,464.12s14.67,13.05,20.21,12.23S526.71,464.12,526.71,464.12Z"
        transform="translate(-50.4 -87.11)" opacity="0.1" />
      <path d="M561.77,511.89s11.4,3.06,11.56,7.69S561.77,511.89,561.77,511.89Z"
        transform="translate(-50.4 -87.11)" opacity="0.1" />
      <path d="M557,569.24s16.13,3.65,11.44,5.54A78.41,78.41,0,0,1,556.14,578S550.89,578.11,557,569.24Z"
        transform="translate(-50.4 -87.11)" opacity="0.05" />
      <g opacity="0.05">
        <path
          d="M571.63,578.19a3.2,3.2,0,0,0,1.57-2.3l.16.3s1.37,3.77-1.31,5.32l-.87.53c-.48-.11-1-.2-1.49-.34C567.49,581.06,569,579.74,571.63,578.19Z"
          transform="translate(-50.4 -87.11)" />
        <path
          d="M550.73,576.28c-.43-.43-.37-1.49-.05-2.84a7.65,7.65,0,0,1,.77,4A3.25,3.25,0,0,0,550.73,576.28Z"
          transform="translate(-50.4 -87.11)" />
        <path
          d="M555.87,507.85a18.48,18.48,0,0,1,.9,5.1,20.71,20.71,0,0,0-1.12-3.53S555.73,508.81,555.87,507.85Z"
          transform="translate(-50.4 -87.11)" />
        <path
          d="M518.93,499.18a6.45,6.45,0,0,1-.09-1.51c.16,1,.27,2,.34,2.84C519.11,500.07,519,499.63,518.93,499.18Z"
          transform="translate(-50.4 -87.11)" />
        <path
          d="M554.38,556.83a8.89,8.89,0,0,1-.3-3.08,10.35,10.35,0,0,1,.65,3.9A3.89,3.89,0,0,0,554.38,556.83Z"
          transform="translate(-50.4 -87.11)" />
        <path
          d="M550,582.68a53.63,53.63,0,0,1,1.58,8.53l16.58,2.57a34.8,34.8,0,0,0,4-6.88c.21-.44.38-.84.52-1.2,1,.5,1.33,1.55-.1,4.52a34.74,34.74,0,0,1-4,6.89L552,594.54s-.91-8.73-2.5-10.45C548.68,583.25,549.22,582.86,550,582.68Z"
          transform="translate(-50.4 -87.11)" />
        <path
          d="M572.92,558.79s-.5,9.5-1.9,10h0c-.63-1.6-1-3.11-.41-3.33,1.4-.5,1.9-10,1.9-10s3.19-11.19,2.62-14.25,2.6-10.24,2.6-10.24l1.3-8.64a23.88,23.88,0,0,0,3.66-16.28l.51-13.36s4.86-25.75,5.91-38.81c.68-8.37,1-19.81,1.18-26.95,0-1.29.05-2.44.06-3.41l.48.07s0,2.66-.12,6.66c-.16,7.14-.5,18.59-1.17,26.95-1.06,13.07-5.91,38.82-5.91,38.82l-.52,13.36a23.85,23.85,0,0,1-3.66,16.27l-1.3,8.64s-3.17,7.19-2.6,10.25S572.92,558.79,572.92,558.79Z"
          transform="translate(-50.4 -87.11)" />
        <path
          d="M522.68,588.31a16.17,16.17,0,0,0,2.89-6.45c1.64,1.6-.55,7.49-2.47,9.77s-16.41,3.37-19-1.28l.1-2.62C507.8,591.56,520.76,590.58,522.68,588.31Z"
          transform="translate(-50.4 -87.11)" />
        <path
          d="M502.34,571.93a27.89,27.89,0,0,1,1.77,4.21l-.08,1.93c-.28-.71-.69-1.67-1.27-2.81a8.23,8.23,0,0,1-.47-3.43Z"
          transform="translate(-50.4 -87.11)" />
        <path
          d="M522.35,574.88a26.05,26.05,0,0,1-1.23-3.33s2.32.64,6.2-3.62c2.84-3.1,3.22-9.15,3-13.13.6,2.37,1.33,12.19-2.56,16.46C525.2,574.05,523.34,574.73,522.35,574.88Z"
          transform="translate(-50.4 -87.11)" />
        <path
          d="M530.71,544.61a72.28,72.28,0,0,0-.59,8.15c-.08-.53-.16-1-.24-1.29-.6-2.36.4-10.19.4-10.19s.08-5.51,1.25-7.26,3.9-11.85,3.9-11.85.13-3.45,2.13-5.16,3.51-8.7,3.51-8.7a9.07,9.07,0,0,0,1.6-5.87c-.28-3.46,2.62-7.07,2.62-7.07l5.26-14.7,4.83-11,2.23,6.57s0,.82,0,2.1L555.81,473,551,484l-5.25,14.7s-2.9,3.61-2.62,7.07a9,9,0,0,1-1.61,5.87s-1.51,7-3.5,8.69-2.13,5.16-2.13,5.16-2.74,10.11-3.91,11.85S530.71,544.61,530.71,544.61Z"
          transform="translate(-50.4 -87.11)" />
      </g>
      <path
        d="M528.89,290.73l.84,5.07-.14,2.24-.11,1.65,5.72.81.69-1.17h0c1.28-2.11,3.91-6.4,4.74-7,1.1-.86,3.53-14.77,1.22-14a6,6,0,0,0-3.31,2.78S527.19,281.91,528.89,290.73Z"
        transform="translate(-50.4 -87.11)" fill="#ffcdd3" />
      <path d="M529.48,299.69l5.72.81.69-1.17h0a5.05,5.05,0,0,0-6.3-1.29Z" transform="translate(-50.4 -87.11)"
        opacity="0.1" />
      <path d="M527.92,302.35l7.51,2,.21-1.12.54-3a5.22,5.22,0,0,0-7.3-1.29l-.43,1.54Z"
        transform="translate(-50.4 -87.11)" fill="#dce6f2" />
      <path
        d="M651.12,296l7.93,4.65.79-1.5c.83-1.58,2.07-4,2.42-4.83.53-1.32,4-2.88,4-2.88,8.78-7.77-1-15.11-1-15.11-4.93-10.95-11.44,3.21-11.44,3.21s-1.11,7.55-.55,8.09.49,2.6.49,2.6a30.15,30.15,0,0,0-2.13,4.56C651.27,295.52,651.12,296,651.12,296Z"
        transform="translate(-50.4 -87.11)" fill="#ffcdd3" />
      <path
        d="M651.12,296l7.93,4.65.79-1.5c-1.11-1-5-4.44-6.36-4.34a9.49,9.49,0,0,1-1.92,0C651.27,295.52,651.12,296,651.12,296Z"
        transform="translate(-50.4 -87.11)" opacity="0.1" />
      <path d="M650.2,298.4l8.92,4.83.26-2,.18-1.34s-5.1-4.72-6.66-4.61a8.21,8.21,0,0,1-2.37-.1l-.17,1.64Z"
        transform="translate(-50.4 -87.11)" fill="#dce6f2" />
      <path
        d="M549.65,325s39.47,6,32.15,3.3c-5.09-1.88-7-5.23-7.31-8.89a20.73,20.73,0,0,1,1.83-9.11,39.25,39.25,0,0,1,3.82-7s-29.66-17.84-24.18-2.45a24.36,24.36,0,0,1,1.44,7.25,20.27,20.27,0,0,1-1.06,7.23A21.73,21.73,0,0,1,549.65,325Z"
        transform="translate(-50.4 -87.11)" fill="#ffcdd3" />
      <path
        d="M556,300.81a24.36,24.36,0,0,1,1.44,7.25c2.76,2.5,5.9,2.47,9.91,2.62,3.1.12,6.49,1,9-.39a39.25,39.25,0,0,1,3.82-7S550.48,285.42,556,300.81Z"
        transform="translate(-50.4 -87.11)" opacity="0.1" />
      <circle cx="518.04" cy="208.24" r="16.4" fill="#ffcdd3" />
      <path
        d="M549.65,325s39.47,6,32.15,3.3c-5.09-1.88-7-5.23-7.31-8.89-1.89-2.21-5.8-3.91-8.31-4.83a11.91,11.91,0,0,0-7.18-.39,10.12,10.12,0,0,0-2.66,1.11A21.73,21.73,0,0,1,549.65,325Z"
        transform="translate(-50.4 -87.11)" opacity="0.1" />
      <path d="M527.92,302.35l7.51,2,.21-1.12a6.7,6.7,0,0,0-7.19-2.77Z" transform="translate(-50.4 -87.11)"
        opacity="0.1" />
      <path d="M650.2,298.4l8.92,4.83.26-2a67.15,67.15,0,0,0-9-4.41Z" transform="translate(-50.4 -87.11)"
        opacity="0.1" />
      <path
        d="M530.12,424.27c15.26,3,37,7,40.49,6.09,2.91-.77,12.1-.32,20.08.26.09-4,.12-6.66.12-6.66l-59.27-8.49A48.54,48.54,0,0,1,530.12,424.27Z"
        transform="translate(-50.4 -87.11)" opacity="0.1" />
      <path
        d="M515,420.08s50.22,10.62,55.71,9.18,33.27,1.42,33.27,1.42c12.21,8.88,7.46-3.72,7.46-3.72s1.35-6.43,0-11.72a71.88,71.88,0,0,1-1.61-11.79s.59-8.25-.85-10.24-2.7-15.83-2.7-15.83-1-9.42-.8-11.48-.11-7.87-.11-7.87l-1.42-9.71c10.38-1,42.53-19.06,42.53-19.06,1.77-6.41,14.06-21.12,14.06-21.12a15.61,15.61,0,0,1,1.1-3.68c.92-2.17-11.31-7-11.31-7s-9.67,10.94-11.71,13.89-8.88,8.35-8.88,8.35a6.75,6.75,0,0,0-3,.28l-.16,0h0a24.55,24.55,0,0,0-6.31,3.31,12,12,0,0,0-8.52,2.84s-5.62-1-6.62-.12-5.78-.22-5.78-.22-4.43-10.38-7.71-7.54-16.73,2.19-16.73,2.19c-1.69-2.45-6-4.33-8.68-5.31a11.91,11.91,0,0,0-7.18-.4,9.16,9.16,0,0,0-2.89,1.27l-8.46,7.67s-2.23-3.12-1.93-3.8-2.7-1.35-2.7-1.35-4-1.39-5.45-1.86-2.95,1.11-3.08,1.25a16.08,16.08,0,0,0,.92-6c-.31-2.63,1.84-4.89,1.84-4.89-4.36-12-15.63-2.54-15.63-2.54s-1.49,6.43-.48,8.95-1.4,7.67-1.18,9.06-.69,3.7-.79,6.32,1.09,7.63,1.83,9.86,7.16,7.45,7.16,7.45.11,7.87,2.83,12.53.33,20.15.33,20.15-3.22,12-6.82,15.74S515,420.08,515,420.08Z"
        transform="translate(-50.4 -87.11)" fill="#3f3d56" />
      <path
        d="M592.13,332.28s1.69-4.49,3.08-4.85a31.9,31.9,0,0,0,4.07-1.64l-.82-1.73s-5.23,1.22-6.12,2.71S592.13,332.28,592.13,332.28Z"
        transform="translate(-50.4 -87.11)" opacity="0.1" />
      <path d="M620.2,323.29c.23,1.38,12.44,3.1,12.44,3.1l-6-6.46h0l-.15,0h0A24.55,24.55,0,0,0,620.2,323.29Z"
        transform="translate(-50.4 -87.11)" opacity="0.1" />
      <path d="M590.62,369.6c.14-.15-32.42,37.86-55.66,14.28C535,383.88,572.85,390.51,590.62,369.6Z"
        transform="translate(-50.4 -87.11)" opacity="0.1" />
      <path
        d="M599.09,349.94A59.93,59.93,0,0,1,591.41,362a48.44,48.44,0,0,1-11.71,10.46S598.68,352.48,599.09,349.94Z"
        transform="translate(-50.4 -87.11)" opacity="0.1" />
      <path d="M606,328.58s-3.62,13.26-11.78,17.5Z" transform="translate(-50.4 -87.11)" opacity="0.1" />
      <path d="M610.7,330.12c.09-.25,2.35,10.69-10.94,16.18C599.76,346.3,605.38,344.63,610.7,330.12Z"
        transform="translate(-50.4 -87.11)" opacity="0.1" />
      <path d="M529.91,318c.21,0-6.61,4-8.49,5.88C521.42,323.9,526,317.59,529.91,318Z"
        transform="translate(-50.4 -87.11)" opacity="0.1" />
      <path
        d="M572.3,310.39a3.43,3.43,0,0,1-1.36,2.16,3.32,3.32,0,0,1-1.56.29c-5,.12-10.22.14-14.77-2a5.58,5.58,0,0,1-2.19-1.58,9.16,9.16,0,0,1-1.17-3.67c-.56-2.48-1.86-4.71-2.76-7.08A23.4,23.4,0,0,1,547.35,286a8.47,8.47,0,0,1,1.39-3.62c1.4-1.84,3.84-2.51,5.65-3.95s3-3.7,5.12-4.75c1.89-1,4.14-.75,6.2-.31a32.39,32.39,0,0,1,11.38,4.78c1.16.77,2.43,1.66,3.81,1.46a5.3,5.3,0,0,0,2.91-2.07,15.07,15.07,0,0,1,1,7.19,3.26,3.26,0,0,0,0,1.08,3.36,3.36,0,0,0,.72,1.16c1.18,1.48,1.86,3.78.59,5.17-.55.62-1.38.93-1.92,1.55-1,1.11-.73,2.78-.76,4.26a2.19,2.19,0,0,1-.42,1.44,2.13,2.13,0,0,1-2,.4,5.68,5.68,0,0,0-2.15-.29,3.65,3.65,0,0,0-1.93,1.37C574.43,303.7,573.41,306.89,572.3,310.39Z"
        transform="translate(-50.4 -87.11)" fill="#3f3d56" />
      <g opacity="0.1">
        <path
          d="M551.91,308a5.55,5.55,0,0,0,2.2,1.58c4.55,2.1,9.76,2.08,14.77,2a3.58,3.58,0,0,0,1.56-.29,3.43,3.43,0,0,0,1.36-2.17c1.11-3.49,2.13-6.68,4.55-9.53a3.61,3.61,0,0,1,1.93-1.37,5.68,5.68,0,0,1,2.15.29,2.11,2.11,0,0,0,2-.41,2.19,2.19,0,0,0,.42-1.44c0-1.47-.21-3.14.75-4.25.54-.63,1.37-.94,1.93-1.55a3.21,3.21,0,0,0,.44-3.27c.82,1.42,1.14,3.22.07,4.39-.56.61-1.39.93-1.93,1.55-1,1.11-.72,2.78-.75,4.26a2.19,2.19,0,0,1-.42,1.44,2.13,2.13,0,0,1-2,.4,5.73,5.73,0,0,0-2.15-.29,3.61,3.61,0,0,0-1.93,1.37c-2.42,2.85-3.45,6-4.55,9.54a3.43,3.43,0,0,1-1.36,2.16,3.32,3.32,0,0,1-1.56.29c-5,.12-10.22.14-14.77-2a5.55,5.55,0,0,1-2.2-1.58,4.46,4.46,0,0,1-.66-1.35Z"
          transform="translate(-50.4 -87.11)" />
        <path
          d="M584.73,285.35a2.37,2.37,0,0,1-.47-.85,3,3,0,0,1,0-1.07,15.25,15.25,0,0,0-.54-6l.09-.1a15.19,15.19,0,0,1,.95,7.19A5.29,5.29,0,0,0,584.73,285.35Z"
          transform="translate(-50.4 -87.11)" />
      </g>
      <path d="M574.85,320.44s-20.59,1.92-22.31-1.23" transform="translate(-50.4 -87.11)" opacity="0.1" />
      <path d="M535.36,310.43s-11.38-.42-14,3.75" transform="translate(-50.4 -87.11)" opacity="0.1" />
    </svg>




  </div>
</div>
</div>`;


