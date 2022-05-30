import {ethers} from 'ethers';
export const getUserAgent = () => {
    const userAgent = navigator.userAgent;
    const isEdge = userAgent.indexOf("Edge") > -1; // Edge
    const isFF = userAgent.indexOf("Firefox") > -1; // Firefo
    const isChrome = userAgent.indexOf("Chrome") > -1
        && userAgent.indexOf("Safari") > -1; // Chrome
    if (isChrome || isEdge || isFF) {
        return true
    } else {
        return false
    }
}
export const getProcessJudge = () => {
    // Browser compliant
    if (!getUserAgent()) {
        // A browser popup will appear if you do not match the browser
        return 'BrowserModal'
    }
    // No little fox will appear little fox download popover
    if (!window?.ethereum || !window.ethereum?.isMetaMask) {
        return 'MetaMaskModal';
    }
    return false
}
