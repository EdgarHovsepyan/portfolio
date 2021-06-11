import { lazy } from "react";

const Home = lazy(() => import("../sections/Home"));
const Particles = lazy(() => import("../sections/Particles"));
const Video = lazy(() => import("../sections/Video"));
const Second = lazy(() => import("../sections/Second"));

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
];

export default routes;
