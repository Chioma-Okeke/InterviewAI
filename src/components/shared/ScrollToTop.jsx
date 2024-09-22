import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
    console.log('ScrollToTop rendered');
    const { pathname } = useLocation();
    console.log(pathname, "new pathname")

    useEffect(() => {
        window.scroll(0, 0);
    }, [pathname]);

    return null;
}

export default ScrollToTop;
