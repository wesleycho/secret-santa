import React, { Component } from 'react';
import {compose, converge, head, last, identity, init, map, prepend, sort, sortBy, zip} from 'ramda';
import {people} from './people';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  createMatches() {
    const shuffle = sortBy(Math.random);
    const shift = converge(prepend, [last, init])

    const secretSanta = compose(converge(zip, [identity, shift]), shuffle);
    const matches = sort((a, b) => alphabetical(head(a), head(b)), secretSanta(people));

    return matches;
  }

  render() {
    let matches = this.createMatches();
    let secretSantas = getSecretSantas(matches);
    let targets = getSecretSantaTargets(matches);

    let secretSantaEls = secretSantas.map(secretSanta => {
      return <li key={secretSanta} className="santa">{secretSanta}</li>;
    });
    let targetEls = targets.map(target => {
      return <li key={target} className="target">{target}</li>;
    });
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <div className="App-body">
          <div className="matches">
            <ul className="secret-santas">
              {secretSantaEls}
            </ul>
            <ul className="santa-targets">
              {targetEls}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

function alphabetical(a, b) {
  if (a > b) {
    return 1;
  }

  if (a < b) {
    return -1;
  }

  return 0;
}

function getSecretSantas(currentMatches) {
  return map(match => match[0], currentMatches);
}

function getSecretSantaTargets(currentMatches) {
  return map(match => match[1], currentMatches);
}