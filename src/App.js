import { Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./components/hooks/ProtectedRoute";
import "./App.scss";
import Login from "./components/admin/Login";
import Dashboard from "./components/admin/Dashboard";
import Questions from "./components/admin/Questions";
import CreateQuestion from "./components/admin/CreateQuestion";
import Question from "./components/admin/Question";
import Home from "./components/Home";
import Session from "./components/Session";

function App() {
	return (
		<Routes>
			<Route path="/admin/login" element={<Login />} />
			<Route path="/" element={<Home />} />
			<Route path="/session/:sessionId" element={<Session />} />
			
			<Route element={ <ProtectedRoute /> }>
				<Route path="/admin" element={<Dashboard />} />
				<Route path="/admin/questions" element={<Questions />} />
				<Route path="/admin/create-question" element={<CreateQuestion />} />
				<Route path="/admin/questions/:id" element={<Question />} />
			</Route>
		</Routes>
	);
}

export default App;
