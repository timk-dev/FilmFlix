import style from './style.module.css';
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

import popcorn from '../Images/popcorn.webp';
import popped from '../Images/popped.webp';
import tmdb from '../Images/tmdb.svg';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronRight } from '@fortawesome/free-solid-svg-icons'; 

const Home = () => {
    const [movies, setMovies] = useState([]);
    const [topMovies, setTopMovies] = useState([]);
    const [tvShows, setTvShows] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage, setPostPerPage] = useState(8);

    const lastPostIndex = currentPage * postPerPage;
    const firstPostIndex = lastPostIndex - postPerPage;
    const currentPost = movies.slice(firstPostIndex, lastPostIndex);
    const topPost = topMovies.slice(firstPostIndex, lastPostIndex);
    const tvPost = tvShows.slice(firstPostIndex, lastPostIndex);

    const [isShown, setIsShown] = useState(false);

    const handleClick = event => {
        // 👇️ toggle shown state
        setIsShown(current => !current);
    
        // 👇️ or simply set it to true
        // setIsShown(true);
    };

    const options = {
        method: 'GET',
        headers: {
        accept: 'application/json',
        Authorization: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
        }
    };

	const getUpcomingRequest = async () => {
		const url = 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1';

		const response = await fetch(url, options);
		const responseJson = await response.json();

        console.log(responseJson);

		if (responseJson.results) {
			setMovies(responseJson.results);
		}
	};

    const getTopRequest = async () => {
		const url = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1';

		const response = await fetch(url, options);
		const responseJson = await response.json();

        console.log(responseJson);

		if (responseJson.results) {
			setTopMovies(responseJson.results);
		}
	};

    const getTvRequest = async () => {
		const url = 'https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1';

		const response = await fetch(url, options);
		const responseJson = await response.json();

        console.log(responseJson);

		if (responseJson.results) {
			setTvShows(responseJson.results);
		}
	};

	useEffect(() => {
		getUpcomingRequest();
        getTopRequest();
        getTvRequest();
	}, []);

    function rating_round(num) {
        return Math.ceil(num * 100) / 100;
    } 

    return (

        <main>

            <section className={style.home}>
                <h1>Unlimited movies, TV<br></br> shows, and more</h1>
                <p>Starts at free. Cancel anytime.</p>

                <p>Ready to watch? Enter your email to create or restart your membership.</p>
                
                <div className={style.search}>
                    <input type="text" className={style.searchbox} placeholder="Email address" required></input>
                    <label for="email">Email Address</label>

                    <Link aria-label="Create an account" className={style.button} exact="true" to="/">
                        Get Started <span>Get Started &gt;&gt;</span>
                        <FontAwesomeIcon className={style.iAlt} icon={faCircleChevronRight} />
                    </Link>
                </div>
            </section>

            <section className={style.newMovies}>
                <div className={style.banner}>
                    <img loading='lazy' src={popcorn} width='85px' height='85px' alt='Box of popcorn.'></img>
                    <img loading='lazy' src={popped} width='85px' height='85px' alt='Box of popcorn.'></img>

                    <article>
                        <h3>The FilmFlix you love for just free.</h3>
                        <p>Get our most affordable, ad-unsupported plan.</p>
                    </article>
                    <div className={style.buttonAlt}>Learn More</div>
                </div>

                <div className={style.moreTo}>
                    <article>
                        <h2>More Reasons to Join</h2>

                        <div className={style.miniBanner}>
                            <h3>Enjoy on your TV</h3>
                            <p>Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.</p>
                        </div>

                        <div className={style.miniBanner}>
                            <h3>Watch everywhere</h3>
                            <p>Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV.</p>
                        </div>

                        <div className={style.miniBanner}>
                            <h3>Download your shows to watch offline</h3>
                            <p>Save your favorites easily and always have something to watch.</p>
                        </div>

                        <div className={style.miniBanner}>
                            <h3>Create profiles for kids</h3>
                            <p>Send kids on adventures with their favorite characters in a space made just for them — free with your membership.</p>
                        </div>
                    </article>

                    <img loading='lazy' src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/tv.png" width='50px' height='50px' alt='Image of a TV.'></img>
                </div>

                <div className={style.nMovies}>
                    <h2>New Movies on FilmFlix</h2>

                    <article className={style.movieContainer}>
                        {currentPost.map((movie, index) =>
                                
                            <div className={style.movieCard}>
                                <Link aria-label="temporary" exact="true" to={`/movie?title=${movie.title}`} state={{data: `${movie.id}`, poster: `${movie.backdrop_path}`}}>

                                    <section className={style.posterCont}>
                                        <img className={style.poster} rel='preload preconnect' loading='lazy' src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} width='35px' height='50px' alt='Movie poster'>
                                        </img>

                                        <section className={style.attCont}>
                                            <img loading='lazy' src={tmdb} width='35px' height='35px' alt='The Movie DB logo. This product uses the TMDB API but is not endorsed or certified by TMDB.'> 
                                            </img> 

                                            <div className={style.rate}>
                                                <p key={index}><em>{rating_round(`${movie.vote_average}`)}</em></p>
                                            </div>
                                        </section>
                                    </section>

                                </Link>
                            </div>
                        )}
                    </article>
                </div>

                <div className={style.nMovies}>
                    <h2>Top-Rated Movies on FilmFlix</h2>

                    <article className={style.movieContainer}>
                        {topPost.map((movie, index) =>
                                
                            <div className={style.movieCard}>
                                <Link aria-label="temporary" exact="true" to={`/movie?title=${movie.title}`} state={{data: `${movie.id}`, poster: `${movie.backdrop_path}`}}>

                                    <section className={style.posterCont}>
                                        <img className={style.poster} rel='preload preconnect' loading='lazy' src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} width='35px' height='50px' alt='Movie poster'>
                                        </img>

                                        <section className={style.attCont}>
                                            <img loading='lazy' src={tmdb} width='35px' height='35px' alt='The Movie DB logo. This product uses the TMDB API but is not endorsed or certified by TMDB.'> 
                                            </img> 

                                            <div className={style.rate}>
                                                <p key={index}><em>{rating_round(`${movie.vote_average}`)}</em></p>
                                            </div>
                                        </section>
                                    </section>
                                    
                                </Link>
                            </div>
                        )}
                    </article>
                </div>

                <div className={style.nMovies}>
                    <h2>Top-Rated TV Shows on FilmFlix</h2>

                    <article className={style.movieContainer}>
                        {tvPost.map((movie, index) =>
                                
                            <div className={style.movieCard}>
                                <Link aria-label="temporary" exact="true" to={`/tv?name=${movie.name}`} state={{data: `${movie.id}`, poster: `${movie.backdrop_path}`}}>

                                    <section className={style.posterCont}>
                                        <img className={style.poster} rel='preload preconnect' loading='lazy' src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} width='35px' height='50px' alt='Movie poster'>
                                        </img>

                                        <section className={style.attCont}>
                                            <img loading='lazy' src={tmdb} width='35px' height='35px' alt='The Movie DB logo. This product uses the TMDB API but is not endorsed or certified by TMDB.'> 
                                            </img> 

                                            <div className={style.rate}>
                                                <p key={index}><em>{rating_round(`${movie.vote_average}`)}</em></p>
                                            </div>
                                        </section>
                                    </section>
                                    
                                </Link>
                            </div>
                        )}
                    </article>
                </div>
            </section>

            <section id='FAQ' className={style.faq}>
                <h2>Frequently Asked Question</h2>

                <div className={style.quest}>
                    <div className={style.textbox} onClick={handleClick}>
                        <h2>What is FilmFlix?</h2>

                        <h1>+</h1>
                    </div>

                    {isShown ? (
                        <div className={style.content}>
                            <h3>
                                FilmFlix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.
                                <br></br><br></br>
                                You can watch as much as you want, whenever you want – all for one low monthly price. There's always something new to discover and new TV shows and movies are added every week!
                            </h3>
                        </div>
                    ):
                        <div className={style.disappear}></div>
                    }

                    <div className={style.textbox} onClick={handleClick}>
                        <h2>How much does FilmFlix cost?</h2>

                        <h1>+</h1>
                    </div>

                    {isShown ? (
                        <div className={style.content}>
                            <h3>
                                Watch FilmFlix on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee. Plans start free every month (pre-tax). No extra costs, no contracts.                            
                            </h3>
                        </div>
                    ):
                        <div className={style.disappear}></div>
                    }

                    <div className={style.textbox} onClick={handleClick}>
                        <h2>Where can I watch?</h2>

                        <h1>+</h1>
                    </div>

                    {isShown ? (
                        <div className={style.content}>
                            <h3>
                                Watch anywhere, anytime. Sign in with your FilmFlix account to watch instantly on the web at filmflix.com from your personal computer or on any internet-connected device, including smart TVs, smartphones, tablets, streaming media players and game consoles.
                                <br></br><br></br>
                                Take FilmFlix with you anywhere.                            
                            </h3>
                        </div>
                    ):
                        <div className={style.disappear}></div>
                    }

                    <div className={style.textbox} onClick={handleClick}>
                        <h2>How do I cancel?</h2>

                        <h1>+</h1>
                    </div>

                    {isShown ? (
                        <div className={style.content}>
                            <h3>
                                FilmFlix is flexible. There are no pesky contracts and no commitments. You can easily cancel your account online in two clicks. There are no cancellation fees – start or stop your account anytime.
                            </h3>
                        </div>
                    ):
                        <div className={style.disappear}></div>
                    }

                    <div className={style.textbox} onClick={handleClick}>
                        <h2>What can I watch on FilmFlix?</h2>

                        <h1>+</h1>
                    </div>

                    {isShown ? (
                        <div className={style.content}>
                            <h3>
                                FilmFlix has an extensive library of feature films, documentaries, TV shows, anime, award-winning originals, and more. Watch as much as you want, anytime you want.                            
                            </h3>
                        </div>
                    ):
                        <div className={style.disappear}></div>
                    }

                    <div className={style.textbox} onClick={handleClick}>
                        <h2>Is FilmFlix good for kids?</h2>

                        <h1>+</h1>
                    </div>

                    {isShown ? (
                        <div className={style.content}>
                            <h3>
                                FilmFlix Kids experience is included in your membership to give parents control while kids enjoy family-friendly TV shows and movies in their own space.
                                <br></br><br></br>
                                Kids profiles come with PIN-protected parental controls that let you restrict the maturity rating of content kids can watch and block specific titles you don’t want kids to see.                            
                            </h3>
                        </div>
                    ):
                        <div className={style.disappear}></div>
                    }
                </div>

                <article>
                    <p>Ready to watch? Enter your email to create or restart your membership.</p>
                    
                    <div className={style.search}>
                        <input type="text" className={style.searchbox} placeholder="Email address" required></input>
                        <label for="email">Email Address</label>

                        <Link aria-label="Create an account" className={style.button} exact="true" to="/">
                            Get Started <span>Get Started &gt;&gt;</span>
                            <FontAwesomeIcon className={style.iAlt} icon={faCircleChevronRight} />
                        </Link>
                    </div>
                </article>
            </section>

        </main>
    );
}

export default React.memo(Home);
