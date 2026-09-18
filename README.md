# Smrityalayam — TTS + Offline Music Fix

This version fixes two audio problems:

## 1. Activity instructions are actually spoken
- Memory Match instructions have a visible **Read aloud** button.
- Pressing **Start game** also speaks the instructions from a user click, which is much more reliable than trying to autoplay speech from a React `useEffect`.
- Browser voices are loaded through `voiceschanged`, refreshed at speech time, and `speechSynthesis.resume()` is called before playback.
- The selected-language voice is used when the browser provides it; otherwise the app falls back to an available voice.

## 2. Northeast music works without MP3 files
The Northeast Cultural Hub no longer depends on missing MP3s. Each track:
- uses a bundled MP3 if one is actually present at its `/public/audio/...` path;
- otherwise plays an offline synthetic demo melody through the Web Audio API.

The synthetic audio is a **demo inspired by the listed regional scale**, not an authentic field recording. Do not describe it as an authentic traditional recording in an SIH presentation.

## Run

```cmd
cd <this-folder>\smfix
npm install
npm run dev
```

Open `http://localhost:3000`.

### Test TTS
1. Keep Audio ON in the sidebar/mobile audio button.
2. Select a language in Settings.
3. Open Activities → Memory Match.
4. Press **Read aloud** or **Start game**.

### Test music
1. Open Culture → Northeast → Music.
2. Press **Play music** on any state.
3. It should play immediately even when `public/audio/*.mp3` files do not exist.


## SIH 26003 feature-completeness additions
The prototype now also demonstrates:
- **Reminders:** medicine, hydration, daily activity and medical-appointment reminders with local persistence.
- **Caregiver alerts:** a dashboard section for reminder monitoring and engagement/routine trends.
- **Offline-ready state:** locally queued reminder changes and visible pending-sync status; the production architecture should connect this queue to a secure backend when connectivity returns.
- **Social/care pathway:** caregiver-facing monitoring is separated from the elder experience, while the existing culturally adaptive activities remain the engagement layer.
- **Adaptive analytics:** the existing performance panel provides illustrative accuracy, response-time and domain-level performance used for recommendations.
- **Multilingual voice/culture:** the existing language selection, read-aloud flow and Northeast cultural/music layer remain included.

### Important SIH implementation boundary
This is a working front-end prototype. It does **not** claim to provide clinically validated dementia treatment/diagnosis, real medical alerts, real patient-data security, real caregiver authentication, or production cloud synchronization. Those require validation, a secure backend, authentication/authorization, encrypted storage/transit, consent and appropriate clinical/privacy review.

## Latest SIH feature update
- Caregiver dashboard has a dedicated **Upload family photos & videos** button.
- Family memories can be stored with title, people/place, year and story prompt.
- Family photos/videos appear in the elder **Memory Match** activity as personalized memory cards.
- Voice instructions/read-aloud and offline synthetic music are included.
- **Colour & Pattern Sorting** provides an attention/pattern-recognition activity with adaptive-friendly rounds.
- Medicine, hydration, activity and appointment reminders are available with local persistence.
- Caregiver dashboard includes **Fitbit / fitness tracker** integration UI and live OAuth/API scaffolding plus demo data.

### Prototype limitation
Media and app data are stored locally for the prototype. Production should move family media and elder data to authenticated encrypted cloud storage, use IndexedDB for a durable offline queue, and synchronize securely when connectivity returns. Fitbit is the implemented wearable API; additional tracker platforms can be added behind the same integration layer.
