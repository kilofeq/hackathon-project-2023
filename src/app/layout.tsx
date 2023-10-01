import "./globals.css";
import type { Metadata } from "next";
import React, { ReactNode } from "react";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";

config.autoAddCss = false;


export const metadata: Metadata = {
  title: "Whistle - Zgłoś znalezionego zwierzaka lub groźne zwierzę w okolicy",
  description: "",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
