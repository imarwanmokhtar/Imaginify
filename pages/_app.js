import Script from "next/script";

function MyApp({ Component, pageProps }) {
  return (
    <>
      {/* Google Tag Manager Script */}
      <Script
        id="google-tag-manager"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id=GTM-PJVHRGGF'+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-PJVHRGGF');
          `,
        }}
      />

      {/* Google Tag Manager NoScript */}
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-PJVHRGGF"
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>

      <Component {...pageProps} />
    </>
  );
}

export default MyApp; 