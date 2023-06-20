import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Wrapper from './layouts/wrapper';
import Login from './pages/login';
import Signup from './pages/signup';
import CreateQuote from './pages/create-quote'
import EditQuote from './pages/edit-quote';
import Homepage from './pages/homepage';
import ProfileSettings from './pages/profile-settings';
import ChangePassword from './pages/change-password';
import ChangePP from './pages/change-profile-picture';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from './interfaces/reducer/User.reducer';
import { GetMe } from './services/Me.service';
import Profile from './pages/profile';
import EditQuoteConfrim from './pages/edit-quote-confirm';
import DeleteQuoteConfrim from './pages/delete-quote-confirm';
import ConfirmDeleteQuote from './pages/confirm-delete-quote';
import ProfilePage from './pages/profile-page';
import ProfileSettingsSaved from './pages/profile-settings-saved';
import PasswordIsChanged from './pages/password-is-changed';
function App() {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const user = useSelector((state: any) => state?.user.value)
  useEffect(() => {
    (async () => {
      const { data } = await GetMe()
      if (data.id) {
        await dispatch(setUser(data))
        setLoading(true)
      }
      setLoading(true)
    })()
  }, [dispatch])


  return (
    !loading ? (<div></div>) :
      <Wrapper>
        <Routes>
          <Route path='*' element={<Homepage />} />
          {!user ? <>
            <Route path='register' element={<Signup />} />
            <Route path='login' element={<Login />} />
          </> : <>
            <Route path='settings' element={<ProfileSettings />}>

            </Route>
            <Route path='password' element={<ChangePassword />} />
            <Route path='profile' element={<Profile />} />
            <Route path='avatar' element={<ChangePP />} />
            <Route path='myquote' element={<CreateQuote />} />
            <Route path='myquote/:id' element={<EditQuote />} />
            <Route path='profile-settings-saved' element={<ProfileSettingsSaved />} />
            <Route path='passwordischanged' element={<PasswordIsChanged />} />
            
            <Route path='profile-page/:id' element={<ProfilePage />} />
            <Route path='deletequote/:id' element={<ConfirmDeleteQuote />} />
            <Route path='profile' element={<></>} />
            <Route path='edit-quote-confirm' element={<EditQuoteConfrim/>}></Route>
            <Route path='delete-quote-confirm' element={<DeleteQuoteConfrim />} />
          </>}
        </Routes>

      </Wrapper>
  );
}

export default App;
