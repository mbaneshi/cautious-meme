import type {Manifest} from 'webextension-polyfill';

import pkg from '../package.json';
import {__DEV__} from '../server/utils/constants';

const manifest: Manifest.WebExtensionManifest = {
    name: pkg.displayName,
    version: pkg.version,
    description: pkg.description,
    manifest_version: 3,
    minimum_chrome_version: pkg.browserslist[0]?.split(' ')[2],
    host_permissions: [
        "http://api.m.taobao.com/rest/api3.do?api=mtop.common.getTimestamp",
    ],
    permissions: [
        "tabs",
        "declarativeContent",
        "storage",
        "notifications"
    ],
    content_security_policy: {
        extension_pages: "script-src 'self' 'wasm-unsafe-eval'; object-src 'self';",
    },
    web_accessible_resources: [
        {
            matches: ['<all_urls>'],
            resources: ['icons/*', 'images/*', 'fonts/*'],
        },
    ],
    background: {
        service_worker: 'js/background.js',
    },
    content_scripts: [
        {
            matches: ['https://github.com/*'],
            css: ['css/all.css'],
            js: ['js/all.js', ...(__DEV__ ? [] : [])],
            run_at: "document_end"
        },
    ],
    action: {
        default_popup: 'popup.html',
        default_icon: {
            '16': 'icons/extension-icon-x16.png',
            '32': 'icons/extension-icon-x32.png',
            '48': 'icons/extension-icon-x48.png',
            '128': 'icons/extension-icon-x128.png',
        },
    },
    options_ui: {
        page: 'options.html',
        open_in_tab: true,
    },
    icons: {
        '16': 'icons/extension-icon-x16.png',
        '32': 'icons/extension-icon-x32.png',
        '48': 'icons/extension-icon-x48.png',
        '128': 'icons/extension-icon-x128.png',
    },
};

export default manifest;
