let categoris = document.getElementById('contactChoice2');
let ul = document.getElementById('ul');
let radioRandom = document.getElementById('contactChoice1');
let radioSearch = document.getElementById('contactChoice3');
let inputSearch = document.getElementById('inputSearch');
let select = '';
let button = document.querySelectorAll('.button');
let selectCategoris = '';
let query = '';
let arrJoke = [];

let arrLike = [];

let arrFavorite = [];

if(localStorage.getItem('arrLike')){
    arrLike = JSON.parse(localStorage.getItem('arrLike'));
} else {
    arrLike = [];
}

//colapse select find joke

function colapse(elem){
    elem.style.display = 'flex';
    elem.style.maxHeight = elem.scrollHeight+'px';
}

function closeCategories(elem){
    elem.style.maxHeight = null;
    setTimeout(()=>{
        elem.style.display = 'none'
    }, 110)
}


categoris.addEventListener('change', function(){
    
    colapse(ul);
    
    if(ul.style.maxHeight){
    closeCategories(inputSearch);
    }
    select = categoris.value;
    inputSearch.value = '';
});



radioRandom.addEventListener('change',  ()=>{
    closeCategories(inputSearch);
    closeCategories(ul);
    select = radioRandom.value;
});

radioSearch.addEventListener('change', ()=>{
    if(ul.style.maxHeight){
    closeCategories(ul);
    }
    colapse(inputSearch);
    inputSearch.style.maxHeight = 50+'px';
    select = radioSearch.value;
    inputSearch.value = '';
});

// end colapse select find joke


//activ button category 



for(let i=0; i<button.length; i++){
    button[i].addEventListener('click', function(){
        for(j=0;j<button.length;j++){
          button[j].classList.remove('active');  
        }
        this.classList.add('active');
        selectCategoris = this.dataset.about;
    });
}


//end activ button category


//activ serch find


inputSearch.addEventListener('input', function(){
    query = inputSearch.value;
});




//end activ serch find




//API
let getJoke = document.getElementById('getJoke');
let joke;

async function getResponse(){
    let url = '';
    
    switch(select){
        case 'random':
            url = 'https://api.chucknorris.io/jokes/random';
            break;
        case 'categoris':
            if(selectCategoris){
                url = `https://api.chucknorris.io/jokes/random?category=${selectCategoris}`;
            } else {
                alert('Select a search category!');
                return;
            }
            break;
        case 'search':
            if(query){
            url = `https://api.chucknorris.io/jokes/search?query=${query}`;
            break;
            } else {
                alert('Enter the search text!');
                break;  
            }
        default:
            alert('Select a search category!');
            return;
    }
    
    
    
    
    let response = await fetch(url);
    
    joke = await response.json();
    
    
    
    
    
    showJoke(joke);
}


let myForms = document.forms.form;
console.log(form);



getJoke.addEventListener('click', getResponse);
myForms.addEventListener('submit', function(event){
    getResponse();
});


//end API


//show joke


function showJoke(response){

    
    let showJoke = document.getElementById('joke');
    
    let staticJoke = document.getElementById('del');
  
    
    
    try{
    if(response.result){
        let far = 'far';
        
        showJoke.innerHTML = '';

        for(let i=0;i<response.result.length; i++){
            far = 'far';
            let categories = response.result[i].categories;
            if(categories == ''){
                categories = 'others';
            }
            
            
            for(let j=0; j<arrLike.length; j++){
                if(arrLike[j].id == response.result[i].id){
                    far = 'fas';
                }
            }
            
            
            
            let blockShowJoke = `
                <div id="del" class="joke selectjoke">
                    <div class="heart"><i class="${far} fa-heart"></i></div>
                    <div class="joke-content">
                        <div class="joke-icon"><i class="far fa-comment-alt"></i></div>
                        <div class="joke-text">
                            <span>ID:</span>
                            <a href="${response.result[i].url}" target="_blank">${response.result[i].id}<i class="fas fa-external-link-alt"></i></a> 
                            <p class="p-text">${response.result[i].value}</p>
                            <div class="update-category">
                                <span>Last update: ${response.result[i].updated_at}</span>
                                <p>${categories}</p>
                            </div>
                        </div>
                    </div>
                </div>`;


            showJoke.innerHTML += blockShowJoke;


        }
    } else{
        showJoke.innerHTML = '';
        let categories = response.categories[0];
        if(!categories){
                categories = 'others';
            }
        
        let far = 'far';
        for(let j=0; j<arrLike.length; j++){
            if(arrLike[j].id == response.id){
                far = 'fas';
            }
        }
        
        let blockShowJoke = `
                <div class="joke selectjoke">
                    <div class="heart"><i class="${far} fa-heart"></i></div>
                    <div class="joke-content">
                        <div class="joke-icon"><i class="far fa-comment-alt"></i></div>
                        <div class="joke-text">
                            <span>ID:</span>
                            <a href="${response.url}" target="_blank">${response.id}<i class="fas fa-external-link-alt"></i></a> 
                            <p class="p-text">${response.value}</p>
                            <div class="update-category">
                                <span>Last update: ${response.updated_at}</span>
                                <p>${categories}</p>
                            </div>
                        </div>
                    </div>
                </div>`;

            showJoke.innerHTML = blockShowJoke;
    }
    
   } catch(Error){
                    
    } 
    
    arrJoke = document.querySelectorAll('.fa-heart');
    
        for(let i=0; i<arrJoke.length; i++){
            arrJoke[i].addEventListener('click', function(){
                
                try{
                arrJoke[i].classList.toggle('far');               arrJoke[i].classList.toggle('fas');
                
                
                
                
                
                if(arrJoke[i].classList.contains('fas')){

                    if(response.result){
                        arrLike.push(response.result[i]);
                        localStorage.setItem('arrLike', JSON.stringify(arrLike));
                    } else {
                        arrLike.push(response);
                        localStorage.setItem('arrLike', JSON.stringify(arrLike));
                    }
                    
                } else {
                    if(response.result){
                        arrLike = arrLike.filter(item => item.id != response.result[i].id)
                        localStorage.setItem('arrLike', JSON.stringify(arrLike));
                    } else {
                        arrLike = arrLike.filter(item => item.id != response.id)
                        localStorage.setItem('arrLike', JSON.stringify(arrLike));
                    }
                }
                    } catch(Error){
                    
                }
                
                
                showFavorite(arrLike);
        });
    }

}

//end show joke


let favoriteJoke = document.getElementById('favoriteblock');


function showFavorite(arr){
    
    favoriteJoke.innerHTML = '';
    
    for(let i=0; i<arr.length; i++){
       
            favoriteJoke.innerHTML += `
                <div class="joke selectjoke">
                    <div class="heart"><i class="fas fa-heart like"></i></div>
                    <div class="joke-content">
                        <div class="joke-icon"><i class="far fa-comment-alt"></i></div>
                        <div class="joke-text">
                            <span>ID:</span>
                            <a href="${arr[i].url}" target="_blank">${arr[i].id}<i class="fas fa-external-link-alt"></i></a> 
                            <p class="p-text">${arr[i].value}</p>
                            <div class="update-category">
                                <span>Last update: ${arr[i].updated_at}</span>
                            </div>
                        </div>
                    </div>
                </div>`;
        
    }
    
    
    arrFavorite = document.querySelectorAll('.like');
    
    for(let i=0; i<arrFavorite.length; i++){
        arrFavorite[i].addEventListener('click', function(){
            
            
            arrLike = arrLike.filter(item => item.id != arr[i].id)
            localStorage.setItem('arrLike', JSON.stringify(arrLike));
            showFavorite(arrLike);
            showJoke(joke);
        }
    )};
}


    




showFavorite(arrLike);


// tible





let showTible = document.getElementById('headericon');
let showTibleFavorite = document.getElementById('favorite');
let shadow = document.getElementById('shadow');
let closeIcon = document.getElementById('icon');
let favoriteshadow = document.getElementById('favoriteshadow');

function showShadow(){
    showTibleFavorite.classList.toggle('active'); 
    shadow.classList.toggle('shadow');
    closeIcon.classList.toggle('fa-bars');
    closeIcon.classList.toggle('fa-times-circle');
    favoriteshadow.classList.toggle('hide-favorite');
}

//showTible.addEventListener('click', function(){
//    showTibleFavorite.classList.toggle('active'); 
//    shadow.classList.toggle('shadow');
//    closeIcon.classList.toggle('fa-bars');
//    closeIcon.classList.toggle('fa-times-circle');
//    favoriteshadow.classList.toggle('hide-favorite');
//});
showTible.addEventListener('click', showShadow);
shadow.addEventListener('click', showShadow);







