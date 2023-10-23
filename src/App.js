import { Routes, Route} from 'react-router-dom';
import Coins from './components/Coins';
import ExchangeRate from './components/ExchangeRate';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import Navigation from './components/navigation';

const App = () => {



  return (
    <>
<Navigation />
    <Routes>
    <Route path="/" element={<Coins/>} />
    <Route path="/exchangerate" element={<ExchangeRate/>} />
    <Route path="/SignIn" element={<SignIn/>} />
    <Route path="/SignUp" element={<SignUp/>} />
</Routes>
    </>
  )
}

export default App