import React, { Component } from 'react';
import {concat, difference, equals, find, head, map, tail} from 'ramda';
import {people} from './people';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  createMatch(people, currentMatches) {
    let secretSantas = getSecretSantas(currentMatches);
    let targets = getSecretSantaTargets(currentMatches);
    let peopleAsSecretSantas = difference(people, secretSantas);
    let peopleAsTargets = difference(people, targets);

    if (peopleAsSecretSantas.length === 2) {
      let secretSanta1 = head(peopleAsSecretSantas);
      let secretSanta2 = tail(peopleAsSecretSantas);

      let target1 = find(person => equals(person, secretSanta1), peopleAsTargets);
      let target2 = find(person => equals(person, secretSanta2), peopleAsTargets)

      if (target1 && target2) {
        return concat(currentMatches, [
          [secretSanta1, target2],
          [secretSanta2, target1]
        ]);
      }

      if (target1) {
        return concat(currentMatches, [
          [secretSanta1, head(difference(peopleAsTargets, [target1]))],
          [secretSanta2, target1]
        ]);
      }

      if (target2) {
        return concat(currentMatches, [
          [secretSanta1, target2],
          [secretSanta2, head(difference(peopleAsTargets, [target2]))]
        ]);
      }

      return concat(currentMatches, [
        [secretSanta1, head(peopleAsTargets)],
        [secretSanta2, tail(peopleAsTargets)]
      ]);
    }

    let secretSanta = head(peopleAsSecretSantas);
    peopleAsTargets = difference(peopleAsTargets, secretSanta);

    let randomIdx = Math.floor(Math.random() * peopleAsTargets.length);

    return concat(currentMatches, [
      [secretSanta, peopleAsTargets[randomIdx]]
    ]);
  }

  createMatches() {
    let matches = [];

    while (!equals(matches.length, people.length)) {
      matches = this.createMatch(people, matches);
    }

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

function getSecretSantas(currentMatches) {
  return map(match => match[0], currentMatches);
}

function getSecretSantaTargets(currentMatches) {
  return map(match => match[1], currentMatches);
}