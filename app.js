const deviceSelect=document.querySelector("#device");
const versionSelect=document.querySelector("#version");
const installer=document.querySelector("#installer");
const installButton=document.querySelector("#install-button");
const state=document.querySelector("#install-state");
const releaseName=document.querySelector("#release-name");
const releaseSize=document.querySelector("#release-size");

function setState(message,ready=false){state.textContent=message;state.classList.toggle("ready",ready)}
function formatBytes(bytes){if(!bytes)return "—";return bytes<1048576?(bytes/1024).toFixed(0)+" KB":(bytes/1048576).toFixed(2)+" MB"}

async function init(){
  try{
    const response=await fetch("./firmware/versions.json",{cache:"no-store"});
    if(!response.ok)throw new Error("Could not load firmware catalog.");
    const catalog=await response.json();
    const devices=Object.entries(catalog.devices||{});
    if(!devices.length)throw new Error("No supported devices are configured.");
    for(const [id,device] of devices){const option=document.createElement("option");option.value=id;option.textContent=device.name;deviceSelect.append(option)}
    deviceSelect.addEventListener("change",()=>renderVersions(catalog));
    versionSelect.addEventListener("change",()=>selectRelease(catalog));
    renderVersions(catalog);
  }catch(error){setState(error.message);installButton.disabled=true}
}

function renderVersions(catalog){
  versionSelect.replaceChildren();
  const device=catalog.devices[deviceSelect.value];
  const releases=device?.versions||[];
  for(const release of releases){const option=document.createElement("option");option.value=release.version;option.textContent=release.version;versionSelect.append(option)}
  versionSelect.disabled=!releases.length;
  selectRelease(catalog);
}

function selectRelease(catalog){
  const device=catalog.devices[deviceSelect.value];
  const release=device?.versions?.find(item=>item.version===versionSelect.value);
  installer.removeAttribute("manifest");
  installButton.disabled=true;
  if(!release){releaseName.textContent="—";releaseSize.textContent="—";installButton.textContent="No releases";setState("No firmware release is listed for this device.");return}
  releaseName.textContent=release.name||release.version;
  releaseSize.textContent=formatBytes(release.size);
  if(!release.manifest){
    installButton.textContent="Firmware not available";
    setState(release.statusMessage||"This release is listed, but its compiled firmware package has not been published yet.");
    return;
  }
  installer.setAttribute("manifest",release.manifest);
  installButton.disabled=false;
  installButton.textContent="Connect and install";
  setState("Firmware package ready. Connect the device over USB to continue.",true);
}

init();