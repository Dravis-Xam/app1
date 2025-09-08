"use client";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { Suspense, lazy } from "react";
import LoadingCircle from "../src/components/loadingcircle.general";
import ErrorBoundary from "./app.errorboundary";
import { ErrorModal } from "../src/components/modals.general";
import ProtectedRoute from "./app.protected";

// Lazy-loaded pages
const HomeScreen = lazy(() => import("../src/pagination/home.screen"));
const LoginScreen = lazy(() => import("../src/pagination/login.screen"));
const SignupScreen = lazy(() => import("../src/pagination/signup.screen"));
const NotFoundScreen = lazy(() => import("../src/pagination/404notfound.screen"));
const DashboardScreen = lazy(() => import("../src/pagination/dashboard.screen"));
const DashboardOverviewScreen = lazy(
  () => import("../src/pagination/dashboard.screens/dashboard.overview.screen")
);
const DashboardSettingsScreen = lazy(
  () => import("../src/pagination/dashboard.screens/dashboard.settings.screen")
);

type AppRoute = {
  path: string;
  element: React.ReactNode;
  children?: AppRoute[];
};

const routes: AppRoute[] = [
  { path: "/", element: <HomeScreen /> },
  { path: "/login", element: <LoginScreen /> },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashboardScreen />
      </ProtectedRoute>
    ),
    children: [
      { path: "overview", element: <DashboardOverviewScreen /> },
      { path: "settings", element: <DashboardSettingsScreen /> },
    ],
  },
  { path: "/signup", element: <SignupScreen /> },
  { path: "*", element: <NotFoundScreen /> },
];

export default function AppRouter() {
  return (
    <Router>
      <ErrorBoundary
        fallback={
          <ErrorModal
            show={true}
            error="Something went wrong. Please try again later."
            onClose={() => {}}
          />
        }
      >
        <Suspense fallback={<LoadingCircle />}>
          <Routes>
            {routes.map(({ path, element, children }, idx) => (
              children && children.length > 0 ? (
                <Route key={idx} path={path} element={element}>
                  {children.map(({ path: childPath, element: childEl }, cIdx) => (
                    <Route key={cIdx} path={childPath} element={childEl} />
                  ))}
                </Route>
              ) : (
                <Route key={idx} path={path} element={element} />
              )
            ))}
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </Router>
  );
}
