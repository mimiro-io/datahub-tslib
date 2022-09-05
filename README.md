# datahub-tslib
A typescript module for writing datahub transform scripts with strict typing.

## Usage

### Installation

If you don't have an existing npm project yet, create one:
```
mkdir myproject && cd myproject
npm init
```

Install the `datahub-tslib` package.

```
npm install mimiro-io/datahub-tslib --save-dev
```

Now you have an executable available called `tt`, which takes the name of a typescript file as parameter and transpiles to javascript. You can add it as build script to `package.json` or call it directly using `npx tt <filename.ts>`.

`package.json` should look like this now:


``` package.json
{
    "scripts": {
        "build": "tt"
    },
    "devDendencies": {
        "datahub-tslib": "github:mimiro-io/datahub-tslib"
    }
}

```

### Create and transpile a transform script.

To make use of the library, create a typescript file: `touch mytransform.ts`.

Now add an import for our datahub module from datahub-tslib, and add a global scope function called `transform_entities` with the signature given in the following example.

``` typescript
import * as dh from "datahub-tslib/datahub"

export function transform_entities(entities: dh.Entity[]): dh.Entity[] {
    entities.forEach((e: dh.Entity) => {
        dh.Log(dh.GetId(e))
    })
}
```



To transpile the typescript transform to javascript, run: 
```
npx tt mytransform.ts
```
or, if you added `tt` as build script to package.json:
```
npm run build mytransform.ts
```

Given there are no compilation errors, this will emit transpiled and bundled javascript code, which can be used as transform in a datahub job.
