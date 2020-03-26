import React, { useState, useEffect } from 'react'
import { Grid } from '@material-ui/core'
import axios from 'axios'
import { connect } from 'react-redux'
import MovieCards from './MovieCards/MovieCards'

import Spinner from '../components/Spinner/Spinner'

const API_KEY = '07f5d27cb33b67a8693ae27c5a9a8d64'

const Favorites = props => {
    const [favs, setFavs] = useState([])
    const [imgURL, setImgURL] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            if (localStorage.getItem('configData') !== null) {
                const configData = JSON.parse(localStorage.getItem('configData'))
                console.log(configData)
                setImgURL(configData.images.secure_base_url)
            }

            if (localStorage.getItem('movieFavorites') !== null) {
                const data = JSON.parse(localStorage.getItem('movieFavorites'))
                const MovieIdArray = await data.map(movieId => parseInt(movieId))
                const movieArray = Promise.all(MovieIdArray.map(async (movieId) => axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`)))
                let favData = []
                movieArray.then(data => {
                    console.log(data)
                    data.map(d =>
                        favData.push(d.data)
                    )
                    setFavs(favData)
                    console.log(favData)

                })
            }
        }
        fetchData()
    }, [])

    return (
        <Grid container>
            {
                favs ?
                    (
                        <MovieCards
                            imgURL={imgURL}
                            movieData={favs}
                            isFavorite={true}
                        />
                    )
                    :
                    <Spinner />
            }
        </Grid>
    )

}

const mapStateToProps = state => {
    return {
        imgURL: state.auth.imgURL
    }
}

export default connect(mapStateToProps)(Favorites)