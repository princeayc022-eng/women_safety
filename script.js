const emergencyNumber = document.querySelector('#emergency-number');
const callButton = document.querySelector('#call-button');
const locationButton = document.querySelector('#location-button');
const locationStatus = document.querySelector('#location-status');

callButton.addEventListener('click', () => {
  const number = emergencyNumber.value.trim();

  if (!number) {
    emergencyNumber.focus();
    emergencyNumber.placeholder = 'Enter local number';
    return;
  }

  // Opens the device dialer; the person must place the call.
  window.location.href = `tel:${number.replace(/[^\d+]/g, '')}`;
});

locationButton.addEventListener('click', () => {
  if (!navigator.geolocation) {
    locationStatus.textContent = 'Location is not available in this browser.';
    return;
  }

  locationStatus.textContent = 'Getting your location…';
  navigator.geolocation.getCurrentPosition(async (position) => {
    const { latitude, longitude } = position.coords;
    const mapLink = `https://maps.google.com/?q=${latitude},${longitude}`;

    try {
      await navigator.clipboard.writeText(mapLink);
      locationStatus.innerHTML = `Location link copied. <a href="${mapLink}" target="_blank" rel="noopener">Open map ↗</a>`;
    } catch {
      locationStatus.innerHTML = `Your map link: <a href="${mapLink}" target="_blank" rel="noopener">Open map ↗</a>`;
    }
  }, () => {
    locationStatus.textContent = 'Could not get your location. Check browser permissions and try again.';
  }, { enableHighAccuracy: true, timeout: 10000 });
});
