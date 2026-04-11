import { faGoogle, faMicrosoft, faGithub } from "@fortawesome/free-brands-svg-icons";
import { 
    faCircleQuestion, 
    faEnvelope, 
    faTabletButton, 
    faMobileButton, 
    faLaptop, 
    faComputer 
} from "@fortawesome/free-solid-svg-icons";

// Helper function to format login method with icon
export const formatLoginMethod = (method: string) => {
    const methodLower = method.toLowerCase();
    let icon: any = faCircleQuestion;
    let label = method;
    if (methodLower.includes('google')) {
        icon = faGoogle;
        label = 'Google';
    } else if (methodLower.includes('microsoft') || methodLower.includes('azure')) {
        icon = faMicrosoft;
        label = 'Microsoft';
    } else if (methodLower.includes('github')) {
        icon = faGithub;
        label = 'GitHub';
    } else if (methodLower.includes('email') || methodLower.includes('password')) {
        icon = faEnvelope;
        label = 'Email';
    }

    return { icon, label };
};

// Helper function to parse user agent and return device info
export const parseUserAgent = (userAgent: string) => {
    let deviceType: any;
    let deviceName: string;

    // Check for mobile devices
    if (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase())) {
        if (/ipad/i.test(userAgent.toLowerCase()) || /tablet/i.test(userAgent.toLowerCase())) {
            deviceType = faTabletButton;
            deviceName = 'Tablet';
        } else {
            deviceType = faMobileButton;
            deviceName = 'Mobile';
        }
    } else {
        // Desktop/laptop detection
        deviceType = /macintosh|mac os x/i.test(userAgent) ? faLaptop : faComputer;
        deviceName = /macintosh|mac os x/i.test(userAgent) ? 'Mac' : 'PC';
    }

    // Get browser info
    let browserInfo = 'Unknown Browser';
    if (/chrome/i.test(userAgent) && !/chromium|edg/i.test(userAgent)) {
        browserInfo = 'Chrome';
    } else if (/firefox/i.test(userAgent)) {
        browserInfo = 'Firefox';
    } else if (/safari/i.test(userAgent) && !/chrome|chromium|edg/i.test(userAgent)) {
        browserInfo = 'Safari';
    } else if (/edg/i.test(userAgent)) {
        browserInfo = 'Edge';
    } else if (/opera|opr/i.test(userAgent)) {
        browserInfo = 'Opera';
    }

    // Get OS info
    let osInfo = 'Unknown OS';
    if (/windows/i.test(userAgent)) {
        osInfo = 'Windows';
    } else if (/macintosh|mac os x/i.test(userAgent)) {
        osInfo = 'macOS';
    } else if (/android/i.test(userAgent)) {
        osInfo = 'Android';
    } else if (/linux/i.test(userAgent)) {
        osInfo = 'Linux';
    } else if (/iphone|ipad|ipod/i.test(userAgent)) {
        osInfo = 'iOS';
    }

    return {
        deviceType,
        deviceName,
        browserInfo,
        osInfo,
        fullInfo: `${browserInfo} on ${osInfo} (${deviceName})`
    };
};