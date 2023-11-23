import React from 'react';

import './emoji-component.css';

class EmojiComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      emojis: [
        { smile: '😀', voteCount: 0 },
        { smile: '🦋', voteCount: 0 },
        { smile: '🥶', voteCount: 0 },
        { smile: '👣', voteCount: 0 },
        { smile: '🦄', voteCount: 0 },
      ],
    };
  }

  updateVotes = () => {
    // Update vote scores in the state
    this.setState({
      emojis: this.state.emojis,
    });
  };

  showEmojis = () => {
    return this.state.emojis.map((item, index) => (
      <div key={index}>
        <div
          onClick={() => {
            this.voteEmoji(index);
          }}
        >
          {item.smile}
        </div>
        <div>
          <button
            onClick={() => {
              this.removeEmoji(index);
            }}
          >
            X
          </button>
        </div>
        <div className="vote-score">{item.voteCount}</div>
      </div>
    ));
  };

  removeEmoji = (index) => {
    const newEmojis = [...this.state.emojis];
    newEmojis.splice(index, 1);
    this.setState(
      {
        emojis: newEmojis,
      },
      () => {
        this.updateVotes();
      }
    );
  };

  voteEmoji = (index) => {
    const newEmojis = [...this.state.emojis];
    newEmojis[index].voteCount++;
    this.setState(
      {
        emojis: newEmojis,
      },
      () => {
        this.updateVotes();
      }
    );
  };

  addEmoji = () => {
    const newSmile = prompt('Enter new smile:');

    if (newSmile !== null && newSmile !== '') {
      const newEmojis = [
        ...this.state.emojis,
        { smile: newSmile, voteCount: 0 },
      ];

      this.setState(
        {
          emojis: newEmojis,
        },
        () => {
          this.updateVotes();
        }
      );
    }
  };

  findWinningEmoji = () => {
    const { emojis } = this.state;
    let winningEmoji = emojis[0];

    for (let i = 1; i < emojis.length; i++) {
      if (emojis[i].voteCount > winningEmoji.voteCount) {
        winningEmoji = emojis[i];
      }
    }

    return winningEmoji.smile;
  };

  render() {
    const { showResults } = this.state;

    return (
      <div className="global-container">
        <div className="main-container">
          <div className="smile-container">{this.showEmojis()}</div>
        </div>
        <div className="add-smile">
          <button className="add-cmile-button" onClick={this.addEmoji}>
            Add emoji
          </button>
        </div>
        <div className="show-results">
          <button
            className="add-cmile-button"
            onClick={() => this.setState({ showResults: true })}
          >
            Show Results
          </button>
          {showResults && (
            <div className="winning-emoji">
              Winning Emoji: {this.findWinningEmoji()}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default EmojiComponent;
