import React, { Component } from 'react'
import axios from 'axios'
import {Consumer} from '../../Context'

export class Search extends Component {

    state = {
        trackTitle:''
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    findLyrics = (dispatch,e) => {
        e.preventDefault()

        axios.get(`https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.search?q_track=${this.state.trackTitle}&page_size=10&page=1&s_track_rating=desc&apikey=ec5ae9ccb5f98a1a066c6364fceb06e6`)
        .then(res => {
            dispatch({
                type: 'SEARCH_TRACKS',
                payload: res.data.message.body.track_list
            })

            this.setState({trackTitle:''})
        })
        .catch(err => console.log(err))
    }

    render() {
        return (
            <Consumer>
                {value => {
                    const {dispatch} = value 
                    return(
                        <div className="card card-body mb-4 p-4">
                            <h1 className="display-4 text-center">
                                <i className="fa fa-music"/>
                                Search For A Song
                            </h1>
                            <p className="lead text-center">Get Song Lyrics Here</p>
                            <form onSubmit={this.findLyrics.bind(this, dispatch)}>
                                <div className="form-group">
                                    <input 
                                    className="form-control form-control-lg" 
                                    type="text"
                                    placeholder="Song Title..."
                                    name="trackTitle"
                                    value={this.state.trackTitle}
                                    onChange={this.onChange}
                                    />
                                    <button
                                    className="btn btn-warning btn- lg mt-2"
                                    type="submit"
                                    >
                                    Find Song Lyrics
                                    </button>
                                    
                                </div>

                            </form>
                        </div>
                    )
                }}
            </Consumer>
        )
    }
}

export default Search
