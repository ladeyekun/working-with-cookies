'use strict';

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
const MAX_AGE = 15;

listen('load', window, () => {
    if (!isCookiesStored()){
        showCookiesDialog();
    }
});

listen('click', settingsBtn, () =>{
    toggleOn();
    showSettingsDialog();
});

listen('click', acceptAllBtn, () => {
    closeDialogs();
    toggleOn();
    setCookies();
});

listen('click', saveBtn, () => {
    closeDialogs();
    setCookies();
});

function toggleOn() {
    browser.checked = true;
    os.checked = true;
    width.checked = true;
    height.checked = true;
}

function showCookiesDialog() {
    setTimeout(() => {
        cookiesDialog.style.display = 'grid';
        settingsDialog.style.display = 'none';
    }, 1000);
}

function showSettingsDialog() {
    cookiesDialog.style.display = 'none';
    settingsDialog.style.display = 'grid';
}

function closeDialogs() {
    cookiesDialog.style.display = 'none';
    settingsDialog.style.display = 'none';
}

function isCookiesStored() {
    if (navigator.cookieEnabled) {
        if (document.cookie.split('; ').length > 1) {
            return true;
        }
    }
    return false;
}

function setCookie(name, value) {
    let str= '';
    str += `${encodeURIComponent(name)}=${encodeURIComponent(value)}; `;
    str = str + `path=/; max-age=${MAX_AGE};`;
    str = str + `secure; SameSite=Lax`;
    document.cookie = str;
}

function getCookie(name) {
    if (document.cookie.split('; ') > 1) {
        decodedCookies = decodeURIComponent(document.cookie);
        const cookies = decodedCookies.split('; ');
        for (const cookie of cookies){
            const np = cookie.split('=');
            if (name === np[0]) return np[1];
        }
    }
    return '';
}

function setCookies() {

    let browserName = browser.checked ? getBrowserName() : 'rejected';
    let osName = os.checked ? getOS() : 'rejected';
    let widthSize = width.checked ? getWidth() : 'rejected';
    let heightSize = height.checked ? getHeight() : 'rejected';

    setCookie('browser', browserName);
    setCookie('os', osName);
    setCookie('width', widthSize);
    setCookie('height', heightSize);
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

console.log(document.cookie);

