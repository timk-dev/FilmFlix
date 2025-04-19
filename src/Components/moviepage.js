import style from './style.module.css';

import profile from '../Images/profile.webp';
import backup from '../Images/filmflixbackup.webp';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay, faCircleXmark } from '@fortawesome/free-regular-svg-icons'; 
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons'; 

import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router'
import { Link, useLocation, Router } from 'react-router-dom';

import YouTube from 'react-youtube';

import classNames from 'classnames'; 

const MoviePage = ({movieId, posters}) => {
    const location = useLocation();
    /*console.log(location.state, 'yes');*/

    const [details, setDetails] = useState([]);
    const [images, setImages] = useState([]);
    const [similar, setSimilar] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [trailers, setTrailers] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage, setPostPerPage] = useState(4);

    const lastPostIndex = currentPage * postPerPage;
    const firstPostIndex = lastPostIndex - postPerPage;
    const currentPost = images.slice(firstPostIndex, lastPostIndex);


    const [similarPage, setSimilarPage] = useState(1);
    const [postPerPage2, setPostPerPage2] = useState(8);

    const lastSimilarIndex = similarPage * postPerPage2;
    const firstSimilarIndex = lastPostIndex - postPerPage2;
    const simPost = similar.slice(firstPostIndex, lastSimilarIndex);

    const reviewPost = reviews.slice(firstPostIndex, lastSimilarIndex);

    const handleRef = React.useRef(null);

    const [isShown, setIsShown] = useState(false);

    const handleClick = event => {
        // 👇️ toggle shown state
        setIsShown(current => !current);
    
        // 👇️ or simply set it to true
        // setIsShown(true);
    };

    const [openTrailer, setOpentrailer] = useState(false);

    const trailerClick = event => {
        // 👇️ toggle shown state
        setOpentrailer(current => !current);
    
        // 👇️ or simply set it to true
        // setIsShown(true);
    };

    const options = {
        method: 'GET',
        headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiN2YzMjA1YTE5MTQ1ZjlkM2Q3Y2M5NmQ1ZGFkZjZiMCIsIm5iZiI6MTcxOTAwOTQxOC45MDI0NDUsInN1YiI6IjY2NzVmZWQ1MjYzNWM3MjdlODE0NjczYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fPS9PzEcQ-WZHGNJMnRxrIDEgTWA-Taxuvm89CglTG0'
        }
    };

	const getDetails = async () => {
        try{
            const url = `https://api.themoviedb.org/3/movie/${location.state.data}`;

            const response = await fetch(url, options);
            const responseJson = await response.json()

            console.log(responseJson, 'details');

            setDetails(responseJson);
        } catch (error) {
            console.error('Error fetching data:', error);
        }

        /*
        for (var key in responseJson) {
            if (responseJson.hasOwnProperty(key)) {
                console.log(key + " -> " + responseJson[key])
            }
        }
        
        for (var key of Object.keys(responseJson)) {
            console.log(key + " -> " + responseJson[key])
        }
        */
	};

    const getImages = async () => {
        try{
            const url = `https://api.themoviedb.org/3/movie/${location.state.data}/images`;

            const response = await fetch(url, options);
            const responseJson = await response.json()

            console.log(responseJson);

            if (responseJson.backdrops) {
                setImages(responseJson.backdrops);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const getSimilar = async () => {
        try{
            const url = `https://api.themoviedb.org/3/movie/${location.state.data}/similar`;

            const response = await fetch(url, options);
            const responseJson = await response.json()

            console.log(responseJson);

            if (responseJson.results) {
                setSimilar(responseJson.results);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const getReviews = async () => {
        try{
            const url = `https://api.themoviedb.org/3/movie/${location.state.data}/reviews`;

            const response = await fetch(url, options);
            const responseJson = await response.json()

            console.log(responseJson);

            if (responseJson.results) {
                setReviews(responseJson.results);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const getTrailers = async () => {
        try{
            const url = `http://api.themoviedb.org/3/movie/${location.state.data}/videos`;

            const response = await fetch(url, options);
            const responseJson = await response.json()

            console.log(responseJson, 'trailers');

            if (responseJson.results) {
                setTrailers(responseJson.results);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

	useEffect(() => {
		getDetails();
        getImages();
        getSimilar();
        getReviews();
        getTrailers();
	}, []);

    useEffect (() => {
        window.scrollTo(0, 0);
    }, []);

    function hour_round(num) {
        return Math.ceil(num * 1) / 1 - 1;
    } 

    function refreshPage() {
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    }

    const opts = {
        height: '350',
        width: '100%',
    };

    const addImageFallback = (event) => {
        event.currentTarget.src = `${backup}`;
    };

    return(
        <main>

            {location.state.poster &&<section className={style.movieDescription} style={{background: `linear-gradient(to right, var(--blk-clr), #000000d9, transparent), url('https://image.tmdb.org/t/p/original/${location.state.poster}'), url('${backup}')`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
                
                <article className={style.details}>
                    
                    <h1>{details.title}</h1>
                    {/*Waits for the json data to load then renders the element*/}
                    {details.genres && <span className={classNames(style.info)}>{details.tagline} &#8729; {hour_round(`${details.runtime  / 60}`)}h {details.runtime % 60}m &#8729; {`${details.release_date}`.slice(0, 4)} &#8729; {details.genres[0].name}</span>}
                    <p className={style.overview}>{details.overview}</p>

                    <hr></hr>

                    <div>
                        <button aria-label="Play movie trailer" className={style.button} exact="true" onClick={trailerClick}>
                            <FontAwesomeIcon className={style.i} icon={faCirclePlay} />
                            Watch Clips<span>Play &gt;&gt;</span>
                        </button>
                        {location.state.data && <Link aria-label="Link to TMDB page for this movie " className={style.buttonB} exact="true" to={`https://www.themoviedb.org/movie/${location.state.data}`}>
                            <FontAwesomeIcon className={style.i} icon={faCircleExclamation} />
                            More Info <span>Go &gt;&gt;</span>
                        </Link>}
                    </div>

                </article>

                {openTrailer ? (

                    <div className={style.trailerCont}>
                        <p onClick={trailerClick}><FontAwesomeIcon className={style.i} icon={faCircleXmark} /></p>                       
                        <YouTube ref={handleRef} className={style.youtubeVid} opts={opts} videoId={`${trailers[0].key}`} />
                        <div className={style.ytVidTitle} style={{background: `linear-gradient(to right, var(--blk-clr), var(--blk-clr), #000000d9, #000000d9), url('https://image.tmdb.org/t/p/original/${location.state.poster}'), url('${backup}')`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
                            <h2>{details.title}</h2>
                            <div>
                                <span className={style.tabRate}>{`${details.release_date}`.slice(0, 4)}</span>
                                <span className={style.tabRate}>{details.genres[0].name}</span>
                            </div>
                        </div>
                    </div>

                ) : null }

            </section>
            }

            <section className={style.images}>

            {isShown ? (
                <article className={style.tabCont} onClick={handleClick}>
                    <h2 className={style.fade}>Posters</h2>
                    <h2>Reviews</h2>
                </article>
            ):
                <article className={style.tabCont} onClick={handleClick}>
                    <h2>Posters</h2>
                    <h2 className={style.fade}>Reviews</h2>
                </article>
            }

            {isShown ? (

                <article className={style.reviewCont}>
                        {reviewPost.map((testi, id) => {
                            return(
                                <div key={id} className={style.reviewBox}>
                                    <span className={style.tabRate}>{testi.author_details.rating * 10}%</span>
                                    <div>
                                        <img rel='preload preconnect' loading='lazy' src={profile} width='50px' height='50px' alt='Reviewers avatar'></img>
                                        <h3>{testi.author} <strong className={style.colorChange}>{testi.author_details.rating}</strong>/10</h3>
                                    </div>
                                    <span className={style.info}>Written by <em><strong>{testi.author}</strong></em> on <em><strong>{testi.created_at.slice(0, 10)}</strong></em>.</span>
                                    <p className={classNames(style.truncate, style.opaChange)}>{testi.content}</p>
                                    <Link aria-label="Link to full review" exact="true" to={testi.url}>
                                        <p>Read Full Review...</p>
                                    </Link>
                                </div>
                            );
                        })}
                </article>
            ): 
                <article className={style.imgCont}>
                    {currentPost.map((image, id) => {
                        return(
                            <div key={id}>
                                <img rel='preload preconnect' loading='lazy' src={`https://image.tmdb.org/t/p/original/${image.file_path}`} width='225px' height='150px' alt='Movie poster'>
                                </img>
                            </div>                        
                        );
                    })}
                </article>
            }

            </section>

            <section className={style.similarPosts}>
                <h2>You May Also Like</h2>

                <article className={style.moreLike}>
                    {simPost.map((posters, id) => {

                        return(
                                <Link onClick={refreshPage} aria-label="temporary" exact="true" to={`/movie?title=${posters.title}`} state={{data: `${posters.id}`, poster: `${posters.backdrop_path}`}}>

                                    <section className={style.holder}>
                                        <img rel='preload preconnect' loading='lazy' src={`https://image.tmdb.org/t/p/original/${posters.backdrop_path}`} width='225px' height='150px' onError={addImageFallback} alt='Movie poster'>
                                        </img>

                                       <p>{posters.title} &#8729; {posters.release_date.slice(0, 4)}</p>
                                    </section>

                                </Link>
                        );
                    })}
                </article>
            </section>

        </main>
    );
}

export default MoviePage;