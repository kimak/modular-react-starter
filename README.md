Modular React Starter Kit
============


Prerequisites
-------------

- [nodejs](http://nodejs.org)

:warning: The Jest test framework of facebook have an issue with node 0.12 :
https://github.com/facebook/jest/issues/243

- [gulp](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md)
- [ruby](https://www.ruby-lang.org/fr/documentation/installation/)  
- [sass](http://www.sass-lang.com/install)
- [scss-lint](https://github.com/causes/scss-lint)


Installation
------------

Install package.json dependencies

       npm install

ESLint 

       //Install eslint in global to use it in your editor
       npm install eslint -g
       
EsLint react plugin
       
      //The eslint react plugin must be in global context too
      npm install eslint-plugin-react -g


Documentation industrialisation
------------

## Gulp Tasks

* **gulpfile.babel.js** : Entry point to start gulp/index.js task

* **gulp/index.js** : load all tasks/* files with a filter on script @see gulp/util/scriptFilter.js

* **gulp/config**
    
  - **config.js** : 
  
Contain configuration path for all files used by the project tasks. Order by grouped task (react, sass, sonata).
Each task contain a dynamic sub-group. It will generate sub-tasks dynamically with the key object value. Example: react:sample, react:contracts etc.

Example with a module named sample:
     
          modules:{
              sample:{
                  styles: {
                      index: resources.src + 'sample/styles/sample.scss',
                      src: resources.src + 'sample/styles/**/*.scss',
                      dest: resources.dest + 'sample/styles'
                  },
                  scripts: {
                      index: resources.src + 'sample/scripts/SampleApp.jsx',
                      src: resources.src+'sample/scripts/**/*.jsx',
                      test: resources.src+'sample/__tests__/**/*-spec.js',
                      dest: resources.dest + 'sample/scripts'
                  }
              }
              otherModule:{
                  ...
              }
          }    
    
    
  - **resources.js** : Contain the root definition of config paths.
    .root: base path of front app (index: app_dev.php)
    .src: base path of source front app
    .dest: base path of  all assets front app after build (js/css/images/fonts)
    

**gulp/tasks**

  - **eslint.js** : Use npm [eslint](http://eslint.org/) and [eslint-plugin-react](https://www.npmjs.com/package/eslint-plugin-react) plugin to analyse the static react source code.
  @see the ./.eslintrc file for project rules.

  :warning: A little exception is not fix yet with React and Eslint.
  Error: no-undef rules in a .jsx component

        //ESLint: 'Component' is undefined. (no-undef)
        React.render(<Component/>,body); // eslint-disable-line no-undef

  Use a **eslint-disable-line no-undef** comment to fix it.

  [Visit eslint Rules!](http://eslint.org/docs/rules/)

  [Visit eslint-plugin-react Rules!](https://www.npmjs.com/package/eslint-plugin-react)


  - **react.js** : Use [browserify](http://browserify.org/) and [babelify](https://github.com/babel/babelify) to build react .jsx source (dev and prod). Use [watchify](https://github.com/substack/watchify) to rebuild only react modified source by module on the fly.
    
    The choice of [browserify vs webpack](http://blog.namangoel.com/browserify-vs-webpack-js-drama) was made for the modularity of browserify. 
    The functionality React Hot-Loading of Webpack can be made with browserify by using [browserSync](http://www.browsersync.io/docs/gulp/).
    
  - **sass.js** : Use gulp-ruby-sass to build each module sass files in separated css.
    
  - **scss-lint.js** : Use gulp-scss-lint to load ./.scss-lint.yml and apply some naming guideline to sass content. 

  - **sonata.js** : Concat all css and javascript files needed by the sonata admin. And uglify them in a min version.
  
  - **test.js** : Use Jest to unit test react source code.
  
  :warning: The Jest test framework of facebook have an issue with node 0.12 :
  https://github.com/facebook/jest/issues/243
  
Configure your editor (JetBrains)
------------

**.editorconfig**

  [Visit the standard coding styles!](http://editorconfig.org/)

  - @JetBrain users: install the EditorConfig plugin.
      
**.eslintrc**   

- @JetBrain users: EsLint verification is available in Preferences...
  You need to **Enable** it and configure the correct path:

  * Node Interpreter: **/usr/local/bin/node**
  * ESLint package: **/usr/local/lib/node_modules/eslint**
  * And let JetBrain Search the .esltinrc file automatically
  
For JetBrain<9 you need to install EsLint plugin to make it work.  

**.scss-lint.yml**   

- @JetBrain users: Install the scss-Lint plugin from preferences/plugins settings.
Then, you need to **Enable** it and configure the correct path:

  * SCSS Lint exe: /usr/bin/scss-lint


Getting started : Links
------------
[Thinking in React](https://facebook.github.io/react/docs/thinking-in-react.html)

