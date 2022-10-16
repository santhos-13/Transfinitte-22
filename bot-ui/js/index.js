// const { json } = require("body-parser");

// const { forEach } = require("lodash");

// const { json } = require("body-parser");

var $messages = $('.messages-content');
var serverResponse = "wala";

var suggession;
//speech reco
try {
  var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  var recognition = new SpeechRecognition();
}
catch(e) {
  console.error(e);
  $('.no-browser-support').show();
}

$('#start-record-btn').on('click', function(e) {
  recognition.start();
});

recognition.onresult = (event) => {
  const speechToText = event.results[0][0].transcript;
 document.getElementById("MSG").value= speechToText;
  //console.log(speechToText)
  insertMessage()
}


function listendom(no){
  console.log(no)
  //console.log(document.getElementById(no))
document.getElementById("MSG").value= no.innerHTML;
  insertMessage();
}

$(window).load(function() {
  $messages.mCustomScrollbar();
  setTimeout(function() {
    serverMessage("hello i am customer support bot type hi and i will show you quick buttions");
  }, 100);

});

function updateScrollbar() {
  $messages.mCustomScrollbar("update").mCustomScrollbar('scrollTo', 'bottom', {
    scrollInertia: 10,
    timeout: 0
  });
}



function insertMessage() {
  msg = $('.message-input').val();
  if ($.trim(msg) == '') {
    return false;
  }
  $('<div class="message message-personal">' + msg + '</div>').appendTo($('.mCSB_container')).addClass('new');
  fetchmsg() 
  
  $('.message-input').val(null);
  updateScrollbar();

}

document.getElementById("mymsg").onsubmit = (e)=>{
  e.preventDefault() 
  insertMessage();
}

function serverMessage(response2) {


  if ($('.message-input').val() != '') {
    return false;
  }
  $('<div class="message loading new"><figure class="avatar"><img src="css/bot.png" /></figure><span></span></div>').appendTo($('.mCSB_container'));
  updateScrollbar();
  

  setTimeout(function() {
    $('.message.loading').remove();
    $('<div class="message new"><figure class="avatar"><img src="css/bot.png" /></figure>' + response2 + '</div>').appendTo($('.mCSB_container')).addClass('new');
    updateScrollbar();
  }, 100 + (Math.random() * 20) * 100);

}

async function fetchmsg(){

     var url = 'http://localhost:5000/send-msg';
    //  var url1 = 'http://localhost:5000/restaurents';

   

     

  
    
      const data = new URLSearchParams();
      for (const pair of new FormData(document.getElementById("mymsg"))) {
          data.append(pair[0], pair[1]);
          console.log(pair)
      }
    
      console.log("abc",data)
        fetch(url, {
          method: 'POST',
          body:data
        }).then(res => res.json())
         .then(response => {
          console.log(response);
         serverMessage(response.Reply);
         
          speechSynthesis.speak( new SpeechSynthesisUtterance(response.Reply))
          if(response.Reply=="fetching restaurant api"){
          console.log("fetching")
          // const fetch = require('node-fetch');


const encodedParams = new URLSearchParams();
encodedParams.append("language", "en_US");
encodedParams.append("limit", "30");
encodedParams.append("location_id", "297704");
encodedParams.append("currency", "USD");

const url1 = 'https://worldwide-restaurants.p.rapidapi.com/search';

const options = {
  method: 'POST',
  headers: {
    'content-type': 'application/x-www-form-urlencoded',
    'X-RapidAPI-Key': '3a15272affmshc5734ae8041d795p1c1c47jsnbaa4a39c142e',
    'X-RapidAPI-Host': 'worldwide-restaurants.p.rapidapi.com'
  },
  body: encodedParams
};



          fetch(url1, options)
            .then(res => res.json())
            .then(json => {
              console.log(json)
              const data0 = JSON.stringify(json.results.data);
                        const parsed_data = JSON.parse(data0)
                        console.log(parsed_data)
                        var arr0=[]
                        for (var i = 0; i < 10; i++) {
                          var obj = {}
                          console.log(parsed_data[i].name)
                          obj["name"]=parsed_data[i].name
                          obj["address"]=parsed_data[i].address
                          obj["rating"]=parsed_data[i].rating
                          arr0.push(obj)
                          
                        }
                        console.log(arr0)
                        for (i in arr0){
                          serverMessage(( " Restaurant name: "+ arr0[i].name +" \n Address: "+arr0[i].address+ "\n Rating: "+arr0[i].rating))
                        }});
            //   fetch("http://localhost:5000/restaurants",{
            //   method: 'POST',
            //   headers:{
            //   'Content-Type': 'application/x-www-form-urlencoded'
            //   },   
            //   mode: 'cors',
            //   body:JSON.stringify(json) ,
            //   }).then((response) => {
            //   console.log(response)})
            // })
            // .then(json => {
            //   console.log(json)
              
            //   })
            
            // .catch(err => console.error('error:' + err));

              
            }


                    if(response.Reply=="fetching shopping api"){

                      const url3 = 'https://target-com-shopping-api.p.rapidapi.com/nearby_stores?place=10010&limit=20&within=100';
        
                      const options3 = {
                      method: 'GET',
                      headers: {
                      'X-RapidAPI-Key': 'ddfdf7283dmsh573292f5b0e06e8p1c785bjsn5877db2da661',
                      'X-RapidAPI-Host': 'target-com-shopping-api.p.rapidapi.com',
                      'content-type': 'application/x-www-form-urlencoded',
                      }
                      };
        
                      fetch(url3, options3)
                      .then(res => res.json())
                      .then(json => {
                        const data1 = JSON.stringify(json.data.nearby_stores.stores);
                        const parsed_data = JSON.parse(data1)
                        console.log(parsed_data[0].status)
                        var arr1=[]
                        for (var i = 0; i < 10; i++) {
                          var obj = {}
                          console.log(parsed_data[i].status)
                          obj["status"]=parsed_data[i].status
                          obj["location_name"]=parsed_data[i].location_name
                          obj["main_voice_phone_number"]=parsed_data[i].main_voice_phone_number
                          arr1.push(obj)
                          
                        }
                        console.log(arr1)
                      
                  

                      // for (const key in data){
                      //   console.log(key,data.key)
                      // }
                        // stores_object
                        // console.log(json)
                        for (i in arr1){
                          serverMessage(( " Status: "+ arr1[i].status +"\n Name: "+arr1[i].location_name+"\n Phone: "+arr1[i].main_voice_phone_number))
                        }
                        // serverMessage(JSON.stringify())
                        fetch("http://localhost:5000/shopping",{
                          method: 'POST',
                          headers:{
                          'Content-Type': 'application/x-www-form-urlencoded'
                          },   
                          mode: 'cors',
                          body:JSON.stringify(json) ,
                          }).then((response) => {
                          console.log(response)})
                        })
                        
                      
                      .catch(err => console.error('error:' + err));
                      }

                      if(response.Reply=="fetching emergency contacts api"){
                        console.log("fetching")

                        fetch('http://127.0.0.1:5500/emergency_contact.json')
                          .then((response) => response.json())
                          .then((json) => {
                            const data2 = JSON.stringify(json);
                        const parsed_data = JSON.parse(data2)
                        console.log(parsed_data)
                        var arr2=[]
                        for (key in parsed_data) {
                          // var obj = {}
                          // console.log(parsed_data[i].status)
                          // obj["status"]=parsed_data[i].status
                          // obj["location_name"]=parsed_data[i].location_name
                          // obj["main_voice_phone_number"]=parsed_data[i].main_voice_phone_number
                          // arr.push(obj)
                          serverMessage(( " Name: "+ key +"\n Phone: "+parsed_data[key]))
                          
                        }
                        console.log(arr2)
                          }
                         
                          );

                      }

                      if(response.Reply=="fetching hospital api"){
                        console.log("fetching")

                        fetch('http://127.0.0.1:5500/hospitals.json')
                          .then((response) => response.json())
                          .then((json) =>{
                            console.log(json)
                            const data3 = JSON.stringify(json);
                            const parsed_data = JSON.parse(data3)
                            console.log(parsed_data[0]['Hospital Name'])
                            var arr3=[]
                            for (i in parsed_data) {
                              var obj = {}
                              obj["Hospital Name"]=parsed_data[i]['Hospital Name']
                              obj["Address"]=parsed_data[i].Address
                              arr3.push(obj)
                              serverMessage(( "Hospital Name: "+ obj["Hospital Name"] +"\n Address: "+obj["Address"]))
                              
                            }
                            console.log(arr3)
                              }
                             
                              );

                          };

                      

                      if(response.Reply=="fetching renting api"){
                        console.log("fetching")

                        fetch('http://127.0.0.1:5500/House rent.json')
                          .then((response) => response.json())
                          .then((json) => console.log(json));

                      }
        

                    
                  
                    
          })
                    .catch(error => console.error('Error h:', error));

          

}







