# SKA
### Scaffolding CLI tool

### The idea

This is going to be a scaffolding CLI tool that supports lots of templates, remote ones too.  
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

#### Furthermore

Ideas:
+ interactive mode ( populate the variables with stdin )  
+ validation of variables