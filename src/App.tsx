import { BrowserRouter, Routes, Route } from 'react-router'

import './App.css'
import Layout from '@/app/components/Layout'
import { PersistGate } from 'reduxjs-toolkit-persist/integration/react'
import { Provider } from 'react-redux'
import { store, persistor } from './state/store'
import Dashboard from './app/components/Dashboard'
import Sheet from './app/pages/sheet/multi-mode'
import CreateSheetDialog from './app/pages/sheet/create-sheet'
import { CreateCategoryDialog } from './app/pages/category/create-category'

function App() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="sheet" element={<Sheet />} />
            </Route>
          </Routes>
        </BrowserRouter>
        <CreateSheetDialog />
        <CreateCategoryDialog />
      </PersistGate>
    </Provider>
  )
}

export default App
