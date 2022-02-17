import React from 'react'
import { useAppDispatch, useAppSelector } from '../packages/hooks'
import logo from './logo.svg'
import './App.css'
import { getAccountBalance, getAccounts, getSelectedAccounts } from '../packages/store/sagas/accountSaga'

function App() {
  const selected = useAppSelector((state) => state.accounts.accountsSelected)
  const dispatch = useAppDispatch()

  function handleClick() {
    dispatch(getAccountBalance)
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello Vite + React!</p>
        <p>
          <button onClick={handleClick}>
            account selected is { selected }
            
          </button>
        </p>
        <p>
          Edit <code>App.tsx</code> and save to test HMR updates.
        </p>
        <p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {' | '}
          <a
            className="App-link"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite Docs
          </a>
        </p>
      </header>
    </div>
  )
}

export default App
