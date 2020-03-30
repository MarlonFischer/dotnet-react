import React, { Fragment, FC } from "react";
import { Container } from "semantic-ui-react";
import NavBar from "../../features/Nav/NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { observer } from "mobx-react-lite";
import {
  Route,
  withRouter,
  RouteComponentProps,
  Switch
} from "react-router-dom";
import { HomePage } from "../../features/activities/home/HomePage";
import { ToastContainer, toast } from "react-toastify";
import ActivityForm from "../../features/activities/form/ActivityForm";
import ActivityDetails from "../../features/activities/details/ActivityDetails";
import NotFound from "./NotFound";

const App: FC<RouteComponentProps> = ({ location }) => {
  return (
    <Fragment>
      <ToastContainer position={toast.POSITION.BOTTOM_RIGHT}/>
        <Route exact path="/" component={HomePage} />
        <Route
          path={"/(.+)"}
          render={() => (
            <Fragment>
              <NavBar />
              <Container style={{ marginTop: "7em" }}>
                <Switch>
                  <Route
                    exact
                    path="/activities"
                    component={ActivityDashboard}
                  />
                  <Route path="/activities/:id" component={ActivityDetails} />
                  <Route
                    path={["/create", "/manage/:id"]}
                    component={ActivityForm}
                    key={location.key}
                  />
                  <Route component={NotFound} />
                </Switch>
              </Container>
            </Fragment>
          )}
        />
    </Fragment>
  );
};

export default withRouter(observer(App));
