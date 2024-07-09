import { create } from 'zustand';
import createSelectors from "./selectors";
import { devtools } from 'zustand/middleware';

interface SideBarState {
    sidebarState: string;
    mediaQuery: string;
    currentView: string;
    isMobile: boolean;
    setCurrentView: (view: string) => void;
}

const sidebarStore = create<SideBarState>()(
    devtools((set) => ({
        sidebarState: 'open',
        mediaQuery: 'largeScreen',
        currentView: '',
        isMobile: false,
        setCurrentView: (view) => set({ currentView: view }),
    }))
);

export const setMediaQuery = (mediaQuery) => sidebarStore.setState({ mediaQuery, isMobile: mediaQuery === 'mobile' });
export const setSidebarState = (sidebarState) => sidebarStore.setState({ sidebarState });

export const toggleSidebar = () => {
    const currentState = sidebarStore.getState();
    let newSidebarState;

    if (currentState.mediaQuery === 'largeScreen') {
        newSidebarState = currentState.sidebarState === 'open' ? 'collapsed' : 'open';
    } 
    else {
        newSidebarState = currentState.sidebarState === 'open' ? 'hidden' : 'open';
    }

    sidebarStore.setState({
        sidebarState: newSidebarState,
    });
};

export const isMobile = () => {
    const { mediaQuery } = sidebarStore.getState();
    return mediaQuery === 'mobile';
};

export const useSideBarStore = createSelectors(sidebarStore);
