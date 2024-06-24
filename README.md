# Shorter Loop ui component library


[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

We are building and maintaining UI components and tools that will help you to build up your own custom components with a lot of customizing options..

## How to install?

You can use npm command line tool to install package.

```sh
npm install shorterloop
```

## How to use?

Import the Module:

```ts
import { ProdeasyPhotographModule } from shorterloop;

@NgModule({
  ...
  imports: [ProdeasyPhotographModule]
  ...
})
export class AppModule { }
```

Add Form Field in app.component.html

```html
<prodeasy-photograph>
  ...
  ...
  ...
</prodeasy-photograph>
```

## Storybook?


[Storybook Link](https://storybook.prodeasy.com)


# Our release process

We are following a branch strategy for releasing the prerelease and final versions.

- `major/minor/patch` : all these versions will be published from the `master` branch.
- `prerelease --preid=beta`: all the prerelease version will be published from the `dev` branch.

#### Patch releases

The patch builds (1.0.1, 1.0.2, etc.) are prepared based on commits in the `master` branch;
it contains only non-breaking changes.

#### Minor releases

The minor builds (1.1.0, 1.2.0, etc.) can contain changes related to HTML, APIs, CSS, and UX.

#### Prerelease releases

The prerelease builds (1.0.1-beta.0, 1.0.1-beta.1, etc.) are prepared based on commits in the `dev` branch;

## Publishing a new package

1. `npm version patch/minor/major`.
2. Run `npm publish`

# Browser Support

We supports the most recent versions of all the major browsers: Chrome, Firefox, Safari and IE11/edge.
