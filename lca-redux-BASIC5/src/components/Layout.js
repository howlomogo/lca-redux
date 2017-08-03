import React from 'react';

// Connect portion of react-redux
import { connect } from 'react-redux';
import { fetchUser } from './../actions/userActions';
import { fetchTweets } from './../actions/tweetsActions';

//EVERY COMPONENT PULL IN JUST WHAT PIECES OF THE STORE THEY WANT
// CONNECT -- onyl confusing bit, what is actions why do
// When you load the layout component your actually going to get the connect component
// Which renders the layout component and injects props into it, so its a really simpe way
// to inject props into layout
// Connect will run two functions, a - is for getting store values in as props,
// it gives you a store and expects you to return an object and whatever you return
// gets  ---------->>>  SET AS PROPS!!! <<<<-------

// WHERE DO WE WANT TO USE THIS CONNECT
// you have smart and dumb components, smart comp use connect and pass
// everything down as props to the dumb components

// THERS A MIX i.e. you dont wanna pass props 10 levels down, but you want to
// keep the connect to as few as possible
function mapStateToProps(store) {
  return {
    foo: 1,
    // user is the name and the property is user so user.user
    user: store.user.user,
    userFetched: store.user.fetched,
    tweets: store.tweets.tweets
  }
}
// ANOTHER WAY OF DOING IT
// const mapStateToProps = (store) => ({
//   user: store.user.user
// })
// Layout = connect()()



class Layout extends React.Component {
  componentWillMount() {
    // can dispatch, and grab the user will
    this.props.dispatch(fetchUser());
  }

  fetchTweets() {
    this.props.dispatch(fetchTweets());
  }

  render() {
    const { user, tweets } = this.props;


    if(!tweets.length) {
      return <button onClick={this.fetchTweets.bind(this)}>Load Tweets</button>
    }

    const mappedTweets = tweets.map(tweet => <li>{tweet.text}</li>)
    return (
      <div>
        <h1>{user.name}</h1>
        <ul>{mappedTweets}</ul>
      </div>
    )
  }
}

export default connect(mapStateToProps)(Layout);
