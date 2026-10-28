# Netrunner

Official firmware page and USB installer for Netrunner.

**Website:** https://otavio-dias-leite.github.io/netrunner/

## Local preview

Serve the repository root over HTTP (not file://):

```bash
python -m http.server 8000
```

Open http://localhost:8000.

## Publishing a firmware release

The installer uses [ESP Web Tools](https://esphome.github.io/esp-web-tools/) and its manifest format.

1. Build and test the firmware for the target board.
2. Publish the complete flash package and every required binary in the repository or a release asset.
3. Add a manifest under `firmware/manifests/`.
4. Add the manifest path to the matching version in `firmware/versions.json`.

A manifest must use the correct ESP chip family and flash offsets for the exact build. Do not publish an application-only binary as a complete image. ESP32-S3 Arduino builds commonly require bootloader, partition table, boot_app0 (when applicable), and application images at their build-defined offsets. Verify the generated flash arguments before enabling installation.

## Browser requirements

USB installation requires a Chromium-based desktop browser with Web Serial support and HTTPS (GitHub Pages provides HTTPS). A data-capable USB cable is required.

## Current firmware catalog

- M5Stack Cardputer ADV — Netrunner 0.3 (source available; compiled flash package pending).

The firmware source is maintained separately from this installer until a tested flash package is available.