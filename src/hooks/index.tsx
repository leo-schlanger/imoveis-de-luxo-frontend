import { AuthProvider } from './auth';
import { ToastProvider } from './toast';
import { PlansProvider } from './plans';
import ApolloProvider from './apollo';

const AppProvider: React.FC = ({ children }) => (
  <ApolloProvider>
    <PlansProvider>
      <AuthProvider>
        <ToastProvider>{children}</ToastProvider>
      </AuthProvider>
    </PlansProvider>
  </ApolloProvider>
);

export default AppProvider;
