import './App.css'
import Layout from '@/modules/Layout'
import { PersistGate } from 'reduxjs-toolkit-persist/integration/react'
import { Provider } from 'react-redux'
import { store, persistor } from './state/store'

function App() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Layout>Test</Layout>
      </PersistGate>
    </Provider>
  )
}

export default App
