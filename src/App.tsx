import './App.css'
import Layout from '@/app/components/Layout'
import { PersistGate } from 'reduxjs-toolkit-persist/integration/react'
import { Provider } from 'react-redux'
import { store, persistor } from './state/store'
import Dashboard from './app/components/Dashboard'
import { DialogDemo } from './app/pages/sheets/create'

function App() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Layout>
          <Dashboard></Dashboard>
          <DialogDemo />
        </Layout>
      </PersistGate>
    </Provider>
  )
}

export default App
