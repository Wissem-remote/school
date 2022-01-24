import React from 'react'
import {Routes,Route} from "react-router-dom";
import  {Iden}  from './admin/login'
import { QueryClient, QueryClientProvider} from 'react-query'
import { Logins } from './admin/connect';
import { Home } from './Home/home';
import { Sign } from './Home/sign-up';
import { Signx } from './Home/signs';
import { Signin } from './Home/sign-in';
import { User } from './client/user'
import { Forma } from './Home/formation';
import { Check} from './admin/forma'
import { Menu } from './Home/nos-form'



const queryClient = new QueryClient()




function App() {
   

   return<>
   <QueryClientProvider client={queryClient}>
   
   <Routes>
   
   <Route path="/" element={<Home  />} />
   <Route path="/inscrit" element={<Signx  />} />
   <Route path="/sign-up" element={<Sign  />} />
   <Route path="/sign-in" element={<Signin  />} />
      <Route path="/admin" element={<Iden />} />
      <Route path="/admin/connect" element={<Logins />} />
      <Route path="/user" element={<User />} />
      <Route path="/coures" element={<Forma />}/>
      <Route path="/admin/check" element={<Check />}/>
      <Route path="/formation/:id" element={<Menu />}/>

   </Routes>
   
   </QueryClientProvider>
   </>
   
}

export default App;
