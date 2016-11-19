# SKA
### Scaffolding CLI tool

### How to install & use

#### Install

`npm i -D ska` || `yarn add ska --dev`

#### Utilization

Create a `ska.yml` file in project root folder.

`/ska.yml`

```yaml
- scaffolding/
```

Now create the real scaffolding template and its configuration file.  

`/scaffolding/ska.yml`

```yaml
name: My Scaffolding Template   # Simple name
definition:                     # Here starts the real definition of the template
- command: component            # Command to call when generating ( i.e. `ska gen <component>` )
  info: Create my component.    # Short description
  template: component.js        # Path to the template ( powered by [mustache](https://github.com/janl/mustache.js/) )
  destination: src/components   # Default destination for the generated file
  variables:                    # Variables requested by the template
  - id: name
    info: Name of the component
```

Then populate `component.js` with your [mustache](https://github.com/janl/mustache.js/) template.  

`/scaffolding/component.js`

```js
import {Component} from 'react';

export default class {{name}} extends Component{}
```

Call the template generation and save it

`$ ska gen component MyComponent > ./src/components/MyComponent.js`

### The idea

This is a scaffolding CLI tool that supports lots of templates, remote ones too.  
The templates will be rendered with a render engine, like mustache.  
The repository will be available on **npm**.  

#### Configuration

The configuration file will be named `ska.yml` ideally.  

It will contain *one of two* configuration structures:
+ an array of other path containing a `ska.yml` configuration file
+ an object containing the definition of a series of templates

I'm going to explain them here, by examples:

#### Index Configuration ( array of paths )

`ska.yml`

```yaml
- scaffolding/react/
- scaffolding/redux/
```

#### Definition Configuration ( object )

`scaffolding/redux/ska.yml`

```yaml
name: redux-scaffolding
definition:
- command: reducer
  info: Create a reducer given a name and a state.
  template: templates/reducer.js
  destination: src/reducers/
  variables:
  - id: name
    info: Name of the reducer.
  - id: state
    info: Fragment of state sent to reducer.
- command: component
  info: Create a component given its name and its superclass.
  template: templates/component.jsx
  destination: src/components/
  variables:
  - id: name
    info: Name of the component.
  - id: class
    info: The superclass ( usually Component )
```

#### Main commands

**generate** ( alias `g`, `gen` )  
It will generate the file and output it in the console.  
If `--save` argument is provided, it will save the file to the default destination.  

**list** ( alias `l`, `ls` )  
List all available templates.

#### String helpers

**Helpers** can be called in mustache:

E.g.:

```js
export default class {{#capitalize}}{{name}}{{/capitalize}}{
    constructor(){}
}
```

`$ ska gen class mYcLaSsNaMe`
will generate:

```js
export default class Myclassname{
    constructor(){}
}
```

**Available helpers**:

+ `uppercase`
+ `lowercase`
+ `capitalize`

#### Examples

`$ ska generate reducer Notification > ./src/reducers/notificationReducer.js`  

will create `src/reducers/notificationReducer.js` with the following content:  

```js
/// <reference path="../../../../typings/index.d.ts" />

import {Action} from '../actions';
import {Reducer} from 'redux';

const notificationReducer: ( state: any, action: any ) => any =
  function( state = app, action ){

    let {payload} = action;

    switch( action.type ){
      default:
        return state;
    }
  };

export default notificationReducer;
```

Its template is defined in `scaffolding/redux/reducer.js`.

**Save**

You can also use `--save` to automatically save the file with the **name** provided in the arguments, and the folder provided by `ska.yml` configuration file.


#### Info

In order to mantain the root directory of the project clean, the `ska.yml` path can be specified into a `package.json`, e.g.  

```json
{
    ...,
    "ska": "config/ska.yml",
    ...
}
```

### Reporting issues

+ Look for any related issues.  
+ If you find an issue that seems related, plase comment there instead of creating a new one.  
+ If you find no related issue, create a new one.  
+ Include all details you can ( operative system, environment, interpreter version, etc.. )  
+ Include the error log.  
+ Remember to check the discussion and update if there are changes.

### Contributing

+ Fork the repository  
+ Create your feature branch  
+ Commit your changes and push the branch  
+ Submit a pull request  

#### Furthermore

Ideas:
+ interactive mode ( populate the variables with stdin )  
+ validation of variables