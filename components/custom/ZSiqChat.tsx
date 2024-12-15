'use client';

import Script from 'next/script';

export default function ZSiqChat() {
  return (
    <Script
      id="zsiqchat"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          var $zoho = $zoho || {};
          $zoho.salesiq = $zoho.salesiq || {
            widgetcode: "siq0f2c4bc958b00772d4b9b90a03f6408ed35057f7dc0df1f1baf13a4850247d03",
            values: {},
            ready: function() {}
          };
          var d = document;
          var s = d.createElement("script");
          s.type = "text/javascript";
          s.id = "zsiqscript";
          s.defer = true;
          s.src = "https://salesiq.zohopublic.com/widget";
          var t = d.getElementsByTagName("script")[0];
          t.parentNode?.insertBefore(s, t);
        `,
      }}
    />
  );
}
