import React from "react";
import * as WebBrowser from "expo-web-browser";

export const useWarmUpBrowser = () => {
  React.useEffect(() => {
    console.log("Warming up browser...");
    void WebBrowser.warmUpAsync();

    return () => {
      console.log("Cooling down browser...");
      void WebBrowser.coolDownAsync();
    };
  }, []);
};
