// RootLayout.js
'use client';

import "./globals.css";
import store from "@/redux/store/store";
import { Provider } from 'react-redux';
import { InnerProviders } from "./InnerProvider";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <InnerProviders>
            {children}
          </InnerProviders>
        </Provider>
      </body>
    </html>
  );
}


