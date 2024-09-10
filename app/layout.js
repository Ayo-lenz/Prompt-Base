import "@styles/globals.css";
import Nav from '@components/Nav'
import Provider from '@components/Provider'


export const metadata = {
  title: "Promptopia",
  description: "Discover & Share AI Prompts",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className = 'main'>
            <div className= 'gradient'></div>
          </div>

          <main className='app'>
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
}
/*
  -----
    The reason we are calling the navigation bar from within here 
    is because we want to re-use it across all of our 
    pages which is exactly while the layout.js is for

    Also to use the provider component we wrap the component around our
    content in our body element
*/