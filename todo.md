## dev plan

- [x] create Dockerfile that has all the necessary parts
  - [ ] server that accepts images POSTed to /camera_upload
    - [ ] store the username of the uploader when it's there
  - [ ] mechanism for kicking off...
    - [ ] Processing
    - [ ] gifsicle
    - [ ] POSTing images to Twitter
      - [ ] @mention the uploader
    - [ ] POSTing images to Firebase
    - [ ] file cleanup

- [x] copy over brandy-bunch-frontend
- [x] modify Firebase code
  - [x] display the latest upload + four random others
- [x] modify layout
  - [x] one big image + a grid of four to the side

- [x] app to take photos
  - [ ] POST photos to /camera_upload