import React from "react";
//React Router
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
//Components
import AdminNav from "./AdminNav";
import TextEditor from "./TextEditor";
import CreateMim from "./CreateMim";
import CreateWriter from "./CreateWriter";
import TextList from "./TextList";
import UsersList from "./UsersList";
import MimGallery from "./MimGallery";
import BackToLogin from "./BackToLogin";
import BackToTheTop from '../reusable/BackToTheTop'

export default function AdminLayout({ logOut, user }) {
  const scrollTop = () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera

  };
  return (
    <div>
      <Router>
        <AdminNav logOut={logOut} user={user} />
        <div className="admin-layout">
          <Switch>
            <Route exact path="/">
              <TextEditor user={user} />
            </Route>
            <Route path="/kreiraj-mim">
              <CreateMim />
            </Route>
            <Route path="/kreiraj-pisca">
              {user.role === 1 ? <CreateWriter /> : <BackToLogin logOut={logOut} />}
            </Route>
            <Route path="/lista-tekstova">
            {user.role === 1 ?<TextList />: <BackToLogin logOut={logOut} />}
            </Route>
            <Route path="/lista-pisaca">
            {user.role === 1 ?  <UsersList />: <BackToLogin logOut={logOut} />}
            </Route>
            <Route path="/mimovi">
            {user.role === 1 ?<MimGallery />: <BackToLogin logOut={logOut} />}
            </Route>
          </Switch>
        </div>
        <BackToTheTop scrollTop={scrollTop} />
      </Router>
    </div>
  );
}
