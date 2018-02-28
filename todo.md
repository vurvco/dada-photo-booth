# dev plan

## CAMERA
- [x] app to take photos
  - [x] POST photos to /camera_upload
- [ ] show procedural output of p5 sketch
- [ ] draw rectangle or other tracking image over face in camera view ([#6](https://github.com/vurvco/dada-photo-booth/issues/6))

## CLIENT
- [x] copy over brandy-bunch-frontend
- [x] modify Firebase code
  - [x] display the latest upload + ~~four~~ two random others
- [x] modify layout
  - [x] one big image + a grid of ~~four~~ to the side
- [ ] modify layout again: side-by-side portraits within frames, latest two
  - [ ] get frame .png images from Adam

## SERVER
- [x] server that accepts images POSTed to /camera_upload
- [x] set twitter process.env variables -- see snag for ideas
- [ ] mechanism for kicking off...
  - [ ] ~~Processing~~ p5 sketch
  - [ ] ~~gifsicle~~ Node.js wrapper for gifsicle
  - [x] POSTing images to Twitter
    - [ ] ~~@mention the uploader~~
  - [x] POSTing images to Firebase
  - [ ] file cleanup
