import React from 'react'
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import { interpolatePath } from './router/linkHelpers'
import type {
  RouteDefinitionsToRoutes,
  OptionalRouteOptions,
  ParamValue,
} from './router/types'
import App from './ext-src/App'

import createAuthRequiredPage from "./auth/pages/createAuthRequiredPage"

import LandingPage from './ext-src/landing-page/LandingPage'
import LoginPage from './ext-src/auth/LoginPage'
import { Signup as SignupPage } from './ext-src/auth/SignupPage'
import DemoAppPage from './ext-src/app/DemoAppPage'
import PricingPage from './ext-src/app/PricingPage'
import AccountPage from './ext-src/app/AccountPage'
import CheckoutPage from './ext-src/app/CheckoutPage'
import DashboardPage from './ext-src/admin/pages/DashboardPage'
import AdminUsersPage from './ext-src/admin/pages/Users'
import AdminSettingsPage from './ext-src/admin/pages/Settings'
import AdminChartsPage from './ext-src/admin/pages/Chart'
import AdminMessagesPage from './ext-src/admin/pages/Messages'
import AdminFormElementsPage from './ext-src/admin/pages/Form/FormElements'
import AdminFormLayoutsPage from './ext-src/admin/pages/Form/FormLayout'
import AdminCalendarPage from './ext-src/admin/pages/Calendar'
import AdminUIAlertsPage from './ext-src/admin/pages/UiElements/Alerts'
import AdminUIButtonsPage from './ext-src/admin/pages/UiElements/Buttons'

import OAuthCodeExchange from "./auth/pages/OAuthCodeExchange"

export const routes = {
  LandingPageRoute: {
    to: "/",
    component: LandingPage,
    build: (
      options?: OptionalRouteOptions,
    ) => interpolatePath("/", undefined, options.search, options.hash),
  },
  LoginRoute: {
    to: "/login",
    component: LoginPage,
    build: (
      options?: OptionalRouteOptions,
    ) => interpolatePath("/login", undefined, options.search, options.hash),
  },
  SignupRoute: {
    to: "/signup",
    component: SignupPage,
    build: (
      options?: OptionalRouteOptions,
    ) => interpolatePath("/signup", undefined, options.search, options.hash),
  },
  DemoAppRoute: {
    to: "/demo-app",
    component: createAuthRequiredPage(DemoAppPage),
    build: (
      options?: OptionalRouteOptions,
    ) => interpolatePath("/demo-app", undefined, options.search, options.hash),
  },
  PricingPageRoute: {
    to: "/pricing",
    component: PricingPage,
    build: (
      options?: OptionalRouteOptions,
    ) => interpolatePath("/pricing", undefined, options.search, options.hash),
  },
  AccountRoute: {
    to: "/account",
    component: createAuthRequiredPage(AccountPage),
    build: (
      options?: OptionalRouteOptions,
    ) => interpolatePath("/account", undefined, options.search, options.hash),
  },
  CheckoutRoute: {
    to: "/checkout",
    component: createAuthRequiredPage(CheckoutPage),
    build: (
      options?: OptionalRouteOptions,
    ) => interpolatePath("/checkout", undefined, options.search, options.hash),
  },
  AdminRoute: {
    to: "/admin",
    component: createAuthRequiredPage(DashboardPage),
    build: (
      options?: OptionalRouteOptions,
    ) => interpolatePath("/admin", undefined, options.search, options.hash),
  },
  AdminUsersRoute: {
    to: "/admin/users",
    component: createAuthRequiredPage(AdminUsersPage),
    build: (
      options?: OptionalRouteOptions,
    ) => interpolatePath("/admin/users", undefined, options.search, options.hash),
  },
  AdminSettingsRoute: {
    to: "/admin/settings",
    component: createAuthRequiredPage(AdminSettingsPage),
    build: (
      options?: OptionalRouteOptions,
    ) => interpolatePath("/admin/settings", undefined, options.search, options.hash),
  },
  AdminChartsRoute: {
    to: "/admin/chart",
    component: createAuthRequiredPage(AdminChartsPage),
    build: (
      options?: OptionalRouteOptions,
    ) => interpolatePath("/admin/chart", undefined, options.search, options.hash),
  },
  AdminMessagesRoute: {
    to: "/admin/messages",
    component: createAuthRequiredPage(AdminMessagesPage),
    build: (
      options?: OptionalRouteOptions,
    ) => interpolatePath("/admin/messages", undefined, options.search, options.hash),
  },
  AdminFormElementsRoute: {
    to: "/admin/forms/form-elements",
    component: createAuthRequiredPage(AdminFormElementsPage),
    build: (
      options?: OptionalRouteOptions,
    ) => interpolatePath("/admin/forms/form-elements", undefined, options.search, options.hash),
  },
  AdminFormLayoutsRoute: {
    to: "/admin/forms/form-layouts",
    component: createAuthRequiredPage(AdminFormLayoutsPage),
    build: (
      options?: OptionalRouteOptions,
    ) => interpolatePath("/admin/forms/form-layouts", undefined, options.search, options.hash),
  },
  AdminCalendarRoute: {
    to: "/admin/calendar",
    component: createAuthRequiredPage(AdminCalendarPage),
    build: (
      options?: OptionalRouteOptions,
    ) => interpolatePath("/admin/calendar", undefined, options.search, options.hash),
  },
  AdminUIAlertsRoute: {
    to: "/admin/ui/alerts",
    component: createAuthRequiredPage(AdminUIAlertsPage),
    build: (
      options?: OptionalRouteOptions,
    ) => interpolatePath("/admin/ui/alerts", undefined, options.search, options.hash),
  },
  AdminUIButtonsRoute: {
    to: "/admin/ui/buttons",
    component: createAuthRequiredPage(AdminUIButtonsPage),
    build: (
      options?: OptionalRouteOptions,
    ) => interpolatePath("/admin/ui/buttons", undefined, options.search, options.hash),
  },
} as const;

export type Routes = RouteDefinitionsToRoutes<typeof routes>

const router = (
  <Router basename="/">
    <App>
    <Switch>
      {Object.entries(routes).map(([routeKey, route]) => (
        <Route
          exact
          key={routeKey}
          path={route.to}
          component={route.component}
        />
      ))}
      <Route exact path="/auth/login/google">
        <OAuthCodeExchange pathToApiServerRouteHandlingOauthRedirect="/auth/google/callback" />
      </Route>
    </Switch>
    </App>
  </Router>
)

export default router

export { Link } from './router/Link'
