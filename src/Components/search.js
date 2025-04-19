import style from './style.module.css';

import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom';

import classNames from 'classnames'; 

import backup from '../Images/filmflixbackup.webp';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faFilm } from '@fortawesome/free-solid-svg-icons'; 


const Search = () => {
    const [search, setSearch] = useState([]);
    const [tvSearch, setTvSearch] = useState([]);
    const [movies, setMovies] = useState([]);
    const [tvs, setTvs] = useState([]);
    const [filterParam, setFilterParam] = useState(['revenue']);
    const [filterParamTv, setFilterParamTv] = useState(['popularity']);

    const [searchValue, setSearchValue] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage, setPostPerPage] = useState(16);

    const [postPerSearchPage, setPostPerSearchPage] = useState(16);


    const lastPostSearchIndex = currentPage * postPerSearchPage;

    
    const lastPostIndex = currentPage * postPerPage;
    const firstPostIndex = lastPostIndex - postPerPage;
    const currentPost = movies.slice(firstPostIndex, lastPostIndex);
    const currentTvPost = tvs.slice(firstPostIndex, lastPostIndex);

    const [similarPage, setSimilarPage] = useState(1);
    const [postPerPage2, setPostPerPage2] = useState(8);

    const lastSimilarIndex = similarPage * postPerPage2;
    const firstSimilarIndex = lastPostIndex - postPerPage2;
    const currentSearchPost = search.slice(firstPostIndex, lastSimilarIndex);
    const currentTvSearchPost = tvSearch.slice(firstPostIndex, lastSimilarIndex);

    const [isShown, setIsShown] = useState(false);

    const handleClick = event => {
        // 👇️ toggle shown state
        setIsShown(current => !current);
    
        // 👇️ or simply set it to true
        // setIsShown(true);
    };

    const [isSearchCat, setIsSearchCat] = useState(false);

    const handleSearchClick = event => {
        // 👇️ toggle shown state
        setIsSearchCat(current => !current);
    
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

    const getSearch = async (searchValue) => {
		const url = `https://api.themoviedb.org/3/search/movie?query=${searchValue}`;

		const response = await fetch(url, options);
		const responseJson = await response.json()

        console.log(responseJson, 'search');

        if (responseJson.results) {
			setSearch(responseJson.results);
		}
    };

    const getTvSearch = async (searchTvValue) => {
		const url = `https://api.themoviedb.org/3/search/tv?query=${searchTvValue}`;

		const response = await fetch(url, options);
		const responseJson = await response.json()

        console.log(responseJson, 'search');

        if (responseJson.results) {
			setTvSearch(responseJson.results);
		}
    };

    const getMovies = async (e) => {
		const url = `https://api.themoviedb.org/3/discover/movie?sort_by=${e}.desc`;

		const response = await fetch(url, options);
		const responseJson = await response.json()

        console.log(responseJson, 'movies');

        if (responseJson.results) {
			setMovies(responseJson.results);
		}
    };

    const getTvs = async (e) => {
		const url = `https://api.themoviedb.org/3/discover/tv?with_original_language=en&sort_by=${e}.desc`;

		const response = await fetch(url, options);
		const responseJson = await response.json()

        console.log(responseJson, 'tvs');

        if (responseJson.results) {
			setTvs(responseJson.results);
		}
    };

    const searchVal = '';

    useEffect(() => {
		getSearch(searchVal);
        getTvSearch(searchVal);
        getMovies(filterParam[0]);
        getTvs(filterParamTv[0]);
	},[]);

    console.log(filterParam);

    function handleIncrementClick(index) {
        const nextCounters = filterParam.map((c) => {
            return c = index; 
        });

        setFilterParam(nextCounters);
    }

    function handleTvClick(index) {
        const nextCounters = filterParamTv.map((c) => {
            return c = index; 
        });

        setFilterParamTv(nextCounters);
    }

    const addImageFallback = (event) => {
        event.currentTarget.src = `${backup}`;
    };

    const navigate = useNavigate();

    const handleInputChange = (e) => { 
        const searchTerm = e.target.value;
        getSearch(searchTerm);
        getTvSearch(searchTerm);
    }

    return(
        <main>
            <section className={style.searchCont}>

                <article className={style.searchBar}>
                        <input defaultValue="" type="text" onChange={handleInputChange} id="getFilm" placeholder="Search Films by Title"/>
                        <label for="search">Search Films by Title</label>
                </article>

                {isSearchCat ? (
                    <section className={style.filterCont}>
                        <button onClick={handleSearchClick} className={classNames(style.button, style.buttonAlt)}>
                            <FontAwesomeIcon className={style.i} icon={faFilm} /> 
                            TV Shows<span>Movies</span>
                        </button>
                    </section>
                ):
                    <section className={style.filterCont}>
                        <button onClick={handleSearchClick} className={classNames(style.button, style.buttonAlt)}>
                            <FontAwesomeIcon className={style.i} icon={faFilm} /> 
                            Movies<span>TV</span>
                        </button>
                    </section>
                }

                {isSearchCat ? (
                    <section className={style.searchedMovies2}>
                        {currentTvSearchPost.map((posters, id) => {
                            return(
                                <div>
                                    <Link aria-label="temporary" exact="true" to={`/tv?name=${posters.name}`} state={{data: `${posters.id}`, poster: `${posters.backdrop_path}`}}>

                                        <section className={style.holder}>
                                            <img rel='preload preconnect' loading='lazy' src={`https://image.tmdb.org/t/p/original/${posters.backdrop_path}`} width='225px' height='150px' onError={addImageFallback} alt='tv poster'>
                                            </img>

                                            <p>{posters.name} &#8729; {`${posters.first_air_date}`.slice(0, 4)}</p>
                                        </section>

                                    </Link>
                                </div>
                            );
                        })}
                    </section>
                ):
                    <section className={style.searchedMovies2}>
                        {currentSearchPost.map((posters, id) => {
                            return(
                                <div>
                                    <Link aria-label="temporary" exact="true" to={`/movie?title=${posters.title}`} state={{data: `${posters.id}`, poster: `${posters.backdrop_path}`}}>

                                        <section className={style.holder}>
                                            <img rel='preload preconnect' loading='lazy' src={`https://image.tmdb.org/t/p/original/${posters.backdrop_path}`} width='225px' height='150px' onError={addImageFallback} alt='movie poster'>
                                            </img>

                                            <p>{posters.title} &#8729; {`${posters.release_date}`.slice(0, 4)}</p>
                                        </section>

                                    </Link>
                                </div>
                            );
                        })}
                    </section>
                }

                {isShown ? (
                    <section className={style.filterCont}>
                        <button onClick={handleClick} className={classNames(style.button, style.buttonAlt)}>
                            <FontAwesomeIcon className={style.i} icon={faFilm} /> 
                            TV Shows<span>Movies</span>
                        </button>
                        <select
                            onClick={() => getTvs(filterParamTv[0])}
                            onChange={(e) => {
                                handleTvClick(e.target.value);
                            }}
                            className="custom-select"
                            aria-label="Filter Countries"
                            >
                            <option value="popularity">Filter By Popularity</option>
                            <option value="first_air_date">First Air Date</option>
                            <option value="name">Name</option>
                            <option value="vote_average">Vote Average</option>
                        </select>
                    </section>
                ):
                    <section className={style.filterCont}>
                        <button onClick={handleClick} className={classNames(style.button, style.buttonAlt)}>
                            <FontAwesomeIcon className={style.i} icon={faFilm} /> 
                            Movies<span>TV</span>
                        </button>
                        <select
                            onClick={() => getMovies(filterParam[0])}
                            onChange={(e) => {
                                handleIncrementClick(e.target.value);
                            }}
                            className="custom-select"
                            aria-label="Filter Countries"
                            >
                            <option value="revenue">Filter By Revenue</option>
                            <option value="popularity">Popularity</option>
                            <option value="primary_release_date">Release Date</option>
                            <option value="title">Title</option>
                            <option value="vote_average">Vote Average</option>
                        </select>
                    </section>
                }

                {isShown ? (
                    <section className={style.searchedMovies}>
                        {currentTvPost.map((posters, id) => {
                            return(
                                <div key={id}>
                                    <Link aria-label="temporary" exact="true" to={`/tv?name=${posters.name}`} state={{data: `${posters.id}`, poster: `${posters.backdrop_path}`}}>

                                        <section className={style.holder}>
                                            <img rel='preload preconnect' loading='lazy' src={`https://image.tmdb.org/t/p/original/${posters.backdrop_path}`} width='225px' height='150px' onError={addImageFallback} alt='Tv poster'>
                                            </img>

                                            <p>{posters.name} &#8729; {`${posters.first_air_date}`.slice(0, 4)}</p>
                                        </section>

                                    </Link>
                                </div>                        
                            );
                        })}
                    </section>
                ):
                    <section className={style.searchedMovies}>
                        {currentPost.map((posters, id) => {
                            return(
                                <div key={id}>
                                    <Link aria-label="temporary" exact="true" to={`/movie?title=${posters.title}`} state={{data: `${posters.id}`, poster: `${posters.backdrop_path}`}}>

                                        <section className={style.holder}>
                                            <img rel='preload preconnect' loading='lazy' src={`https://image.tmdb.org/t/p/original/${posters.backdrop_path}`} width='225px' height='150px' onError={addImageFallback} alt='Tv poster'>
                                            </img>

                                            <p>{posters.title} &#8729; {`${posters.release_date}`.slice(0, 4)}</p>
                                        </section>

                                    </Link>
                                </div>                        
                            );
                        })}
                    </section>
                }
            </section>
        </main>
    )
}

export default Search;