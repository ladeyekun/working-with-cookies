import {select, listen} from "./util.js";

const cookiesDialog = select('.cookies');
const settingsDialog = select('.settings');
const acceptAllBtn = select('.accept');
const settingsBtn = select('.setting-btn');
const browser = select('.browser');
const os = select('.os');
const width = select('.width');
const height = select('.height');
const saveBtn = select('.save');

listen('load', window, () => {
    if (!document.cookie.length > 0){
        showCookiesDialog();
    }
});

listen('click', settingsBtn, () =>{
    showSettingsDialog();
});

listen('click', saveBtn, () => {
    console.log(getSettings());
});

function showCookiesDialog() {
    cookiesDialog.style.display = 'grid';
    settingsDialog.style.display = 'none';
}

function showSettingsDialog() {
    cookiesDialog.style.display = 'none';
    settingsDialog.style.display = 'grid';
}

function getSettings() {
    return {
        "browser": browser.checked,
        "os": os.checked,
        "width": width.checked,
        "height": height.checked    
    }
}

function getBrowserName() {
    const userAgent = navigator.userAgent.toLowerCase();
    let browser = '';
    if (userAgent.includes('opera') || userAgent.includes('opr')) {
        browser = 'Opera';
    } else if (userAgent.includes('edg')) {
        browser = 'Edge';
    } else if (userAgent.includes('chrome')) {
        browser = 'Chrome';
    } else if (userAgent.includes('safari')) {
        browser = 'Safari';
    } else if (userAgent.includes('firefox')) {
        browser = 'Firefox'
    } else {
        browser = 'unknown'
    }
    
    return browser;
}

function getOS() {
    const userAgent = navigator.userAgent;
    if ((/iPad|iPhone|iPod/.test(userAgent)) || (userAgent.includes('Mac') 
        && 'ontouchend' in document)) return 'iOS';

    const os = ['Windows', 'Android', 'Unix', 'Mac', 'Linux', 'Blackberry'];
    for (let i = 0; i < os.length; i++) {
        if (new RegExp(os[i], 'i').test(userAgent)) return os[i];
    }

    return 'unknown';
}

function getWidth() {
    return window.innerWidth;
}

function getHeight() {
    return window.innerHeight;
}

function setCookie(name, value, expire) {

}

function getCookie() {

}

