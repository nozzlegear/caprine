const path = require("path")
const convertToWindowsStore = require('electron-windows-store')
const version = require(path.join(__dirname, "../package.json")).version
const devCertPath = path.join(process.env.APPDATA, "electron-windows-store/nozzlegear", "nozzlegear.pfx")

// Docs: https://github.com/felixrieseberg/electron-windows-store
convertToWindowsStore({
    inputDirectory: 'dist/win-unpacked',
    outputDirectory: 'dist/win-appx',
    flatten: true,
    packageVersion: version + ".0", // Version must be 4 digits
    packageName: 'Caprine',
    packageDescription: 'Elegant Facebook Messenger desktop app',
    assets: 'static/win10',
    deploy: false,
    windowsKit: 'C:/Program Files (x86)/Windows Kits/10/bin/10.0.16299.0/x64', // Download: https://developer.microsoft.com/en-US/windows/downloads/windows-10-sdk
    devCert: devCertPath, // Instructions for creating cert (or just run electron-windows-store from an ELEVATED powershell on first run and abort after cert creation): https://docs.microsoft.com/en-us/windows/uwp/packaging/create-certificate-package-signing
    publisher: 'CN=nozzlegear', // Must match dev cert
    publisherDisplayName: "Nozzlegear Software"
})