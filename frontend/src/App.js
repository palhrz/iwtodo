import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import HomePage from './components/Home';
import SignUpPage from './components/SignUp';
import TodoApp from './components/ToDoApp'; // Assuming your existing Todo app component is now named TodoApp

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/todo" element={<TodoApp />} />
      </Routes>
    </Router>
  );
};
export default App;
