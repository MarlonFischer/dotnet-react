import React, { useEffect, Fragment, useContext, FC } from "react";
import { Container } from "semantic-ui-react";
import NavBar from "../../features/Nav/NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { LoadingComponent } from "./LoadingComponent";
import ActivityStore from "../stores/activityStore";
import { observer } from "mobx-react-lite";
import { Route, withRouter, RouteComponentProps } from "react-router-dom";
import { HomePage } from "../../features/activities/home/HomePage";
import ActivityForm from "../../features/activities/form/ActivityForm";
import ActivityDetails from "../../features/activities/details/ActivityDetails";

const App: FC<RouteComponentProps> = ({location}) => {
  const activityStore = useContext(ActivityStore);

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  if (activityStore.loadingInitial)
    return <LoadingComponent inverted={true} content="Loading activities..." />;

  return (
    <Fragment>
      <Route exact path="/" component={HomePage} />
      <Route path={'/(.+)'} render={() => (
        <Fragment>
          <NavBar />
          <Container style={{ marginTop: "7em" }}>
            <Route exact path="/activities" component={ActivityDashboard} />
            <Route path="/activities/:id" component={ActivityDetails} />
            <Route
              path={["/create", "/manage/:id"]}
              component={ActivityForm}
              key={location.key}
            />
          </Container>
        </Fragment>
      )}/>
    </Fragment>
  );
};

export default withRouter(observer(App));
