import React from 'react'
import Songs from '../Songs/Songs'
import Search from '../Songs/Search'

function Index() {
    return (
        <div className="index">
            <Search/>
            <Songs/>
        </div>
    )
}

export default Index
