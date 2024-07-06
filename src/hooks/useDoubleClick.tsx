import { useRef, useCallback } from 'react';

export const useDoubleClick = (doubleClick, options = { timeout: 200 }) => {
    const clickTimeout = useRef();

    const clearClickTimeout = () => {
        if (clickTimeout.current) {
            clearTimeout(clickTimeout.current);
            clickTimeout.current = null;
        }
    };

    return useCallback((event) => {
        clearClickTimeout();
        if (event.detail % 2 === 0) {
            doubleClick(event);
        }
    }, [doubleClick, options.timeout]);
};