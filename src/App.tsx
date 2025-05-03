import { Provider } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router'
import { PersistGate } from 'reduxjs-toolkit-persist/integration/react'

import Layout from '@/app/components/Layout'
import Dashboard from '@/app/pages/dashboard'
import Sheet from '@/app/pages/sheet'
import CreateSheetDialog from '@/app/pages/sheet/create-sheet'

import { store, persistor } from './state/store'
import './App.css'
import { CreateCategoryDialog } from './app/pages/category/create-category'

function App() {
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
