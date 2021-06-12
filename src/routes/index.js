import { lazy } from "react";

const Home = lazy(() => import("../sections/Home"));
const Particles = lazy(() => import("../sections/Particles"));
const Video = lazy(() => import("../sections/Video"));
const Second = lazy(() => import("../sections/Second"));
const Standviewer = lazy(() => import("../sections/Standviewer"));

const routes = [
  {
    path: "/",
    component: Home,
    title: "Home",
  },
  {
    path: "/particles",
    component: Particles,
    title: "Particles",
  },
  {
    path: "/video",
    component: Video,
    title: "Video",
  },
  {
    path: "/second",
    component: Second,
    title: "Second",
  },
  {
    path: "/stand-viewer",
    component: Standviewer,
    title: "Standviewer",
  },
];

export default routes;
