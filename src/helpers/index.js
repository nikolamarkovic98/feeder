import {get ,update, create} from '../requests';

const months = ['January', 'February', 'Marth', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const getDate = _date => {
    const date = new Date(_date);
    return `${months[date.getMonth()]}/${date.getDate()}/${date.getFullYear()}`;
}

const displayMessage = (id, msg, color) => {
    const element = document.getElementById(id);
    element.style.color = color;
    element.innerHTML = msg;
}

const getWinnerRestaurant = votes => {
    if(votes.length == 0){
        // default restaurant, just in case votes do not exist somehow
        return 0;
    } else {
        let max = votes[0], index = 0;
        for(let i = 1; i < votes.length; i++){
            if(votes[i].votes > max){
                index = i;
                max = votes[i].votes;
            }
        }
        return votes[index].restaurantId;
    }
}

const pollIntervals = () => {
    // starts when app runs
    let localPolls = JSON.parse(localStorage.getItem('meal-app-polls'));
    if(localPolls === null)
        return;
    if(localPolls.length === 0)
        return;

    const interval = setInterval(async () => {
        let polls = JSON.parse(localStorage.getItem('meal-app-polls'));

        if(polls === null){
            clearInterval(interval);
            return;
        }
        // increment every second
        if(polls.length > 0){
            for(let i = 0; i < polls.length; i++){
                if(polls[i].duration - polls[i].passedTime === 0){
                    // poll is over - update active status
                    try{
                        // ok so since I need to send entire poll for it to update properly I am going to fetch it first
                        // and then change the response and send again
                        // another solution would be to save entire poll in localStorage
                        // or create another route in API that would just take id and change active status

                        const poll = await get('poll', polls[i].pollId);

                        // create Order automatically
                        const order = {
                            date: new Date().toISOString(),
                            restaurantId: getWinnerRestaurant(poll.votes)
                        }

                        const createdOrder = await create('order', order);
                        console.log(createdOrder);

                        const updatedPoll = await update('poll', {
                            ...poll,
                            active: false,
                            restaurants: poll.restaurants.map(r => r.id),
                            votes: poll.votes.map(vote => vote.id)
                        }, poll.id);
                    } catch(err){
                        console.log(err);
                    }
                    polls.splice(i, 1);
                } else {
                    // update HTML
                    if(window.location.pathname.includes('polls')){
                        polls.forEach(p => {
                            const pollElement = document.getElementById(`poll-${p.pollId}`)
                            if(pollElement !== null){
                                pollElement.innerHTML = `${p.passedTime / 1000}s`;
                            }
                        })
                    }
                    // increment
                    polls[i].passedTime+=1000;
                }
            }
        } else {
            clearInterval(interval);
            return;
        }

        localStorage.setItem('meal-app-polls', JSON.stringify(polls));
    }, 1000);
}

// I could have a functin for a date over here as well

export{
    getDate,
    displayMessage,
    pollIntervals
}