import { Routes, Route} from 'react-router-dom';
import Coins from './components/Coins';
import ExchangeRate from './components/ExchangeRate';
import { SignIn } from './components/SignIn';


const App = () => {
  return (
    <Routes>
    <Route path="/" element={<Coins/>} />
    <Route path="/exchangerate" element={<ExchangeRate/>} />
    <Route path="/exchangerate" element={<ExchangeRate/>} />
    <Route path="/SignIn" element={<SignIn/>} />
    <Route path="/Sign" element={<SignIn/>} />
</Routes>
  )
}

export default App