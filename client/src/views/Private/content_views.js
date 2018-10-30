import React from 'react';
import { Link } from 'react-router-dom'
import { List } from '../../components/List'
import { Minus, Edit } from '../../svgs/icons'
import { displayUrl, genId } from '../../lib/util'

const listSection = (title, items, url, addClass) => (
    <section key={ title } className={ `list-container ${addClass}` }>			
        <h2><Link to={ `/your/${url}` }>{ title }</Link></h2>
        <List items={ items } /> 
        <Link to={ `/your/${url}` } className="full-link">Full List...</Link>
    </section>
)

const LinkEdit = (props) => {
    const { link, setEdit } = props
    return(
    <span className="pre edit-ctrls" >
        <button onClick={ () => setEdit( link, 'updatelink' ) } ><Edit /></button>
        <button onClick={ () => setEdit( link, 'delete' ) } ><Minus /></button>
    </span>
    )
}

const Placeholder = () => (
    <li className="placeholder">Empty</li>
)

export const renderList = ({ links = [] }, setEdit) => {
    return ( 
        <section className={ `list-container full` } >
            <ul>
                { links.map((link) => link ? (
                        <li key={ link.id }>
                            <LinkEdit link={ link } setEdit={ setEdit } />
                            <a href={ link.url } target="_blank"  rel="noopener noreferrer" >
                                { link.title } - { displayUrl(link.url) }
                            </a>
                        </li>
                    ) : <Placeholder key={ genId() } /> )}
            </ul>
        </section>
    )
}

export const renderPublic = ({ publik = [] }) => (
    <div>
        { publik.map((list) => list ? listSection(list.title, list.sites, `${list.local_url}`) : <Placeholder />

            )
        }
    </div>
)

export const renderFollowed = ({ followed = [] }) => (
    <div>
        { followed.map((list) => {
            return (
                listSection(list.title, list.sites, `${list.local_url}`)
            )
        } )}
    </div>
)

export const renderShared = ({ shared = [] }) => (
    <div>
        { shared.map((list, i) => {

            return (
                listSection(list.title, list.sites, `${list.local_url}`)
            )
        } )}
    </div>
)

export const renderLists = ({ lists = [] }) => (
    <div>
        { lists.map((list) => {
            return (
                listSection(list.title, list.sites, `${list.local_url}`)
            )
        } )}
    </div>
)

export const renderDashboard = ({ lists = [], shared = [], followed = [], publik = [] }) => (
    <div>
        { listSection('Your Lists', lists, 'lists') }
        { listSection('Shared Lists', shared, 'shared') }
        { listSection('Followed Lists', followed, 'followed') }
        { listSection('Public Lists', publik, 'public', 'full column') }
    </div>
)