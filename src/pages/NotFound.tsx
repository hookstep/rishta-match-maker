import { useLocation } from "react-router-dom";
import { useEffect, useLayoutEffect } from "react";
import { applyPageSeo } from "@/lib/seo";
import { siteName } from "@/lib/site";

const NotFound = () => {
  const location = useLocation();

  useLayoutEffect(() => {
    applyPageSeo({
      title: `Page not found — ${siteName}`,
      description: "The page you requested does not exist.",
      noindex: true,
      omitCanonical: true,
    });
  }, [location.pathname]);

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">Oops! Page not found</p>
        <a href="/" className="text-primary underline hover:text-primary/90">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
