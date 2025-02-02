
import './App.css'
import store from './components/global_state/redux/store'
import { RouterProvider } from 'react-router'
import { router } from './router'
import { Provider } from 'react-redux'

function App() {

  return (
    <>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </>
  )
}

export default App
