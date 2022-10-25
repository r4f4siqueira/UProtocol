import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CssVarsProvider } from '@mui/joy/styles';

import { GlobalStyle } from './styles/global';
import RoutesApp from './routes/routes';
import AuthProvider from './context/auth.tsx';

import { store } from './store/store';
import { Provider } from 'react-redux';

function App() {
    return (
        <Provider store={store}>
            <AuthProvider>
                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="colored"
                />
                <GlobalStyle />
                <CssVarsProvider>
                    <RoutesApp />
                </CssVarsProvider>
            </AuthProvider>
        </Provider>
    );
}

export default App;
