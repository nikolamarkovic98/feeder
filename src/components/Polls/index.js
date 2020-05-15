import React, {useEffect, useState} from 'react';
import {find} from '../../requests';

import PollBox from './sub/PollBox';

import './index.css';

const changePage = async (page, setPolls) => {
    const pages = document.querySelectorAll('.page');
    for(let i = 0; i < pages.length; i++){
        pages[i].style.color = '#666';
    }
    pages[page].style.color = '#999';
    let polls = await find('poll', page * 20)
    console.log(polls);
    setPolls([...polls.data]);
}

const displayPages = (_pages, setPolls) => {
    let pages = [];
    for(let i = 0, j = 0; j < _pages; j+=20, i++){
        pages.push((<span className={`page ${i === 0 ? 'active' : ''}`} key={i} onClick={e => changePage(i, setPolls)}>{i+1}</span>))
    }
    return pages;
}

const displayPolls = (polls, search) => {
    return polls.map(poll => {
        if(poll.label !== undefined){
            if(poll.label.toLowerCase().includes(search.toLowerCase())){
                return (
                    <PollBox key={poll.id} id={poll.id} name={poll.label} date={poll.date} active={poll.active} />
                )
        }
        }
    })
}

const Polls = props => {
    const [polls, setPolls] = useState([]);
    const [search, setSearch] = useState('');
    const [totalPolls, setTotalPolls] = useState(0);

    useEffect(() => {
        async function wrapper(){
            const _polls = await find('poll');
            setTotalPolls(_polls.total);
            setPolls([..._polls.data]);
        }
        wrapper();
    }, []);

    return (
        <section className="polls">
            <div className="content-wrap">
                <h1>Polls</h1>
                <input type="text" placeholder="Search" className="search" onChange={e => setSearch(e.target.value)} />
                <div className="list">
                    {displayPolls(polls, search)}
                </div>
                <div className="pages">
                    {displayPages(totalPolls, setPolls)}
                </div>
            </div>
        </section>
    )
}

export default Polls;