import style from './style.module.css';

import profile from '../Images/profile.webp';
import backup from '../Images/filmflixbackup.webp';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay, faCircleXmark } from '@fortawesome/free-regular-svg-icons'; 
import { faCircleExclamation, faList, faChevronDown } from '@fortawesome/free-solid-svg-icons'; 

import React, { useState, useEffect } from "react";
import { Link, useLocation } from 'react-router-dom';

import YouTube from 'react-youtube';

import classNames from 'classnames'; 

const TvPage = ({tvId, posters}) => {
    const location = useLocation();
    /*console.log(location.state, 'yes');*/

    const [getseasons, setSeasons] = useState([]);
    const [episodes, setEpisodes] = useState([]);
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

    const [openEpisodes, setOpenEpisodes] = useState(false);

    const episodeClick = event => {
        // 👇️ toggle shown state
        setOpenEpisodes(current => !current);
    
        // 👇️ or simply set it to true
        // setIsShown(true);
    };

    const [showEpisodes, setShowEpisodes] = useState(false);

    const showClick = event => {
        // 👇️ toggle shown state
        setShowEpisodes(current => !current);
    
        // 👇️ or simply set it to true
        // setIsShown(true);
    };

    const options = {
        method: 'GET',
        headers: {
        accept: 'application/json',
        Authorization: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
        }
    };

    const getSeasons = async (seasonNumber) => {

		const url = `https://api.themoviedb.org/3/tv/${location.state.data}/season/${seasonNumber}`;

		const response = await fetch(url, options);
		const responseJson = await response.json()

        console.log(responseJson, 'seasons');

        if (responseJson) {
			setSeasons(responseJson);
		}
    };

    const getEpisodes = async () => {
		const url = `https://api.themoviedb.org/3/tv/2418/season/1/episode/1`;

		const response = await fetch(url, options);
		const responseJson = await response.json()

        console.log(responseJson, 'episodes');

        if (responseJson) {
			setEpisodes(responseJson);
		}
    };

	const getDetails = async () => {
		const url = `https://api.themoviedb.org/3/tv/${location.state.data}`;

		const response = await fetch(url, options);
		const responseJson = await response.json()

        console.log(responseJson, 'tv');

        setDetails(responseJson);

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
		const url = `https://api.themoviedb.org/3/tv/${location.state.data}/images`;

		const response = await fetch(url, options);
		const responseJson = await response.json()

        console.log(responseJson);

        if (responseJson.backdrops) {
			setImages(responseJson.backdrops);
		}
    };

    const getSimilar = async () => {
		const url = `https://api.themoviedb.org/3/tv/${location.state.data}/similar`;

		const response = await fetch(url, options);
		const responseJson = await response.json()

        console.log(responseJson);

        if (responseJson.results) {
			setSimilar(responseJson.results);
		}
    };

    const getReviews = async () => {
		const url = `https://api.themoviedb.org/3/tv/${location.state.data}/reviews`;

		const response = await fetch(url, options);
		const responseJson = await response.json()

        console.log(responseJson);

        if (responseJson.results) {
			setReviews(responseJson.results);
		}
    }

    const getTrailers = async () => {
		const url = `http://api.themoviedb.org/3/tv/${location.state.data}/videos`;

		const response = await fetch(url, options);
		const responseJson = await response.json()

        console.log(responseJson, 'trailers');

        if (responseJson.results) {
			setTrailers(responseJson.results);
		}
    }

	useEffect(() => {
		getDetails();
        getSeasons(getSeasonNumber());
        getEpisodes();
        getImages();
        getSimilar();
        getReviews();
        getTrailers();
	}, []);

    useEffect (() => {
        window.scrollTo(0, 0)
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

    function getSeasonNumber() {
        var values = [];
        for (let i = 0; i < details.number_of_seasons + 1; i++) {
            var x = 0
            x += i + 1;
            values.push(x)
            getSeasons(x)
            console.log(i, 'num');
        }

        for (let i = 0; i < values.length ; i++) {
            return values[i]
        }
    }

    var months = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
        "Jul", "Aug", "Sept", "Oct", "Nov", "Dec" ];

    return(
        <main>

            {location.state.poster && <section className={style.movieDescription} style={{background: `linear-gradient(to right, var(--blk-clr), #000000d9, transparent), url('https://image.tmdb.org/t/p/original/${location.state.poster}'), url('${backup}')`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
                
                <article className={style.details}>
                    
                    <h1>{details.name}</h1>
                    <span className={style.info}>{details.tagline} &#8729; <strong className={style.colorChange}>{`${details.vote_average}`.slice(0, 1)}</strong>/10 &#8729; {`${details.first_air_date}`.slice(0, 4)} &#8729; {details.number_of_seasons} Season(s) &#8729; {details.number_of_episodes} Episodes</span>
                    <p className={style.overview}>{details.overview}</p>

                    <hr></hr>

                    <div>
                        <button aria-label="Play series trailer." className={style.button} exact="true" onClick={trailerClick}>
                            <FontAwesomeIcon className={style.i} icon={faCirclePlay} />
                            Watch Clips<span>Play &gt;&gt;</span>
                        </button>
                        <Link aria-label="Link to TMDB page for this series." className={style.buttonB} exact="true" to={`https://www.themoviedb.org/tv/${location.state.data}`}>
                            <FontAwesomeIcon className={style.i} icon={faCircleExclamation} />
                            More Info <span>Go &gt;&gt;</span>
                        </Link>
                        <button aria-label="Link to Episode List for this series." className={classNames(style.button, style.buttonAlt)} exact="true" onClick={episodeClick}>
                            <FontAwesomeIcon className={style.i} icon={faList} />
                            Season List <span>View &gt;&gt;</span>
                        </button>
                    </div>

                </article>

                {openTrailer ? (

                    <div className={style.trailerCont}>
                        <p onClick={trailerClick}><FontAwesomeIcon className={style.i} icon={faCircleXmark} /></p>
                        <YouTube ref={handleRef} className={style.youtubeVid} opts={opts} videoId={`${trailers[0].key}`} />
                        <div className={style.ytVidTitle} style={{background: `linear-gradient(to right, var(--blk-clr), var(--blk-clr), #000000d9, #000000d9), url('https://image.tmdb.org/t/p/original/${location.state.poster}'), url('${backup}')`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
                            <h2>{details.name}</h2>
                            <div>
                                <span className={style.tabRate}>{`${details.first_air_date}`.slice(0, 4)}</span>
                                <span className={style.tabRate}>{details.number_of_seasons} Season(s)</span>
                            </div>
                        </div>
                    </div>

                ) : null }

                {openEpisodes ? (

                    <div className={style.episodeCont}>
                        <p onClick={episodeClick}><FontAwesomeIcon className={style.i} icon={faCircleXmark} /></p>
                        <div className={style.episodeList}>
                            <h2 style={{textTransform: 'uppercase'}}><strong>{`${details.name}`.slice(0, 1)}</strong><strong className={style.colorChange}>{`${details.name}`.slice(1,)}</strong></h2>
                            <div>
                                <span className={style.tabRate}>{`${details.first_air_date}`.slice(0, 4)}</span>
                                <span className={style.tabRate}>{details.number_of_seasons} Season(s)</span>
                            </div>
                        </div>

                        <article className={style.listHolder}>
                            <div className={style.seasonTitle}>

                                {details.seasons.map((name) => {
                                    
                                    return(
                                        <div onClick={showClick} className={style.row} style={{background: `linear-gradient(to right, var(--lght-blk), var(--blk-clr), #000000d9, #000000d9), url('https://image.tmdb.org/t/p/original/${name.poster_path}'), url('${backup}')`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
                                            <article className={style.rowTitleCont}>
                                                <div>
                                                    <h2><em>{name.name}</em></h2>

                                                    <span className={style.info}>Released: <strong className={style.colorChange}>{months[parseInt(`${name.air_date}`.slice(5, 7) - 1, 10)]}.</strong> {`${name.air_date}`.slice(8, 10)}, {`${name.air_date}`.slice(0, 4)}</span>
                                                </div>

                                                <span className={style.info}>{name.episode_count} Episodes <FontAwesomeIcon className={style.i} icon={faChevronDown} /></span>
                                            </article>
                                                                                   
                                            <article>
                                                <span className={classNames(style.info, style.opaChange)}>{name.overview}</span>
                                            </article>
                                            
                                            {/*
                                            {showEpisodes ? (
                                                
                                                <section className={classNames(style.rowListEpisodes)}>
                                                    {getseasons.episodes.map((id) => {
                                                        
                                                        return(
                                                            <div className={style.rleCont}>
                                                                <h3>Ep {id.episode_number}: {id.name}</h3>
                                                                <span className={style.info}>Released: {`${id.air_date}`.slice(5, 7)}/{`${id.air_date}`.slice(8, 10)}/{`${id.air_date}`.slice(2, 4)}</span>
                                                                <span className={classNames(style.info, style.colorChange)}><strong>{id.runtime}mins</strong></span>

                                                                <div>
                                                                    <span className={classNames(style.info, style.opaChange)}>{id.overview}</span>
                                                                </div>
                                                            </div>
                                                        )
                                                    })}
                                                </section>
                                            ): null }
                                            */}
                                        </div>
                                    )
                                })}
                                
                            </div>
                        </article>
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
                                    <span className={style.info}>Written by <em><strong>{testi.author}</strong></em> on <em><strong>{`${testi.created_at}`.slice(0, 10)}</strong></em>.</span>
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
                                <Link onClick={refreshPage} aria-label="temporary" exact="true" to={`/tv?name=${posters.name}`} state={{data: `${posters.id}`, poster: `${posters.backdrop_path}`}}>

                                    <section className={style.holder}>
                                        <img rel='preload preconnect' loading='lazy' src={`https://image.tmdb.org/t/p/original/${posters.backdrop_path}`} width='225px' height='150px' onError={addImageFallback} alt='Tv poster'>
                                        </img>

                                        <p>{posters.name} &#8729; {`${posters.first_air_date}`.slice(0, 4)}</p>
                                    </section>

                                </Link>
                        );
                    })}
                </article>
            </section>

        </main>
    );
}

export default TvPage;
