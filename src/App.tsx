import { Provider } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router'
import { PersistGate } from 'reduxjs-toolkit-persist/integration/react'

import DashboardRenderer from '@/app/pages/dashboard/DashboardRenderer'
import Layout from '@/app/components/Layout'
import Dashboard from '@/app/pages/dashboard'
import Sheet from '@/app/pages/sheet'

import { store, persistor } from './state/store'
import './App.css'
import CreateSheetDialog from '@/app/pages/dialog/createSheet'
import CreateCategoryDialog from '@/app/pages/dialog/createCategory'
import CreateDashboardDialog from '@/app/pages/dialog/createDashboard'
import CreateCardDialog from './app/pages/dialog/createCard'

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="sheet" element={<Sheet />} />
              <Route path="dashboard/:name" element={<DashboardRenderer dashboardId="1" cards={[]} />} />
            </Route>
          </Routes>
        </BrowserRouter>
        <CreateCardDialog />
        <CreateSheetDialog />
        <CreateCategoryDialog />
        <CreateDashboardDialog />
      </PersistGate>
    </Provider>
  )
}

export default App
