import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { logoutUser } from "../actions";
import { useHistory } from 'react-router-dom'

import axios from 'axios'
import { search } from '../utils'

import { Grid, Button, TextField, IconButton, makeStyles } from '@material-ui/core'
import FavoriteIcon from '@material-ui/icons/Favorite';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';


import MovieCards from './MovieCards/MovieCards'
import Spinner from "./Spinner/Spinner";

const API_KEY = '07f5d27cb33b67a8693ae27c5a9a8d64'

const useStyles = makeStyles({
    root: {
        background: '#f5f5f5'
    }
})

const HomePage = props => {
    const classes = useStyles()

    const { isLoggingOut, logoutError } = props;
    const [movieData, setMovieData] = useState(null)
    const [imgURL, setImgURL] = useState('')
    const [pageNumber, setPageNumber] = useState(1)
    const [previousDisabled, setPreviousDisabled] = useState(true)
    const [nextDisabled, setNextDisabled] = useState(false)
    const [totalPages, setTotalPages] = useState(-1)
    const [loading, setLoading] = useState(false)
    const [isSearchData, setIsSearchData] = useState(false)
    const [initialData, setInitialData] = useState(null)
    const history = useHistory()


    const handleLogout = () => {
        console.log(props.user)
        const { dispatch } = props;
        dispatch(logoutUser(props.user));
    };

    const handleGoToFavorites = () => {
        history.push('/favorites')

    }

    const checkPageNumber = e => {
        setPreviousDisabled(false)
        setNextDisabled(false)

        if (pageNumber === 1) {
            setPreviousDisabled(true)
        } else if (pageNumber === totalPages) {
            setNextDisabled(true)
        }
    }

    const handleNextPage = e => {
        e.preventDefault()
        setPageNumber(pageNumber + 1)
    }

    const handlePreviousPage = e => {
        e.preventDefault()
        if (pageNumber >= 2) {
            setPageNumber(pageNumber - 1)
        }
    }

    const handleSearch = async (val) => {

        const res = await search(`https://api.themoviedb.org/3/search/movie?query=${val}&api_key=${API_KEY}&page=1`)

        if (val.trim() === '' && !res) {
            setMovieData(initialData)
            setIsSearchData(false)
        } else if (val.trim() !== '' && !res) {
            setMovieData(null)
        } else {
            setMovieData(res)
        }
    }


    useEffect(() => {
        const fetchData = async () => {
            //check config data
            if (!imgURL) {
                console.log('shoudlnet run')
                if (!localStorage.getItem('configData')) {
                    const configData = await axios.get(`https://api.themoviedb.org/3/configuration?api_key=${API_KEY}`)
                    //set image url
                    setImgURL(configData.data.images.secure_base_url)
                    //cache config        
                    localStorage.setItem('configData', JSON.stringify(configData.data))
                } else {
                    const localData = JSON.parse(localStorage.getItem('configData'))
                    setImgURL(localData.images.secure_base_url)
                }
            }
            const movieData = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pageNumber}`)
            setMovieData(movieData.data.results) //set movies
            setInitialData(movieData.data.results)
            setTotalPages(movieData.data.total_pages)
            window.scrollTo(0, 0) //scroll to top on page change
            checkPageNumber() //disable buttons based on page
        }
        fetchData()
    }, [pageNumber])


    return (
        <div className={classes.root}>
            <Grid container justify="center" style={{ padding: '20px' }}>
                <Grid item style={{ width: '25%', display: 'flex', justifyContent: 'flex-start' }} >
                    <Button
                        color="primary"
                        onClick={handleLogout}
                    >
                        Logout
                     </Button>
                </Grid>
                <Grid item style={{ width: '50%', display: 'flex', justifyContent: 'center' }} >
                    <TextField
                        id="search-bar"
                        onChange={e => handleSearch(e.target.value)}
                        style={{ width: '60%', background: 'white' }}
                        label="Search" variant="outlined" />
                </Grid>

                <Grid item style={{ width: '25%', display: 'flex', justifyContent: 'flex-end' }}>
                    <Button variant="contained"
                        color="secondary"
                        onClick={handleGoToFavorites}
                        startIcon={<FavoriteIcon />}
                    >Favorites</Button>
                </Grid>
            </Grid>
            {
                movieData ?
                    (movieData.length === 0 ?
                        (
                            <Grid container justify="center" fullWidth style={{ fontSize: '2rem' }}>
                                No movies found
                            </Grid>
                        )
                        :
                        (<MovieCards imgURL={imgURL} movieData={movieData} />)

                    )
                    :
                    (
                        <Grid container style={{ height: '400px' }} >
                            <Spinner />
                        </Grid>
                    )

            }
            <Grid container direction="row" justify="center" style={{ padding: '30px' }}>
                <IconButton aria-label="prev" style={{ padding: '10px', margin: '10px' }}
                    onClick={handlePreviousPage}
                    disabled={previousDisabled}
                >
                    <ArrowBackIcon />
                </IconButton>
                <IconButton aria-label="next" onClick={handleNextPage}
                    disabled={nextDisabled}
                    style={{ background: '#3b65b5', color: 'white', padding: '10px', margin: '10px', }}>
                    <ArrowForwardIcon />
                </IconButton>
            </Grid>
        </div>
    );

}
function mapStateToProps(state) {
    return {
        isLoggingOut: state.auth.isLoggingOut,
        logoutError: state.auth.logoutError,
        user: state.auth.user
    };
}
export default connect(mapStateToProps)(HomePage)