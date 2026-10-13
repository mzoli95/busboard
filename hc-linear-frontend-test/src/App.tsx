import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./component/navbar/Navbar";
import Task from "./page/task/Task";
import { APP_ROUTES } from "./config/routes";

const BusCrud = lazy(() => import("./page/busCrud/BusCrud"));
const Board = lazy(() => import("./page/board/Board"));

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Suspense
        fallback={
          <div role="status" style={{ color: "white", padding: 24 }}>
            Oldal betöltése...
          </div>
        }
      >
        <Routes>
          <Route path={APP_ROUTES.TASK} element={<Task />} />
          <Route path={APP_ROUTES.BUS_CRUD} element={<BusCrud />} />
          <Route path={APP_ROUTES.BOARD} element={<Board />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
