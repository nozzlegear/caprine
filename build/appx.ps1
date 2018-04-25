$desktopConverter = "$ENV:APPDATA/../Local/Microsoft/WindowsApps/DesktopAppConverter.exe"
$windowsKit = "C:/Program Files (x86)/Windows Kits/10/bin/10.0.16299.0/x64"
$expandedBaseImage = "$HOME/base_images/BaseImage-16299.wim"
$devCert = "$HOME/certs/nozzlegear_windev_CN=47958F3E-04D3-4EFC-B249-2D204C942350.pfx"
$version = "$(cat package.json | jq .version -r).0"
$password = "$ENV:WINSTORE_CERT_PASSWORD"

# Create a development certificate (or use one that's already created): https://docs.microsoft.com/en-us/windows/uwp/packaging/create-certificate-package-signing
# This certificate MUST be installed to the Trusted Root Certification Authorities section of the Certificates management area. Type "Certificates" into Cortana to open that.
# Once installed, export the certificate to the destination specified below by right clicking the certificate -> All Tasks -> Export. You'll need to export it as a PFX with the password.

# The following downloads are needed for conversion. Make sure you update the paths below if necessary.
# Download Windows 10 SDK (***probably already installed if you have Visual Studio***): https://developer.microsoft.com/en-US/windows/downloads/windows-10-sdk
# Download Windows 10 BaseImage (***must match SDK version***): https://www.microsoft.com/en-us/software-download/dac
# Download DesktopAppConverter: https://www.microsoft.com/en-us/store/p/desktop-app-converter/9nblggh4skzw

if (!$password) {
    throw "WINSTORE_CERT_PASSWORD env variable not found."
}

& node_modules/.bin/electron-windows-store.cmd `
    --input-directory dist/win-unpacked `
    --output-directory dist/win-appx `
    --flatten true `
    --package-version "$version" `
    --package-name "Caprine" `
    --identity-name "11272Kingbird.Caprine" `
    --assets "static/win10" `
    --deploy $false `
    --publisher "CN=47958F3E-04D3-4EFC-B249-2D204C942350" `
    --publisher-display-name "Nozzlegear Software" `
    --windows-kit "$windowsKit" `
    --desktop-converter "$desktopConverter" `
    --expanded-base-image "$expandedBaseImage" `
    --dev-cert "$devCert" `
    --cert-pass "$password"
