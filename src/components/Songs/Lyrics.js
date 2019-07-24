import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import Spinner from '../Navigation/Spinner'
import Moment from 'react-moment'

export class Lyrics extends Component {

    state = {
        track:{},
        lyrics:{}
    }

    componentDidMount(){
        axios.get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${this.props.match.params.id}&apikey=ec5ae9ccb5f98a1a066c6364fceb06e6`)
        .then(res => {

            //console.log(res.data)
            this.setState({lyrics: res.data.message.body.lyrics})

            return(
                axios.get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.get?track_id=${this.props.match.params.id}&apikey=ec5ae9ccb5f98a1a066c6364fceb06e6`)

            )
        })
        .then(res =>{
            //console.log(res.data)
            this.setState({track: res.data.message.body.track})
        })
        .catch(err => console.log(err) )
    }

    render() {
        const {track , lyrics} = this.state

        if(
            track === undefined || 
            lyrics === undefined || 
            Object.keys(track).length === 0 || 
            Object.keys(lyrics).length === 0){
            return(
                    <Spinner/>
            )
        }else{
            return(
                <React.Fragment>
                    <Link className="btn btn-warning btn-sm mb-4" to="/">
                        Go Back
                    </Link>
                    <div className="card">
                        <h5 className="card-header">
                            {track.track_name} by {' '}
                            <span className="text-secondary">
                                {track.artist_name}
                            </span>
                        </h5>
                        <div className="card-body">
                            <div className="card-text">
                                {lyrics.lyrics_body}
                            </div>
                        </div>
                    </div>

                    <ul className="list-group mt-3">
                        <li className="list-group-item">
                            <strong>Album Id : </strong>
                            {track.album_id}
                        </li>
                        <li className="list-group-item">
                            <strong>Album Name : </strong>
                            {track.album_name}
                        </li>
                        <li className="list-group-item">
                            <strong>Explixit Content : </strong>
                            {track.explicit === 0 ? 'No' : 'Yes'}
                        </li>
                        <li className="list-group-item">
                            <strong>Release Date : </strong>
                            <Moment format="MM/DD/YYYY">{track.updated_time}</Moment>
                        </li>
                    </ul>

                </React.Fragment>
            )
        }
    }
}

export default Lyrics
