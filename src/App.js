import React,{Suspense, lazy} from "react"
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"

const Private = lazy(() => import('./components/routing/Private'));
const PrivateScreen = lazy(() => import('./components/screens/PrivateScreen'));
const LoginScreen = lazy(() => import('./components/screens/LoginScreen'));
const RegisterScreen = lazy(() => import('./components/screens/RegisterScreen'));
const ForgotPasswordScreen = lazy(() => import('./components/screens/ForgotPasswordScreen'));
const ResetPasswordScreen = lazy(() => import('./components/screens/ResetPasswordScreen'));
const HomePage = lazy(() => import('./components/screens/HomePage'));
const CheckoutBooks = lazy(() => import('./components/screens/CheckoutBooks'));
const CheckDeadlines = lazy(() => import('./components/screens/CheckDeadlines'));
const History = lazy(() => import('./components/screens/History'));
const ViewBooks = lazy(() => import('./components/screens/ViewBooks'));
const EachBook = lazy(() => import('./components/screens/Tools/books/EachBook'));
const FourOFourPage = lazy(() =>import('./components/screens/FourOFourPage'));


function App() {
  return (
    <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <div className="App">
        <Switch>
          <Route exact path="/login" component={LoginScreen}/>
          <Private exact path="/" component={PrivateScreen} />
          <Private exact path="/home" component={HomePage}/>
          <Private path ="/home/:id" component = {EachBook}/>
          <Private exact path="/viewbooks" component={ViewBooks}/>
          <Private exact path="/checkoutbooks" component={CheckoutBooks}/>
          <Private exact path="/checkdeadlines" component={CheckDeadlines}/>
          <Private exact path="/history" component={History}/>
          <Route exact path="/register" component={RegisterScreen}/>
          <Route exact path="/forgotpassword" component={ForgotPasswordScreen}/>
          <Route exact path="/resetpassword/:resetToken" component={ResetPasswordScreen}/>
          <Route path = "" component={FourOFourPage}/>

        </Switch>
      </div>
      </Suspense>
    </Router>
  );
}

export default App;
