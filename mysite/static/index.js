function getToken(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

const csrftoken = getToken('csrftoken');

//post
const submitFormData = (e) => {
    e.preventDefault();
    var exampleInputName2 = document.getElementById('exampleInputName2').value;
    var exampleInputEmail2 = document.getElementById('exampleInputEmail2').value;
    var messagetextarea = document.getElementById('messagetextarea').value

    userFormData = {
      'name':exampleInputName2,
      'email':exampleInputEmail2,
      'message':messagetextarea
    }

    var url = '/postMessage/';


    fetch(url, {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'X-CSRFToken':csrftoken,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(
    {'form':userFormData}
  ),
})
showSuccessMessage()
getMessages();
  }

  const showSuccessMessage=()=> {
    var x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
  }

  //call post function
  const form = document.getElementById('form')
  form.addEventListener('submit',submitFormData,false)
 
      //create elements function
      const createElements = (x) => {
     
        //create column
        var overal_col = document.createElement('div');
        overal_col.className = 'col-xs-3 col-sm-3 col-md-3 col-lg-3';
    
        //create a card
        let card = document.createElement('div');
        card.className = 'card mb-3';
        card.style = "max-width: 540px;"
        overal_col.appendChild(card);
    
        //row gutter
        let gutter = document.createElement('div');
        gutter.className = 'row no-gutters';
        card.appendChild(gutter);
    
        var colmb4 = document.createElement('div');
        colmb4.className = 'col-md-4';
        gutter.appendChild(colmb4);
    
        var img = document.createElement('img')
        img.src = 'https://www.seekpng.com/png/detail/73-730482_existing-user-default-avatar.png'
        img.className = 'card-img fluid w-100'
        img.style ="width:100%"
        colmb4.appendChild(img)
    
        var colmb8 = document.createElement('div')
        colmb8.className = "col-md-8"
        gutter.appendChild(colmb8)
    
      
        var cardBody = document.createElement('div');
        cardBody.className = "card-body"
        cardBody.innerHTML = `<h5 class="card-title">${x.name}</h5>
                        <p class="card-text">${x.message}</p>
                        <p class="card-text"><small class="text-muted">${x.email}</small></p>
    `
        colmb8.appendChild(cardBody)
    
        messages.appendChild(overal_col);
        
    }


 const getMessages = async()=>{
    const response = await fetch('/messages/')
    const messages = await response.json()
    const messages_json = JSON.parse(messages)
    console.log(messages_json)
    
    document.getElementById('messages').innerHTML = '';
    
    messages_json.forEach(element => {
      createElements(element.fields)
    });
    
      }

    
    window.onload = getMessages
    
    

    
    