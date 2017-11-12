const path = require("path")
const convertToWindowsStore = require('electron-windows-store')
const version = require(path.join(__dirname, "../package.json")).version

// Create a development certificate (or use one that's already created): https://docs.microsoft.com/en-us/windows/uwp/packaging/create-certificate-package-signing
// This certificate MUST be installed to the Trusted Root Certification Authorities section of the Certificates management area. Type "Certificates" into Cortana to open that.
// Once installed, export the certificate to the destination specified below by right clicking the certificate -> All Tasks -> Export. You'll need to export it as a PFX with the password.

// The following downloads are needed for conversion. Make sure you update the paths below if necessary.
// Download Windows 10 SDK: https://developer.microsoft.com/en-US/windows/downloads/windows-10-sdk
// Download Windows 10 BaseImage (***must match SDK version***): https://www.microsoft.com/en-us/download/details.aspx?id=56049
// Download DesktopAppConverter: https://www.microsoft.com/en-us/store/p/desktop-app-converter/9nblggh4skzw

const password = process.env.WINSTORE_CERT_PASSWORD

if (!password) {
	throw `WINSTORE_CERT_PASSWORD env variable not found.`
}

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
	publisher: 'CN=nozzlegear', // MUST match dev cert
	publisherDisplayName: "Nozzlegear Software",
	windowsKit: 'C:/Program Files (x86)/Windows Kits/10/bin/10.0.16299.0/x64',
	desktopConverter: path.join(process.env.APPDATA, "../Local/Microsoft/WindowsApps/DesktopAppConverter.exe"),
	expandedBaseImage: path.join(process.env.USERPROFILE, 'base_images/BaseImage-16299.wim'),
	devCert: path.join(process.env.USERPROFILE, "certs/nozzlegear_winstore.pfx"),
	signtoolParams: ["/p", password],
})
