import '@/styles/globals.css'
import GoogleAnalytics from "../components/GoogleAnalytics"

export default function App({ Component, pageProps }) {
  return (
  <>
  {process.env.NEXT_PUBLIC_GA_TRACKING_ID && <GoogleAnalytics GA_TRACKING_ID={process.env.NEXT_PUBLIC_GA_TRACKING_ID} />}
  <Component {...pageProps} />
  </>
  );
}
