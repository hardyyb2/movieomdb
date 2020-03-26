
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import LazyLoad from 'react-lazyload'

import DefaultImage from '../../../assets/noimg.png'

const useStyles = makeStyles(theme => ({
    root: {
        maxWidth: 405,
        minWidth: 405,
        margin: '5px'
    },
    media: {
        height: 0,
        paddingTop: '100%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
    title: {
        fontSize: '1.4rem',
        fontWeight: 'bolder'
    }
}));
const MovieCard = props => {
    const classes = useStyles();


    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        {props.vote_average || ''}
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                classes={{
                    title: classes.title,
                }}
                title={props.original_title || ''}
                subheader={props.release_date || 'Date Not Available'}
            />
            <LazyLoad
                once={true}
                placeholder={<CardMedia
                    className={classes.media}
                    image={DefaultImage}
                    title={props.original_title || ''}
                />}
            >
                <CardMedia
                    className={classes.media}
                    image={props.poster_path || DefaultImage}
                    title={props.original_title || ''}
                />
            </LazyLoad>
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {props.overview || '(No Description Available)'}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton
                    aria-label="add to favorites"
                    onClick={props.handleAddToFavorites}
                    style={{ color: ((props.isFavorite) ? 'red' : '#ccc') }}
                >
                    <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>

            </CardActions>

        </Card>
    );
}

export default MovieCard