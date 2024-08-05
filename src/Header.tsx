import React from 'react';
import { Link } from 'react-router-dom';

// import { Container } from './styles';

const Header: React.FC = () => {
  return <div className="h-7 bg-slate-100 flex gap-4">
    <Link to="/">Home</Link>
    <Link to="/todos">Todos</Link>
    <Link to="/posts">Posts</Link>
  </div>; 
}

export default Header;