
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollManager() {
    const location = useLocation();

    useEffect(() => {
        // Avvalgi scroll pozitsiyasini olish
        const savedScroll = sessionStorage.getItem(`scroll-${location.pathname}`);
        if (savedScroll) {
            window.scrollTo(0, parseInt(savedScroll, 10));
        }

        // Har safar scrollni saqlab borish
        const saveScroll = () => {
            sessionStorage.setItem(`scroll-${location.pathname}`, window.scrollY);
        };

        window.addEventListener("scroll", saveScroll);
        return () => {
            window.removeEventListener("scroll", saveScroll);
        };
    }, [location]);

    return null;
}

export default ScrollManager;
