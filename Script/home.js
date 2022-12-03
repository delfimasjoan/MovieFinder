let page = 1;
let movie_info= '';
// let cards = document.querySelector(".movies");
let lastMovie;

//Infinit scroll
let observer = new IntersectionObserver ((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            page++;
            getMovies();
        }
    });
},{
    rootMargin: '0px 0px 0px 0px',
    threshold: 1.0
});

const getMovies = async() => {
    
    try {
        const response_a = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=3ac1f12a6c2148e384cdf98ffb41245b&page=${page}`);

        // console.log(response_a);

        const response_g =await fetch ('https://api.themoviedb.org/3/genre/movie/list?api_key=3ac1f12a6c2148e384cdf98ffb41245b');

        console.log(response_g);

        //correct response
        if(response_a.status==200){
            const data = await response_a.json();
            const data_g= await response_g.json();

            const results_g= data_g.genres;
            let genres= '';
            let genre_id='';
            function getGenre (movie_id){
                results_g.forEach(i => {
                    genre_id=i.id;    
                    movie_id.forEach(x =>{
                        if (genre_id==x){
                            genres += i.name + ' - ';
                        }
                    });
                });
            return genres;
            }
     
            //Banner
            const response_1 = data.results[0];  
            
            let banner_mess='';

            document.querySelector('.banner').style.backgroundImage = `url("https://image.tmdb.org/t/p/w500/${response_1.backdrop_path}")`;

            if (response_1.overview.length > 250) {
                    banner_mess= response_1.overview.slice(0,250)+'...';
                }
            else{
                    banner_mess=response_1.overview;
                }
            
            let pelicula = `
                <h6 id="banner-genre">${getGenre(response_1.genre_ids)}</h6>
                <p id="banner-rating">${response_1.popularity}</p>
                <h5 id="banner-title">${response_1.title}</h5>
                <p id="banner-text">${banner_mess}</p>
                <button id="watch-click" name="Watch">Watch Now</button>
            `;
            document.querySelector('.banner-text').innerHTML= pelicula;

            // Most watched

            const response = data.results.slice(1); //all movies except de most watched that is shown on the banner
            console.log(response);
            
            // let movie_info= '';
             let message= '';

            let cards = document.querySelector(".movies");
            response.forEach(movie => {
            //overview 
                if (cards.classList.contains("all-movies-row")){
                    if (movie.overview.length > 84) {
                        message= movie.overview.slice(0,84)+'...';
                    }
                    else{
                        message=movie.overview;
                    }
                }else{
                    if (movie.overview.length > 184){
                        message= movie.overview.slice(0,184)+'...';
                    }
                    else{
                        message=movie.overview;
                    }
                }

                movie_info += `
                    <a href="Movie.html" class="movie-row movie" style="background-image:url(https://image.tmdb.org/t/p/w500/${movie.backdrop_path})">
                        <div id="mov">                      
                            <p id="watch">WATCH</p>
                            <h5 id="movie-title">${movie.title}</h5>
                            <p id="movie-rating">${movie.popularity}</p>
                            <p id="movie-text">${message}</p>
                        </div>
                    </a>`
                                    
            });
            document.querySelector(".all-movies-row").innerHTML=movie_info;

            //Infinit scroll
            if(page<1000){
                if (lastMovie){
                    observer.unobserve(lastMovie);
                }
                const moviesOnScreen= document.querySelectorAll('.all-movies-row .movie-row');
                lastMovie= moviesOnScreen[moviesOnScreen.length - (3*page)];
                observer.observe(lastMovie);
            }

            //Search
            let search_box= document.getElementsByClassName("search-res")[0];
            let search=document.getElementById("search");
            data.results.forEach(element =>{
                const {poster_path,title} = element;
                let card = document.createElement('a');
                card.href='Movie.html';
                card.innerHTML=`<img src="https://image.tmdb.org/t/p/w500/${poster_path}" alt="">
                    <div class="content-search">
                        <h3>${title}</h3>
                    </div>`;

                
                search_box.appendChild(card);
                })
            search.addEventListener("keyup", () => {
                let filter =search.value.toUpperCase();
                let a = search_box.getElementsByTagName('a');
                for (let i = 0; i<a.length ; i++){
                    let b =a[i].getElementsByClassName("content-search")[0];
                    let c= b.getElementsByTagName("h3")[0];
                    let TextValue = c.textContent || c.innerText;
                    if (TextValue.toUpperCase().indexOf(filter) > -1){
                        a[i].style.display='flex';
                    } else{
                        a[i].style.display='none';
                    }

                    if (search.value==0){
                        search_box.style.display='none';
                    } else {
                        search_box.style.display='';
                    }
                }
            })


        } else if(response_a.status==401){
            console.log('Wrong key')
        } else if (response_a.status==404){
            console.log('The movie does not exist')
        } else{
            console.log('Something went wrong')
        }
    } catch (error){
        console.log(error);
    }

    
}

getMovies();


