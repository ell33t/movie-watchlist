import IconBookmark from './assets/icons8-bookmark.svg';
import IconBookmarkSolid from './assets/icons8-bookmark-solid.svg';
import IconSearch from './assets/icons8-search.svg';

import './App.css';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={IconBookmark} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    );
}

export default App;
