const pop=document.querySelector(".pop");

async function movieInfo(movie_id){
    console.log(movie_id);
    pop.style.display="flex";

    // window.open("Movie.html","Movie Info",taget="_up");

    try {
        const response_m = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=3ac1f12a6c2148e384cdf98ffb41245b`)
        const response_sim= await fetch(`https://api.themoviedb.org/3/movie/${movie_id}/similar?api_key=3ac1f12a6c2148e384cdf98ffb41245b`)
        const response_vid= await fetch(`https://api.themoviedb.org/3/movie/${movie_id}/videos?api_key=3ac1f12a6c2148e384cdf98ffb41245b`)
        console.log(response_vid);
        if (response_m.status==200){
            const movie_data = await response_m.json();
            console.log(movie_data);
            const similar_data= await response_sim.json();
            const video_data=await response_vid.json();

            const similar1= similar_data.results[0];
            console.log(similar1);
            const similar2= similar_data.results[1];
            const similar3= similar_data.results[2];

            let genre='';

            movie_data.genres.forEach(i => {
                genre += i.name + '-';                
            });
            
            console.log(video_data);
            let trailer_id='';
            video_data.results.forEach(i =>{
                if (i.type=="Trailer" || i.type=="Official Trailer"){
                    trailer_id=i.key
                }
            })

            movie=` <div class="selec">
            <div id="close_bt"> 
                <button type="button" id="bt">
                    <svg id="close" width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="9.52295" y="31.1513" width="30.5873" height="3.65221" transform="rotate(-45 9.52295 31.1513)" fill="#D9D9D9"/>
                        <rect x="31.1514" y="33.7338" width="30.5873" height="3.65221" transform="rotate(-135 31.1514 33.7338)" fill="#D9D9D9"/>
                    </svg> 
                </button>
            </div>
            <button id="btn-trailer" type="button" onclick="window.open('https://www.youtube.com/watch?v=${trailer_id}','_blank')">Play Trailer</button>
            <h1 id="title">${movie_data.title}</h1>
        </div>           
        <div class="text">
            <p class="p-large">${movie_data.overview}</p>
            <div class="extra">
                <div class="extra-info">
                    <div id="col1">
                        <p class="info"><b>Release Date</b><br>${movie_data.release_date}<br><b>Gender</b><br>${genre}</p>
                    </div>
                    <div id="col2">
                        <p class="info"><b>Original Language</b><br>${movie_data.original_language}<br><b>Popularity</b><br>${movie_data.popularity}</p>
                    </div>
                </div>
                <div class="similar">
                    <p class="info"><b>Similar Movies:</b></p>
                    <div class="related">
                        <a href='#' onclick="movieInfo(${similar1.id})" style="background-image: url(https://image.tmdb.org/t/p/w500${similar1.poster_path})">
                        </a>
                        <a href='#' onclick="movieInfo(${similar2.id})" style="background-image: url(https://image.tmdb.org/t/p/w500/${similar2.poster_path})">
                        </a>
                        <a href='#' onclick="movieInfo(${similar3.id})" style="background-image: url(https://image.tmdb.org/t/p/w500/${similar3.poster_path})">
                        </a>
                    </div>
                </div>
            </div>
        </div>`;

            document.querySelector(".cont2").innerHTML=movie;
            document.querySelector(".cont2").style.backgroundImage=`url("https://image.tmdb.org/t/p/w500/${movie_data.backdrop_path}")`;

            const close_pop  = document.getElementById("bt");
            close_pop.addEventListener("click",()=>{
                if (pop.style.display == 'flex'){
                    pop.style.display="none";
                }
            })
            

            // const trailer= document.getElementById("btn-trailer");
            // trailer.addEventListener("click",()=>{
            //     window.location.href(`"https://www.youtube.com/watch?v=${trailer_id}"`);
            // })
        } 
        else if(response_m.status==401){
            console.log('Wrong key');
        } else if (response_m.status==404){
            console.log('The movie does not exist')
        } else{
            console.log('Something went wrong')
        }
    }
    catch (error){
        console.log(error);
    }
}