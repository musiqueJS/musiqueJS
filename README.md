<p align="center">
  <a href="https://musiquejs.com">
      <img src="https://github.com/musiqueJS/musiqueJS/assets/37938250/ac05bb96-dfc5-4d8a-8040-3abea30fa761" height="128">
    <h1 align="center">Musique.js</h1>
  </a>
</p>

<p align="center">
  <a aria-label="NPM version" href="https://www.npmjs.com/package/musiquejs">
    <img alt="Static Badge" src="https://img.shields.io/badge/v0.3.0-grey?logo=npm&label=Musique.js&labelColor=%23f13964&color=%23f13964">
  </a>
  <a aria-label="License" href="https://github.com/musiqueJS/musiqueJS/blob/main/LICENSE">
    <img alt="Static Badge" src="https://img.shields.io/badge/MIT-grey?label=License&labelColor=%23c429e2&color=%23c429e2">
  </a>
  <a aria-label="Built with love" href="https://github.com/musiqueJS/musiqueJS/graphs/contributors">
    <img alt="Static Badge" src="https://img.shields.io/badge/%E2%9D%A4-grey?label=Built%20with&labelColor=%238206f9&color=%238206f9&link=https%3A%2F%2Fwww.musiquejs.com%2F">
  </a>
</p>

Musique.js is a small JS library which aims to help developers easily create melodies for their websites, with pretty much no prior musical knowledge!

## We have a website!
Visit [https://www.musiquejs.com/](https://www.musiquejs.com/) to see what we're about!

## Documentation

The full documentation can be found at [https://docs.musiquejs.com/](https://docs.musiquejs.com/).

## How to use

Here is a small snippet to show you how easy it is to create musique:

```js
import { Partition, Note } from 'musiquejs';
 
const partition = new Partition(
[
  new Note('D', 4, 0.18),
  new Note('D', 4, 0.18),
  new Note('D', 5, 0.36),
  new Note('A', 4, 0.54),
],
'sine',
new AudioContext()
);
 
partition.play();
```

## Installing the project

### Dependencies

To install the project locally if you want to contribute (thanks!), you will need:

- [Node](https://nodejs.org/en) (we recommend >= v19, but there's no hard limit)
- … That's it!

### Running the project

To test your changes to the package locally, you will have to:
- Build the project (`pnpm build`);
- Create another project/directory on your machine;
- In there, use `npm link musiquejs` to import the local version of the package;
- Use your modified version! (if you change the code, you will need to repeat step 1, the link however is only a one-time command) 

## Contributing

Contributing is more than encouraged, no matter how!  
Opening Pull Requests is great, but opening issues to point out issues already goes a long way!

### Good First Issues

Every issue we identify as [good first issues](https://github.com/musiqueJS/musiqueJS/labels/good%20first%20issue) will be receive the appropriate tags.

## Authors

- Tom Louveau ([@TODO](https://twitter.com/))
- Nicolas De Guarrrigues (𝕏 [@nicodegarrigues](https://twitter.com/nicodegarrigues))
- Julien Cousin-Alliot (𝕏 [@nispeon](https://twitter.com/nispeon))
