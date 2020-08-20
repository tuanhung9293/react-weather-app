import { useEffect, useCallback } from 'react';

export const useClickOutsideEffect = (refObject: React.RefObject<any>, effect: () => void) => {
    const handleClickOutsideSearch = useCallback((event: any) => {
        if (refObject && !refObject.current?.contains(event.target)) {
            effect();
        }
    }, [refObject, effect]);

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutsideSearch)
        return () => document.removeEventListener('mousedown', handleClickOutsideSearch);
    }, [handleClickOutsideSearch])
}