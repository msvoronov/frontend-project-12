import { useContext } from 'react';
import ApiContext from '../contexts/ApiContext.js';

const useApi = () => useContext(ApiContext);

export default useApi;
