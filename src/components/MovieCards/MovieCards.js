import React, { useEffect, useState } from 'react'
import LazyLoad from 'react-lazyload'
import { Grid } from '@material-ui/core'
import MovieCard from './MovieCard/MovieCard'

import { connect } from 'react-redux'

import Spinner from '../Spinner/Spinner'



const MovieCards = props => {
    const [favMovies, setFavMovies] = useState([])

    const setImage = posterPath => {
        if (posterPath !== null)
            return props.imgURL + `w780${posterPath}`
        else

            return null
    }

    useEffect(() => {
        if (localStorage.getItem('movieFavorites') !== null) {
            const favs = JSON.parse(localStorage.getItem('movieFavorites'))
            setFavMovies(favs)
        }
    }, [props.refreshMovies])

    const handleAddToFavorites = movieId => {
        const favs = JSON.parse(localStorage.getItem('movieFavorites'))
        if (favs.indexOf(movieId.toString()) === -1) {
            favs.push(movieId.toString())
        } else {
            favs.splice(favs.indexOf(movieId.toString()), 1)
        }
        localStorage.setItem('movieFavorites', JSON.stringify(favs))
        setFavMovies(favs)
    }

    const checkFavorite = movieId => {
        if (favMovies.indexOf(movieId.toString()) !== -1) {
            return true
        }
        return false
    }

    return (
        <>

            <Grid container direction="row" justify="space-evenly">
                {
                    props.movieData ?
                        props.movieData.map(movie =>
                            <LazyLoad
                                key={movie.id + 'lazy'}
                                height={100}
                                offset={[-100, 100]}
                                placeholder={<Spinner />}
                            >

                                <MovieCard
                                    key={movie.id}
                                    original_title={movie.original_title}
                                    release_date={(new Date(movie.release_date)).toDateString()}
                                    poster_path={setImage(movie.poster_path)}
                                    overview={movie.overview}
                                    isFavorite={checkFavorite(movie.id)}
                                    vote_average={movie.vote_average}
                                    handleAddToFavorites={() => handleAddToFavorites(movie.id)}
                                />
                            </LazyLoad>
                        )
                        :
                        <Spinner />
                }
            </Grid>

        </>
    )
}

const mapStateToProps = state => {
    return {
        refreshMovies: state.auth.refreshMovies
    }
}

export default connect(mapStateToProps)(MovieCards)