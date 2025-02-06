import ReactDOM from 'react-dom/client';
import init from './init.jsx';

const app = () => {
  const root = ReactDOM.createRoot(document.querySelector('#chat'));
  root.render(init());
};

app();
